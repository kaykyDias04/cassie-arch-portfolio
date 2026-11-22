import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BioContent } from '@/components/PortableTextContent';
import { AboutData } from '@/lib/types';
import { urlFor } from '@/sanity/image';

interface SobreSectionProps {
  aboutData: AboutData;
  isStandalonePage?: boolean;
}

export default function SobreSection({
  aboutData,
  isStandalonePage = false,
}: SobreSectionProps) {
  return (
    <section
      id={isStandalonePage ? undefined : 'sobre'}
      className={`${isStandalonePage ? 'py-12 pb-24' : 'py-24 bg-surface/60 border-t border-border-light scroll-mt-20'}`}
      aria-labelledby="sobre-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          {/* Photo Column with Architectural Framing */}
          <div className="w-full max-w-md lg:max-w-none lg:w-[42%] shrink-0">
            <div className="relative">
              {/* Architectural accent frame behind image */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-accent-red/50 via-surface to-transparent -z-10 transform rotate-1 hidden sm:block"
              />

              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-surface shadow-xl border border-border-light">
                <img
                  src={urlFor(aboutData.photo).width(900).height(1200).url()}
                  alt="Cássia Victória - Arquitetura e Urbanismo"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  loading={isStandalonePage ? 'eager' : 'lazy'}
                />
              </div>

              {/* Location & Specialty badge */}
              <div className="mt-4 flex items-center justify-between px-2 text-xs text-title-black/60 tracking-[0.12em] uppercase">
                <span>Recife, PE • Brasil</span>
                <span className="text-luminex-red font-medium">Arquitetura &amp; Urbanismo</span>
              </div>
            </div>
          </div>

          {/* Bio Text Column */}
          <div className="flex-1 py-2 lg:py-6">
            <p className="text-title-black/55 text-xs tracking-[0.25em] uppercase mb-3 animate-fade-in-up">
              Sobre Mim
            </p>

            {isStandalonePage ? (
              <h1
                id="sobre-heading"
                className="text-4xl md:text-6xl font-medium tracking-tight mb-8 animate-fade-in-up italic"
              >
                Cássia Victória
              </h1>
            ) : (
              <h2
                id="sobre-heading"
                className="text-3xl md:text-5xl font-medium tracking-tight mb-8 animate-fade-in-up italic"
              >
                Cássia Victória
              </h2>
            )}

            <BioContent value={aboutData.bio} />

            {/* Architectural Pillars / Tags */}
            {aboutData.areasOfFocus.length > 0 && (
              <div className="pt-6 border-t border-border-light flex flex-wrap items-center gap-3">
                <span className="text-xs tracking-[0.14em] uppercase text-title-black/60 mr-1 font-medium">
                  Foco de Atuação:
                </span>
                {aboutData.areasOfFocus.map((area) => (
                  <span
                    key={area}
                    className="text-xs tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full bg-white border border-border-light text-title-black font-medium shadow-2xs"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}

            {isStandalonePage && (
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/projetos"
                  className="inline-flex items-center gap-2 bg-luminex-red text-white px-7 py-3 rounded-full text-xs tracking-[0.14em] uppercase font-medium hover:bg-title-black transition-colors duration-300 shadow-sm"
                >
                  <span>Explorar projetos</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 bg-surface border border-border-light text-title-black px-7 py-3 rounded-full text-xs tracking-[0.14em] uppercase font-medium hover:border-luminex-red hover:text-luminex-red transition-colors duration-300"
                >
                  Entrar em contato
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
