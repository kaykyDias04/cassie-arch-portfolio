import { PortableText, type PortableTextBlock, type PortableTextComponents } from 'next-sanity';
import ZoomableImage from '@/components/ImageLightbox';
import { urlFor } from '@/sanity/image';
import type { SanityImage } from '@/lib/types';

type ContentImage = SanityImage & { caption?: string };

const projectComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ContentImage }) => {
      if (!value?.asset) return null;
      const displayUrl = urlFor(value).width(1600).fit('max').url();
      const fullUrl = urlFor(value).width(2400).fit('max').url();
      const altText = value.alt || value.caption || 'Imagem do projeto arquitetônico';

      return (
        <figure className="my-8">
          <ZoomableImage
            src={displayUrl}
            fullSrc={fullUrl}
            alt={altText}
            caption={value.caption}
            className="overflow-hidden rounded-xl border border-border-light bg-surface shadow-sm"
            imgClassName="w-full h-auto object-cover transition-transform duration-500 group-hover/zoom:scale-[1.01]"
            loading="lazy"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#';
      const isExternal = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-luminex-red underline underline-offset-4 decoration-luminex-red/40 hover:decoration-luminex-red transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

const bioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[17px] leading-[30px] text-[#3d3d3d]">{children}</p>
    ),
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
    <div className="space-y-5 animate-fade-in-up-delay-1 mb-8 max-w-prose">
      <PortableText value={value} components={bioComponents} />
    </div>
  );
}
