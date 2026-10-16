'use client';

import { ptBRLocale } from '@sanity/locale-pt-br';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from './src/sanity/env';
import { schemaTypes, SINGLETON_TYPES } from './src/sanity/schemas';
import { structure } from './src/sanity/structure';

// Ações permitidas em documentos singleton (sem "Duplicar" nem "Excluir").
const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'default',
  title: 'Cássia Victória — Portfólio',
  basePath: '/admin',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), ptBRLocale()],
  schema: {
    types: schemaTypes,
    // Impede criar novos documentos "Sobre Mim" pelo botão "+".
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : actions,
  },
});
