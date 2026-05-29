FROM node:22-alpine

WORKDIR /app

# Ativa o corepack para o Node identificar o pnpm automaticamente
RUN corepack enable pnpm

# Copia os arquivos de configuração de dependências
COPY package*.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# Instala todas as dependências do projeto
RUN pnpm install

# Copia o restante do código da sua aplicação
COPY . .

# Desabilita a telemetria do Next.js durante o build (deixa mais rápido)
ENV NEXT_TELEMETRY_DISABLED=1

# Executa o build do Next.js
RUN pnpm run build

# O Cloud Run vai escutar a porta 3000 que configuramos no Terraform
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar o servidor Next.js em produção
CMD ["pnpm", "start"]