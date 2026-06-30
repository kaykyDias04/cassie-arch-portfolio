import Link from 'next/link';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
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

  return (
    <Link
      href={`/projetos/${project.slug}`}
      className={`group block animate-fade-in-up ${delayClass}`}
    >
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-surface">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-luminex-red/0 group-hover:bg-luminex-red/10 transition-colors duration-500" />
        
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-title-black text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1.5 rounded-full">
            {project.category}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-title-black font-medium text-lg group-hover:text-luminex-red transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-text-grey text-sm">
          {new Date(project.date).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
          })}
        </p>
      </div>
    </Link>
  );
}
