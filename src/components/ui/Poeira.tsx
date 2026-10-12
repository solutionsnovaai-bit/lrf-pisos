import { useEffect, useRef } from 'react';
import { useSceneActivity } from '../../hooks/useSceneActivity';

/** Região do feixe de luz em cada composição do hero, em frações da arte. */
interface Feixe { cx: number; largura: number; topo: number; base: number; total: number }
const DESKTOP: Feixe = { cx: 0.712, largura: 0.075, topo: -0.02, base: 0.9, total: 56 };
const MOBILE: Feixe = { cx: 0.5, largura: 0.14, topo: -0.02, base: 0.7, total: 36 };

interface Particula { x: number; y: number; r: number; v: number; deriva: number; fase: number; brilho: number }

/** Partículas de poeira flutuando no feixe de luz do hero. Desliga fora da tela e com movimento reduzido. */
export function Poeira({ mobile }: { mobile: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { ref, ativo } = useSceneActivity<HTMLDivElement>();
  useEffect(() => {
    const el = canvas.current; const ctx = el?.getContext('2d');
    if (!ativo || !el || !ctx) return;
    const feixe = mobile ? MOBILE : DESKTOP;
    let largura = 0; let altura = 0;
    const medir = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1); const r = el.getBoundingClientRect();
      largura = r.width; altura = r.height;
      el.width = Math.max(1, Math.round(largura * dpr)); el.height = Math.max(1, Math.round(altura * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    medir();
    const observador = new ResizeObserver(medir); observador.observe(el);
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const criar = (espalhar: boolean): Particula => ({
      x: feixe.cx + gauss() * feixe.largura,
      y: espalhar ? feixe.topo + Math.random() * (feixe.base - feixe.topo) : feixe.topo,
      r: 0.6 + Math.random() * 1.7, v: 0.008 + Math.random() * 0.03, deriva: 0.002 + Math.random() * 0.006,
      fase: Math.random() * Math.PI * 2, brilho: 0.3 + Math.random() * 0.6,
    });
    const particulas = Array.from({ length: feixe.total }, () => criar(true));
    let quadro = 0; let anterior = performance.now();
    const desenhar = (agora: number) => {
      const dt = Math.min(0.05, (agora - anterior) / 1000); anterior = agora;
      ctx.clearRect(0, 0, largura, altura);
      for (const p of particulas) {
        p.y += p.v * dt; p.fase += dt * 0.7;
        if (p.y > feixe.base) Object.assign(p, criar(false));
        const x = (p.x + Math.sin(p.fase) * p.deriva) * largura; const y = p.y * altura;
        const centro = Math.max(0, 1 - Math.abs(p.x - feixe.cx) / (feixe.largura * 2.2));
        const borda = Math.min(1, (feixe.base - p.y) * 7, (p.y - feixe.topo) * 12);
        const alfa = p.brilho * centro * borda * (0.55 + 0.45 * Math.sin(p.fase * 2.6));
        if (alfa <= 0.02) continue;
        const raio = p.r * 3;
        const luz = ctx.createRadialGradient(x, y, 0, x, y, raio);
        luz.addColorStop(0, `rgba(255, 238, 204, ${alfa})`); luz.addColorStop(0.35, `rgba(240, 206, 140, ${alfa * 0.45})`); luz.addColorStop(1, 'rgba(240, 206, 140, 0)');
        ctx.fillStyle = luz; ctx.beginPath(); ctx.arc(x, y, raio, 0, Math.PI * 2); ctx.fill();
      }
      quadro = requestAnimationFrame(desenhar);
    };
    quadro = requestAnimationFrame(desenhar);
    return () => { cancelAnimationFrame(quadro); observador.disconnect(); ctx.clearRect(0, 0, largura, altura); };
  }, [ativo, mobile]);
  return <div ref={ref} className="hero-poeira" aria-hidden="true"><canvas ref={canvas} /></div>;
}
