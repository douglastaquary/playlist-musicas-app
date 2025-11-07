FROM node:20-slim AS builder

WORKDIR /backend

# Copia e instala dependências do backend
COPY ./package.json ./package-lock.json ./tsconfig.json ./
RUN npm install

# Copia código fonte do backend
COPY ./src ./src
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

 FROM node:20-slim

 WORKDIR /frontend

COPY ./package.json ./package-lock.json ./tsconfig.json ./
RUN npm install --omit=dev

COPY --from=builder ./dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]

