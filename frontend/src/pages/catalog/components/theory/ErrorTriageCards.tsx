import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ConceptText from './ConceptText';

interface ErrorTriageCardsProps {
  glossaryJson?: string;
}

export default function ErrorTriageCards({ glossaryJson }: ErrorTriageCardsProps) {
  const { t } = useTranslation();
  const [activeCode, setActiveCode] = useState('400');

  const errors = [
    { code: '400', label: 'Bad Request', type: 'Erro do Cliente' },
    { code: '401', label: 'Unauthorized', type: 'Erro do Cliente' },
    { code: '403', label: 'Forbidden', type: 'Erro do Cliente' },
    { code: '404', label: 'Not Found', type: 'Erro do Cliente' },
    { code: '405', label: 'Method Not Allowed', type: 'Erro do Cliente' },
    { code: '409', label: 'Conflict', type: 'Erro do Cliente' },
    { code: '415', label: 'Unsupported Media', type: 'Erro do Cliente' },
    { code: '422', label: 'Unprocessable', type: 'Erro do Cliente' },
    { code: '500', label: 'Internal Error', type: 'Erro do Servidor' },
  ];

  const content: Record<string, { desc: string; cause: string; who: string; fix: string; example: string }> = {
    '400': {
      desc: t('err.400.desc', 'O servidor não conseguiu entender a requisição devido a sintaxe inválida.'),
      cause: t('err.400.cause', '{{JSON}} quebrado (falta de aspas/chaves) ou URL malformada.'),
      who: 'Desenvolvedor Frontend / Integrador',
      fix: t('err.400.fix', 'Copie o {{Payload}} e valide em um formatador online de JSON. Corrija a sintaxe.'),
      example: '`{ "name": "Admin", }` <- Vírgula sobrando.'
    },
    '401': {
      desc: t('err.401.desc', 'Ação negada por falta de credenciais válidas.'),
      cause: t('err.401.cause', '{{Header}} `Authorization` ausente, ou {{Bearer Token}} expirado.'),
      who: 'Desenvolvedor Frontend / Usuário',
      fix: t('err.401.fix', 'Faça login novamente para obter um novo token, e garanta que está no formato correto.'),
      example: '`Authorization: abcd` <- Faltou a palavra Bearer.'
    },
    '403': {
      desc: t('err.403.desc', 'Acesso recusado a um recurso específico, mesmo estando autenticado.'),
      cause: t('err.403.cause', 'O {{Token}} é real, mas o usuário tem perfil "leitor" e tentou "deletar".'),
      who: 'Suporte / Administrador de Acessos',
      fix: t('err.403.fix', 'Verifique se a role do usuário no banco de dados permite acessar este {{Endpoint}}.'),
      example: '`DELETE /users/admin` com token de estudante.'
    },
    '404': {
      desc: t('err.404.desc', 'O recurso solicitado não pôde ser encontrado.'),
      cause: t('err.404.cause', 'O {{Path}} foi digitado errado, ou o ID (ex: usuário 999) foi deletado.'),
      who: 'Desenvolvedor Frontend',
      fix: t('err.404.fix', 'Confira a aba "Network". Se o {{Endpoint}} estiver certo, o dado realmente não existe no banco.'),
      example: '`GET /api/v1/usrs` <- Erro de digitação.'
    },
    '405': {
      desc: t('err.405.desc', 'O método utilizado é conhecido pelo servidor mas não é suportado pelo recurso.'),
      cause: t('err.405.cause', 'A documentação pede POST, mas o código disparou um GET.'),
      who: 'Desenvolvedor Frontend',
      fix: t('err.405.fix', 'Troque o {{Método HTTP}} na chamada da função fetch() ou Axios.'),
      example: '`GET /login` ao invés de `POST /login`.'
    },
    '409': {
      desc: t('err.409.desc', 'A requisição conflita com o estado atual do servidor.'),
      cause: t('err.409.cause', 'Tentar cadastrar um email que já existe no banco de dados.'),
      who: 'Desenvolvedor Frontend / Usuário',
      fix: t('err.409.fix', 'Trate a {{Response}} e mostre um aviso gentil: "Este email já está em uso".'),
      example: '`POST /users` com email já cadastrado.'
    },
    '415': {
      desc: t('err.415.desc', 'O formato do payload é um formato não suportado.'),
      cause: t('err.415.cause', 'Você enviou um {{JSON}}, mas não avisou o servidor através dos {{Headers}}.'),
      who: 'Desenvolvedor Frontend',
      fix: t('err.415.fix', 'Adicione `Content-Type: application/json` no cabeçalho da sua {{Request}}.'),
      example: 'Esquecer o header Content-Type.'
    },
    '422': {
      desc: t('err.422.desc', 'Sintaxe correta, mas com erro semântico na regra de negócio.'),
      cause: t('err.422.cause', 'O {{JSON}} está perfeito, mas você tentou transferir $500 tendo $0 de saldo.'),
      who: 'Desenvolvedor Frontend',
      fix: t('err.422.fix', 'Leia o campo `message` retornado no {{Body}} da {{Response}} para saber qual regra você quebrou.'),
      example: '`{ "age": -5 }` <- Idade não pode ser negativa.'
    },
    '500': {
      desc: t('err.500.desc', 'O servidor encontrou uma condição inesperada que o impediu de atender à requisição.'),
      cause: t('err.500.cause', 'Banco de dados caiu, NullPointerException no backend, ou disco lotado.'),
      who: 'Desenvolvedor Backend / DevOps',
      fix: t('err.500.fix', 'Copie o {{Correlation ID}} retornado e faça uma busca nos {{Logs}} do servidor (ex: Datadog/Kibana).'),
      example: 'Uma variável que deveria ter texto chegou `null` e o servidor quebrou ao tentar ler.'
    }
  };

  const active = content[activeCode];

  return (
    <div className="my-8 bg-surface border border-borderSubtle rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
      <div className="w-full md:w-64 bg-slate-100 dark:bg-slate-900 border-r border-borderSubtle p-4 h-64 md:h-auto overflow-y-auto">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-2">Catálogo de Erros</h4>
        <div className="flex flex-col gap-1">
          {errors.map(err => (
            <button
              key={err.code}
              onClick={() => setActiveCode(err.code)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm transition-all ${
                activeCode === err.code
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <span className={`font-mono font-black ${
                err.code.startsWith('4') ? 'text-orange-500' : 'text-red-500'
              }`}>{err.code}</span>
              <span className="truncate">{err.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 p-6 md:p-8">
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-3 ${
            activeCode.startsWith('4') ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {errors.find(e => e.code === activeCode)?.type}
          </span>
          <h3 className="text-3xl font-black text-textMain mb-4 flex items-center gap-3">
            <span className={activeCode.startsWith('4') ? 'text-orange-500' : 'text-red-500'}>{activeCode}</span>
            {errors.find(e => e.code === activeCode)?.label}
          </h3>
          <p className="text-lg text-textMain/80 leading-relaxed mb-6">
            <ConceptText text={active.desc} glossaryJson={glossaryJson} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-borderSubtle">
            <span className="block text-xs font-bold uppercase text-textMuted mb-2">Causa Provável</span>
            <p className="text-sm text-textMain/90"><ConceptText text={active.cause} glossaryJson={glossaryJson} /></p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-borderSubtle">
            <span className="block text-xs font-bold uppercase text-textMuted mb-2">Quem Investiga?</span>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{active.who}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-lg p-4 border border-emerald-200 dark:border-emerald-900/30 md:col-span-2">
            <span className="block text-xs font-bold uppercase text-emerald-700 dark:text-emerald-500 mb-2">Como Corrigir</span>
            <p className="text-sm text-emerald-900 dark:text-emerald-200"><ConceptText text={active.fix} glossaryJson={glossaryJson} /></p>
          </div>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 md:col-span-2 font-mono text-sm">
            <span className="block text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-widest">Exemplo Prático</span>
            <p className="text-slate-300">{active.example}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
