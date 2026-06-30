'use client';

import { ProjectCategory } from '@/lib/types';

interface ProjectFiltersProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}

const categories: ProjectCategory[] = ['Todos', 'Arquitetura', 'Urbanismo', 'Interiores'];

export default function ProjectFilters({
  activeCategory,
  onCategoryChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`text-sm tracking-[0.1em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
            activeCategory === cat
              ? 'bg-title-black text-white font-semibold'
              : 'bg-surface text-text-grey hover:bg-accent-red hover:text-title-black font-medium border border-border-light'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
