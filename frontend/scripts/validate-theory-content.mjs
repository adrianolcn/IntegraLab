import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');
const migrationsDir = path.join(repoRoot, 'backend', 'src', 'main', 'resources', 'db', 'migration');
const lessonDetailPath = path.join(repoRoot, 'frontend', 'src', 'pages', 'catalog', 'LessonDetail.tsx');

const jsonFields = new Set([
  'glossary',
  'glossary_en',
  'mini_quiz',
  'mini_quiz_en',
  'interactive_flow',
  'interactive_flow_en',
  'interactive_content',
  'interactive_content_en',
  'learning_objectives',
  'learning_objectives_en',
  'key_concepts_detailed',
  'key_concepts_detailed_en',
  'common_mistakes_detailed',
  'common_mistakes_detailed_en',
]);

function collectMatches(input, regex, groupIndex = 1) {
  const matches = [];
  for (const match of input.matchAll(regex)) {
    matches.push(match[groupIndex]);
  }
  return matches;
}

function normalizeTerm(term) {
  return term.trim().toLowerCase();
}

function collectGlossaryTermsFromSql(sql) {
  const terms = new Set();
  for (const jsonBlock of collectMatches(sql, /\$\$([\s\S]*?)\$\$/g)) {
    const trimmed = jsonBlock.trim();
    if (!trimmed.startsWith('[')) continue;

    try {
      const parsed = JSON.parse(trimmed);
      if (!Array.isArray(parsed)) continue;

      for (const item of parsed) {
        if (item?.term) terms.add(normalizeTerm(item.term));
        if (item?.acronym) terms.add(normalizeTerm(item.acronym));
      }
    } catch {
      // JSON validation for explicit fields is handled separately below.
    }
  }

  return terms;
}

async function getKnownTokens() {
  const source = await readFile(lessonDetailPath, 'utf8');
  const tokens = new Set(
    collectMatches(source, /paragraph\.includes\('\[\[([A-Z_]+)\]\]'\)/g).concat(
      collectMatches(source, /paragraph\.includes\("\[\[([A-Z_]+)\]\]"\)/g),
    ),
  );
  return tokens;
}

async function main() {
  const knownTokens = await getKnownTokens();
  const files = (await readdir(migrationsDir))
    .filter((name) => name.endsWith('.sql'))
    .sort();

  const usedTokens = new Map();
  const usedTerms = new Map();
  const glossaryTerms = new Set();
  const jsonErrors = [];

  for (const file of files) {
    const fullPath = path.join(migrationsDir, file);
    const sql = await readFile(fullPath, 'utf8');

    for (const token of collectMatches(sql, /\[\[([A-Z_]+)\]\]/g)) {
      if (!usedTokens.has(token)) usedTokens.set(token, new Set());
      usedTokens.get(token).add(file);
    }

    for (const term of collectMatches(sql, /\{\{([^}]+)\}\}/g)) {
      if (!usedTerms.has(term)) usedTerms.set(term, new Set());
      usedTerms.get(term).add(file);
    }

    for (const term of collectGlossaryTermsFromSql(sql)) {
      glossaryTerms.add(term);
    }

    for (const match of sql.matchAll(/([a-z_]+)\s*=\s*\$\$([\s\S]*?)\$\$/g)) {
      const fieldName = match[1];
      const rawValue = match[2];

      if (!jsonFields.has(fieldName)) continue;
      if (rawValue.trim().toUpperCase() === 'NULL') continue;

      try {
        JSON.parse(rawValue);
      } catch (error) {
        jsonErrors.push({
          file,
          fieldName,
          message: error instanceof Error ? error.message : String(error),
        });
      }
    }
  }

  const unknownTokens = [...usedTokens.entries()].filter(([token]) => !knownTokens.has(token));
  const missingGlossaryTerms = [...usedTerms.entries()].filter(([term]) => !glossaryTerms.has(normalizeTerm(term)));

  if (jsonErrors.length || unknownTokens.length || missingGlossaryTerms.length) {
    console.error('\nTheory validation failed.\n');

    if (jsonErrors.length) {
      console.error('Invalid JSON fields:');
      for (const issue of jsonErrors) {
        console.error(`- ${issue.file} :: ${issue.fieldName} -> ${issue.message}`);
      }
      console.error('');
    }

    if (unknownTokens.length) {
      console.error('Unknown [[BLOCK]] tokens without a renderer in LessonDetail.tsx:');
      for (const [token, tokenFiles] of unknownTokens) {
        console.error(`- [[${token}]] in ${[...tokenFiles].join(', ')}`);
      }
      console.error('');
    }

    if (missingGlossaryTerms.length) {
      console.error('ConceptNotes without glossary entry:');
      for (const [term, termFiles] of missingGlossaryTerms) {
        console.error(`- {{${term}}} in ${[...termFiles].join(', ')}`);
      }
      console.error('');
    }

    process.exitCode = 1;
    return;
  }

  console.log('Theory validation passed.');
  console.log(`- Known render tokens: ${knownTokens.size}`);
  console.log(`- Token references scanned: ${usedTokens.size}`);
  console.log(`- ConceptNotes scanned: ${usedTerms.size}`);
  console.log(`- Glossary terms registered: ${glossaryTerms.size}`);
}

await main();
