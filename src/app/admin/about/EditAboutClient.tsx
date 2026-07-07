'use client';

import { useState } from 'react';
import { updateAboutAction } from '@/lib/actions';
import { AboutData } from '@/lib/types';
import { Save, ImageIcon } from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';

export default function EditAboutClient({ initialData }: { initialData: AboutData }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(initialData.photo);
  const [paragraphs, setParagraphs] = useState<string>(initialData.paragraphs.join('\n\n'));

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError('');

    formData.set('existingPhoto', initialData.photo);
    formData.set('paragraphs', paragraphs);

    if (!paragraphs.trim()) {
      setError('O texto sobre é obrigatório.');
      setLoading(false);
      return;
    }

    const result = await updateAboutAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(initialData.photo);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <AdminHeader />

      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-title-black text-2xl font-semibold">Editar Sobre Mim</h2>
          <p className="text-text-grey text-sm mt-1">
            Atualize sua foto e biografia.
          </p>
        </div>

        <form action={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl border border-border-light shadow-sm">
          {error && (
            <div className="bg-luminex-red/10 border border-luminex-red/20 text-luminex-red text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-title-black text-sm font-medium mb-2">
              Foto de Perfil *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-light border-dashed rounded-lg bg-white relative hover:bg-surface/50 transition-colors">
              <div className="space-y-1 text-center">
                {photoPreview ? (
                  <div className="mb-4">
                    <img src={photoPreview} alt="Preview" className="mx-auto h-40 w-40 object-cover rounded-full" />
                  </div>
                ) : (
                  <ImageIcon className="mx-auto h-12 w-12 text-border-light" />
                )}
                <div className="flex text-sm text-text-grey justify-center">
                  <label
                    htmlFor="photo"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-title-black hover:text-luminex-red focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-title-black"
                  >
                    <span>Faça upload de uma foto</span>
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-text-grey">PNG, JPG até 5MB (Deixe em branco para manter atual)</p>
              </div>
            </div>
          </div>



          <div>
            <label htmlFor="paragraphs" className="block text-title-black text-sm font-medium mb-2">
              Texto da Biografia *
            </label>
            <p className="text-text-grey text-xs mb-2">
              Separe os parágrafos com uma linha em branco. Use &lt;strong&gt;texto&lt;/strong&gt; para deixar palavras em negrito.
            </p>
            <textarea
              id="paragraphs"
              name="paragraphs"
              required
              rows={12}
              value={paragraphs}
              onChange={(e) => setParagraphs(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border-light rounded-lg text-title-black text-sm focus:outline-none focus:border-title-black transition-colors"
            />
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-border-light">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-title-black text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-luminex-red transition-colors duration-300 disabled:opacity-50 cursor-pointer"
            >
              <Save size={16} />
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
