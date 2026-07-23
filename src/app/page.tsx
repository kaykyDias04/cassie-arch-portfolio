import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjetosSection from '@/components/ProjetosSection';
import SobreSection from '@/components/SobreSection';
import ContatoSection from '@/components/ContatoSection';
import { getProjects, getAboutData } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  let aboutData: Awaited<ReturnType<typeof getAboutData>> | null = null;

  try {
    [projects, aboutData] = await Promise.all([getProjects(), getAboutData()]);
  } catch (error) {
    console.error('Erro ao carregar dados da home:', error);
  }

  return (
    <>
      <Header />

      <main className="flex-1 pt-20">
        {/* ─── Hero ──────────────────────────────────── */}
        <section id="home" className="relative min-h-[calc(100vh-5rem)] flex items-center scroll-mt-20" aria-labelledby="hero-heading">
          <div className="max-w-[1400px] mx-auto px-6 py-14 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              <div>
                <p className="text-text-grey text-sm tracking-[0.2em] uppercase mb-6 animate-fade-in-up">
                  Estudante de Arquitetura e Urbanismo
                </p>
                <h1 id="hero-heading" className="animate-fade-in-up-delay-1 mb-6">
                  Transformo espaços em{' '}
                  <span className="text-luminex-red">experiências</span>
                </h1>
                <p className="text-[#555555] text-lg leading-relaxed max-w-xl mb-10 animate-fade-in-up-delay-2">
                  Crio projetos de arquitetura, urbanismo e interiores com design
                  contemporâneo, funcionalidade e sensibilidade ao contexto.
                </p>
                <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-3">
                  <a
                    href="#projetos"
                    className="inline-flex items-center gap-2 bg-title-black text-white px-8 py-3.5 rounded-full text-sm tracking-[0.1em] uppercase font-medium hover:bg-luminex-red transition-colors duration-300"
                  >
                    Ver Projetos
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-2 border border-title-black text-title-black px-8 py-3.5 rounded-full text-sm tracking-[0.1em] uppercase font-medium hover:bg-luminex-red hover:text-white transition-colors duration-300"
                  >
                    Fale Comigo
                  </a>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-end animate-fade-in-up-delay-2">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-surface border-2 border-dashed border-border-light flex flex-col items-center justify-center gap-3 text-text-grey">
                  <img
                    src="u21095pig24ms_600.webp"
                    alt="Foto de perfil de Cassia Oliveira"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Projetos ─────────────────────────────── */}
        <ProjetosSection projects={projects} />

        {/* ─── Sobre ────────────────────────────────── */}
        {aboutData && <SobreSection aboutData={aboutData} />}

        {/* ─── Contato ──────────────────────────────── */}
        <ContatoSection />
      </main>

      <Footer />
    </>
  );
}
