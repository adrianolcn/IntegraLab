# Troubleshooting

## Frontend dev server no Windows (`spawn EPERM` / Tailwind oxide)

Em algumas máquinas Windows, o `vite` pode falhar ao carregar `@tailwindcss/vite` durante o `npm run dev`, com mensagens envolvendo `@tailwindcss/oxide` e `spawn EPERM`.

O script de desenvolvimento do projeto já usa `vite --configLoader native`, que evita o caminho problemático de externalização da config no Vite.

Se o erro ainda aparecer, siga esta ordem:

1. Encerre processos antigos do `node` ou `vite`.
   ```powershell
   Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -match 'vite' } | Select-Object ProcessId, CommandLine
   Stop-Process -Id <PID> -Force
   ```
2. Remova `node_modules`.
   ```powershell
   Remove-Item -LiteralPath node_modules -Recurse -Force
   ```
3. Se existir cache local antigo do Vite, remova também `.vite-cache`.
   ```powershell
   Remove-Item -LiteralPath .vite-cache -Recurse -Force
   ```
4. Remova `package-lock.json` apenas se o problema persistir após reinstalar dependências.
5. Reinstale tudo com `npm ci`.
   ```powershell
   npm ci
   ```
6. Se necessário, reconstrua dependências nativas.
   ```powershell
   npm rebuild
   ```
7. Suba o frontend novamente.
   ```powershell
   npm run dev
   ```

Se o build funcionar e apenas o dev falhar, a causa mais provável é ambiente local ou processo travado, não configuração da stack.
