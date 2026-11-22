'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectDetailView from '@/components/ProjectDetailView';
import { basePath, STUDIO_REDIRECT_STORAGE_KEY } from '@/lib/assets';
import { getProjectBySlug, getProjects } from '@/lib/data';
import type { Project, ProjectSummary } from '@/lib/types';

function subscribe() {
  return () => {};
}

function getClientPathname(): string | null {
  return typeof window !== 'undefined' ? window.location.pathname : null;
}

function getServerPathname(): string | null {
  return null;
}

function stripBasePath(pathname: string): string {
  if (basePath && pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length) || '/';
  }
  return pathname;
}

export default function NotFoundPage() {
  const pathname = useSyncExternalStore(
    subscribe,
    getClientPathname,
    getServerPathname
  );

  const normalizedPath = pathname ? stripBasePath(pathname) : null;
  const isAdminRoute = Boolean(normalizedPath?.startsWith('/admin'));
  const projectSlugMatch = normalizedPath?.match(/^\/projetos\/([^/]+)\/?$/);
  const projectSlug = projectSlugMatch?.[1]
    ? decodeURIComponent(projectSlugMatch[1])
    : null;

  const [resolvedSlugData, setResolvedSlugData] = useState<{
    slug: string;
    project: Project | null;
    allProjects: ProjectSummary[];
  } | null>(null);

  useEffect(() => {
    if (!pathname || !isAdminRoute) return;
    try {
      sessionStorage.setItem(
        STUDIO_REDIRECT_STORAGE_KEY,
        `${pathname}${window.location.search}${window.location.hash}`
      );
    } catch {
      // Ignora caso sessionStorage esteja indisponível
    }
    window.location.replace(`${basePath}/admin/`);
  }, [pathname, isAdminRoute]);

  useEffect(() => {
    if (!projectSlug) return;
    let cancelled = false;

    Promise.all([getProjectBySlug(projectSlug), getProjects()])
      .then(([project, allProjects]) => {
        if (!cancelled) {
          setResolvedSlugData({ slug: projectSlug, project, allProjects });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResolvedSlugData({ slug: projectSlug, project: null, allProjects: [] });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [projectSlug]);

  const isCheckingProject =
    Boolean(projectSlug) && resolvedSlugData?.slug !== projectSlug;

  if (projectSlug && resolvedSlugData?.slug === projectSlug && resolvedSlugData.project) {
    return (
      <ProjectDetailView
        project={resolvedSlugData.project}
        allProjects={resolvedSlugData.allProjects}
      />
    );
  }

  if (pathname === null || isAdminRoute || isCheckingProject) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-title-black gap-3">
        <div className="w-7 h-7 rounded-full border-2 border-border-light border-t-luminex-red animate-spin" />
        <p className="text-xs tracking-[0.18em] uppercase text-title-black/60">
          {isAdminRoute ? 'Abrindo painel editorial...' : 'Carregando...'}
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main id="main-content" className="flex-1 pt-20 flex items-center justify-center">
        <section className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-red/50 text-luminex-red mb-6">
            <Compass size={26} />
          </div>

          <p className="text-xs tracking-[0.25em] uppercase text-luminex-red font-semibold mb-3">
            Erro 404
          </p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-title-black mb-5">
            Espaço não encontrado
          </h1>
          <p className="text-title-black/65 text-base leading-relaxed mb-10 max-w-md mx-auto">
            O endereço que você procurou foi movido ou não está disponível no momento.
            Explore os projetos publicados ou retorne à página inicial.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-luminex-red text-white px-7 py-3 rounded-full text-xs tracking-[0.14em] uppercase font-medium hover:bg-title-black transition-colors duration-300 shadow-sm"
            >
              <ArrowLeft size={14} />
              Voltar para o início
            </Link>
            <Link
              href="/projetos"
              className="inline-flex items-center gap-2 bg-surface border border-border-light text-title-black px-7 py-3 rounded-full text-xs tracking-[0.14em] uppercase font-medium hover:border-luminex-red hover:text-luminex-red transition-colors duration-300"
            >
              Ver Projetos
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
