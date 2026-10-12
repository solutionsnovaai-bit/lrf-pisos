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
  useEffect(() => { const animacao = animate(contador, progresso, { duration: 0.5, ease: 'easeOut' }); return () => animacao.stop(); }, [contador, progresso]);
  if (desativado) return null;
  const t = textos.abertura;
  return <motion.div className={`abertura ${curta ? 'abertura-curta' : ''}`} initial={false}
    animate={{ clipPath: saindo ? 'inset(0% 0% 100% 0%)' : 'inset(0% 0% 0% 0%)' }}
    transition={{ duration: curta ? 0.6 : 1.05, ease: [0.76, 0, 0.24, 1] }} onAnimationComplete={() => { if (saindo) concluir(); }}>
    <div className="abertura-grade" aria-hidden="true" />
    <motion.div className="abertura-topo" initial={{ opacity: 0 }} animate={{ opacity: saindo ? 0 : 1 }} transition={{ duration: 0.6, delay: saindo ? 0 : 0.3 }}><span>{t.identidade}</span><span>{t.local}</span></motion.div>
    <motion.div className="abertura-centro" animate={{ opacity: saindo ? 0 : 1, y: saindo ? -50 : 0, scale: saindo ? 1.04 : 1 }} transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}>
      <LogoEmFormacao curta={curta} progresso={progresso} />
      <div className="abertura-assinatura"><motion.p initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ delay: curta ? 0.1 : 1.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>{t.preparando}</motion.p></div>
      <motion.p className="abertura-materia" initial={{ opacity: 0, letterSpacing: '0.5em' }} animate={{ opacity: 1, letterSpacing: '0.28em' }} transition={{ delay: curta ? 0.15 : 1.75, duration: 1.1 }}>{t.materia}</motion.p>
    </motion.div>
    <motion.div className="abertura-base" animate={{ opacity: saindo ? 0 : 1 }} transition={{ duration: 0.35 }}>
      <div><p>{progresso === 100 ? t.pronto : t.carregando}</p><div className="abertura-etapas" aria-hidden="true">{[0, 1, 2, 3].map(i => <span key={i}><motion.i animate={{ scaleX: progresso >= (i + 1) * 25 ? 1 : 0 }} transition={{ duration: 0.4 }} /></span>)}</div></div>
      <span className="abertura-numero" role="progressbar" aria-label={t.carregando} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progresso}>{String(numero).padStart(3, '0')}<small>%</small></span>
    </motion.div>
  </motion.div>;
}
