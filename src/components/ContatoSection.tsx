'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Pen, Check, ArrowUpRight, Copy } from 'lucide-react';

export default function ContatoSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(type);
    setTimeout(() => setCopied(null), 2200);
  };

  return (
    <section
      id="contato"
      className="py-24 bg-white border-t border-border-light scroll-mt-20"
      aria-labelledby="contato-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-title-black/55 text-xs tracking-[0.25em] uppercase mb-3 animate-fade-in-up">
            Contato
          </p>
          <h2
            id="contato-heading"
            className="text-3xl md:text-5xl font-medium tracking-tight animate-fade-in-up-delay-1 mb-6"
          >
            Vamos conversar sobre seu{' '}
            <span className="text-luminex-red font-semibold">projeto</span>
          </h2>
          <p className="text-[#4a4a4a] text-base md:text-lg leading-relaxed animate-fade-in-up-delay-2 max-w-2xl mx-auto">
            Disponível para novos projetos de arquitetura, interiores e consultorias urbanas.
            Entre em contato pelo canal que for mais conveniente para você.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Email Card */}
          <div className="group relative bg-surface rounded-2xl p-8 text-center border border-border-light hover:border-luminex-red/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-accent-red/50 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-luminex-red transition-all duration-300">
                <Mail size={22} className="text-luminex-red group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-title-black font-semibold text-base mb-2">E-mail</h3>
              <p className="text-title-black/70 text-xs md:text-sm break-all tracking-wide">
                cassiavsmr012@gmail.com
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border-light/80 flex items-center justify-center gap-3">
              <a
                href="mailto:cassiavsmr012@gmail.com"
                className="text-xs text-luminex-red hover:underline underline-offset-4 font-medium inline-flex items-center gap-1"
              >
                Enviar e-mail <ArrowUpRight size={13} />
              </a>
              <span className="text-border-light" aria-hidden="true">•</span>
              <button
                type="button"
                onClick={() => handleCopy('cassiavsmr012@gmail.com', 'email')}
                aria-label="Copiar endereço de e-mail"
                className="text-xs text-title-black/65 hover:text-title-black transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                {copied === 'email' ? (
                  <span role="status" aria-live="polite" className="text-green-700 font-medium inline-flex items-center gap-1">
                    <Check size={12} /> Copiado!
                  </span>
                ) : (
                  <>
                    <Copy size={11} /> Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Telefone / WhatsApp Card */}
          <div className="group relative bg-surface rounded-2xl p-8 text-center border border-border-light hover:border-luminex-red/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-accent-red/50 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-luminex-red transition-all duration-300">
                <Phone size={22} className="text-luminex-red group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-title-black font-semibold text-base mb-2">WhatsApp</h3>
              <p className="text-title-black/70 text-xs md:text-sm tracking-wide">
                +55 (81) 98415-0353
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border-light/80 flex items-center justify-center gap-3">
              <a
                href="https://wa.me/5581984150353?text=Ol%C3%A1%20C%C3%A1ssia%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-luminex-red hover:underline underline-offset-4 font-medium inline-flex items-center gap-1"
              >
                Conversar <ArrowUpRight size={13} />
              </a>
              <span className="text-border-light" aria-hidden="true">•</span>
              <button
                type="button"
                onClick={() => handleCopy('+5581984150353', 'phone')}
                aria-label="Copiar número de WhatsApp"
                className="text-xs text-title-black/65 hover:text-title-black transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                {copied === 'phone' ? (
                  <span role="status" aria-live="polite" className="text-green-700 font-medium inline-flex items-center gap-1">
                    <Check size={12} /> Copiado!
                  </span>
                ) : (
                  <>
                    <Copy size={11} /> Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Endereço Card */}
          <div className="group relative bg-surface rounded-2xl p-8 text-center border border-border-light hover:border-luminex-red/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-accent-red/50 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-luminex-red transition-all duration-300">
                <MapPin size={22} className="text-luminex-red group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-title-black font-semibold text-base mb-2">Localização</h3>
              <p className="text-title-black/70 text-xs md:text-sm">
                Recife, PE — Brasil
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border-light/80 text-xs text-title-black/65">
              Atendimento presencial &amp; remoto
            </div>
          </div>

          {/* Behance Card */}
          <div className="group relative bg-surface rounded-2xl p-8 text-center border border-border-light hover:border-luminex-red/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-accent-red/50 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-luminex-red transition-all duration-300">
                <Pen size={22} className="text-luminex-red group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-title-black font-semibold text-base mb-2">Behance</h3>
              <p className="text-title-black/70 text-xs md:text-sm">Portfólio gráfico &amp; estudos</p>
            </div>

            <div className="mt-6 pt-4 border-t border-border-light/80 flex items-center justify-center">
              <a
                href="https://www.behance.net/cassiavictoria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-luminex-red hover:underline underline-offset-4 font-medium inline-flex items-center gap-1"
              >
                Acessar perfil <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
