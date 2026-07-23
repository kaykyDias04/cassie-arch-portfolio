'use client';

import { useState, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilters from '@/components/ProjectFilters';
import { Project, ProjectCategory } from '@/lib/types';

interface ProjetosSectionProps {
  projects: Project[];
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

  return (
    <section
      id="projetos"
      className="min-h-screen py-24 bg-white border-t border-border-light scroll-mt-20"
      aria-labelledby="projetos-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-14">
          <p className="text-text-grey text-sm tracking-[0.2em] uppercase mb-3">
            Portfólio
          </p>
          <h2 id="projetos-heading">Meus Projetos</h2>
        </div>

        <div className="mb-12">
          <ProjectFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeSemester={activeSemester}
            onSemesterChange={setActiveSemester}
            availableSemesters={availableSemesters}
          />
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-grey text-lg">
              Nenhum projeto encontrado neste filtro.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
