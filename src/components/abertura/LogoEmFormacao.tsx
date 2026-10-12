import { motion } from 'motion/react';
import { Marca } from '../ui/Marca';

const suave = [0.16, 1, 0.3, 1] as const;

/** Feixe de luz que desce, revela o logo de cima para baixo e fecha o anel de progresso. */
export function LogoEmFormacao({ curta, progresso }: { curta: boolean; progresso: number }) {
  return <div className="abertura-emblema" aria-hidden="true">
    <motion.span className="abertura-cone" initial={{ opacity: 0, scaleY: 0.4 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ duration: curta ? 0.3 : 1.6, delay: curta ? 0 : 0.25, ease: suave }} />
    <motion.span className="abertura-feixe" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: curta ? 0.25 : 0.95, ease: [0.65, 0, 0.35, 1] }} />
    <svg className="abertura-anel" viewBox="0 0 100 100">
      <circle className="abertura-anel-base" cx="50" cy="50" r="48.5" />
      <motion.circle className="abertura-anel-progresso" cx="50" cy="50" r="48.5" initial={{ pathLength: 0 }} animate={{ pathLength: progresso / 100 }} transition={{ duration: 0.6, ease: 'easeOut' }} />
    </svg>
    <motion.div className="abertura-logo"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: curta ? 0.35 : 1.35, delay: curta ? 0.05 : 0.7, ease: suave }}>
      <Marca tom="claro" decorativa eager />
      <motion.span className="abertura-brilho" initial={{ backgroundPositionX: '130%' }} animate={{ backgroundPositionX: '-30%' }}
        transition={{ duration: curta ? 0.5 : 1.3, delay: curta ? 0.2 : 1.75, ease: [0.45, 0, 0.2, 1] }} />
    </motion.div>
  </div>;
}
