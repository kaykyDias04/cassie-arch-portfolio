import StudioShell from '@/components/StudioShell';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <StudioShell />;
}
