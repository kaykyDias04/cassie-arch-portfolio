import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BioContent } from '@/components/PortableTextContent';
import { getAboutData } from '@/lib/data';
import { urlFor } from '@/sanity/image';

export const metadata: Metadata = {
  title: 'Sobre Mim | Cássia Victória',
  description:
    'Conheça a história e a trajetória de Cássia Victória, estudante de arquitetura e urbanismo.',
};

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function SobrePage() {
  const aboutData = await getAboutData();
  if (!aboutData) notFound();

  return (
    <>
      <Header />

      <main className="flex-1 pt-20">
        <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-grey text-xs tracking-[0.14em] uppercase font-medium hover:text-title-black transition-colors"
          >
            <ArrowLeft size={14} />
            Voltar para início
          </Link>
        </div>

        <section className="py-12 pb-24">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">

              <div className="w-full max-w-md lg:max-w-none lg:w-[42%] shrink-0">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-accent-red/40 via-surface to-transparent -z-10 transform rotate-1 hidden sm:block" />
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-surface shadow-xl border border-border-light">
                    <img
                      src={urlFor(aboutData.photo).width(900).height(1200).url()}
                      alt="Cássia Victória - Arquitetura e Urbanismo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between px-2 text-xs text-text-grey tracking-[0.12em] uppercase">
                    <span>Recife, PE • Brasil</span>
                    <span className="text-luminex-red font-medium">Arquitetura &amp; Urbanismo</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 py-2 lg:py-6">
                <p className="text-text-grey text-xs tracking-[0.25em] uppercase mb-3 animate-fade-in-up">
                  Sobre Mim
                </p>
                <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 animate-fade-in-up" style={{ fontStyle: 'italic' }}>
                  Cássia Victória
                </h1>

                <BioContent value={aboutData.bio} />

                {aboutData.areasOfFocus.length > 0 && (
                  <div className="pt-6 border-t border-border-light flex flex-wrap items-center gap-3">
                    <span className="text-xs tracking-[0.14em] uppercase text-text-grey mr-2">
                      Foco de Atuação:
                    </span>
                    {aboutData.areasOfFocus.map((area) => (
                      <span
                        key={area}
                        className="text-xs tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full bg-surface border border-border-light text-title-black font-medium"
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
      </main>


      <Footer />
    </>
  );
}
