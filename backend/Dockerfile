FROM node:20-slim AS builder

WORKDIR /backend

# Copia e instala dependências do backend

COPY ./package-lock.json ./

COPY ./package.json ./

COPY ./tsconfig.json ./

RUN npm install 
# Copia código fonte do backend
COPY ./src ./
RUN ls -la
RUN pwd
RUN npm run build

FROM node:20-slim

WORKDIR /backend

ENV NODE_ENV=production
ENV PORT=3001

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install --omit=dev

COPY --from=builder ../frontend/dist ./dist
RUN ls -la
RUN pwd

EXPOSE 3001

CMD ["node", "dist/index.js"]

