'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjetosSection from '@/components/ProjetosSection';
import { ProjectSummary } from '@/lib/types';

interface ProjetosClientProps {
  projects: ProjectSummary[];
}

export default function ProjetosClient({ projects }: ProjetosClientProps) {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-1 pt-20">
        <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-title-black/60 text-xs tracking-[0.14em] uppercase font-medium hover:text-luminex-red transition-colors"
          >
            <ArrowLeft size={14} />
            Voltar para início
          </Link>
        </div>

        <ProjetosSection projects={projects} isStandalonePage />
      </main>

      <Footer />
    </>
  );
}
