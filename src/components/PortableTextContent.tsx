import { PortableText, type PortableTextBlock, type PortableTextComponents } from 'next-sanity';
import { urlFor } from '@/sanity/image';
import type { SanityImage } from '@/lib/types';

type ContentImage = SanityImage & { caption?: string };

const projectComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ContentImage }) => {
      if (!value?.asset) return null;
      return (
        <figure>
          <img
            src={urlFor(value).width(1600).fit('max').url()}
            alt={value.alt || value.caption || ''}
            loading="lazy"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

const bioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-[17px] leading-[30px] text-[#444444]">{children}</p>,
  },
};

/** Corpo do projeto (títulos, parágrafos, listas e fotos com legenda). */
export function ProjectContent({ value }: { value: PortableTextBlock[] }) {
  return (
    <article className="prose-project animate-fade-in-up-delay-2">
      <PortableText value={value} components={projectComponents} />
    </article>
  );
}

/** Parágrafos da biografia na seção/página "Sobre Mim". */
export function BioContent({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="space-y-5 animate-fade-in-up-delay-1 mb-8">
      <PortableText value={value} components={bioComponents} />
    </div>
  );
}
