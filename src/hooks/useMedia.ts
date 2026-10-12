import { useEffect, useState } from 'react';

export function useMedia(query: string) {
  const [ativo, setAtivo] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const lista = window.matchMedia(query);
    const atualizar = () => setAtivo(lista.matches);
    atualizar(); lista.addEventListener('change', atualizar);
    return () => lista.removeEventListener('change', atualizar);
  }, [query]);
  return ativo;
}
