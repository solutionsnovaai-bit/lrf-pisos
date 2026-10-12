import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent } from 'motion/react';
import { textos } from '../../content/textos';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { useCarregamento } from './useCarregamento';
import { LogoEmFormacao } from './LogoEmFormacao';

export function Abertura({ concluir }: { concluir: () => void }) {
  const { desativado } = useMotionPreferences();
  const { progresso, saindo, curta } = useCarregamento(desativado, concluir);
  const contador = useMotionValue(0); const [numero, setNumero] = useState(0);
  useMotionValueEvent(contador, 'change', valor => setNumero(Math.round(valor)));
  useEffect(() => { const animacao = animate(contador, progresso, { duration: .4, ease: 'easeOut' }); return () => animacao.stop(); }, [contador, progresso]);
  if (desativado) return null;
  const t = textos.abertura;
  return <motion.div className={`abertura ${curta ? 'abertura-curta' : ''}`} initial={false} animate={{ y: saindo ? '-100%' : '0%' }}
    transition={{ duration: curta ? .55 : .95, ease: [.76, 0, .24, 1] }} onAnimationComplete={() => { if (saindo) concluir(); }}>
    <div className="abertura-campo" aria-hidden="true">{[0, 1, 2].map(i => <motion.span key={i} initial={{ y: '110%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }} transition={{ duration: curta ? .3 : 1.5, delay: i * .12, ease: [.16, 1, .3, 1] }} />)}</div>
    <div className="abertura-topo"><span>{t.identidade}</span><span>{t.local}</span></div>
    <motion.div className="abertura-centro" animate={{ opacity: saindo ? 0 : 1, scale: saindo ? .92 : 1, y: saindo ? -30 : 0 }} transition={{ duration: .45 }}>
      <LogoEmFormacao curta={curta} />
      <div className="abertura-assinatura"><motion.p initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: curta ? .05 : 1.1, duration: .7 }}>{t.preparando}</motion.p></div>
      <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: curta ? .1 : 1.4 }}>{t.materia}</motion.p>
    </motion.div>
    <div className="abertura-base"><div><p className="eyebrow">{progresso === 100 ? t.pronto : t.carregando}</p><div className="abertura-etapas" aria-hidden="true">{[0, 1, 2, 3].map(i => <span key={i}><motion.i animate={{ scaleX: progresso >= (i + 1) * 25 ? 1 : 0 }} transition={{ duration: .4 }} /></span>)}</div></div>
      <span className="abertura-numero" role="progressbar" aria-label={t.carregando} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progresso}>{String(numero).padStart(3, '0')}<small>%</small></span>
    </div>
    <motion.div className="abertura-progresso" animate={{ scaleX: progresso / 100 }} transition={{ duration: .4 }} />
  </motion.div>;
}
