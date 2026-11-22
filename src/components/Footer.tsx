'use client';

import Link from 'next/link';
import { Mail, MapPin, ArrowUp, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-title-black text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-white font-semibold text-[15px] tracking-[0.18em] uppercase">
                Cássia
              </span>
              <span className="text-accent-red font-medium text-[15px] tracking-[0.18em] uppercase">
                Victória
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">
              Ideias em construção. Um olhar em formação buscando traduzir conceitos em uma arquitetura contemporânea, sensível e com propósito.
            </p>
            <span className="inline-block text-[11px] tracking-[0.14em] uppercase text-white/70 border border-white/15 px-3.5 py-1.5 rounded-full">
              Recife, PE • Brasil
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-5">
              Navegação
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link
                  href="/#home"
                  className="text-white/70 hover:text-white transition-colors focus-visible:outline-white rounded-xs"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/#projetos"
                  className="text-white/70 hover:text-white transition-colors focus-visible:outline-white rounded-xs"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  href="/#sobre"
                  className="text-white/70 hover:text-white transition-colors focus-visible:outline-white rounded-xs"
                >
                  Sobre Mim
                </Link>
              </li>
              <li>
                <Link
                  href="/#contato"
                  className="text-white/70 hover:text-white transition-colors focus-visible:outline-white rounded-xs"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Back to Top */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-5">
                Contato
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:cassiavsmr012@gmail.com"
                  className="flex items-center gap-2 text-white/75 text-sm hover:text-white transition-colors focus-visible:outline-white rounded-xs"
                >
                  <Mail size={14} className="shrink-0 text-accent-red" />
                  <span className="break-all text-xs tracking-wide">cassiavsmr012@gmail.com</span>
                </a>
                <a
                  href="https://www.behance.net/cassiavictoria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/75 text-sm hover:text-white transition-colors focus-visible:outline-white rounded-xs"
                >
                  <span>Behance</span>
                  <ArrowUpRight size={13} className="text-accent-red" />
                </a>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <MapPin size={14} className="shrink-0 text-accent-red" />
                  <span>Recife, PE - Brasil</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2.5 text-xs tracking-[0.15em] uppercase text-white/75 hover:text-white transition-colors cursor-pointer group focus-visible:outline-white rounded-full"
                aria-label="Voltar ao topo da página"
              >
                <span>Voltar ao topo</span>
                <span className="p-2 rounded-full bg-white/8 border border-white/15 group-hover:bg-luminex-red group-hover:border-luminex-red transition-all">
                  <ArrowUp size={12} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-xs" suppressHydrationWarning>
            © {currentYear} Cássia Victória. Todos os direitos reservados.
          </p>
          <p className="text-white/60 text-xs flex items-center gap-1.5 tracking-wide">
            Portfólio de Arquitetura &amp; Urbanismo
          </p>
        </div>
      </div>
    </footer>
  );
}
