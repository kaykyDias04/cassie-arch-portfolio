# Guia de Deploy: GitHub Pages + GitHub Actions + Sanity.io

**Projeto:** Portfólio Cássia Victória  
**Documento:** `cms_deploy.md`  
**Arquitetura:** GitHub (Frontend estático + Sanity Studio embutido em `/admin` + CI/CD via GitHub Actions) + Sanity.io como único serviço externo.

---

## 1. Visão Geral da Arquitetura no GitHub

| Camada | Como Roda | Onde Fica |
| :--- | :--- | :--- |
| **Frontend Público** | Next.js Static Export (`output: 'export'`) | GitHub Pages (`https://kaykydias04.github.io/cassie-arch-portfolio/`) |
| **Painel Admin (`/admin`)** | Sanity Studio embutido + fallback SPA em `404.html` | GitHub Pages (`https://kaykydias04.github.io/cassie-arch-portfolio/admin/`) |
| **CI/CD e Atualização de Conteúdo** | GitHub Actions (`ci.yml` e `deploy.yml`) | GitHub Actions (`push`, `workflow_dispatch` e `repository_dispatch`) |
| **CMS, Auth e Mídia (Único Externo)** | Content Lake, Autenticação e Asset CDN | Sanity.io (`rg6ec0kz` / dataset `production`) |

---

## 2. Variáveis de Ambiente

### Local (`.env`)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="rg6ec0kz"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-10-15"
NEXT_PUBLIC_BASE_PATH=""
```

### GitHub Repository Variables (`Settings > Secrets and variables > Actions > Variables`)

| Variável | Valor |
| :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `rg6ec0kz` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-10-15` |

> `NEXT_PUBLIC_BASE_PATH` é injetado automaticamente pelo passo `actions/configure-pages@v5` no workflow `deploy.yml` (`/cassie-arch-portfolio` na URL padrão do GitHub Pages, ou vazio se você configurar um domínio personalizado).

---

## 3. Configuração Obrigatória no Painel do Sanity (`sanity.io/manage`)

Para que o painel `/admin` funcione hospedado no GitHub Pages e publique atualizações automaticamente:

### Passo 1: Autorizar Origem CORS do GitHub Pages

1. Acesse [sanity.io/manage](https://sanity.io/manage) e abra o projeto **`rg6ec0kz`**.
2. Vá em **API > CORS origins > Add CORS origin**.
3. Adicione:
   - **Origin:** `https://kaykydias04.github.io`
   - Marque: **Allow credentials** ✅
4. Para testes locais, mantenha também `http://localhost:3000` com **Allow credentials** marcado.

*(Nota: Como origem CORS considera apenas protocolo + domínio, não inclua `/cassie-arch-portfolio` no campo Origin).*

### Passo 2: Configurar Webhook do Sanity -> GitHub Actions (`repository_dispatch`)

Sempre que a arquiteta clicar em **Publish** (ou editar/excluir um projeto ou *Sobre Mim*), o Sanity disparará um rebuild automático do GitHub Pages:

1. No GitHub, gere um **Personal Access Token (Fine-grained PAT)** em **Settings > Developer settings > Personal access tokens > Fine-grained tokens** com:
   - **Repository access:** Apenas `kaykyDias04/cassie-arch-portfolio`
   - **Permissions:** **Contents: Read and write** (necessário para `repository_dispatch`)
2. No [sanity.io/manage](https://sanity.io/manage), acesse o projeto `rg6ec0kz` > **API > Webhooks > Create Webhook**:
   - **Name:** `GitHub Pages Rebuild`
   - **URL:** `https://api.github.com/repos/kaykyDias04/cassie-arch-portfolio/dispatches`
   - **Dataset:** `production`
   - **Trigger on:** **Create**, **Update** e **Delete**
   - **Filter:** `_type in ["project", "about"]`
   - **Projection:** `{"event_type": "sanity-update", "client_payload": {"type": _type}}`
   - **HTTP method:** `POST`
   - **HTTP Headers:**
     - `Accept`: `application/vnd.github+json`
     - `Authorization`: `Bearer SEU_GITHUB_PAT`
     - `X-GitHub-Api-Version`: `2022-11-28`
3. Clique em **Save**.

> 💡 **Dica:** Você também pode disparar uma atualização manual a qualquer momento na aba **Actions > CD — Deploy GitHub Pages > Run workflow** no GitHub.

---

## 4. Checklist de Validação

- [ ] **GitHub Pages ativo** com fonte **GitHub Actions**.
- [ ] **Workflow `CD — Deploy GitHub Pages` verde** gerando `out/` e publicando em `https://kaykydias04.github.io/cassie-arch-portfolio/`.
- [ ] **CORS configurado** no Sanity para `https://kaykydias04.github.io` (`Allow credentials`).
- [ ] **Webhook configurado** apontando para `https://api.github.com/repos/kaykyDias04/cassie-arch-portfolio/dispatches`.
- [ ] **Studio `/admin` acessível** em `https://kaykydias04.github.io/cassie-arch-portfolio/admin/`.
