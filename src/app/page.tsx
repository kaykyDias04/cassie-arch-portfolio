import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjetosSection from '@/components/ProjetosSection';
import SobreSection from '@/components/SobreSection';
import ContatoSection from '@/components/ContatoSection';
import { getProjects, getAboutData } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

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

      <main className="flex-1">
        {/* ─── Hero ──────────────────────────────────── */}
        <section
          id="home"
          className="hero-fullscreen relative w-full scroll-mt-0"
          aria-labelledby="hero-heading"
        >
          {/* Background image */}
          <img
            src="/hero-banner.jpg"
            alt="Espaço urbano à beira-mar com pórtico arquitetônico ao pôr do sol"
            className="hero-bg-image"
          />

          {/* Gradient overlays */}
          <div className="hero-overlay-bottom" />
          <div className="hero-overlay-top" />

          {/* Content */}
          <div className="hero-content">
            <div className="hero-text-block">
              <p className="hero-eyebrow animate-fade-in-up">
                Estudante de Arquitetura e Urbanismo
              </p>
              <h1
                id="hero-heading"
                className="hero-title animate-fade-in-up-delay-1"
              >
                Transformo espaços em experiências
              </h1>
              <p className="hero-subtitle animate-fade-in-up-delay-2">
                Explorando a intersecção entre forma, materialidade e luz. Projetos que traduzem conceitos sensíveis em uma arquitetura viva, funcional e integrada ao contexto urbano.
              </p>
              <div className="hero-actions animate-fade-in-up-delay-3">
                <a href="#projetos" className="hero-btn-primary">
                  Ver Projetos
                  <ArrowRight size={16} />
                </a>
                <a href="#contato" className="hero-btn-secondary">
                  Fale Comigo
                </a>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <a
            href="#projetos"
            className="hero-scroll-indicator animate-fade-in-up-delay-3"
            aria-label="Rolar para a seção de projetos"
          >
            <span className="hero-scroll-text">Explorar</span>
            <div className="hero-scroll-line" />
          </a>
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
