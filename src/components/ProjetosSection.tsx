'use client';

import { useState, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilters from '@/components/ProjectFilters';
import { ProjectSummary, ProjectCategory } from '@/lib/types';

interface ProjetosSectionProps {
  projects: ProjectSummary[];
}

function getSemester(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const half = month <= 6 ? 1 : 2;
  return `${year}.${half}`;
}

export default function ProjetosSection({ projects }: ProjetosSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Todos');
  const [activeSemester, setActiveSemester] = useState('Todos os períodos');

  const availableSemesters = useMemo(() => {
    const seen = new Set<string>();
    projects.forEach((p) => seen.add(getSemester(p.date)));
    return Array.from(seen).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (activeCategory !== 'Todos') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (activeSemester !== 'Todos os períodos') {
      filtered = filtered.filter((p) => getSemester(p.date) === activeSemester);
    }

    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return filtered;
  }, [projects, activeCategory, activeSemester]);

  const handleResetFilters = () => {
    setActiveCategory('Todos');
    setActiveSemester('Todos os períodos');
  };

  return (
    <section
      id="projetos"
      className="min-h-screen py-24 bg-white border-t border-border-light scroll-mt-20"
      aria-labelledby="projetos-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-text-grey text-xs tracking-[0.25em] uppercase mb-3">
              Portfólio Selecionado
            </p>
            <div className="flex items-baseline gap-3">
              <h2 id="projetos-heading" className="text-3xl md:text-5xl font-medium tracking-tight">
                Meus Projetos
              </h2>
              <span className="text-text-grey text-sm tracking-widest font-normal">
                ({filteredProjects.length})
              </span>
            </div>
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
        ) : (
          <div className="text-center py-24 border border-dashed border-border-light rounded-2xl bg-surface/50 max-w-xl mx-auto">
            <p className="text-title-black text-lg font-medium mb-2">
              Nenhum projeto encontrado
            </p>
            <p className="text-text-grey text-sm mb-6">
              Não encontramos nenhum projeto com os filtros selecionados.
            </p>
            <button
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

