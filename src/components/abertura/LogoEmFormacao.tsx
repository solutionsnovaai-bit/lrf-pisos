import { motion } from 'motion/react';
import { Marca } from '../ui/Marca';

export function LogoEmFormacao({ curta }: { curta: boolean }) {
  return <div className="abertura-emblema" aria-hidden="true">
    <motion.div className="abertura-orbita" initial={{ rotate: -70, scale: .76, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: .65 }} transition={{ duration: curta ? .25 : 1.7 }} />
    <motion.div className="abertura-orbita abertura-orbita-externa" initial={{ rotate: 50, scale: 1.2, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: .35 }} transition={{ duration: curta ? .25 : 1.9 }} />
    <div className="abertura-logo">
      {Array.from({ length: 7 }, (_, i) => {
        const esquerda = -28 + i * 20;
        return <motion.div key={i} className="abertura-fragmento"
          style={{ clipPath: `polygon(${esquerda}% 0, ${esquerda + 20.15}% 0, ${esquerda + 48.15}% 100%, ${esquerda + 28}% 100%)` }}
          initial={{ x: curta ? 0 : (i - 3) * 27, y: curta ? 8 : 100 - i * 28, rotate: curta ? 0 : (i - 3) * 4, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: curta ? .3 : 1.15, delay: curta ? i * .015 : .15 + i * .11, ease: [.16, 1, .3, 1] }}><Marca decorativa eager /></motion.div>;
      })}
      <motion.div className="abertura-reflexo" initial={{ x: '-160%', opacity: 0 }} animate={{ x: '160%', opacity: [0, .55, 0] }} transition={{ duration: curta ? .3 : 1.05, delay: curta ? .1 : 1.2, ease: 'easeInOut' }} />
    </div>
    {[0, 1, 2, 3].map(i => <motion.span key={i} className={`abertura-marca-guia guia-${i}`} initial={{ opacity: 0, scale: .3 }} animate={{ opacity: .55, scale: 1 }} transition={{ delay: curta ? 0 : .4 + i * .12, duration: .6 }} />)}
  </div>;
}
