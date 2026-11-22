# Cássia Arch Portfolio

Portfólio de arquitetura contemporâneo de **Cássia Victória**, construído com **Next.js 16 (App Router + Static Export)**, **TypeScript**, **TailwindCSS 4**, integrado ao **Sanity.io** como única dependência externa de CMS/mídia e hospedado integralmente no **GitHub** (GitHub Pages + GitHub Actions).

---

## 🏗️ Arquitetura e Tecnologias

- **Hospedagem e CI/CD:** GitHub Pages + GitHub Actions (sem Vercel ou servidores externos)
- **Framework:** Next.js 16.2.9 (App Router, `output: 'export'` estático)
- **CMS:** [Sanity.io](https://sanity.io) v6 integrado via `next-sanity` em `/admin`
- **Linguagem:** TypeScript 5
- **Estilização:** TailwindCSS 4
- **Rich Text:** Portable Text nativo com renderizadores customizados (`@portabletext/react`) e ampliação de pranchas em lightbox
- **Pipeline de Imagens:** Sanity CDN com corte focal (Hotspot/Crop) e entrega automática em WebP/AVIF
- **Ícones:** Lucide React

---

## ✨ Destaques da Solução

1. **Tudo no GitHub + Sanity como único serviço externo:**
   - O frontend público (`/`, `/projetos`, `/projetos/[slug]`, `/sobre`, `/contato`) e o **Sanity Studio embutido (`/admin`)** são compilados e servidos diretamente pelo **GitHub Pages**.
   - A atualização de conteúdo após alterações no Sanity dispara rebuild automático no **GitHub Actions** via `repository_dispatch` (`sanity-update`), além de suporte a fallback dinâmico client-side para sub-rotas do Studio e novos projetos recém-publicados.

2. **Sanity Studio Embutido (`/admin`):**
   - Autenticação segura gerenciada pelo Sanity (Google, GitHub ou e-mail/senha), sem banco de dados próprio.
   - Suporte nativo ao português brasileiro (`@sanity/locale-pt-br`).

3. **Asset Pipeline & Hotspot:**
   - Uploads de imagens em alta resolução vão direto para o CDN global do Sanity.
   - Recorte com ponto focal (hotspot) + visualização ampliada em Lightbox para pranchas arquitetônicas.

---

## 🚀 Como Executar Localmente

### 1. Clonar o Repositório e Instalar Dependências

```bash
git clone https://github.com/kaykyDias04/cassie-arch-portfolio.git
cd cassie-arch-portfolio
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

Preencha com o Project ID e dataset do Sanity:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="rg6ec0kz"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-10-15"
NEXT_PUBLIC_BASE_PATH=""
```

### 3. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

- Site público: [http://localhost:3000](http://localhost:3000)
- Sanity Studio (Admin): [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento Next.js |
| `npm run build` | Gera a exportação estática em `out/` (páginas públicas + Studio `/admin`) |
| `npm run lint` | Executa o linter ESLint |
| `npm run migrate:sanity` | Importa os dados de `data/*.json` para o Sanity (requer `SANITY_API_WRITE_TOKEN`) |

---

## 🌐 CI/CD e Deploy no GitHub Pages

- **CI (`.github/workflows/ci.yml`):** Em Pull Requests e branches secundárias, valida TypeScript (`tsc --noEmit`), ESLint (`npm run lint`) e build estático (`npm run build`).
- **CD (`.github/workflows/deploy.yml`):** A cada push na `main`, disparo manual (`workflow_dispatch`) ou webhook do Sanity (`repository_dispatch: sanity-update`), valida o código, gera o build em `out/` e publica no GitHub Pages.

Consulte o guia completo em [cms_deploy.md](./cms_deploy.md) para configurar CORS e o Webhook do Sanity apontando para o GitHub Actions.
