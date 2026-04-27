# Sandbox HTTP: Arquitetura e Limites

O **Sandbox HTTP** do IntegraLab foi desenvolvido para maximizar a interatividade de testes de API sem onerar o servidor ou violar regras de segurança.

## Natureza 100% Simulada e Determinística
A diretriz arquitetural mais forte desta funcionalidade é que **o Sandbox é inteiramente simulado**.
- Ele **não** realiza chamadas HTTP externas verdadeiras (como um fetch/axios faria em um ambiente real).
- Ele **não** atua como proxy. A plataforma IntegraLab não atua como ponte para a web.
- Ele **não** executa código não confiável do usuário de nenhuma forma.

### Benefícios
1. **Segurança Extrema:** Visto que a rede não é utilizada, torna-se impossível que a plataforma seja utilizada para vetores de ataque SSRF, bypass de CORS, exploração de rede interna, ou negação de serviço (DoS/DDoS) contra endpoints de terceiros.
2. **Determinismo Educacional:** Ao mockar as respostas baseadas nos tokens fornecidos pela configuração da aula (JSON no banco de dados), o sistema reage de forma determinística: se a missão exige um status `201 Created` e um header `Authorization`, o simulador avalia as chaves localmente baseando-se em Regex/Exact Matches e "cosplay" (finge) que uma API real devolveu o valor, sem a latência e incerteza de um backend real em nuvem de laboratório.

## Componentes Acoplados
- **HttpSandboxPanel.tsx**: A interface que mimetiza um software de teste de requisições, exibindo as abas de Headers, Body JSON e Auth.
- **Validação Automática**: Ao pressionar "Enviar", a resposta simulada atualiza os logs no visualizador de diagnóstico.

A decisão de mantê-lo totalmente no frontend simplifica o deploy do projeto em provedores estáticos e torna a experiência instantânea, focando exclusivamente nos preceitos pedagógicos dos contratos (Headers, Métodos, Body e Status) ao invés da infraestrutura de roteamento do servidor.
