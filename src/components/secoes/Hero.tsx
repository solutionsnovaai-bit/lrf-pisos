import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Layers, MessageCircle } from 'lucide-react';
import { imagens, mediaMobile } from '../../config/imagens';
import { textos } from '../../content/textos';
import { useMedia } from '../../hooks/useMedia';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { Botao } from '../ui/Botao';
import { Poeira } from '../ui/Poeira';
import { Titulo } from '../ui/Titulo';

export function Hero({ pronto }: { pronto: boolean }) {
  const t = textos.hero;
  const secao = useRef<HTMLElement>(null);
  const { desativado } = useMotionPreferences();
  const mobile = useMedia(mediaMobile);
  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end start'] });
  const arteY = useTransform(scrollYProgress, [0, 1], ['0%', mobile ? '6%' : '10%']);
  const conteudoY = useTransform(scrollYProgress, [0, 1], [0, mobile ? -40 : -70]);
  const conteudoOpacidade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const entrada = { duration: 2.6, ease: [0.16, 1, 0.3, 1] as const };
  return <section id="inicio" ref={secao} className="hero escuro" aria-labelledby="hero-titulo">
    <motion.div className="hero-arte" style={{ y: desativado ? 0 : arteY }}>
      <motion.div className="hero-arte-quadro" initial={desativado ? false : { scale: 1.07, opacity: 0.35 }}
        animate={pronto ? { scale: 1, opacity: 1 } : undefined} transition={desativado ? { duration: 0 } : entrada}>
        <picture>
          <source media={mediaMobile} srcSet={imagens.heroMobile.avif} type="image/avif" width={imagens.heroMobile.width} height={imagens.heroMobile.height} />
          <source media={mediaMobile} srcSet={imagens.heroMobile.webp} type="image/webp" width={imagens.heroMobile.width} height={imagens.heroMobile.height} />
          <source srcSet={imagens.heroDesktop.avif} type="image/avif" />
          <img id="hero-imagem" src={imagens.heroDesktop.webp} width={imagens.heroDesktop.width} height={imagens.heroDesktop.height} alt={t.alt} fetchPriority="high" loading="eager" decoding="async" />
        </picture>
        <span className="hero-luz" aria-hidden="true" />
        {!desativado && <Poeira mobile={mobile} />}
      </motion.div>
    </motion.div>
    <motion.div className="container hero-conteudo" style={desativado ? undefined : { y: conteudoY, opacity: conteudoOpacidade }}>
      <motion.p className="eyebrow" initial={desativado ? false : { opacity: 0, y: 12 }} animate={pronto ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.8, delay: 0.1 }}>{t.selo}</motion.p>
      <Titulo linhas={t.linhas} hero id="hero-titulo" ativo={pronto} />
      <motion.div className="hero-corpo" initial={desativado ? false : { opacity: 0, y: 18 }} animate={pronto ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}>
        <p className="hero-descricao">{t.descricao}</p>
        <div className="hero-acoes"><Botao href="#orcamento">{t.cta}</Botao><Botao href="#galeria" tom="fantasma" icone={false}>{t.secundario}</Botao></div>
        <div className="hero-fatos"><span><Layers size={17} aria-hidden="true" />{t.fatos[0]}</span><span><MessageCircle size={17} aria-hidden="true" />{t.fatos[1]}</span></div>
      </motion.div>
    </motion.div>
    <span className="hero-legenda">{t.legenda}</span>
    <a className="hero-rolar" href="#manifesto"><span className="hero-rolar-fio" aria-hidden="true"><i /></span>{t.rolar}</a>
  </section>;
}
