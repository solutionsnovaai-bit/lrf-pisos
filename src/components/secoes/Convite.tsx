import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { imagens } from '../../config/imagens';
import { textos } from '../../content/textos';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { Titulo } from '../ui/Titulo';
import { Botao } from '../ui/Botao';
import { Imagem } from '../ui/Imagem';
import { Revelar } from '../ui/Revelar';

export function Convite() {
  const t = textos.convite;
  const ref = useRef<HTMLElement>(null);
  const { desativado } = useMotionPreferences();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const escala = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.04]);
  const giro = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  return <section id="converse" ref={ref} className="convite escuro espaco" aria-labelledby="convite-titulo"><div className="container convite-grade">
    <Revelar className="convite-imagem">
      <motion.div className="convite-emblema" style={desativado ? undefined : { scale: escala }}>
        <motion.span className="convite-orbita" style={desativado ? undefined : { rotate: giro }} aria-hidden="true" />
        <Imagem fonte={imagens.emblema} alt={t.alt} />
      </motion.div>
    </Revelar>
    <div><p className="eyebrow">{t.selo}</p><Titulo linhas={t.linhas} id="convite-titulo" /><p className="convite-texto">{t.texto}</p><Botao href="#orcamento">{t.cta}</Botao></div>
  </div></section>;
}
