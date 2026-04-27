import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ConceptText from './ConceptText';

interface BearerTokenAnatomyProps {
  glossaryJson?: string;
}

export default function BearerTokenAnatomy({ glossaryJson }: BearerTokenAnatomyProps) {
  const { t } = useTranslation();
  const [activeSegment, setActiveSegment] = useState<'header' | 'bearer' | 'token' | null>(null);

  const explanations = {
    header: t('bearer.header', 'A chave do {{Header}} HTTP reservada pelos navegadores e servidores para transporte de {{Credenciais}}. Nunca coloque o token no {{Body}} de um GET.'),
    bearer: t('bearer.bearer', 'O "Esquema" de autenticação. A palavra "Bearer" significa "Portador". Literalmente: "Conceda acesso ao portador deste token". O espaço após a palavra é obrigatório!'),
    token: t('bearer.token', 'A string embaralhada emitida pelo servidor (muitas vezes um {{JWT}}). É ela que carrega a validade da sua {{Sessão}} atual.')
  };

  return (
    <div className="my-8 bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700 flex flex-col">
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-4 text-xs font-mono text-slate-400">Request Header</span>
      </div>
      
      <div className="p-8 md:p-12 flex flex-col items-center justify-center">
        <div className="text-base md:text-2xl lg:text-3xl font-mono font-bold flex flex-wrap justify-center gap-y-4">
          <span 
            className={`cursor-pointer transition-colors border-b-2 px-1 ${activeSegment === 'header' ? 'text-blue-400 border-blue-400' : 'text-white border-transparent hover:border-slate-500'}`}
            onMouseEnter={() => setActiveSegment('header')}
          >
            Authorization
          </span>
          <span className="text-white mx-1">:</span>
          <span className="w-4"></span>
          <span 
            className={`cursor-pointer transition-colors border-b-2 px-1 ${activeSegment === 'bearer' ? 'text-amber-400 border-amber-400' : 'text-slate-300 border-transparent hover:border-slate-500'}`}
            onMouseEnter={() => setActiveSegment('bearer')}
          >
            Bearer
          </span>
          <span className="w-2"></span>
          <span 
            className={`cursor-pointer transition-colors border-b-2 px-1 break-all ${activeSegment === 'token' ? 'text-emerald-400 border-emerald-400' : 'text-slate-400 border-transparent hover:border-slate-500'}`}
            onMouseEnter={() => setActiveSegment('token')}
          >
            eyJhbGciOiJIUzI1Ni...
          </span>
        </div>

        <div className="mt-12 h-24 max-w-2xl w-full text-center">
          {activeSegment ? (
            <div className="animate-fadeIn">
              <span className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-3 ${
                activeSegment === 'header' ? 'bg-blue-900/50 text-blue-300' :
                activeSegment === 'bearer' ? 'bg-amber-900/50 text-amber-300' :
                'bg-emerald-900/50 text-emerald-300'
              }`}>
                {activeSegment}
              </span>
              <p className="text-slate-300 text-sm md:text-base">
                <ConceptText text={explanations[activeSegment]} glossaryJson={glossaryJson} />
              </p>
            </div>
          ) : (
            <p className="text-slate-500 text-sm flex items-center justify-center h-full">
              Passe o mouse ou clique nas partes do código acima.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
