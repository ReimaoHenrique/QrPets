FROM node:22-alpine

WORKDIR /app

# Ativa o corepack para gerenciar o pnpm automaticamente
RUN corepack enable pnpm

# Copia os arquivos de mapeamento de pacotes
COPY package*.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# CORREÇÃO DO ERRO DO PNPM V11: Permite o build das dependências nativas (Tailwind/Sharp)
RUN pnpm install --only-built-dependencies

# Copia o resto do código do projeto
COPY . .

# Desabilita telemetria do Next.js para acelerar o build
ENV NEXT_TELEMETRY_DISABLED=1

# Compila o projeto Next.js
RUN pnpm run build

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Inicia o servidor Next.js em produção
CMD ["pnpm", "start"]