import { getProjects } from '@/lib/data';
import ProjetosClient from './ProjetosClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projetos | Cássia Victória',
  description: 'Conheça Meus projetos de arquitetura, urbanismo e design de interiores.',
};

export default async function ProjetosPage() {
  const projects = await getProjects();

  return <ProjetosClient projects={projects} />;
}
