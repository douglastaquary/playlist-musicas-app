# 🎵 Playlist de Músicas - Webapp Mobile Responsivo

Webapp moderno e responsivo para gerenciamento de playlist de músicas, desenvolvido com clean code e arquitetura moderna.

## 🚀 Características

- **Interface Responsiva**: Design otimizado para mobile e desktop
- **Acessibilidade**: Fonte grande e layout intuitivo para todas as idades
- **Permissões**: 
  - Usuários podem apenas **adicionar** músicas
  - Administradores podem **adicionar, editar, excluir e reordenar** músicas
- **Arquitetura Moderna**: 
  - Backend: Node.js + Express + TypeScript + SQLite
  - Frontend: React + TypeScript + Tailwind CSS + Vite
  - Clean Code: Separação de responsabilidades, repositórios, controllers

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório (ou descompacte o projeto)

2. Instale as dependências:
```bash
npm run install:all
```

3. Configure o backend:
```bash
cd backend
cp .env.example .env
```

Edite o arquivo `.env` se necessário:
- `PORT`: Porta do servidor backend (padrão: 3001)
- `JWT_SECRET`: Secret para tokens JWT (mude em produção)
- `ADMIN_PASSWORD`: Senha do admin (padrão: admin123)
- `DATABASE_PATH`: Caminho do banco SQLite

4. Inicie o projeto:
```bash
npm run dev
```

Isso iniciará:
- Backend na porta 3001
- Frontend na porta 3000

## 📱 Uso

### Usuário Comum

1. Acesse `http://localhost:3000`
2. Adicione músicas preenchendo o formulário
3. Visualize a lista de músicas

### Administrador

1. Acesse `http://localhost:3000/admin/login`
2. Faça login com:
   - Usuário: `admin`
   - Senha: `admin123` (ou a senha configurada no `.env`)
3. No painel administrativo você pode:
   - Adicionar músicas
   - Editar músicas (clique no ícone de lápis)
   - Excluir músicas (clique no ícone de lixeira)
   - Reordenar músicas (setas para cima/baixo)

## 🏗️ Estrutura do Projeto

```
.
├── backend/
│   ├── src/
│   │   ├── config/          # Configuração do banco de dados
│   │   ├── controllers/     # Controllers (lógica de negócio)
│   │   ├── middleware/      # Middlewares (autenticação)
│   │   ├── models/          # Modelos/Interfaces
│   │   ├── repositories/    # Repositórios (acesso a dados)
│   │   ├── routes/          # Rotas da API
│   │   └── index.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── contexts/        # Context API (Auth)
│   │   ├── pages/           # Páginas
│   │   ├── services/        # Serviços API
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── package.json             # Scripts principais
```

## 🎨 Tecnologias

### Backend
- **Express**: Framework web
- **TypeScript**: Tipagem estática
- **SQLite**: Banco de dados
- **JWT**: Autenticação
- **bcryptjs**: Hash de senhas

### Frontend
- **React**: Biblioteca UI
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **Vite**: Build tool
- **React Router**: Navegação
- **Axios**: Cliente HTTP

## 🔒 Segurança

- Senhas são hasheadas com bcrypt
- Tokens JWT para autenticação
- Validação de permissões no backend
- CORS configurado

## 📝 Notas

- O banco de dados SQLite é criado automaticamente na primeira execução
- O usuário admin é criado automaticamente se não existir
- As músicas são ordenadas por posição (campo `position`)

## 🐛 Troubleshooting

Se o backend não iniciar:
- Verifique se a porta 3001 está disponível
- Verifique se o arquivo `.env` existe

Se o frontend não conseguir conectar ao backend:
- Verifique se o backend está rodando
- Verifique a variável `VITE_API_URL` no frontend (ou use o proxy do Vite)

## 📄 Licença

MIT

