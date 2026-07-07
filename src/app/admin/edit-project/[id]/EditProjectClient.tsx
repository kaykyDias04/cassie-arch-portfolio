'use client';

import { useState } from 'react';
import Link from 'next/link';
import RichTextEditor from '@/components/RichTextEditor';
import { updateProjectAction } from '@/lib/actions';
import { Project } from '@/lib/types';
import { ArrowLeft, Save, ImageIcon } from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';

interface EditProjectClientProps {
  project: Project;
}

export default function EditProjectClient({ project }: EditProjectClientProps) {
  const [content, setContent] = useState(project.content);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(project.coverImage);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError('');

    formData.set('content', content);
    formData.set('id', project.id);
    formData.set('existingCoverImage', project.coverImage);

    if (!content || content === '<p></p>') {
      setError('O conteúdo do projeto é obrigatório.');
      setLoading(false);
      return;
    }

    const result = await updateProjectAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCoverPreview(project.coverImage);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <AdminHeader />

      <div className="bg-white border-b border-border-light">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-text-grey text-sm hover:text-title-black transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao dashboard
          </Link>
          <h1 className="text-title-black font-semibold text-base">Editar Projeto</h1>
        </div>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
        <form action={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-luminex-red/10 border border-luminex-red/20 text-luminex-red text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-title-black text-sm font-medium mb-2">
                Título do Projeto *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                defaultValue={project.title}
                className="w-full px-4 py-3 bg-white border border-border-light rounded-lg text-title-black text-sm focus:outline-none focus:border-title-black transition-colors"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-title-black text-sm font-medium mb-2">
                Data *
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                defaultValue={project.date}
                className="w-full px-4 py-3 bg-white border border-border-light rounded-lg text-title-black text-sm focus:outline-none focus:border-title-black transition-colors"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-title-black text-sm font-medium mb-2">
                Categoria *
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue={project.category}
                className="w-full px-4 py-3 bg-white border border-border-light rounded-lg text-title-black text-sm focus:outline-none focus:border-title-black transition-colors appearance-none cursor-pointer"
              >
                <option value="Arquitetura">Arquitetura</option>
                <option value="Urbanismo">Urbanismo</option>
                <option value="Interiores">Interiores</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-title-black text-sm font-medium mb-2">
                Imagem de Capa *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-light border-dashed rounded-lg bg-white relative hover:bg-surface/50 transition-colors">
                <div className="space-y-1 text-center">
                  {coverPreview ? (
                    <div className="mb-4">
                      <img src={coverPreview} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                    </div>
                  ) : (
                    <ImageIcon className="mx-auto h-12 w-12 text-border-light" />
                  )}
                  <div className="flex text-sm text-text-grey justify-center">
                    <label
                      htmlFor="coverImage"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-title-black hover:text-luminex-red focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-title-black"
                    >
                      <span>Faça upload de um arquivo</span>
                      <input
                        id="coverImage"
                        name="coverImage"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-text-grey">PNG, JPG, GIF até 10MB (Deixe em branco para manter a imagem atual)</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-title-black text-sm font-medium mb-2">
              Conteúdo do Projeto *
            </label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 text-text-grey text-sm font-medium hover:text-title-black transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-title-black text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-luminex-red transition-colors duration-300 disabled:opacity-50 cursor-pointer"
            >
              <Save size={16} />
              {loading ? 'Salvando...' : 'Atualizar Projeto'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
