import Link from 'next/link';
import { getProjects } from '@/lib/data';
import { Plus } from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import ProjectListItem from './ProjectListItem';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const projects = await getProjects();
  projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <AdminHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-title-black text-2xl font-semibold">Projetos</h2>
            <p className="text-text-grey text-sm mt-1">
              {projects.length} projeto{projects.length !== 1 ? 's' : ''} cadastrado{projects.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/admin/new-project"
            className="inline-flex items-center gap-2 bg-title-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-luminex-red transition-colors duration-300"
          >
            <Plus size={18} />
            Adicionar Novo Projeto
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-xl border border-border-light p-16 text-center">
            <p className="text-text-grey text-lg mb-4">
              Nenhum projeto cadastrado ainda.
            </p>
            <Link
              href="/admin/new-project"
              className="inline-flex items-center gap-2 text-luminex-red text-sm font-medium"
            >
              <Plus size={16} />
              Criar primeiro projeto
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
