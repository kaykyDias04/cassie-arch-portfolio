import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { getAboutData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sobre Mim | Cássia Victória',
  description:
    'Conheça a história e a trajetória de Cássia Victória, estudante de arquitetura e urbanismo.',
};

export const dynamic = 'force-dynamic';

export default async function SobrePage() {
  const aboutData = await getAboutData();

  return (
    <>
      <Header />

      <main className="flex-1 pt-20">
        <section className="py-20">
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
                <h1 className="mb-8 animate-fade-in-up" style={{ fontStyle: 'italic', fontWeight: 400 }}>
                  Cássia Victória
                </h1>

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
      </main>

      <Footer />
    </>
  );
}
