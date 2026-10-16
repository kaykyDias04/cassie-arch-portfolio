'use client';

import Link from 'next/link';
import { Mail, MapPin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-title-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-white font-semibold text-[15px] tracking-[0.18em] uppercase">
                Cássia
              </span>
              <span className="text-text-grey font-medium text-[15px] tracking-[0.18em] uppercase">
                Victória
              </span>
            </div>
            <p className="text-text-grey text-sm leading-relaxed max-w-sm mb-6">
              Ideias em construção. Um olhar em formação buscando traduzir conceitos em uma arquitetura contemporânea, sensível e com propósito.
            </p>
            <span className="inline-block text-[11px] tracking-[0.14em] uppercase text-text-grey/80 border border-white/10 px-3 py-1 rounded-full">
              Recife, PE • Brasil
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-5">
              Navegação
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/#home" className="text-text-grey hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/#projetos" className="text-text-grey hover:text-white transition-colors">
                  Projetos
                </Link>
              </li>
              <li>
                <Link href="/#sobre" className="text-text-grey hover:text-white transition-colors">
                  Sobre Mim
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="text-text-grey hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Back to Top */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-5">
                Contato
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:cassiavsmr012@gmail.com"
                  className="flex items-center gap-2 text-text-grey text-sm hover:text-white transition-colors"
                >
                  <Mail size={14} className="shrink-0 text-accent-red" />
                  <span className="break-all font-mono text-xs">cassiavsmr012@gmail.com</span>
                </a>
                <div className="flex items-center gap-2 text-text-grey text-sm">
                  <MapPin size={14} className="shrink-0 text-accent-red" />
                  <span>Recife, PE - Brasil</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-text-grey hover:text-white transition-colors cursor-pointer group"
                aria-label="Voltar ao topo da página"
              >
                <span>Voltar ao topo</span>
                <span className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-luminex-red group-hover:border-luminex-red transition-all">
                  <ArrowUp size={12} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-grey text-xs">
            © {currentYear} Cássia Victória. Todos os direitos reservados.
          </p>
          <p className="text-text-grey text-xs flex items-center gap-1.5">
            Portfólio de Arquitetura &amp; Urbanismo
          </p>
        </div>
      </div>
    </footer>
  );
}

