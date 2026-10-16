import { createImageUrlBuilder } from '@sanity/image-url';
import { dataset, projectId } from './env';
import type { SanityImage } from '@/lib/types';

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Monta a URL da imagem no CDN do Sanity. Ao informar largura e altura, o
 * recorte respeita o hotspot definido no Studio. `auto('format')` entrega
 * WebP/AVIF quando o navegador suporta.
 */
export function urlFor(image?: SanityImage | null) {
  if (!image || !image.asset) {
    // Retorno seguro caso a imagem ainda não tenha sido cadastrada ou esteja nula
    const dummy = {
      width: () => dummy,
      height: () => dummy,
      fit: () => dummy,
      auto: () => dummy,
      url: () => '/Cassie-logo.svg',
    };
    return dummy as unknown as ReturnType<typeof builder.image>;
  }
  return builder.image(image).auto('format');
}
