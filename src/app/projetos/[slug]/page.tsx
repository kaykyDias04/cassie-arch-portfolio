import { notFound } from 'next/navigation';
import ProjectDetailView from '@/components/ProjectDetailView';
import { getProjectBySlug, getProjects } from '@/lib/data';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Projeto não encontrado | Cássia Victória' };
  }

  return {
    title: `${project.title} | Cássia Victória`,
    description: `Projeto de ${project.category} - ${project.title}`,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} allProjects={allProjects} />;
}
