import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContatoSection from '@/components/ContatoSection';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato | Cássia Victória',
  description: 'Entre em contato com Cássia Victória para o seu próximo projeto de arquitetura.',
};

export default function ContatoPage() {
  return (
    <>
      <Header />

      <main className="flex-1 pt-20">
        <div className="max-w-[1400px] mx-auto px-6 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-grey text-xs tracking-[0.14em] uppercase font-medium hover:text-title-black transition-colors"
          >
            <ArrowLeft size={14} />
            Voltar para início
          </Link>
        </div>

        <ContatoSection />
      </main>

      <Footer />
    </>
  );
}

