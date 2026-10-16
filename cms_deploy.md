# Guia de Deploy: Migração para Sanity.io CMS

**Projeto:** Portfólio Cássia Victória  
**Documento:** `cms_deploy.md`  
**Objetivo:** Explicar exatamente o que muda em relação ao deploy anterior e fornecer o passo a passo completo para colocar o site e o CMS em produção com 100% de funcionamento.

---

## 1. O Que Muda em Relação ao Deploy Atual (Antes vs Depois)

No deploy anterior com PostgreSQL/Supabase e painel próprio, a infraestrutura exigia manter conexões com banco relacional, rotinas para evitar inatividade do banco gratuito e autenticação manual. Com o Sanity.io, toda essa sobrecarga foi eliminada.

| Elemento de Infraestrutura | Deploy Anterior (Legado) | Novo Deploy com Sanity.io | O Que Fazer |
| :--- | :--- | :--- | :--- |
| **Banco de Dados** | Supabase PostgreSQL (`DATABASE_URL`) | Nuvem do Sanity.io (Content Lake global) | **Remover** o banco da esteira de deploy |
| **Keep-Alive do Banco** | Workflow GitHub Actions + Cron na Vercel | Desnecessário (Sanity não dorme) | **Removido** (`vercel.json` e workflow excluídos) |
| **Build Command na Vercel** | `prisma generate && next build` | `next build` (padrão) | **Atualizado** automaticamente no `package.json` |
| **Painel Administrativo** | Código manual em Next.js (`/admin/*`) | Sanity Studio embutido em `/admin` | Nenhuma infraestrutura extra necessária |
| **Autenticação Admin** | JWT próprio assinado com cookies | Autenticação oficial Sanity (Google, e-mail) | **Remover** variáveis `ADMIN_USER`, `ADMIN_PASS`, `JWT_SECRET` |
| **Upload de Fotos** | Base64 gravado no Postgres (limite 4.5MB) | Sanity Asset Pipeline (Fastly CDN global) | Sem limite de servidor, suporte a fotos pesadas |
| **Atualização do Conteúdo** | `force-dynamic` (recarregava banco a cada visita) | Static / ISR + On-Demand Webhook | Site carrega em milissegundos com revalidação instantânea |

---

## 2. Passo a Passo para o Deploy 100%

Siga as etapas abaixo para configurar o Sanity e publicar o projeto na Vercel.

---

### Passo 1: Criar o Projeto no Sanity.io

1. Acesse [sanity.io](https://sanity.io) e crie uma conta (gratuita).
2. Crie um novo projeto no painel [sanity.io/manage](https://sanity.io/manage):
   - **Project Name:** `cassie-arch-portfolio`
   - **Dataset:** `production` (visibilidade: Public)
3. Guarde o **Project ID** gerado (uma sequência alfanumérica de cerca de 8 a 10 caracteres, ex: `a1b2c3d4`).

---

### Passo 2: Configurar as Origens Permitidas (CORS) no Sanity

Como o Sanity Studio roda na rota `/admin` do seu próprio domínio Next.js, você precisa autorizar os domínios no Sanity:

1. Acesse [sanity.io/manage](https://sanity.io/manage) e clique no seu projeto.
2. Vá na aba **API** > seção **CORS Origins**.
3. Clique em **Add CORS origin** e adicione as duas origens abaixo:
   - Para testes locais:
     - **Origin:** `http://localhost:3000`
     - Marque: **Allow credentials**
   - Para o site em produção:
     - **Origin:** `https://cassie-arch-portfolio.vercel.app` *(ou seu domínio personalizado)*
     - Marque: **Allow credentials**

> 💡 **Dica:** Você também pode rodar no terminal:
> ```bash
> npx sanity cors add http://localhost:3000 --credentials
> npx sanity cors add https://seu-dominio.vercel.app --credentials
> ```

---

### Passo 3: Limpar e Atualizar Variáveis de Ambiente na Vercel

No painel da Vercel (**Project Settings > Environment Variables**):

#### ❌ Variáveis a REMOVER (não são mais usadas):
- `DATABASE_URL`
- `ADMIN_USER`
- `ADMIN_PASS`
- `JWT_SECRET`
- `CRON_SECRET`

#### ✅ Variáveis a ADICIONAR:

| Variável | Valor | Onde Obter |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `seu_project_id` | Painel do Sanity (`sanity.io/manage`) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Dataset padrão criado no Sanity |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-10-15` | Data de versão da API |
| `SANITY_REVALIDATE_SECRET` | *(string aleatória e segura)* | Você inventa uma chave secreta (ex: execute `openssl rand -hex 32`) |

*(Certifique-se de marcar os ambientes **Production**, **Preview** e **Development** para todas elas).*

---

### Passo 4: Configurar o Webhook de Revalidação Instantânea (On-Demand ISR)

Este webhook faz com que, assim que a arquiteta clicar em **Publish** no Sanity Studio, a página correspondente no site da Vercel seja atualizada em menos de 1 segundo:

1. No [sanity.io/manage](https://sanity.io/manage), acesse seu projeto.
2. Vá em **API** > **Webhooks** > clique em **Create Webhook**.
3. Preencha os campos exatamente assim:
   - **Name:** `Vercel Revalidate Hook`
   - **URL:** `https://cassie-arch-portfolio.vercel.app/api/revalidate` *(substitua pela sua URL final da Vercel)*
   - **Dataset:** `production`
   - **Trigger on:** Marque as opções **Create**, **Update** e **Delete**
   - **Filter:** `_type in ["project", "about"]`
   - **Projection:** `{ _type }`
   - **Secret:** Cole **exatamente o mesmo valor** que você definiu para a variável `SANITY_REVALIDATE_SECRET` na Vercel
   - **HTTP method:** `POST`
   - **API version:** `v2021-03-25` (ou mais recente)
4. Clique em **Save**.

---

### Passo 5: Migrar os Dados Iniciais (Projetos e Perfil)

Para que o site não entre no ar vazio, você pode importar os projetos de exemplo (`data/projects.json`) e a biografia (`data/about.json`) com um único comando:

1. No [sanity.io/manage](https://sanity.io/manage) > **API** > **Tokens**, clique em **Add API token**.
2. Defina:
   - **Name:** `Migration Token`
   - **Permissions:** **Editor** (permissão de escrita)
3. Copie o token gerado.
4. No terminal da sua máquina, preencha o `.env` local ou passe via terminal:
   ```bash
   $env:SANITY_API_WRITE_TOKEN="seu_token_copiado"
   $env:NEXT_PUBLIC_SANITY_PROJECT_ID="seu_project_id"
   npm run migrate:sanity
   ```
5. O script fará automaticamente o download das imagens, upload para o CDN do Sanity, conversão de HTML para blocos nativos de texto e criação de todos os documentos.

---

### Passo 6: Dar Acesso à Arquiteta (Cássia)

1. No [sanity.io/manage](https://sanity.io/manage), vá na aba **Members**.
2. Clique em **Invite member**.
3. Insira o e-mail da arquiteta (ex.: `cassia@...`).
4. Selecione a função:
   - **Editor:** Recomendado. Permite criar, editar, cortar fotos e publicar projetos e alterar o perfil, sem risco de alterar configurações de API.
5. A arquiteta receberá um convite por e-mail. Para acessar o painel:
   - Basta navegar para `https://seu-dominio.vercel.app/admin`
   - Clicar em "Continuar com Google" ou fazer login com o e-mail cadastrado.

---

## 3. Checklist de Validação 100%

Antes de finalizar a entrega, valide os seguintes pontos:

- [ ] **Build da Vercel verde:** O comando `next build` conclui com sucesso gerando as rotas estáticas (`/`, `/projetos`, `/sobre`, etc.) e a rota dinâmica `/api/revalidate`.
- [ ] **Studio acessível:** Ao abrir `https://seu-site.vercel.app/admin`, a tela de login do Sanity Studio é exibida em português.
- [ ] **Edição de Projetos:** É possível criar um projeto, anexar imagens com recorte focal (Hotspot) e publicar.
- [ ] **Edição do Sobre:** O documento singleton "Sobre Mim" permite alterar foto, parágrafos e tags de foco de atuação.
- [ ] **Webhook disparando:** Ao clicar em "Publish" no Studio, a aba "History" do Webhook no Sanity mostra status `200 OK`, e o site atualiza imediatamente sem necessidade de redeploy.
- [ ] **Slugs preservados:** As URLs dos projetos seguem o formato `/projetos/[slug]` sem quebras ao reordenar projetos.

Pronto! O portfólio agora opera sobre uma arquitetura moderna, escalável, com performance máxima no Lighthouse e sem custos de banco de dados.
