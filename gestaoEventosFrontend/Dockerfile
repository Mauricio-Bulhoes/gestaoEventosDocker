# ========================================
# ESTÁGIO 1: BUILD (Compilação)
# ========================================
# Usa Node.js 20 para compilar o projeto Angular
FROM node:20-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala as dependências do projeto
# --legacy-peer-deps resolve conflitos de dependências se houver
RUN npm ci --legacy-peer-deps

# Copia todo o código fonte
COPY . .

# Compila o projeto Angular para produção
# --configuration production otimiza o código (minifica, tree-shaking, etc)
RUN npm run build -- --configuration production

# ========================================
# ESTÁGIO 2: RUNTIME (Servidor Web)
# ========================================
# Usa Nginx Alpine (super leve - apenas ~5MB)
FROM nginx:1.25-alpine

RUN apk add --no-cache wget

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa configuração customizada
COPY nginx.conf /etc/nginx/conf.d/

# Copia os arquivos compilados do Angular do estágio anterior
# O Angular CLI compila para dist/gestao-eventos-frontend/browser (Angular 18+)
COPY --from=build /app/dist/gestao-eventos-frontend/browser /usr/share/nginx/html

# Expõe a porta 80 (padrão HTTP)
EXPOSE 80

# Comando para iniciar o Nginx
# daemon off mantém o Nginx em primeiro plano (necessário para Docker)
CMD ["nginx", "-g", "daemon off;"]