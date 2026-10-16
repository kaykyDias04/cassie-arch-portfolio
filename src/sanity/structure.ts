import type { StructureResolver } from 'sanity/structure';
import { ABOUT_DOCUMENT_ID } from './schemas/about';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Sobre Mim')
        .id(ABOUT_DOCUMENT_ID)
        .child(S.document().schemaType('about').documentId(ABOUT_DOCUMENT_ID).title('Sobre Mim')),
      S.divider(),
      S.documentTypeListItem('project').title('Projetos'),
    ]);
