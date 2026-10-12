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
  return <span className="manifesto-palavra" aria-hidden="true"><span>{palavra}</span><motion.span className="palavra-acesa" style={{ opacity: desativado ? 1 : opacity }}>{palavra}</motion.span>{' '}</span>;
}
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const palavras = textos.manifesto.frase.split(' ');
  return <section id="manifesto" className="manifesto espaco" ref={ref}><div className="container manifesto-grade">
    <div className="manifesto-material"><p className="eyebrow">{textos.manifesto.selo}</p>
      <Revelar><figure><Imagem fonte={imagens.ripado} alt={textos.manifesto.ripadoAlt} /><figcaption>{textos.manifesto.ripadoLegenda}</figcaption></figure></Revelar>
    </div><div><p className="manifesto-frase" aria-label={textos.manifesto.frase}>
      {palavras.map((palavra, i) => <Palavra palavra={palavra} indice={i} total={palavras.length} progresso={scrollYProgress} key={`${palavra}-${i}`} />)}
    </p><p className="manifesto-nota">{textos.manifesto.nota}</p></div>
  </div></section>;
}
