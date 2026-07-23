import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-title-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-white font-semibold text-[14px] tracking-wide uppercase">
                Cássia
              </span>
              <span className="text-text-grey font-medium text-[14px] tracking-[0.15em] uppercase">
                Victória
              </span>
            </div>
            <p className="text-text-grey text-sm leading-relaxed max-w-xs">
              Ideias em construção. Um olhar em formação buscando traduzir conceitos em uma arquitetura contemporânea e com propósito.
            </p>
          </div>

          <div />

          <div className="md:text-right">
            <h4 className="text-white font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-text-grey text-sm md:justify-end">
                <Mail size={14} />
                <span>cassiavsmr012@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-text-grey text-sm md:justify-end">
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
            Design &amp; Desenvolvimento com ♥
          </p>
        </div>
      </div>
    </footer>
  );
}
