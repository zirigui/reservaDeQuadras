# Etapa de build
FROM node:21-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Copia a aplicação construída para a pasta do nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia nossa configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
