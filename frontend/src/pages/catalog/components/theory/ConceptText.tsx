import React, { useMemo } from 'react';
import ConceptNote from './ConceptNote';
import type { GlossaryItemRich } from './GlossaryList';

interface ConceptTextProps {
  text: string;
  glossaryJson?: string;
  className?: string;
}

export default function ConceptText({ text, glossaryJson, className = '' }: ConceptTextProps) {
  const glossaryItems = useMemo<GlossaryItemRich[]>(() => {
    if (!glossaryJson) return [];
    try {
      return JSON.parse(glossaryJson);
    } catch (e) {
      return [];
    }
  }, [glossaryJson]);

  const parsedContent = useMemo(() => {
    if (!text) return null;
    
    // 1. First split by ConceptNote tags {{term}}
    const parts = text.split(/(\{\{[^}]+\}\})/g);

    return parts.map((part, index) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        const term = part.slice(2, -2);
        // Find in glossary (case-insensitive)
        const match = glossaryItems.find(g => 
          g.term.toLowerCase() === term.toLowerCase() || 
          g.acronym?.toLowerCase() === term.toLowerCase()
        );
        
        if (match) {
          return <ConceptNote key={index} term={term} glossaryItem={match} />;
        } else {
          // Fallback if not in glossary
          return <strong key={index} className="text-textMain">{term}</strong>;
        }
      }
      
      // 2. Parse **bold** and *italic* for normal text parts
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      return boldParts.map((bp, i) => {
        if (bp.startsWith('**') && bp.endsWith('**')) {
          return <strong key={`${index}-${i}`} className="text-textMain font-bold">{bp.slice(2, -2)}</strong>;
        }
        
        const italicParts = bp.split(/(\*.*?\*)/g);
        return italicParts.map((ip, j) => {
          if (ip.startsWith('*') && ip.endsWith('*')) {
            return <em key={`${index}-${i}-${j}`} className="italic">{ip.slice(1, -1)}</em>;
          }
          return <React.Fragment key={`${index}-${i}-${j}`}>{ip}</React.Fragment>;
        });
      });
    });
  }, [text, glossaryItems]);

  return <span className={className}>{parsedContent}</span>;
}
