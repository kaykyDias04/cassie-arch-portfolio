import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './env';

// useCdn: false — o cache fica a cargo do Next.js (tags + revalidate). Com a CDN
// do Sanity ligada, o webhook de revalidação poderia buscar uma versão ainda
// desatualizada logo após o "Publish".
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
});
