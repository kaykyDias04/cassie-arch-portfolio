import type { QueryParams } from 'next-sanity';
import { client } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';
import type { AboutData, Project, ProjectSummary } from './types';

// Fallback caso o webhook de revalidação não dispare: o conteúdo é
// atualizado em no máximo 60s. Com o webhook, a atualização é imediata.
const REVALIDATE_SECONDS = 60;

// As tags coincidem com o `_type` dos documentos, permitindo que o webhook
// faça `revalidateTag(body._type)` (ver src/app/api/revalidate/route.ts).
type ContentTag = 'project' | 'about';

async function sanityFetch<T>(query: string, tag: ContentTag, params: QueryParams = {}, fallback: T): Promise<T> {
  if (!isSanityConfigured()) {
    return fallback;
  }
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
    });
  } catch (error) {
    console.warn(`[Sanity] Não foi possível consultar "${tag}":`, error);
    return fallback;
  }
}

const PROJECT_SUMMARY_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  date,
  category,
  coverImage
`;

const PROJECTS_QUERY = `
  *[_type == "project" && defined(slug.current)] | order(date desc) {
    ${PROJECT_SUMMARY_FIELDS}
  }
`;

const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    ${PROJECT_SUMMARY_FIELDS},
    content
  }
`;

const ABOUT_QUERY = `
  *[_type == "about"][0] {
    photo,
    bio,
    "areasOfFocus": coalesce(areasOfFocus, [])
  }
`;

export function getProjects(): Promise<ProjectSummary[]> {
  return sanityFetch<ProjectSummary[]>(PROJECTS_QUERY, 'project', {}, []);
}

export function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityFetch<Project | null>(PROJECT_BY_SLUG_QUERY, 'project', { slug }, null);
}

export function getAboutData(): Promise<AboutData | null> {
  return sanityFetch<AboutData | null>(ABOUT_QUERY, 'about', {}, null);
}
