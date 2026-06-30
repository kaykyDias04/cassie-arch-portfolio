import Link from 'next/link';
import { Camera, CirclePlay, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-title-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 border-2 border-white flex items-center justify-center rounded-sm">
                <span className="text-white font-semibold text-base">C</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-white font-semibold text-[14px] tracking-wide uppercase">
                  Cássia
                </span>
                <span className="text-text-grey text-[9px] tracking-[0.2em] uppercase">
                  Victória
                </span>
              </div>
            </div>
            <p className="text-text-grey text-sm leading-relaxed max-w-xs">
              Ideias em construção. Um olhar em formação buscando traduzir conceitos em uma arquitetura contemporânea e com propósito.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-text-grey text-sm">
                <Mail size={14} />
                <span>contato@cassiearquitetura.com</span>
              </div>
              <div className="flex items-center gap-2 text-text-grey text-sm">
                <MapPin size={14} />
                <span>Recife, PE - Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-grey text-xs">
            © {currentYear} Cássia Victória. Todos os direitos reservados.
          </p>
          <p className="text-text-grey text-xs">
            Design & Desenvolvimento com ♥
          </p>
        </div>
      </div>
    </footer>
  );
}
