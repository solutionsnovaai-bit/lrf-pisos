import { useEffect, useState } from 'react';
import { imagens } from '../../config/imagens';

export function useCarregamento(desativado: boolean, concluir: () => void) {
  const [progresso, setProgresso] = useState(0);
  const [saindo, setSaindo] = useState(false);
  const [curta] = useState(() => { try { return sessionStorage.getItem('zenite-abertura-v1') === 'sim'; } catch { return false; } });
  useEffect(() => {
    if (desativado) { concluir(); return; }
    let cancelado = false; let finalizando = false; let completos = 0;
    let saida = 0; let limite = 0;
    const inicio = performance.now();
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const sair = () => {
      if (cancelado || finalizando) return;
      finalizando = true; clearTimeout(limite);
      try { sessionStorage.setItem('zenite-abertura-v1', 'sim'); } catch { /* Armazenamento opcional. */ }
      saida = window.setTimeout(() => { if (!cancelado) setSaindo(true); }, Math.max(0, (curta ? 450 : 2900) - (performance.now() - inicio)));
    };
    const img = document.getElementById('hero-imagem') as HTMLImageElement | null;
    let limparImagem = () => {};
    const hero = new Promise<void>(resolve => {
      if (!img || img.complete) { resolve(); return; }
      const finalizar = () => resolve();
      img.addEventListener('load', finalizar, { once: true }); img.addEventListener('error', finalizar, { once: true });
      limparImagem = () => { img.removeEventListener('load', finalizar); img.removeEventListener('error', finalizar); };
    }).then(() => img?.decode().catch(() => {}));
    const marca = new Image(); marca.src = imagens.marcaClara.webp;
    const tarefas = [document.fonts.load('500 16px Manrope'), document.fonts.load('400 40px Newsreader'), document.fonts.load('italic 400 40px Newsreader'), hero, marca.decode()];
    Promise.allSettled(tarefas.map(tarefa => Promise.resolve(tarefa).finally(() => {
      if (!cancelado) setProgresso(Math.round(++completos / tarefas.length * 100));
    }))).then(sair);
    limite = window.setTimeout(sair, 8000);
    return () => { cancelado = true; clearTimeout(saida); clearTimeout(limite); limparImagem(); document.body.style.overflow = anterior; };
  }, [concluir, curta, desativado]);
  return { progresso, saindo, curta };
}
