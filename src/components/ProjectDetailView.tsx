'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Check, Share2, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZoomableImage from '@/components/ImageLightbox';
import { ProjectContent } from '@/components/PortableTextContent';
import { formatProjectCardDate, formatProjectFullDate } from '@/lib/date';
import type { Project, ProjectSummary } from '@/lib/types';
import { urlFor } from '@/sanity/image';

interface ProjectDetailViewProps {
  project: Project;
  allProjects: ProjectSummary[];
}

export default function ProjectDetailView({ project, allProjects }: ProjectDetailViewProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex !== -1 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const handleShareLink = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      // Ignora erro caso clipboard esteja bloqueado no navegador
    }
  };

  return (
    <>
      <Header />

      <main id="main-content" className="flex-1 pt-20">
        {/* Breadcrumb & Navigation */}
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/#projetos"
              className="inline-flex items-center gap-2 text-title-black/65 text-xs tracking-[0.14em] uppercase font-medium hover:text-luminex-red transition-colors duration-300"
            >
              <ArrowLeft size={14} />
              Voltar para projetos
            </Link>

            <nav aria-label="Caminho de navegação" className="text-title-black/55 text-xs hidden sm:flex items-center gap-2">
              <Link href="/" className="hover:text-title-black transition-colors">
                Início
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/projetos" className="hover:text-title-black transition-colors">
                Projetos
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-luminex-red font-medium">{project.category}</span>
            </nav>
          </div>
        </div>

        {/* Project Header */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="animate-fade-in-up mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-accent-red/60 text-luminex-red text-[10px] tracking-[0.18em] uppercase font-semibold px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 border border-accent-red">
                  <Tag size={11} />
                  {project.category}
                </span>
                <span className="text-title-black/65 text-xs inline-flex items-center gap-1.5 font-medium tracking-wide">
                  <Calendar size={13} />
                  {formatProjectFullDate(project.date)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleShareLink}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-light bg-surface px-3.5 py-1.5 text-[11px] tracking-[0.12em] uppercase font-medium text-title-black/75 hover:border-luminex-red/40 hover:text-luminex-red transition-colors cursor-pointer"
                aria-label="Copiar link deste projeto"
              >
                {copiedLink ? (
                  <>
                    <Check size={13} className="text-green-600" />
                    <span className="text-green-700">Link copiado</span>
                  </>
                ) : (
                  <>
                    <Share2 size={13} />
                    <span>Compartilhar</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-title-black">
              {project.title}
            </h1>
          </div>

          {/* Cover Image */}
          <div className="animate-fade-in-up-delay-1 rounded-2xl overflow-hidden aspect-[16/9] mb-12 shadow-xl border border-border-light bg-surface">
            <ZoomableImage
              src={urlFor(project.coverImage).width(1600).height(900).url()}
              fullSrc={urlFor(project.coverImage).width(2400).fit('max').url()}
              alt={project.coverImage.alt || project.title}
              caption={project.title}
              className="w-full h-full"
              imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover/zoom:scale-[1.02]"
              loading="eager"
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
                className="group p-6 rounded-2xl border border-border-light hover:border-luminex-red/40 bg-surface/50 hover:bg-surface transition-all flex flex-col items-start gap-2 shadow-2xs hover:shadow-md"
              >
                <span className="text-[11px] tracking-[0.15em] uppercase text-title-black/60 flex items-center gap-1.5">
                  <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                  Projeto Anterior
                </span>
                <span className="text-lg font-medium text-title-black group-hover:text-luminex-red transition-colors line-clamp-1">
                  {prevProject.title}
                </span>
                <span className="text-[11px] tracking-[0.12em] uppercase text-title-black/50">
                  {prevProject.category} • {formatProjectCardDate(prevProject.date)}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projetos/${nextProject.slug}`}
                className="group p-6 rounded-2xl border border-border-light hover:border-luminex-red/40 bg-surface/50 hover:bg-surface transition-all flex flex-col items-end text-right gap-2 sm:ml-auto w-full shadow-2xs hover:shadow-md"
              >
                <span className="text-[11px] tracking-[0.15em] uppercase text-title-black/60 flex items-center gap-1.5">
                  Próximo Projeto
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-lg font-medium text-title-black group-hover:text-luminex-red transition-colors line-clamp-1">
                  {nextProject.title}
                </span>
                <span className="text-[11px] tracking-[0.12em] uppercase text-title-black/50">
                  {nextProject.category} • {formatProjectCardDate(nextProject.date)}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/projetos"
              className="inline-flex items-center gap-2 bg-title-black text-white px-8 py-3.5 rounded-full text-xs tracking-[0.14em] uppercase font-medium hover:bg-luminex-red transition-colors duration-300 shadow-sm"
            >
              Explorar catálogo completo
            </Link>
            <Link
              href="/#contato"
              className="inline-flex items-center gap-2 border border-border-light bg-surface text-title-black px-8 py-3.5 rounded-full text-xs tracking-[0.14em] uppercase font-medium hover:border-luminex-red hover:text-luminex-red transition-colors duration-300"
            >
              Falar sobre um projeto
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
