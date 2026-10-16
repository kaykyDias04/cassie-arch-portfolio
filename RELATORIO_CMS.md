# Relatório Técnico: Simplificação da Gestão de Conteúdo (Posts e Perfil) via CMS

**Projeto:** Portfólio Cássia Victória (Arquitetura e Urbanismo)  
**Data:** 15 de Outubro de 2026  
**Documento:** `RELATORIO_CMS.md`  
**Objetivo:** Analisar a arquitetura atual de gestão de projetos (posts) e informações de perfil, identificar os gargalos técnicos e apresentar um plano detalhado para simplificar e modernizar essa lógica através da adoção de um Headless CMS.

---

## 1. Sumário Executivo

Atualmente, o projeto utiliza uma solução **customizada (hand-rolled)** para autenticação, edição e persistência de dados:
- Painel administrativo próprio desenvolvido em Next.js (`/admin/*`).
- Editor de texto rico via Tiptap (`RichTextEditor.tsx`).
- Autenticação manual via JWT assinado com `jose` armazenado em cookies.
- Banco de dados relacional (PostgreSQL via Prisma ORM).
- **Armazenamento de imagens diretamente em Base64 no banco de dados.**

Embora a solução funcione para casos de uso triviais, ela introduz **altos custos de manutenção, riscos severos de estabilidade** (estouro de limite de payload na Vercel/Next.js) e uma **lógica perigosa de re-sincronização de URLs (slugs)**.

A migração para um **Headless CMS** (com destaque para o **Sanity.io** ou **Payload CMS**) elimina a necessidade de manter telas de administração, formulários complexos, rotas de upload e infraestrutura de banco de dados para conteúdo, transferindo a gestão de ativos pesados para CDNs globais especializadas em mídia.

---

## 2. Diagnóstico da Arquitetura Atual

Abaixo detalhamos o fluxo atual do código e os pontos críticos identificados na base de código (`src/lib/actions.ts`, `src/lib/data.ts`, `src/components/RichTextEditor.tsx`, `prisma/schema.prisma`).

### 2.1. Como Funciona Hoje

```
[Administradora]
       │
       ▼ (Upload de fotos + Texto)
[Painel Customizado Next.js] (/admin/new-project, /admin/about)
       │
       ▼ (FileReader no navegador converte imagens em Base64)
[RichTextEditor (Tiptap)] & [Input File]
       │
       ▼ (Submissão via Server Action)
[actions.ts: fileToBase64()]
       │
       ▼ (Gravação de strings gigantescas em colunas @db.Text)
[PostgreSQL (Tabelas Project e AboutData)]
       │
       ▼ (Re-indexação de todos os registros existentes)
[data.ts: syncProjectSlugs()]
```

### 2.2. Gargalos Críticos e Riscos Técnicos

#### 1. Imagens em Base64 no PostgreSQL (`@db.Text`)
- **Código atual:** Em `src/lib/actions.ts` (linhas 65-69 e 85), o upload de capa e de foto de perfil converte os arquivos em `data:image/...;base64,...`. No `RichTextEditor.tsx` (linhas 102-107), cada foto inserida no meio do conteúdo também é convertida em Base64 e embutida no HTML.
- **Risco:** Uma única imagem de câmera/celular de 5MB gera ~6.7MB em Base64. A Vercel e o Next.js Server Actions possuem limite estrito de payload (em torno de **4.5MB por requisição**). Se a arquiteta anexar 2 ou 3 fotos em alta definição em um projeto, a requisição falhará silenciosamente com o erro HTTP `413 Payload Too Large`.
- **Desempenho:** O banco de dados Postgres fica inflado com megabytes de texto binário. Cada consulta `getProjects()` baixa dezenas de megabytes para a memória do servidor Next.js, degradando a performance e inviabilizando cache eficiente.

#### 2. Lógica Frágil de Slugs (`syncProjectSlugs`)
- **Código atual:** Em `src/lib/data.ts` (linhas 44-67):
  ```typescript
  export async function syncProjectSlugs() {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'asc' } });
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const baseSlug = ...;
      const expectedSlug = `${baseSlug}-${i}`;
      if (project.slug !== expectedSlug) {
        await prisma.project.update({ where: { id: project.id }, data: { slug: expectedSlug } });
      }
    }
  }
  ```
- **Risco:** Sempre que um projeto é criado, atualizado ou excluído, a função itera sobre **todos os projetos do banco** e recalcula o sufixo numérico baseado na posição no array.
- **Consequência:** Se o projeto 2 for deletado, o projeto 3 vira o novo índice 2, **mudando sua URL permanentemente**. Isso quebra links compartilhados no Instagram, mensagens de WhatsApp, portfólios externos e indexação de SEO no Google (gerando erros 404).

#### 3. Sobrecarga de Manutenção de Interface Administrativa
- Manutenção de formulários React, estados de preview (`useState`), validações de campos obrigatórios, tratamento de erros e layouts responsivos para desktop/mobile.
- Manutenção de autenticação manual (sessão JWT via cookie, expiração, rotas protegidas em `middleware.ts`).
- Manutenção do editor WYSIWYG Tiptap (gerenciamento de extensões, toolbar, formatação HTML pura).
- Inexistência de recursos essenciais: **rascunhos (drafts)**, **histórico de alterações**, **reversão de versão**, **agendamento de postagem** e **recorte focal de imagem (hotspot)**.

---

## 3. A Solução com um Headless CMS

Um **Headless CMS** separa totalmente o painel de conteúdo da camada de exibição (Next.js). Ele fornece uma interface pronta e profissional para a arquiteta gerenciar seus conteúdos e expõe uma API (REST ou GraphQL) de altíssima performance para o site consumir.

### 3.1. Arquitetura Proposta com Headless CMS

```
┌─────────────────────────────────────────────────────────────┐
│                       HEADLESS CMS                          │
│                                                             │
│  ┌────────────────────────┐      ┌────────────────────────┐ │
│  │   Painel Visual        │      │   Media Pipeline / CDN │ │
│  │   (Desktop & Mobile)   │      │   - Upload direto      │ │
│  │   - Rascunhos/Live     │      │   - Otimização WebP    │ │
│  │   - Slugs automáticos  │      │   - Crop & Hotspot     │ │
│  └───────────┬────────────┘      └───────────┬────────────┘ │
│              │                               │              │
│              └───────────────┬───────────────┘              │
│                              ▼                              │
│                      API Global (CDN Edge)                  │
└──────────────────────────────┬──────────────────────────────┘
                               │ JSON + URLs de Imagens Leves
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 NEXT.JS FRONTEND (Vercel)                   │
│                                                             │
│  - getProjects() / getAboutData() via client CDN            │
│  - Renderização estática com ISR (revalidate) instantâneo   │
│  - Componente <Image /> nativo do Next.js                   │
│  - Zero dependência de Postgres para textos e fotos         │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Comparativo de CMSs para o Perfil do Projeto

Analisamos as melhores soluções de mercado considerando que este é um **portfólio de arquitetura**, onde a fidelidade visual, qualidade e velocidade das fotos são fundamentais:

| Critério | Sanity.io (Recomendado) | Payload CMS 3.0 | Strapi | TinaCMS |
| :--- | :--- | :--- | :--- | :--- |
| **Tipo** | Headless CMS SaaS | Headless Nativo Next.js | Headless Open-Source | Git-based CMS |
| **Hospedagem do CMS** | Nuvem gerenciada gratuita | No próprio Next.js / Vercel | Servidor próprio (VPS/Render) | GitHub Repo |
| **Tratamento de Imagens** | **Excepcional** (Hotspot, Crop, CDN automática, LQIP) | Bom (requer S3/R2 configurado) | Bom (plugin de upload local/S3) | Básico (armazena no Git) |
| **Experiência da Usuária** | Interface limpa, intuitiva e moderna | Excelente painel administrativo | Interface robusta e madura | Edição inline no site |
| **Custo de Infra** | Gratuito (plano generoso para 1 admin) | Gratuito (usa mesmo DB/Postgres) | Custo de servidor (R$ 40-100/mês) | Gratuito |
| **Complexidade de Migração** | **Baixa** (SDK oficial `next-sanity`) | Média (configurações de schemas) | Média/Alta (deploy separado) | Média |
| **Eliminação de Código** | Elimina Admin, Auth, Actions e Postgres | Elimina Admin e Actions | Elimina Admin, Auth e Actions | Elimina Admin, Auth e DB |

---

## 5. Recomendação: Por Que o Sanity.io é a Escolha Ideal?

Para o portfólio de Cássia Moretti, o **Sanity.io** é a ferramenta ideal pelos seguintes fatores:

1. **Asset Pipeline Nativo com Hotspot e Crop**:
   Em arquitetura, o enquadramento de uma fachada ou detalhe de interiores varia entre o banner horizontal da home e o card vertical dos projetos. O Sanity permite selecionar o ponto de foco da foto diretamente no painel. O Next.js recebe o ponto de foco e nunca corta a parte principal da foto.
2. **Eliminação Total de Limites de Payload**:
   Os uploads de imagens vão diretamente do navegador da arquiteta para os servidores globais de mídia do Sanity (Google Cloud Storage / Fastly CDN), sem passar pela Vercel. Fotos pesadas de câmeras profissionais (10MB a 30MB) são aceitas e otimizadas automaticamente para WebP/AVIF.
3. **Slugs Nativos e Seguros**:
   O Sanity possui o tipo de campo nativo `slug` gerado a partir do título com validação de unicidade (`isUnique`). O slug é gerado uma única vez e nunca mais é alterado automaticamente, preservando todas as URLs e SEO.
4. **Sanity Studio Embutido no Próprio Next.js**:
   Não é necessário criar outro site ou subdomínio. O painel administrativo fica acessível exatamente em `/admin` no próprio projeto Next.js através de uma única página (`app/admin/[[...tool]]/page.tsx`).
5. **Zero Manutenção de Banco de Dados**:
   Não há necessidade de gerenciar conexões com PostgreSQL (`pg`, `prisma`, migrations, pools de conexão ou quedas de banco).

---

## 6. Como Fica a Estrutura de Dados (Schemas do CMS)

Com o Sanity, toda a definição de tipos é feita em poucos arquivos TypeScript declarativos:

### 6.1. Schema de Projetos (`schemas/project.ts`)

```typescript
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Projetos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Projeto',
      type: 'string',
      validation: (Rule) => Rule.required().error('O título é obrigatório.'),
    }),
    defineField({
      name: 'slug',
      title: 'Identificador na URL (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Data do Projeto',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Arquitetura', value: 'Arquitetura' },
          { title: 'Urbanismo', value: 'Urbanismo' },
          { title: 'Interiores', value: 'Interiores' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true, // Permite marcar o foco da imagem para cortes perfeitos
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo Detalhado',
      type: 'array',
      of: [
        { type: 'block' }, // Parágrafos, cabeçalhos, listas
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Texto Alternativo (Acessibilidade e SEO)',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Legenda da Foto',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
});
```

### 6.2. Schema de Sobre Mim (`schemas/about.ts`)

```typescript
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'about',
  title: 'Sobre Mim',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Foto de Perfil',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Parágrafos da Biografia',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'areasOfFocus',
      title: 'Áreas de Atuação (Tags)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
```

---

## 7. Comparação Prática: Antes vs Depois

### 7.1. Adicionar ou Editar um Projeto

#### Antes (Fluxo Atual)
1. O usuário acessa `/admin/new-project`.
2. Faz upload de uma imagem no navegador.
3. Um script em React lê o binário e gera uma string Base64 de milhares de caracteres.
4. No Tiptap, se colar imagens, gera mais strings Base64 no corpo do texto.
5. O formulário envia tudo via `Server Action` para o servidor Next.js.
6. O servidor decodifica, chama `prisma.project.create()`.
7. O servidor roda `syncProjectSlugs()`, carregando **todos os projetos com seus Base64** da tabela e atualizando cada linha no banco.
8. Revalida o caminho e redireciona.

#### Depois (Com CMS)
1. A arquiteta abre `/admin` (Sanity Studio integrado).
2. Arrasta as fotos do projeto. O upload acontece diretamente para o CDN de mídia do Sanity.
3. Se desejar, ajusta o círculo de foco (hotspot) para enquadramento perfeito em telas mobile e desktop.
4. O slug é sugerido automaticamente com base no título e garantido como único.
5. Clica em **Publish** (Publicar).
6. Um webhook instantâneo revalida o cache do Next.js via On-Demand Revalidation. O site atualiza em segundos.

### 7.2. Como Fica o Código de Consumo no Next.js

Toda a complexidade de `actions.ts`, autenticação e Prisma desaparece para a leitura de dados. Veja como a busca de dados fica concisa e padronizada:

#### Consulta de Projetos (`src/lib/sanity.queries.ts`)
```typescript
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-10-15',
  useCdn: true, // Respostas cacheadas em borda global (< 50ms)
});

// Busca de todos os projetos (apenas os campos necessários, sem Base64!)
export async function getProjects() {
  return client.fetch(`
    *[_type == "project"] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      date,
      category,
      "coverImage": coverImage.asset->url,
      "coverDimensions": coverImage.asset->metadata.dimensions
    }
  `, {}, { next: { tags: ['projects'] } });
}

// Busca de dados do perfil Sobre
export async function getAboutData() {
  return client.fetch(`
    *[_type == "about"][0] {
      "photo": photo.asset->url,
      paragraphs,
      areasOfFocus
    }
  `, {}, { next: { tags: ['about'] } });
}
```

---

## 8. Arquivos que Podem Ser Eliminados da Base de Código

A adoção do CMS permite realizar uma limpeza profunda na base de código, removendo mais de **1.200 linhas** de código suscetível a falhas:

| Arquivo Atual | Motivo da Remoção / Simplificação |
| :--- | :--- |
| `src/app/admin/new-project/page.tsx` | Substituído pela tela nativa de criação do CMS |
| `src/app/admin/edit-project/[id]/*` | Substituído pela tela nativa de edição do CMS |
| `src/app/admin/about/*` | Substituído pela edição do documento `about` no CMS |
| `src/app/admin/dashboard/*` | O próprio CMS fornece dashboard e busca com filtros |
| `src/components/RichTextEditor.tsx` | Substituído pelo editor de blocos nativo do CMS |
| `src/lib/actions.ts` (Login, Create, Update, Delete) | Toda mutação é feita pelo painel autenticado do CMS |
| `src/middleware.ts` | Não é mais necessário gerenciar cookies de sessão JWT artesanais |
| `run-sync.ts` & lógica `syncProjectSlugs()` | Slugs são gerenciados nativamente com garantia de imutabilidade |
| `prisma/schema.prisma` (tabelas Project e AboutData) | Dados residem na nuvem do CMS com backups diários automáticos |

---

## 9. Plano de Implementação Passo a Passo

Para realizar essa transição de forma segura e sem tempo de inatividade para o portfólio, recomendamos a seguinte esteira de execução:

### Fase 1: Configuração do CMS (1 a 2 dias)
1. Criar o projeto no Sanity (`sanity init` ou via painel web).
2. Instalar os pacotes necessários:
   ```bash
   npm install next-sanity @sanity/image-url
   ```
3. Configurar a rota do Sanity Studio em `src/app/admin/[[...tool]]/page.tsx`.
4. Definir os schemas de `project` e `about` com validações.

### Fase 2: Script de Migração Automatizada (meio dia)
1. Criar um script para ler os projetos atuais (`data/projects.json` ou direto do PostgreSQL).
2. O script faz o upload das imagens para o Sanity Asset Pipeline e cria os documentos correspondentes via Sanity Client API.
3. Validar a integridade das URLs e slugs importados.

### Fase 3: Ajuste das Páginas de Consumo (1 dia)
1. Substituir as chamadas de `src/lib/data.ts` pelas funções da API do Sanity em:
   - `src/app/page.tsx` (Home)
   - `src/app/projetos/page.tsx` (Listagem)
   - `src/app/projetos/[slug]/page.tsx` (Página de Detalhes)
   - `src/app/sobre/page.tsx` (Sobre Mim)
2. Atualizar a exibição das imagens para utilizar URLs do CDN com tamanhos responsivos.

### Fase 4: Limpeza e Publicação (meio dia)
1. Remover páginas e componentes legados do diretório `/admin` antigo.
2. Remover dependências do Tiptap e Prisma (caso o banco não seja utilizado para outro fim).
3. Configurar o Webhook de revalidação sob demanda (`On-Demand Revalidation`) no Next.js para que o site atualize imediatamente ao clicar em "Publish".
4. Fornecer as credenciais de acesso à arquiteta (com login via Google ou e-mail/senha).

---

## 10. Conclusão e Benefícios

A substituição do painel administrativo customizado por um Headless CMS traz ganhos em três dimensões:

1. **Para a Arquiteta (Cássia):**
   - Interface bonita, intuitiva e amigável para celular e computador.
   - Upload ilimitado de fotos sem se preocupar com tamanhos de arquivo ou erros de servidor.
   - Recursos profissionais como recorte de imagem (hotspot), salvamento automático de rascunhos e visualização prévia antes de publicar.

2. **Para a Engenharia de Software:**
   - Redução de complexidade: fim do código de autenticação JWT, fim das Server Actions de upload e fim de formulários gigantescos com estados manuais.
   - Eliminação de bugs críticos como alteração em cascata de slugs e erro 413 (Payload Too Large).
   - Menos dependências no projeto e menor superfície para falhas de segurança.

3. **Para a Performance do Site (SEO e Core Web Vitals):**
   - Imagens servidas em formato WebP/AVIF via CDN global, reduzindo o tempo de carregamento da página de projetos de vários segundos para milissegundos.
   - URLs imutáveis e consistentes, preservando o ranqueamento no Google.
