# Fintra (Frontend)

Aplicação web em **Next.js 16** para controle financeiro pessoal.

## Setup rápido (iniciante)

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

## O que simplificar no código (prioridade)

1. **Padronizar porta de desenvolvimento em todo o projeto**
   - Hoje existe fallback para `3000` em auth, mas `dev` usa `3001`.

2. **Adicionar `.env.example`**
   - Reduz erros no primeiro setup.

3. **Diminuir lógica de página em rotas grandes**
   - Extrair parse de `searchParams` e regras de data para utilitários por feature.

4. **Padronizar estilo de código**
   - Unificar aspas, ponto e vírgula e ordenação de imports com formatador único.

5. **Adicionar testes leves de utilitários críticos**
   - Principalmente em `lib/utils` e funções de transformação de parâmetros.
