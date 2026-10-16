import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type WebhookPayload = { _type?: string };

// Chamado pelo webhook do Sanity a cada publish/unpublish/delete.
// Expira o cache das páginas que usam a tag igual ao `_type` do documento.
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'SANITY_REVALIDATE_SECRET não configurado' }, { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret);

  if (!isValidSignature) {
    return NextResponse.json({ error: 'Assinatura inválida' }, { status: 401 });
  }

  if (!body?._type) {
    return NextResponse.json({ error: 'Payload sem _type' }, { status: 400 });
  }

  // `{ expire: 0 }` = expiração imediata, recomendada pelo Next.js para webhooks.
  revalidateTag(body._type, { expire: 0 });

  return NextResponse.json({ revalidated: body._type, now: Date.now() });
}
