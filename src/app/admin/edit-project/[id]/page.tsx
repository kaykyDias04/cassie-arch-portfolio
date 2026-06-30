import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/data';
import EditProjectClient from '@/app/admin/edit-project/[id]/EditProjectClient';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return <EditProjectClient project={project} />;
}
