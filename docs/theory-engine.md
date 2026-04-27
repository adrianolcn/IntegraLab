# Theory Engine e Componentes de Conhecimento

O IntegraLab foi desenhado para ser rico visualmente e altamente descritivo. Para atingir essa densidade educacional sem entediar o aluno com "paredões de texto" (Text Walls), usamos a abstração da nossa Theory Engine.

## Regra de Ouro: ConceptNotes

A regra mais crítica de todo o design educacional da plataforma e da inserção de conteúdos nas migrations de banco de dados é a criação de **ConceptNotes**.

**TODO** termo técnico novo inserido em uma aula **PRECISA** obrigatoriamente se tornar um `{{ConceptNote}}`. O Markdown processado pelo frontend da plataforma irá capturar qualquer token neste formato e transformá-lo em um link interativo e elegante.

Para que a UI não quebre, a seguinte regra de suporte deve ser religiosamente seguida:
- **Todo ConceptNote necessita de uma entrada no glossário rica e descritiva no JSON correspondente da lição (tanto em inglês quanto em português).**

### Estrutura Obrigatória do Item de Glossário
Cada termo interceptado pelo parser no texto (ex: `{{Idempotência}}`) busca as seguintes propriedades dentro da lesson:

- `term`: O próprio termo em foco.
- `acronym` (opcional): Sigla, se existir.
- `definition`: Definição clara, limpa e concisa do que aquilo significa no contexto da tecnologia.
- `importance`: Uma explicação de POR QUÊ o engenheiro de software/desenvolvedor deve se importar com esse termo.
- `example`: Um exemplo ou analogia (geralmente focado em e-commerce para padronizar o aprendizado no IntegraLab).
- `lessonContext`: Uma declaração do motivo daquele termo ter sido introduzido naquela lição específica.

A não observância destas chaves faz com que as janelas explicativas de *tooltips* do ConceptNote falhem silenciosamente.

## Componentes Ricos e Injeção
Nunca envie HTML ou marcações perigosas pelo banco de dados (`dangerouslySetInnerHTML` é expressamente proibido na engine de teoria principal).
A estrutura do `content` de uma `TheoryLesson` deve focar em tags que o parser React compreende de maneira nativa, como os tokens de fluxos de diagnóstico (`[[STATUS_DIAGNOSIS]]`) ou laboratórios simulados.
