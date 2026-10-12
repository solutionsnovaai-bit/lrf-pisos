import { useRef, type PointerEvent, type ReactNode } from 'react';

const ZOOM = 2.4;

/** Lente de aumento que acompanha o cursor e amplia a textura da foto. Só aparece com mouse. */
export function Lupa({ children }: { children: ReactNode }) {
  const caixa = useRef<HTMLDivElement>(null);
  const lente = useRef<HTMLSpanElement>(null);
  const esconder = () => { if (caixa.current) caixa.current.dataset.lupa = ''; };
  const mover = (event: PointerEvent<HTMLDivElement>) => {
    const caixaEl = caixa.current; const lenteEl = lente.current;
    if (!caixaEl || !lenteEl || event.pointerType !== 'mouse' || event.buttons !== 0 || !matchMedia('(hover: hover) and (pointer: fine)').matches) { esconder(); return; }
    const img = caixaEl.querySelector('img');
    if (!img || !img.complete || !img.naturalWidth) return;
    const c = caixaEl.getBoundingClientRect(); const r = img.getBoundingClientRect();
    const nw = img.naturalWidth; const nh = img.naturalHeight;
    const ajuste = getComputedStyle(img).objectFit;
    let escala = r.width / nw; let ox = 0; let oy = 0;
    if (ajuste === 'cover' || ajuste === 'contain') {
      escala = ajuste === 'cover' ? Math.max(r.width / nw, r.height / nh) : Math.min(r.width / nw, r.height / nh);
      ox = (r.width - nw * escala) / 2; oy = (r.height - nh * escala) / 2;
    }
    const raio = lenteEl.offsetWidth / 2;
    const px = event.clientX - r.left - ox; const py = event.clientY - r.top - oy;
    lenteEl.style.transform = `translate3d(${event.clientX - c.left - raio}px, ${event.clientY - c.top - raio}px, 0)`;
    const src = `url("${img.currentSrc || img.src}")`;
    if (lenteEl.dataset.src !== src) { lenteEl.style.backgroundImage = src; lenteEl.dataset.src = src; }
    lenteEl.style.backgroundSize = `${nw * escala * ZOOM}px ${nh * escala * ZOOM}px`;
    lenteEl.style.backgroundPosition = `${raio - px * ZOOM}px ${raio - py * ZOOM}px`;
    caixaEl.dataset.lupa = 'ativa';
  };
  return <div ref={caixa} className="lupa" onPointerMove={mover} onPointerLeave={esconder} onPointerDown={esconder}>
    {children}<span ref={lente} className="lupa-lente" aria-hidden="true" />
  </div>;
}
