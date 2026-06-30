'use client';

import { useState } from 'react';
import { loginAction } from '@/lib/actions';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError('');

    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-14 h-14 border-2 border-title-black flex items-center justify-center rounded-sm mx-auto mb-4">
            <span className="text-title-black font-semibold text-2xl">C</span>
          </div>
          <h2 className="text-title-black text-xl font-medium">Painel Admin</h2>
          <p className="text-text-grey text-sm mt-1">Acesso restrito</p>
        </div>

        <form action={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-luminex-red/10 border border-luminex-red/20 text-luminex-red text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-title-black text-sm font-medium mb-2"
            >
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 bg-white border border-border-light rounded-lg text-title-black text-sm focus:outline-none focus:border-title-black transition-colors"
              placeholder="Digite seu usuário"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-title-black text-sm font-medium mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-white border border-border-light rounded-lg text-title-black text-sm focus:outline-none focus:border-title-black transition-colors"
              placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-title-black text-white py-3 rounded-lg text-sm font-medium tracking-[0.1em] uppercase hover:bg-luminex-red transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
