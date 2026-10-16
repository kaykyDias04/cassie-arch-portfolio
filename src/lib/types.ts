import type { PortableTextBlock } from 'next-sanity';

export const PROJECT_CATEGORIES = ['Arquitetura', 'Urbanismo', 'Interiores'] as const;

export type ProjectCategoryName = (typeof PROJECT_CATEGORIES)[number];

export type ProjectCategory = 'Todos' | ProjectCategoryName;

/** Imagem do Sanity (referência ao asset + recorte/hotspot definidos no Studio). */
export interface SanityImage {
  _type?: 'image';
  asset: { _ref: string; _type?: 'reference' };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

export interface ProjectSummary {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: ProjectCategoryName;
  coverImage: SanityImage;
}

export interface Project extends ProjectSummary {
  content: PortableTextBlock[];
}

export interface AboutData {
  photo: SanityImage;
  bio: PortableTextBlock[];
  areasOfFocus: string[];
}
