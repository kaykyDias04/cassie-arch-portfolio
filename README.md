# Cássia Arch Portfolio

## Descrição do Projeto

Este é um portfólio de arquitetura moderno e dinâmico, construído com Next.js, React e TypeScript. Ele permite a exibição de projetos de arquitetura, urbanismo e interiores, além de uma seção 'Sobre' personalizável. O projeto inclui um painel administrativo robusto para gerenciamento de conteúdo, onde é possível criar, editar e excluir projetos, bem como atualizar as informações da página 'Sobre'. O armazenamento de dados é feito através de um banco de dados PostgreSQL, gerenciado pelo Prisma ORM, e a infraestrutura de desenvolvimento pode ser facilmente orquestrada com Docker.

## Tecnologias Utilizadas

- **Framework:** Next.js 16.2.9 (App Router)

- **Linguagem:** TypeScript 5

- **Interface:** React 19.2.4

- **Estilização:** TailwindCSS 4

- **ORM:** Prisma 7.8.0

- **Banco de Dados:** PostgreSQL 15 (via Docker)

- **Editor de Texto Rico:** TipTap

- **Autenticação:** Baseada em cookies (para o painel administrativo)

- **Outros:** `lucide-react`, `dotenv`

## Funcionalidades

### Área Pública

- **Listagem de Projetos:** Exibe projetos categorizados (Arquitetura, Urbanismo, Interiores) com filtros.

- **Páginas de Detalhe de Projeto:** Cada projeto possui uma página dedicada com informações detalhadas, imagem de capa e conteúdo rico.

- **Página 'Sobre':** Seção personalizável com foto e múltiplos parágrafos de texto.

- **Página de Contato:** Informações de contato da empresa.

### Painel Administrativo

- **Autenticação:** Login seguro com credenciais de administrador.

- **Gerenciamento de Projetos:** CRUD (Criar, Ler, Atualizar, Excluir) completo para projetos, incluindo upload de imagem de capa (armazenada em Base64).

- **Edição da Página 'Sobre':** Atualização da foto e do conteúdo textual da seção 'Sobre'.

- **Editor de Texto Rico:** Utilização do TipTap para formatar o conteúdo dos projetos e da página 'Sobre'.

## Configuração e Instalação

Para configurar e rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (versão 18 ou superior)

- npm, yarn ou pnpm

- Docker e Docker Compose

- Git

### 1. Clonar o Repositório

```bash
git clone https://github.com/kaykyDias04/cassie-arch-portfolio.git
cd cassie-arch-portfolio
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="postgresql://admin:password123@localhost:5432/cassie_portfolio?schema=public"
```

Esta URL de banco de dados corresponde à configuração padrão do `docker-compose.yml`.

### 3. Iniciar o Banco de Dados PostgreSQL com Docker

```bash
docker-compose up -d
```

Este comando iniciará um contêiner PostgreSQL e criará um volume para persistência dos dados.

### 4. Instalar Dependências

```bash
pnpm install
# ou npm install
# ou yarn install
```

### 5. Gerar o Cliente Prisma e Rodar Migrações

```bash
pnpm prisma generate
pnpm prisma db push
```

O comando `db push` aplicará o schema do Prisma ao seu banco de dados PostgreSQL.

### 6. Popular o Banco de Dados (Opcional )

Para popular o banco de dados com dados iniciais de exemplo (projetos e informações 'Sobre'), execute o script de migração:

```bash
pnpm ts-node migrate-data.ts
```

Este script lerá os arquivos `data/about.json` e `data/projects.json` e os inserirá no banco de dados, caso ainda não existam.

## Uso

### Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
# ou npm run dev
# ou yarn dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

### Acessar o Painel Administrativo

Navegue para [http://localhost:3000/admin](http://localhost:3000/admin).

**Credenciais Padrão:**

- **Usuário:** `admin`

- **Senha:** `password123`

**Atenção:** Estas credenciais são hardcoded em `src/lib/actions.ts` e devem ser alteradas em um ambiente de produção para garantir a segurança.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

- `pnpm dev`: Inicia o aplicativo em modo de desenvolvimento.

- `pnpm build`: Constrói o aplicativo para produção.

- `pnpm start`: Inicia o servidor de produção.

- `pnpm lint`: Executa o linter para identificar problemas de código.

- `pnpm prisma generate`: Gera o cliente Prisma.

- `pnpm prisma db push`: Sincroniza o schema do Prisma com o banco de dados.

- `pnpm ts-node migrate-data.ts`: Popula o banco de dados com dados iniciais.

## Deploy

Este projeto Next.js pode ser facilmente implantado na [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), dos criadores do Next.js. Para mais detalhes, consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying).
