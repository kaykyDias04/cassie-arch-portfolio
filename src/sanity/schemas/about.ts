import { defineArrayMember, defineField, defineType } from 'sanity';

// Documento singleton: existe apenas um, com _id fixo (ver ABOUT_DOCUMENT_ID).
export const ABOUT_DOCUMENT_ID = 'about';

export const about = defineType({
  name: 'about',
  title: 'Sobre Mim',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Foto de Perfil',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biografia',
      description: 'Cada parágrafo aparece separado no site. Use negrito para destacar nomes.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Parágrafo', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
            ],
            annotations: [],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'areasOfFocus',
      title: 'Áreas de Atuação (Tags)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Sobre Mim' }),
  },
});
