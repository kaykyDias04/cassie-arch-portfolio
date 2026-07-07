import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let projects = await getProjects();
  projects = projects
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <>
      <Header />

      <main className="flex-1 pt-20">
        <section className="relative min-h-[55vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-14 w-full">
            <div className="max-w-3xl">
              <p className="text-text-grey text-sm tracking-[0.2em] uppercase mb-6 animate-fade-in-up">
                Estudante de Arquitetura e Urbanismo
              </p>
              <h1 className="animate-fade-in-up-delay-1 mb-6">
                Transformo espaços em{' '}
                <span className="text-luminex-red">experiências</span>
              </h1>
              <p className="text-[#555555] text-lg leading-relaxed max-w-xl mb-10 animate-fade-in-up-delay-2">
                Crio projetos de arquitetura, urbanismo e interiores com design
                contemporâneo, funcionalidade e sensibilidade ao contexto.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-3">
                <Link
                  href="/projetos"
                  className="inline-flex items-center gap-2 bg-title-black text-white px-8 py-3.5 rounded-full text-sm tracking-[0.1em] uppercase font-medium hover:bg-luminex-red transition-colors duration-300"
                >
                  Ver Projetos
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 border border-title-black text-title-black px-8 py-3.5 rounded-full text-sm tracking-[0.1em] uppercase font-medium hover:bg-luminex-red hover:text-white transition-colors duration-300"
                >
                  Fale Comigo
                </Link>
              </div>
            </div>
          </div>

        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
              <div>
                <p className="text-text-grey text-sm tracking-[0.2em] uppercase mb-3">
                  Portfólio
                </p>
                <h2>Projetos Recentes</h2>
              </div>
              <Link
                href="/projetos"
                className="text-luminex-red text-sm tracking-[0.1em] uppercase font-medium inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
              >
                Ver todos
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
