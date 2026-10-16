import Link from 'next/link';
import { ProjectSummary } from '@/lib/types';
import { urlFor } from '@/sanity/image';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectSummary;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const delayClass =
    index % 4 === 0
      ? ''
      : index % 4 === 1
        ? 'animate-fade-in-up-delay-1'
        : index % 4 === 2
          ? 'animate-fade-in-up-delay-2'
          : 'animate-fade-in-up-delay-3';

  const formattedDate = new Date(project.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <Link
      href={`/projetos/${project.slug}`}
      className={`group block animate-fade-in-up ${delayClass}`}
    >
      <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-surface border border-border-light/80 shadow-xs transition-all duration-500 group-hover:shadow-xl group-hover:border-border-light">
        <img
          src={urlFor(project.coverImage).width(800).height(600).url()}
          alt={project.coverImage.alt || project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* Subtle dark gradient overlay on hover for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/95 backdrop-blur-md text-title-black text-[10px] tracking-[0.16em] uppercase font-semibold px-3 py-1.5 rounded-full shadow-xs border border-white/40">
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Info & Title */}
      <div className="pt-4 pb-2 px-1 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-text-grey text-[11px] tracking-[0.16em] uppercase font-medium">
            {formattedDate}
          </span>
          <span className="text-luminex-red text-[11px] tracking-[0.12em] uppercase font-semibold inline-flex items-center gap-0.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Ver projeto
            <ArrowUpRight size={14} />
          </span>
        </div>

        <h3 className="text-xl lg:text-[22px] leading-snug font-medium text-title-black group-hover:text-luminex-red transition-colors duration-300 line-clamp-1">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}

