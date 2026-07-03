'use client';

import { ProjectCategory } from '@/lib/types';

interface ProjectFiltersProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
  activeSemester: string;
  onSemesterChange: (semester: string) => void;
  availableSemesters: string[];
}

const categories: ProjectCategory[] = ['Todos', 'Arquitetura', 'Urbanismo', 'Interiores'];

export default function ProjectFilters({
  activeCategory,
  onCategoryChange,
  activeSemester,
  onSemesterChange,
  availableSemesters,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col gap-3">

      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`shrink-0 snap-start text-sm tracking-[0.1em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${activeCategory === cat
                ? 'bg-luminex-red text-white font-semibold'
                : 'bg-surface text-text-grey hover:bg-luminex-red/10 hover:text-title-black font-medium border border-border-light'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {availableSemesters.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0">
          <span className="shrink-0 text-text-grey text-xs tracking-[0.15em] uppercase mr-1">
            Período:
          </span>
          {['Todos os períodos', ...availableSemesters].map((sem) => (
            <button
              key={sem}
              onClick={() => onSemesterChange(sem)}
              className={`shrink-0 snap-start text-xs tracking-[0.1em] uppercase px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeSemester === sem
                  ? 'bg-luminex-red text-white font-semibold'
                  : 'bg-surface text-text-grey hover:bg-luminex-red/10 hover:text-title-black font-medium border border-border-light'
                }`}
            >
              {sem}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
