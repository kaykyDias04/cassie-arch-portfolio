import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProjectContent } from '@/components/PortableTextContent';
import { getProjectBySlug, getProjects } from '@/lib/data';
import { urlFor } from '@/sanity/image';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';
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

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <>
      <Header />

      <main className="flex-1 pt-20">
        {/* Breadcrumb & Navigation */}
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-4">
          <div className="flex items-center justify-between">
            <Link
              href="/#projetos"
              className="inline-flex items-center gap-2 text-text-grey text-xs tracking-[0.14em] uppercase font-medium hover:text-title-black transition-colors duration-300"
            >
              <ArrowLeft size={14} />
              Voltar para projetos
            </Link>

            <span className="text-text-grey/60 text-xs hidden sm:inline">
              Portfólio / {project.category}
            </span>
          </div>
        </div>

        {/* Project Header */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="animate-fade-in-up mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-accent-red/60 text-luminex-red text-[10px] tracking-[0.18em] uppercase font-semibold px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 border border-accent-red">
                <Tag size={11} />
                {project.category}
              </span>
              <span className="text-text-grey text-xs inline-flex items-center gap-1.5 font-medium tracking-wide">
                <Calendar size={13} />
                {new Date(project.date).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-title-black">
              {project.title}
            </h1>
          </div>

          {/* Cover Image */}
          <div className="animate-fade-in-up-delay-1 rounded-2xl overflow-hidden aspect-[16/9] mb-12 shadow-xl border border-border-light bg-surface">
            <img
              src={urlFor(project.coverImage).width(1600).height(900).url()}
              alt={project.coverImage.alt || project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Body Prose */}
          <ProjectContent value={project.content} />
        </section>

        {/* Next / Previous Project Navigation */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-border-light mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {prevProject ? (
              <Link
                href={`/projetos/${prevProject.slug}`}
                className="group p-5 rounded-xl border border-border-light hover:border-luminex-red/40 bg-surface/40 hover:bg-surface transition-all flex flex-col items-start gap-1"
              >
                <span className="text-[11px] tracking-[0.15em] uppercase text-text-grey flex items-center gap-1">
                  <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                  Projeto Anterior
                </span>
                <span className="text-base font-medium text-title-black group-hover:text-luminex-red transition-colors line-clamp-1">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projetos/${nextProject.slug}`}
                className="group p-5 rounded-xl border border-border-light hover:border-luminex-red/40 bg-surface/40 hover:bg-surface transition-all flex flex-col items-end text-right gap-1 sm:ml-auto w-full"
              >
                <span className="text-[11px] tracking-[0.15em] uppercase text-text-grey flex items-center gap-1">
                  Próximo Projeto
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-base font-medium text-title-black group-hover:text-luminex-red transition-colors line-clamp-1">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="text-center">
            <Link
              href="/#projetos"
              className="inline-flex items-center gap-2 bg-title-black text-white px-8 py-3 rounded-full text-xs tracking-[0.14em] uppercase font-medium hover:bg-luminex-red transition-colors duration-300 shadow-sm"
            >
              Ver todos os projetos
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
