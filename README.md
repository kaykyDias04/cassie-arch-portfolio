# Cássia Arch Portfolio

Portfólio de arquitetura contemporâneo de **Cássia Victória**, construído com **Next.js 16 (App Router)**, **TypeScript**, **TailwindCSS 4** e integrado ao **Sanity.io** como Headless CMS.

---

## 🏗️ Arquitetura e Tecnologias

- **Framework:** Next.js 16.2.9 (App Router, Turbopack, ISR com On-Demand Revalidation)
- **CMS:** [Sanity.io](https://sanity.io) v3/v6 integrado via `next-sanity` em `/admin`
- **Linguagem:** TypeScript 5
- **Estilização:** TailwindCSS 4
- **Rich Text:** Portable Text nativo com renderizadores customizados (`@portabletext/react`)
- **Pipeline de Imagens:** Sanity CDN com corte focal (Hotspot/Crop) e entrega automática em WebP/AVIF
- **Ícones:** Lucide React

---

## ✨ Destaques da Solução com CMS

1. **Sanity Studio Embutido (`/admin`):**
   - O painel administrativo completo roda dentro do próprio Next.js no caminho `/admin`.
   - Autenticação segura gerenciada pelo Sanity (Google, GitHub ou e-mail/senha), sem necessidade de banco de dados para login.
   - Suporte nativo ao português brasileiro (`@sanity/locale-pt-br`).

2. **Asset Pipeline & Hotspot:**
   - Uploads de imagens em alta resolução vão direto para o CDN global do Sanity, sem limite de payload de servidor.
   - Recorte com ponto focal (hotspot) garantindo enquadramento perfeito em qualquer dispositivo.

3. **Slugs Imutáveis e SEO:**
   - Slugs gerados automaticamente a partir do título com validação de unicidade, prevenindo URLs quebradas e erros 404.

4. **Cache Ultra-Rápido & Atualização Instantânea (ISR):**
   - As páginas públicas são servidas estaticamente em milissegundos.
   - Webhook `/api/revalidate` revalida sob demanda o cache via `revalidateTag` assim que um documento é publicado no Studio.

---

## 🚀 Como Executar Localmente

### 1. Clonar o Repositório e Instalar Dependências

```bash
git clone https://github.com/kaykyDias04/cassie-arch-portfolio.git
cd cassie-arch-portfolio
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Preencha as variáveis com as credenciais do seu projeto Sanity:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="seu_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-10-15"
SANITY_REVALIDATE_SECRET="sua_chave_secreta_revalidacao"
SANITY_API_WRITE_TOKEN="seu_token_editor_sanity"
```

### 3. Migrar Dados Iniciais (Opcional)

Se tiver dados em `data/projects.json` e `data/about.json`, execute o script de migração para populá-los no Sanity:

```bash
npm run migrate:sanity
```

### 4. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

- Site público: [http://localhost:3000](http://localhost:3000)
- Sanity Studio (Admin): [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento Next.js com Turbopack |
| `npm run build` | Compila o aplicativo para produção e valida tipagens |
| `npm run start` | Inicia o servidor Next.js compilado |
| `npm run lint` | Executa o linter ESLint |
| `npm run migrate:sanity` | Importa os dados de `data/*.json` para o Sanity |

---

## 🌐 Deploy em Produção

Consulte o guia detalhado em [cms_deploy.md](./cms_deploy.md) para o passo a passo completo de implantação na Vercel e configuração do Sanity.io.
