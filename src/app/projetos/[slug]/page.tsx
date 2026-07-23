import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProjectBySlug, getProjects } from '@/lib/data';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

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
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-6 pt-10">
          <Link
            href="/#projetos"
            className="inline-flex items-center gap-2 text-text-grey text-sm tracking-[0.1em] uppercase font-medium hover:text-title-black transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            Voltar para projetos
          </Link>
        </div>

        <section className="max-w-4xl mx-auto px-6 py-10">
          <div className="animate-fade-in-up">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-accent-red text-title-black text-[11px] tracking-[0.15em] uppercase font-semibold px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Tag size={12} />
                {project.category}
              </span>
              <span className="text-text-grey text-sm inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(project.date).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <h1 className="mb-8">{project.title}</h1>
          </div>

          <div className="animate-fade-in-up-delay-1 rounded-xl overflow-hidden aspect-[16/9] mb-12">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <article
            className="prose-project animate-fade-in-up-delay-2"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="border-t border-border-light pt-12 text-center">
            <Link
              href="/#projetos"
              className="inline-flex items-center gap-2 bg-title-black text-white px-8 py-3.5 rounded-full text-sm tracking-[0.1em] uppercase font-medium hover:bg-luminex-red transition-colors duration-300"
            >
              Ver mais projetos
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
