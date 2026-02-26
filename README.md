# Fintra (Frontend)

Aplicação web em **Next.js 16** para controle financeiro pessoal.

## Setup rápido

1. Instale **Node.js 22+**.
2. Ative pnpm: `corepack enable`.
3. Instale dependências: `pnpm install`.
4. Crie `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

5. Rode o projeto: `pnpm dev`.
6. Abra `http://localhost:3001`.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm check-types
pnpm build
pnpm start
```

## Estrutura (resumo)

```text
app/
  (public)/        # landing, login, cadastro
  (protected)/     # áreas autenticadas
  components/      # componentes de UI e domínio
lib/
  http/            # cliente HTTP e APIs
  utils/           # utilitários
types/             # tipos compartilhados
```
