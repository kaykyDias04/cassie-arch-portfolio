'use client';

import { ProjectCategory } from '@/lib/types';

interface ProjectFiltersProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
  activeSemester: string;
  onSemesterChange: (semester: string) => void;
  availableSemesters: string[];
  onResetFilters?: () => void;
}

const categories: ProjectCategory[] = ['Todos', 'Arquitetura', 'Urbanismo', 'Interiores'];

export default function ProjectFilters({
  activeCategory,
  onCategoryChange,
  activeSemester,
  onSemesterChange,
  availableSemesters,
  onResetFilters,
}: ProjectFiltersProps) {
  const isFiltered = activeCategory !== 'Todos' || activeSemester !== 'Todos os períodos';

  return (
    <div className="flex flex-col gap-4">
      {/* Category Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`shrink-0 snap-start text-xs tracking-[0.14em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-luminex-red text-white font-semibold shadow-sm shadow-luminex-red/20'
                  : 'bg-surface text-text-grey hover:bg-surface hover:text-title-black hover:border-text-grey/40 font-medium border border-border-light'
              }`}
            >
              {cat}
            </button>
          );
        })}

        {isFiltered && onResetFilters && (
          <button
            onClick={onResetFilters}
            className="shrink-0 text-xs tracking-[0.1em] text-luminex-red hover:underline ml-2 cursor-pointer font-medium"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Semester/Period Selector */}
      {availableSemesters.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0 pt-1">
          <span className="shrink-0 text-text-grey text-[11px] tracking-[0.18em] uppercase mr-1">
            Período:
          </span>
          {['Todos os períodos', ...availableSemesters].map((sem) => {
            const isActive = activeSemester === sem;
            return (
              <button
                key={sem}
                onClick={() => onSemesterChange(sem)}
                className={`shrink-0 snap-start text-[11px] tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-title-black text-white font-semibold'
                    : 'bg-surface text-text-grey hover:text-title-black font-medium border border-border-light'
                }`}
              >
                {sem}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

