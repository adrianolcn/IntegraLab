import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ConceptText from './ConceptText';

interface InteractiveStatusCodesProps {
  glossaryJson?: string;
}

export default function InteractiveStatusCodes({ glossaryJson }: InteractiveStatusCodesProps) {
  const { t } = useTranslation();
  const [activeFamily, setActiveFamily] = useState('2xx');
  const [activeCode, setActiveCode] = useState<string | null>('200');

  const families = [
    { id: '2xx', label: '2xx', desc: t('status.2xx.desc', 'Sucesso') },
    { id: '3xx', label: '3xx', desc: t('status.3xx.desc', 'Redirecionamento') },
    { id: '4xx', label: '4xx', desc: t('status.4xx.desc', 'Erro do Cliente') },
    { id: '5xx', label: '5xx', desc: t('status.5xx.desc', 'Erro do Servidor') },
  ];

  const codes: Record<string, any[]> = {
    '2xx': [
      { code: '200', title: 'OK', meaning: t('status.200.meaning', 'Requisição bem sucedida.'), when: t('status.200.when', 'Usado principalmente em requisições {{GET}} para devolver dados e em {{PUT}}/{{PATCH}} ao atualizar registros.') },
      { code: '201', title: 'Created', meaning: t('status.201.meaning', 'Recurso criado com sucesso.'), when: t('status.201.when', 'A resposta correta e semântica para um {{POST}} bem sucedido.') },
      { code: '204', title: 'No Content', meaning: t('status.204.meaning', 'Sucesso, mas sem corpo de resposta.'), when: t('status.204.when', 'Padrão ouro para um {{DELETE}} bem sucedido. A ação ocorreu, mas não há um {{JSON}} para devolver no {{Body}}.') }
    ],
    '3xx': [
      { code: '301', title: 'Moved Permanently', meaning: t('status.301.meaning', 'A URL antiga não existe mais.'), when: t('status.301.when', 'A API instrui o {{Cliente}} de que o {{Endpoint}} mudou de forma definitiva e o navegador deve atualizar seus favoritos.') },
      { code: '302', title: 'Found (Temporary Redirect)', meaning: t('status.302.meaning', 'Redirecionamento temporário.'), when: t('status.302.when', 'Útil para redirecionar usuários não logados para a tela de login.') }
    ],
    '4xx': [
      { code: '400', title: 'Bad Request', meaning: t('status.400.meaning', 'Erro genérico de sintaxe ou estrutura.'), when: t('status.400.when', 'O {{Cliente}} enviou um {{JSON}} quebrado, esqueceu aspas, ou faltou um campo estrutural primário.') },
      { code: '401', title: 'Unauthorized', meaning: t('status.401.meaning', 'Falta de autenticação.'), when: t('status.401.when', 'O {{Cliente}} tentou acessar uma rota privada mas não enviou o {{Token}} no {{Header}}, ou o token expirou.') },
      { code: '403', title: 'Forbidden', meaning: t('status.403.meaning', 'Sem permissão (já autenticado).'), when: t('status.403.when', 'O servidor reconhece quem você é (tem {{Token}}), mas você é um usuário comum tentando deletar o banco de dados (ação de admin).') },
      { code: '404', title: 'Not Found', meaning: t('status.404.meaning', 'Recurso ou rota não existe.'), when: t('status.404.when', 'Você buscou o usuário de ID 9999 e ele não existe. ATENÇÃO: 404 não significa que o {{Servidor}} caiu, apenas que não achou aquele dado.') },
      { code: '405', title: 'Method Not Allowed', meaning: t('status.405.meaning', 'Método errado para a rota.'), when: t('status.405.when', 'A rota `/usuarios` só aceita {{GET}}, e você enviou um {{POST}}.') },
      { code: '409', title: 'Conflict', meaning: t('status.409.meaning', 'Conflito de estado.'), when: t('status.409.when', 'Tentar criar um usuário com um e-mail que já está cadastrado no sistema.') },
      { code: '422', title: 'Unprocessable Entity', meaning: t('status.422.meaning', 'Regra de negócio violada.'), when: t('status.422.when', 'O {{JSON}} está estruturalmente perfeito (não é 400), mas um valor viola a regra (ex: transferir 50 reais de uma conta que tem saldo 0).') }
    ],
    '5xx': [
      { code: '500', title: 'Internal Server Error', meaning: t('status.500.meaning', 'Falha genérica no código ou banco.'), when: t('status.500.when', 'O Backend tentou acessar uma variável nula ou o banco caiu. O {{Cliente}} não pode fazer nada para consertar, apenas aguardar.') }
    ]
  };

  const getFamilyColor = (family: string) => {
    switch(family) {
      case '2xx': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50';
      case '3xx': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50';
      case '4xx': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/50';
      case '5xx': return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/50';
      default: return '';
    }
  };

  const activeFamilyCodes = codes[activeFamily] || [];
  const selectedCodeDetails = activeFamilyCodes.find(c => c.code === activeCode) || activeFamilyCodes[0];

  return (
    <div className="my-8 rounded-xl border border-borderSubtle bg-surface/50 overflow-hidden shadow-sm">
      {/* Family Tabs */}
      <div className="flex overflow-x-auto border-b border-borderSubtle">
        {families.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setActiveFamily(f.id);
              setActiveCode(codes[f.id][0].code);
            }}
            className={`min-w-[120px] flex-1 px-6 py-4 text-center font-bold tracking-[0.08em] transition-colors ${
              activeFamily === f.id
                ? getFamilyColor(f.id) + ' border-b-2 !border-b-current'
                : 'text-textMuted hover:bg-surface'
            }`}
          >
            <span className="block text-lg">{f.label}</span>
            <span className="text-xs opacity-70 font-normal">{f.desc}</span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Codes List */}
        <div className="flex w-full flex-row gap-2 overflow-x-auto pb-2 md:w-[220px] md:flex-col md:pb-0">
          {activeFamilyCodes.map((c) => (
            <button
              key={c.code}
              onClick={() => setActiveCode(c.code)}
              className={`min-w-[150px] px-4 py-3 rounded-lg text-left transition-all border whitespace-normal ${
                activeCode === c.code
                  ? getFamilyColor(activeFamily) + ' shadow-sm'
                  : 'border-transparent text-textMuted hover:bg-surface hover:text-textMain'
              }`}
            >
              <div className="font-mono font-bold text-lg">{c.code}</div>
              <div className="text-xs leading-snug break-words">{c.title}</div>
            </button>
          ))}
        </div>

        {/* Details Panel */}
        <div className="flex-1 min-w-0">
          {selectedCodeDetails && (
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-black mb-1 font-mono flex items-center gap-3">
                  {selectedCodeDetails.code}
                  <span className="text-xl font-normal text-textMuted opacity-80">{selectedCodeDetails.title}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-surface p-5 rounded-lg border border-borderSubtle">
                  <span className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">
                    {t('status.labels.meaning', 'Significado')}
                  </span>
                  <p className="text-textMain font-medium leading-relaxed">
                    <ConceptText text={selectedCodeDetails.meaning} glossaryJson={glossaryJson} />
                  </p>
                </div>

                <div className="bg-surface p-5 rounded-lg border border-borderSubtle">
                  <span className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-2">
                    {t('status.labels.when', 'Quando acontece?')}
                  </span>
                  <p className="text-textMain leading-relaxed opacity-90 text-sm">
                    <ConceptText text={selectedCodeDetails.when} glossaryJson={glossaryJson} />
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
