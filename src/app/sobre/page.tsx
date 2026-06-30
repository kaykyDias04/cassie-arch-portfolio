import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { getAboutData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sobre Mim | Cássia Victória',
  description:
    'Conheça a história e a equipe do escritório Cássia Victória, referência em projetos contemporâneos.',
};

export const dynamic = 'force-dynamic';

export default async function SobrePage() {
  const aboutData = await getAboutData();

  return (
    <>
      <Header />

      <main className="flex-1 pt-20">
        <section className="min-h-[calc(100vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
            <div className="relative h-[50vh] lg:h-auto">
              <img
                src={aboutData.photo}
                alt="Cassie Moretti - Arquiteta"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center px-8 lg:px-16 py-16 lg:py-24">
              <div className="max-w-lg">
                <h1 className="mb-10 animate-fade-in-up" style={{ fontStyle: 'italic', fontWeight: 400 }}>
                  Sobre Mim
                </h1>

                <div className="space-y-5 animate-fade-in-up-delay-1">
                  {aboutData.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[17px] leading-[28px] text-title-black/80"
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
