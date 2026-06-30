'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, X } from 'lucide-react';
import { Project } from '@/lib/types';
import { deleteProjectAction } from '@/lib/actions';

export default function ProjectListItem({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl border border-border-light p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-text-grey/30 transition-colors">
        <div className="w-full sm:w-24 h-32 sm:h-16 rounded-lg overflow-hidden shrink-0">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-title-black font-medium text-base truncate">
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="bg-accent-red text-title-black text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full">
              {project.category}
            </span>
            <span className="text-text-grey text-xs">
              {new Date(project.date).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <Link
            href={`/admin/edit-project/${project.id}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-border-light rounded-lg text-text-grey text-sm hover:text-title-black hover:border-title-black transition-colors"
          >
            <Edit size={14} />
            Editar
          </Link>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-border-light rounded-lg text-text-grey text-sm hover:text-luminex-red hover:border-luminex-red transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            Excluir
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-fade-in-up">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-title-black text-xl font-semibold">
                  Confirmar Exclusão
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-text-grey hover:text-title-black transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <p className="text-text-grey mb-8">
                Tem certeza que deseja excluir o projeto <strong className="text-title-black">{project.title}</strong>? Esta ação não pode ser desfeita.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-border-light text-text-grey hover:text-title-black hover:bg-surface transition-colors font-medium text-sm"
                >
                  Cancelar
                </button>
                <form
                  action={async () => {
                    await deleteProjectAction(project.id);
                    setIsModalOpen(false);
                  }}
                >
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-luminex-red text-white hover:bg-title-black transition-colors font-medium text-sm inline-flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Sim, excluir projeto
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
