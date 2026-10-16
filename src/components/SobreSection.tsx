import { BioContent } from '@/components/PortableTextContent';
import { AboutData } from '@/lib/types';
import { urlFor } from '@/sanity/image';

interface SobreSectionProps {
  aboutData: AboutData;
}

export default function SobreSection({ aboutData }: SobreSectionProps) {
  return (
    <section id="sobre" className="py-24 bg-surface/50 border-t border-border-light scroll-mt-20" aria-labelledby="sobre-heading">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">

          {/* Photo Column with Architectural Framing */}
          <div className="w-full max-w-md lg:max-w-none lg:w-[42%] shrink-0">
            <div className="relative">
              {/* Architectural accent frame behind image */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-accent-red/40 via-surface to-transparent -z-10 transform rotate-1 hidden sm:block" />
              
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-surface shadow-xl border border-border-light">
                <img
                  src={urlFor(aboutData.photo).width(900).height(1200).url()}
                  alt="Cássia Victória - Arquitetura e Urbanismo"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>

              {/* Location & Specialty badge */}
              <div className="mt-4 flex items-center justify-between px-2 text-xs text-text-grey tracking-[0.12em] uppercase">
                <span>Recife, PE • Brasil</span>
                <span className="text-luminex-red font-medium">Arquitetura &amp; Urbanismo</span>
              </div>
            </div>
          </div>

          {/* Bio Text Column */}
          <div className="flex-1 py-2 lg:py-6">
            <p className="text-text-grey text-xs tracking-[0.25em] uppercase mb-3 animate-fade-in-up">
              Sobre Mim
            </p>
            <h2 id="sobre-heading" className="text-3xl md:text-5xl font-medium tracking-tight mb-8 animate-fade-in-up" style={{ fontStyle: 'italic' }}>
              Cássia Victória
            </h2>

            <BioContent value={aboutData.bio} />

            {/* Architectural Pillars / Tags */}
            {aboutData.areasOfFocus.length > 0 && (
              <div className="pt-6 border-t border-border-light flex flex-wrap items-center gap-3">
                <span className="text-xs tracking-[0.14em] uppercase text-text-grey mr-2">
                  Foco de Atuação:
                </span>
                {aboutData.areasOfFocus.map((area) => (
                  <span
                    key={area}
                    className="text-xs tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full bg-white border border-border-light text-title-black font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
