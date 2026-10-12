import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { textos } from '../../content/textos';
import { imagens } from '../../config/imagens';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { Imagem } from '../ui/Imagem';
import { Revelar } from '../ui/Revelar';

function Palavra({ palavra, indice, total, progresso }: { palavra: string; indice: number; total: number; progresso: MotionValue<number> }) {
  const { desativado } = useMotionPreferences();
  const opacity = useTransform(progresso, [indice / total, (indice + 1) / total], [0, 1]);
  const destaque = /^(piso|superfície|presença)$/.test(palavra.replace(/[,.]$/, '')) ? ' manifesto-destaque' : '';
  return <span className={`manifesto-palavra${destaque}`} aria-hidden="true"><span>{palavra}</span><motion.span className="palavra-acesa" style={{ opacity: desativado ? 1 : opacity }}>{palavra}</motion.span>{' '}</span>;
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { desativado } = useMotionPreferences();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const { scrollYProgress: passagem } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imagemY = useTransform(passagem, [0, 1], ['-9%', '9%']);
  const palavras = textos.manifesto.frase.split(' ');
  const t = textos.manifesto;
  return <section id="manifesto" className="manifesto espaco" ref={ref}><div className="container manifesto-grade">
    <div className="manifesto-material"><p className="eyebrow">{t.selo}</p>
      <Revelar><figure>
        <div className="manifesto-moldura"><motion.div className="manifesto-imagem" style={{ y: desativado ? 0 : imagemY }}><Imagem fonte={imagens.pisoLuz} alt={t.materialAlt} /></motion.div></div>
        <figcaption>{t.materialLegenda}</figcaption>
      </figure></Revelar>
    </div>
    <div><p className="manifesto-frase" aria-label={t.frase}>
      {palavras.map((palavra, i) => <Palavra palavra={palavra} indice={i} total={palavras.length} progresso={scrollYProgress} key={`${palavra}-${i}`} />)}
    </p><Revelar><p className="manifesto-nota">{t.nota}</p></Revelar></div>
  </div></section>;
}
