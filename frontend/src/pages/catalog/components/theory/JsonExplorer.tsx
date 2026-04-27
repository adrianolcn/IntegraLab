import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ConceptText from './ConceptText';

interface JsonExplorerProps {
  glossaryJson?: string;
}

export default function JsonExplorer({ glossaryJson }: JsonExplorerProps) {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState<'braces' | 'key' | 'string' | 'number' | 'boolean' | 'comma' | null>('braces');

  const items = {
    braces: {
      title: t('json.braces.title', 'Chaves e Estrutura'),
      desc: t('json.braces.desc', 'O {{JSON}} geralmente começa e termina com chaves `{}`. Isso indica um Objeto. Se começar com `[]`, é um Array (uma lista).'),
    },
    key: {
      title: t('json.key.title', 'Chaves (Keys)'),
      desc: t('json.key.desc', 'Em {{JSON}}, o nome de uma propriedade SEMPRE precisa estar entre **aspas duplas**. Aspas simples vão quebrar o parse gerando {{400 Bad Request}}.'),
    },
    string: {
      title: t('json.string.title', 'Strings (Texto)'),
      desc: t('json.string.desc', 'Valores de texto também precisam estar obrigatoriamente entre aspas duplas.'),
    },
    number: {
      title: t('json.number.title', 'Numbers (Números)'),
      desc: t('json.number.desc', 'Números são digitados crus, sem aspas. Se colocar aspas, viram strings. Para decimais, usa-se ponto `.`, não vírgula.'),
    },
    boolean: {
      title: t('json.boolean.title', 'Booleans (Verdadeiro/Falso)'),
      desc: t('json.boolean.desc', 'Valores lógicos `true` ou `false` também são escritos sem aspas, tudo minúsculo.'),
    },
    comma: {
      title: t('json.comma.title', 'Vírgulas (Separadores)'),
      desc: t('json.comma.desc', 'Itens são separados por vírgula. Erro mais mortal para iniciantes: colocar vírgula no último item. {{JSON}} estrito não permite vírgula pendurada (trailing comma).'),
    }
  };

  return (
    <div className="my-8 bg-surface border border-borderSubtle rounded-xl overflow-hidden shadow-sm flex flex-col lg:flex-row">
      <div className="flex-1 bg-slate-900 p-8 font-mono text-base md:text-lg select-none">
        <div className="mb-6 text-xs text-slate-500 font-sans">
          {t('json.hint', 'Clique nas partes do JSON para entender a anatomia:')}
        </div>
        
        <div 
          className={`cursor-pointer transition-colors p-1 rounded inline-block ${activeItem === 'braces' ? 'bg-white/20' : 'hover:bg-white/10'}`}
          onClick={() => setActiveItem('braces')}
        >
          <span className="text-amber-200">{"{"}</span>
        </div>
        
        <div className="pl-8 my-2">
          <div className="flex items-center">
            <span 
              className={`cursor-pointer transition-colors p-1 rounded ${activeItem === 'key' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => setActiveItem('key')}
            >
              <span className="text-pink-400">"name"</span>
            </span>
            <span className="text-amber-200 mx-1">:</span>
            <span 
              className={`cursor-pointer transition-colors p-1 rounded ${activeItem === 'string' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => setActiveItem('string')}
            >
              <span className="text-green-400">"Produto Demo"</span>
            </span>
            <span 
              className={`cursor-pointer transition-colors p-1 rounded ${activeItem === 'comma' ? 'bg-white/20 text-red-400' : 'hover:bg-white/10 text-amber-200'}`}
              onClick={() => setActiveItem('comma')}
            >
              ,
            </span>
          </div>

          <div className="flex items-center mt-2">
            <span 
              className={`cursor-pointer transition-colors p-1 rounded ${activeItem === 'key' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => setActiveItem('key')}
            >
              <span className="text-pink-400">"price"</span>
            </span>
            <span className="text-amber-200 mx-1">:</span>
            <span 
              className={`cursor-pointer transition-colors p-1 rounded ${activeItem === 'number' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => setActiveItem('number')}
            >
              <span className="text-orange-400">29.9</span>
            </span>
            <span 
              className={`cursor-pointer transition-colors p-1 rounded ${activeItem === 'comma' ? 'bg-white/20 text-red-400' : 'hover:bg-white/10 text-amber-200'}`}
              onClick={() => setActiveItem('comma')}
            >
              ,
            </span>
          </div>

          <div className="flex items-center mt-2">
            <span 
              className={`cursor-pointer transition-colors p-1 rounded ${activeItem === 'key' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => setActiveItem('key')}
            >
              <span className="text-pink-400">"active"</span>
            </span>
            <span className="text-amber-200 mx-1">:</span>
            <span 
              className={`cursor-pointer transition-colors p-1 rounded ${activeItem === 'boolean' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => setActiveItem('boolean')}
            >
              <span className="text-purple-400">true</span>
            </span>
          </div>
        </div>

        <div 
          className={`cursor-pointer transition-colors p-1 rounded inline-block ${activeItem === 'braces' ? 'bg-white/20' : 'hover:bg-white/10'}`}
          onClick={() => setActiveItem('braces')}
        >
          <span className="text-amber-200">{"}"}</span>
        </div>
      </div>

      <div className="flex-1 p-8 bg-surface flex flex-col justify-center">
        {activeItem ? (
          <div className="animate-fadeIn">
            <h3 className="text-2xl font-black text-textMain mb-4 flex items-center gap-3">
              {items[activeItem].title}
            </h3>
            <p className="text-textMain/90 leading-relaxed text-lg bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-borderSubtle">
              <ConceptText text={items[activeItem].desc} glossaryJson={glossaryJson} />
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
