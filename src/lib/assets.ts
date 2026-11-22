// Acesso literal para garantir que o Next.js injete o prefixo no bundle do cliente.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const STUDIO_REDIRECT_STORAGE_KEY = 'cassie_sanity_studio_redirect';

/**
 * Prefixa caminhos estáticos da pasta `public/` com o `basePath` configurado
 * (ex.: `/cassie-arch-portfolio/hero-banner.jpg` no GitHub Pages).
 */
export function assetPath(path: string): string {
  if (!path) return basePath || '/';
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
