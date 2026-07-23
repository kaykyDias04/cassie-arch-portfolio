import { Mail, MapPin, Phone, Pen } from 'lucide-react';

export default function ContatoSection() {
  return (
    <section id="contato" className="py-20 scroll-mt-20" aria-labelledby="contato-heading">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-text-grey text-sm tracking-[0.2em] uppercase mb-3 animate-fade-in-up">
            Contato
          </p>
          <h2 id="contato-heading" className="animate-fade-in-up-delay-1 mb-6">
            Vamos conversar sobre seu{' '}
            <span className="text-luminex-red">projeto</span>
          </h2>
          <p className="text-[#555555] text-lg leading-relaxed animate-fade-in-up-delay-2">
            Estou pronta para transformar sua visão em realidade.
            Entre em contato e vamos iniciar essa jornada juntos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <a
            href="https://mail.google.com/mail/?view=cm&to=cassiavsmr012@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-surface rounded-2xl p-8 text-center hover:bg-accent-red/30 transition-all duration-300 animate-fade-in-up"
          >
            <div className="w-14 h-14 bg-accent-red rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-luminex-red group-hover:text-white transition-all duration-300">
              <Mail size={22} className="text-luminex-red group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-title-black font-semibold text-base mb-2">Email</h3>
            <p className="text-text-grey text-sm">cassiavsmr012@gmail.com</p>
          </a>

          <a
            href="https://wa.me/5581984150353"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-surface rounded-2xl p-8 text-center hover:bg-accent-red/30 transition-all duration-300 animate-fade-in-up-delay-1"
          >
            <div className="w-14 h-14 bg-accent-red rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-luminex-red group-hover:text-white transition-all duration-300">
              <Phone size={22} className="text-luminex-red group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-title-black font-semibold text-base mb-2">Telefone</h3>
            <p className="text-text-grey text-sm">+55 (81) 98415-0353</p>
          </a>

          <div className="group bg-surface rounded-2xl p-8 text-center hover:bg-accent-red/30 transition-all duration-300 animate-fade-in-up-delay-2">
            <div className="w-14 h-14 bg-accent-red rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-luminex-red group-hover:text-white transition-all duration-300">
              <MapPin size={22} className="text-luminex-red group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-title-black font-semibold text-base mb-2">Endereço</h3>
            <p className="text-text-grey text-sm">
              Recife<br />PE - Brasil
            </p>
          </div>

          <a
            href="https://www.behance.net/cassiavictoria"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-surface rounded-2xl p-8 text-center hover:bg-accent-red/30 transition-all duration-300 animate-fade-in-up-delay-3"
          >
            <div className="w-14 h-14 bg-accent-red rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-luminex-red group-hover:text-white transition-all duration-300">
              <Pen size={22} className="text-luminex-red group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-title-black font-semibold text-base mb-2">Behance</h3>
            <p className="text-text-grey text-sm">Portfólio completo</p>
          </a>
        </div>
      </div>
    </section>
  );
}
