import { useTranslation } from 'react-i18next';
import ConceptText from './ConceptText';

interface StatusDiagnosisCardsProps {
  glossaryJson?: string;
}

export default function StatusDiagnosisCards({ glossaryJson }: StatusDiagnosisCardsProps) {
  const { t } = useTranslation();

  const scenarios = [
    {
      code: '400',
      scenario: t('diag.400.scenario', 'Enviei JSON inválido.'),
      cause: t('diag.400.cause', 'O servidor não conseguiu fazer o parse do seu {{Body}} porque você esqueceu uma aspa ou enviou um campo tipo int como string.'),
      action: t('diag.400.action', 'Frontend: Verifique o console.log() do {{Payload}} antes de enviar.')
    },
    {
      code: '401',
      scenario: t('diag.401.scenario', 'Esqueci o token.'),
      cause: t('diag.401.cause', 'Falta de {{Autenticação}}. O {{Header}} `Authorization` não foi enviado, ou o {{Token}} está expirado.'),
      action: t('diag.401.action', 'Frontend: Redirecione o usuário para a tela de Login.')
    },
    {
      code: '403',
      scenario: t('diag.403.scenario', 'Tenho token, mas sem permissão.'),
      cause: t('diag.403.cause', 'Problema de {{Autorização}}. Você provou quem é (passou do 401), mas tentou deletar um arquivo que só um Admin pode apagar.'),
      action: t('diag.403.action', 'Frontend: Mostre uma mensagem "Acesso Negado". Backend: Verifique regras de roles.')
    },
    {
      code: '404',
      scenario: t('diag.404.scenario', 'A rota ou recurso não existe.'),
      cause: t('diag.404.cause', 'O {{Servidor}} está no ar (não é erro 500!), mas o {{Endpoint}} que você digitou `/usuariox` não existe ou o ID não foi encontrado no banco.'),
      action: t('diag.404.action', 'Frontend: Verifique a URL digitada na requisição HTTP.')
    },
    {
      code: '405',
      scenario: t('diag.405.scenario', 'Usei POST onde só aceita GET.'),
      cause: t('diag.405.cause', 'A rota `/configuracoes` existe, mas você usou o método errado.'),
      action: t('diag.405.action', 'Frontend: Troque o Método na sua chamada Axios/Fetch.')
    },
    {
      code: '409',
      scenario: t('diag.409.scenario', 'Tentei criar algo duplicado.'),
      cause: t('diag.409.cause', 'O {{Request}} estava certo, mas feriu uma restrição única do banco de dados (ex: e-mail já cadastrado).'),
      action: t('diag.409.action', 'Frontend: Mostre "Este e-mail já está em uso".')
    },
    {
      code: '422',
      scenario: t('diag.422.scenario', 'JSON perfeito, falhou na regra.'),
      cause: t('diag.422.cause', 'A sintaxe estava certa (não é 400), mas você enviou "senha": "12" e a regra exige 8 caracteres.'),
      action: t('diag.422.action', 'Frontend: Leia a {{Response}} para saber qual campo reprovou na validação de negócio e marque o input de vermelho.')
    },
    {
      code: '500',
      scenario: t('diag.500.scenario', 'O servidor quebrou.'),
      cause: t('diag.500.cause', 'Ocorreu um NullPointerException, falha de banco de dados, ou timeout no Backend.'),
      action: t('diag.500.action', 'Backend: Corra para ler os logs do servidor. Frontend: Exiba "Tente novamente mais tarde".')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {scenarios.map((s) => (
        <div key={s.code} className="bg-surface border border-borderSubtle rounded-lg p-5 hover:border-slate-400 dark:hover:border-slate-500 transition-colors flex flex-col h-full shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xl font-black font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border ${s.code.startsWith('5') ? 'text-rose-600 border-rose-200 dark:border-rose-900' : 'text-orange-600 border-orange-200 dark:border-orange-900'}`}>
              {s.code}
            </span>
            <span className="text-sm font-bold text-textMain leading-tight">{s.scenario}</span>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-textMuted tracking-wider mb-1 block">Causa Provável</span>
              <p className="text-xs text-textMain/90 leading-relaxed">
                <ConceptText text={s.cause} glossaryJson={glossaryJson} />
              </p>
            </div>
            
            <div className="pt-3 border-t border-borderSubtle">
              <span className="text-[10px] uppercase font-bold text-textMuted tracking-wider mb-1 block">Quem resolve?</span>
              <p className="text-xs font-medium text-textMain bg-slate-50 dark:bg-slate-900/50 p-2 rounded border border-borderSubtle">
                <ConceptText text={s.action} glossaryJson={glossaryJson} />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
