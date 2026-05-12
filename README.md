# HubSpot Tickets Challenge

Aplicação fullstack desenvolvida como teste técnico, com autenticação local, integração com a API da HubSpot e autenticação de dois fatores (2FA).

---

# Tecnologias Utilizadas

## Frontend
- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- Sonner
- Lucide React
- Axios

## Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Bcrypt
- Resend
- HubSpot API

---

# Funcionalidades

## Autenticação
- Login com e-mail e senha
- Persistência de usuários em banco SQL
- JWT Authentication
- Middleware de autenticação
- Autenticação de dois fatores (2FA)

## Integração HubSpot
- Busca de contato pelo e-mail autenticado
- Busca de tickets associados ao contato
- Exibição de tickets
- Criação de tickets diretamente pela aplicação

## Dashboard
- Layout moderno e responsivo
- Sidebar responsiva
- Busca de tickets
- Filtro por prioridade
- Loading states
- Toast notifications
- Scroll interno otimizado

---

# Estrutura do Projeto

```txt
hubspot-tickets/
 ├── backend/
 └── frontend/
```

---

# Backend

## Configuração

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:3333/hubspot_tickets"

JWT_SECRET="your-secret"

HUBSPOT_TOKEN="your-hubspot-token"

RESEND_API_KEY="your-resend-api-key"
```

---

## Prisma

Execute as migrations:

```bash
npx prisma migrate dev
```

Gerar client:

```bash
npx prisma generate
```

---

## Rodar backend

```bash
npm run dev
```

Backend disponível em:

```txt
http://localhost:1337
```

---

# Frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

---

## Variáveis de ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
```

---

## Rodar frontend

```bash
npm run dev
```

Frontend disponível em:

```txt
http://localhost:3000
```

---

# Fluxo da Aplicação

## Login

1. Usuário realiza login com e-mail e senha
2. Backend valida as credenciais
3. Sistema gera código 2FA
4. Código é enviado via e-mail utilizando Resend
5. Usuário informa o código
6. JWT é gerado
7. Usuário acessa o dashboard

---

# Integração com HubSpot

Após autenticação:

1. A aplicação identifica o e-mail do usuário
2. Busca o contato correspondente na HubSpot
3. Recupera os tickets associados ao contato
4. Exibe os tickets na tela “Meus Tickets”

---

# Funcionalidades Extras

- Criação de tickets via frontend
- Associação automática do ticket ao contato autenticado
- Dashboard responsivo
- Sidebar mobile com menu hamburguer
- Sistema de notificações
- Arquitetura componentizada
- Services / Repositories / Controllers
- Types centralizados

---

# Melhorias Futuras

- Refresh Token
- Paginação de tickets
- Filtros server-side
- Upload de anexos
- Edição de tickets
- Testes automatizados
- Rate limiting
- Docker

---

# Autor

Vitor Luigi
