'use client';

import { useSyncExternalStore } from 'react';
import { NextStudio } from 'next-sanity/studio';
import { STUDIO_REDIRECT_STORAGE_KEY } from '@/lib/assets';
import config from '../../sanity.config';

let studioRouteRestored = false;

function subscribe() {
  return () => {};
}

function getClientReadySnapshot(): boolean {
  if (!studioRouteRestored && typeof window !== 'undefined') {
    studioRouteRestored = true;
    try {
      const pendingPath = sessionStorage.getItem(STUDIO_REDIRECT_STORAGE_KEY);
      if (pendingPath) {
        sessionStorage.removeItem(STUDIO_REDIRECT_STORAGE_KEY);
        window.history.replaceState(null, '', pendingPath);
      }
    } catch {
      // Ignora caso sessionStorage esteja indisponível
    }
  }
  return true;
}

function getServerSnapshot(): boolean {
  return false;
}

export default function StudioShell() {
  const ready = useSyncExternalStore(
    subscribe,
    getClientReadySnapshot,
    getServerSnapshot
  );

  if (!ready) {
    return (
      <div
        id="sanity"
        className="min-h-screen flex flex-col items-center justify-center bg-white text-title-black gap-3"
      >
        <div className="w-7 h-7 rounded-full border-2 border-border-light border-t-luminex-red animate-spin" />
        <p className="text-xs tracking-[0.18em] uppercase text-title-black/60">
          Carregando painel editorial...
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
