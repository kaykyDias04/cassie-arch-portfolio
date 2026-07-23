import { AboutData } from '@/lib/types';

interface SobreSectionProps {
  aboutData: AboutData;
}

export default function SobreSection({ aboutData }: SobreSectionProps) {
  return (
    <section id="sobre" className="py-20 scroll-mt-20" aria-labelledby="sobre-heading">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          <div className="w-full lg:w-[42%] shrink-0">
            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-surface">
              <img
                src={aboutData.photo}
                alt="Cássia Victória - Arquitetura"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 py-4 lg:py-8">
            <p className="text-text-grey text-sm tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
              Sobre Mim
            </p>
            <h2 id="sobre-heading" className="mb-8 animate-fade-in-up" style={{ fontStyle: 'italic', fontWeight: 400 }}>
              Cássia Victória
            </h2>

            <div className="space-y-5 animate-fade-in-up-delay-1">
              {aboutData.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[17px] leading-[28px] text-[#444444]"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
