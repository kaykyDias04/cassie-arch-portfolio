import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SobreSection from '@/components/SobreSection';
import { getAboutData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sobre Mim | Cássia Victória',
  description:
    'Conheça a história e a trajetória de Cássia Victória, estudante de arquitetura e urbanismo.',
};

export default async function SobrePage() {
  const aboutData = await getAboutData();
  if (!aboutData) notFound();

  return (
    <>
      <Header />

      <main id="main-content" className="flex-1 pt-20">
        <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-title-black/60 text-xs tracking-[0.14em] uppercase font-medium hover:text-luminex-red transition-colors"
          >
            <ArrowLeft size={14} />
            Voltar para início
          </Link>
        </div>

        <SobreSection aboutData={aboutData} isStandalonePage />
      </main>

      <Footer />
    </>
  );
}
