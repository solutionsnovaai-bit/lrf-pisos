import { useEffect, useRef, useState, type PointerEvent, type KeyboardEvent } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { FotoGaleria } from '../../config/imagens';
import { textos } from '../../content/textos';
import { useSceneActivity } from '../../hooks/useSceneActivity';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { Imagem } from './Imagem';

interface Props { fotos: readonly FotoGaleria[]; direcao: 1 | -1; titulo: string; numero: string }
export function Carrossel({ fotos, direcao, titulo, numero }: Props) {
  const { ref, ativo } = useSceneActivity(); const { desativado } = useMotionPreferences();
  const viewport = useRef<HTMLDivElement>(null); const grupo = useRef<HTMLDivElement>(null);
  const largura = useRef(0); const arrasto = useRef<{ id: number; inicio: number; posicao: number } | null>(null);
  const [hover, setHover] = useState(false); const [foco, setFoco] = useState(false); const x = useMotionValue(0);
  const t = textos.galeria;
  const normalizar = (valor: number) => largura.current ? -largura.current + ((valor % largura.current) + largura.current) % largura.current : 0;
  useEffect(() => {
    if (!grupo.current) return;
    const medir = () => { largura.current = grupo.current?.getBoundingClientRect().width ?? 0; x.set(-largura.current); };
    medir(); const observer = new ResizeObserver(medir); observer.observe(grupo.current);
    return () => observer.disconnect();
  }, [x, desativado]);
  useAnimationFrame((_, delta) => {
    if (ativo && !desativado && !hover && !foco && !arrasto.current) x.set(normalizar(x.get() + direcao * 27 * Math.min(delta, 40) / 1000));
  });
  const iniciar = (event: PointerEvent<HTMLDivElement>) => {
    if (desativado || event.button !== 0) return;
    arrasto.current = { id: event.pointerId, inicio: event.clientX, posicao: x.get() };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const mover = (event: PointerEvent<HTMLDivElement>) => {
    if (arrasto.current?.id === event.pointerId) x.set(normalizar(arrasto.current.posicao + event.clientX - arrasto.current.inicio));
  };
  const terminar = () => { arrasto.current = null; };
  const navegar = (sentido: number) => {
    const passo = grupo.current?.querySelector('figure')?.getBoundingClientRect().width ?? 280;
    const gap = grupo.current ? parseFloat(getComputedStyle(grupo.current).columnGap) || 24 : 24;
    if (desativado) viewport.current?.scrollBy({ left: sentido * (passo + gap), behavior: 'instant' });
    else x.set(normalizar(x.get() - sentido * (passo + gap)));
  };
  const teclado = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); navegar(event.key === 'ArrowRight' ? 1 : -1); }
  };
  return <div className={`carrossel carrossel-${numero}`} ref={ref} onPointerEnter={e => { if (e.pointerType === 'mouse') setHover(true); }} onPointerLeave={() => setHover(false)}
    onFocus={() => setFoco(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFoco(false); }}>
    <div className="container carrossel-cabecalho"><h3><span>{numero}</span>{titulo}</h3><div className="galeria-controles">
      <button onClick={() => navegar(-1)} aria-label={`${t.anterior} — ${titulo}`}><ArrowLeft aria-hidden="true" /></button>
      <button onClick={() => navegar(1)} aria-label={`${t.proximo} — ${titulo}`}><ArrowRight aria-hidden="true" /></button>
    </div></div>
    <div className={`galeria-viewport ${desativado ? 'galeria-parada' : ''}`} ref={viewport} role="region" aria-label={titulo} tabIndex={0}
      onKeyDown={teclado} onPointerDown={iniciar} onPointerMove={mover} onPointerUp={terminar} onPointerCancel={terminar} onLostPointerCapture={terminar}>
      <motion.div className="galeria-trilha" style={{ x: desativado ? 0 : x }}>
        {Array.from({ length: desativado ? 1 : 3 }, (_, grupoIndice) => <div className="galeria-grupo" ref={grupoIndice === 0 ? grupo : undefined} key={grupoIndice} aria-hidden={grupoIndice > 0 || undefined}>
          {fotos.map((item, i) => <figure key={item.id} className={`galeria-item galeria-item-${item.id}`}>
            <div className="galeria-foto"><Imagem fonte={item.fonte} recorte={item.recorte} alt={grupoIndice === 0 ? t.itens[item.id].alt : ''} /></div>
            <figcaption><span className="galeria-categoria">{t.itens[item.id].categoria}<small>{String(i + 1).padStart(2, '0')}</small></span><strong>{t.itens[item.id].titulo}</strong></figcaption>
          </figure>)}
        </div>)}
      </motion.div>
    </div>
  </div>;
}
