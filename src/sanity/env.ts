// Acesso literal a `process.env.NEXT_PUBLIC_*` é obrigatório para que o Next.js
// injete os valores no bundle do navegador (o Studio roda no client).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-10-15';

export function isSanityConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder' &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.trim() !== ''
  );
}
