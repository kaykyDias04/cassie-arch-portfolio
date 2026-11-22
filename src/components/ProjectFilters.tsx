'use client';

import { X } from 'lucide-react';
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
    <div className="flex flex-col gap-4 p-4 sm:p-5 rounded-2xl bg-surface/70 border border-border-light">
      {/* Category Pills */}
      <div
        role="group"
        aria-label="Filtrar projetos por categoria"
        className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={isActive}
              onClick={() => onCategoryChange(cat)}
              className={`shrink-0 snap-start text-xs tracking-[0.14em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-luminex-red text-white font-semibold shadow-sm shadow-luminex-red/20'
                  : 'bg-white text-title-black/70 hover:text-title-black hover:border-title-black/25 font-medium border border-border-light'
              }`}
            >
              {cat}
            </button>
          );
        })}

        {isFiltered && onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="shrink-0 inline-flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-luminex-red hover:bg-accent-red/40 px-3.5 py-2 rounded-full transition-colors cursor-pointer font-medium md:ml-auto"
          >
            <X size={13} />
            Limpar filtros
          </button>
        )}
      </div>

      {/* Semester/Period Selector */}
      {availableSemesters.length > 0 && (
        <div
          role="group"
          aria-label="Filtrar projetos por período"
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0 pt-3 border-t border-border-light/80"
        >
          <span className="shrink-0 text-title-black/60 text-[11px] tracking-[0.18em] uppercase mr-1 font-medium">
            Período:
          </span>
          {['Todos os períodos', ...availableSemesters].map((sem) => {
            const isActive = activeSemester === sem;
            return (
              <button
                key={sem}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSemesterChange(sem)}
                className={`shrink-0 snap-start text-[11px] tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-title-black text-white font-semibold'
                    : 'bg-white text-title-black/65 hover:text-title-black hover:border-title-black/25 font-medium border border-border-light'
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
