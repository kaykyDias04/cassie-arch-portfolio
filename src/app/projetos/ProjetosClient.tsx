'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilters from '@/components/ProjectFilters';
import { Project, ProjectCategory } from '@/lib/types';

interface ProjetosClientProps {
  projects: Project[];
}

export default function ProjetosClient({ projects }: ProjetosClientProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Todos');

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (activeCategory !== 'Todos') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return filtered;
  }, [projects, activeCategory]);

  return (
    <>
      <Header />

      <main className="flex-1 pt-20">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-14">
              <p className="text-text-grey text-sm tracking-[0.2em] uppercase mb-3">
                Portfólio
              </p>
              <h1>Meus Projetos</h1>
            </div>

            <div className="mb-12">
              <ProjectFilters
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-text-grey text-lg">
                  Nenhum projeto encontrado nesta categoria.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
