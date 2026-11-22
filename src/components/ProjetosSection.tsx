'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilters from '@/components/ProjectFilters';
import { getProjectSemester, parseProjectDate } from '@/lib/date';
import { ProjectCategory, ProjectSummary } from '@/lib/types';

interface ProjetosSectionProps {
  projects: ProjectSummary[];
  /** Define se o componente está renderizado na página dedicada `/projetos` (h1) ou na seção da home (h2). */
  isStandalonePage?: boolean;
}

export default function ProjetosSection({
  projects,
  isStandalonePage = false,
}: ProjetosSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Todos');
  const [activeSemester, setActiveSemester] = useState('Todos os períodos');

  const availableSemesters = useMemo(() => {
    const seen = new Set<string>();
    projects.forEach((p) => seen.add(getProjectSemester(p.date)));
    return Array.from(seen).sort((a, b) => b.localeCompare(a));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (activeCategory !== 'Todos') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (activeSemester !== 'Todos os períodos') {
      filtered = filtered.filter((p) => getProjectSemester(p.date) === activeSemester);
    }

    filtered.sort(
      (a, b) => parseProjectDate(b.date).getTime() - parseProjectDate(a.date).getTime()
    );

    return filtered;
  }, [projects, activeCategory, activeSemester]);

  const isFiltered = activeCategory !== 'Todos' || activeSemester !== 'Todos os períodos';

  const handleResetFilters = () => {
    setActiveCategory('Todos');
    setActiveSemester('Todos os períodos');
  };

  return (
    <section
      id={isStandalonePage ? undefined : 'projetos'}
      className={`${isStandalonePage ? 'py-12 pb-24' : 'min-h-screen py-24 border-t border-border-light scroll-mt-20'} bg-white`}
      aria-labelledby="projetos-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-title-black/55 text-xs tracking-[0.25em] uppercase mb-3">
              {isStandalonePage ? 'Portfólio Completo' : 'Portfólio Selecionado'}
            </p>
            <div className="flex items-baseline gap-3">
              {isStandalonePage ? (
                <h1 id="projetos-heading" className="text-4xl md:text-5xl font-medium tracking-tight">
                  Meus Projetos
                </h1>
              ) : (
                <h2 id="projetos-heading" className="text-3xl md:text-5xl font-medium tracking-tight">
                  Meus Projetos
                </h2>
              )}
              <span className="text-title-black/50 text-sm tracking-widest font-normal">
                ({filteredProjects.length})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isFiltered && (
              <p className="text-xs text-title-black/60 tracking-wide">
                Exibindo {filteredProjects.length} de {projects.length} projetos
              </p>
            )}
            {!isStandalonePage && projects.length > 0 && (
              <Link
                href="/projetos"
                className="inline-flex items-center gap-1.5 text-xs tracking-[0.14em] uppercase font-medium text-luminex-red hover:underline underline-offset-4"
              >
                <span>Ver catálogo</span>
                <ArrowRight size={13} />
              </Link>
            )}
          </div>
        </div>

        <div className="mb-12">
          <ProjectFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeSemester={activeSemester}
            onSemesterChange={setActiveSemester}
            availableSemesters={availableSemesters}
            onResetFilters={handleResetFilters}
          />
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border-light rounded-2xl bg-surface/60 max-w-xl mx-auto px-6">
            <p className="text-title-black text-lg font-medium mb-2">
              Portfólio em atualização
            </p>
            <p className="text-title-black/60 text-sm">
              Em breve novos projetos de arquitetura, urbanismo e interiores estarão disponíveis aqui.
            </p>
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-border-light rounded-2xl bg-surface/60 max-w-xl mx-auto px-6">
            <p className="text-title-black text-lg font-medium mb-2">
              Nenhum projeto encontrado
            </p>
            <p className="text-title-black/60 text-sm mb-6">
              Não encontramos nenhum projeto com os filtros selecionados.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 bg-title-black text-white px-6 py-2.5 rounded-full text-xs tracking-[0.14em] uppercase font-medium hover:bg-luminex-red transition-colors cursor-pointer"
            >
              Ver todos os projetos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
