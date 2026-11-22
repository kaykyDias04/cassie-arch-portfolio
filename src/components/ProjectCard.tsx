import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { formatProjectCardDate } from '@/lib/date';
import { ProjectSummary } from '@/lib/types';
import { urlFor } from '@/sanity/image';

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

  const formattedDate = formatProjectCardDate(project.date);

  return (
    <Link
      href={`/projetos/${project.slug}`}
      className={`group block rounded-2xl animate-fade-in-up ${delayClass} focus-visible:outline-2 focus-visible:outline-luminex-red focus-visible:outline-offset-4`}
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-surface border border-border-light shadow-2xs transition-all duration-500 group-hover:shadow-xl group-hover:border-luminex-red/25">
        <img
          src={urlFor(project.coverImage).width(960).height(720).url()}
          alt={project.coverImage.alt || project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* Subtle dark gradient overlay on hover for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/95 backdrop-blur-md text-title-black text-[10px] tracking-[0.16em] uppercase font-semibold px-3.5 py-1.5 rounded-full shadow-xs border border-white/60">
            {project.category}
          </span>
        </div>

        {/* Floating architectural arrow indicator */}
        <div
          aria-hidden="true"
          className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white text-luminex-red flex items-center justify-center shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Card Info & Title */}
      <div className="pt-4 pb-2 px-1 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-title-black/55 text-[11px] tracking-[0.16em] uppercase font-medium">
            {formattedDate}
          </span>
          <span className="text-luminex-red text-[11px] tracking-[0.12em] uppercase font-semibold inline-flex items-center gap-0.5 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Ver projeto
            <ArrowUpRight size={13} />
          </span>
        </div>

        <h3 className="text-xl lg:text-[22px] leading-snug font-medium text-title-black group-hover:text-luminex-red transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>

        <div
          aria-hidden="true"
          className="mt-1 h-[1.5px] w-full bg-border-light overflow-hidden rounded-full"
        >
          <div className="h-full w-full bg-luminex-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
        </div>
      </div>
    </Link>
  );
}
