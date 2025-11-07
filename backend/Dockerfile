FROM node:20-slim AS builder

WORKDIR /

# Copia e instala dependências do backend
COPY backend/package.json backend/package-lock.json backend/tsconfig.json ./
RUN npm install

# Copia código fonte do backend
#COPY backend/src ./src
RUN npm run build

FROM node:20-slim

WORKDIR /

ENV NODE_ENV=production
ENV PORT=3001

COPY backend/package.json backend/package-lock.json ./
RUN npm install --omit=dev

COPY --from=builder /frontend/dist ./dist

EXPOSE 3001

CMD ["node", "dist/index.js"]

