import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { whatsapp } from '../../lib/whatsapp';
import { Marca } from '../ui/Marca';
import { Botao } from '../ui/Botao';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';

export function Topo({ aoAbrir }: { aoAbrir: (aberto: boolean) => void }) {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botao = useRef<HTMLButtonElement>(null); const painel = useRef<HTMLDivElement>(null);
  const { desativado } = useMotionPreferences();
  useEffect(() => {
    const atualizar = () => setRolou(window.scrollY > 40);
    atualizar(); window.addEventListener('scroll', atualizar, { passive: true });
    return () => window.removeEventListener('scroll', atualizar);
  }, []);
  useEffect(() => {
    aoAbrir(aberto);
    if (!aberto) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    painel.current?.querySelector<HTMLElement>('button, a')?.focus();
    const teclado = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAberto(false);
      if (event.key !== 'Tab') return;
      const itens = painel.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!itens?.length) return;
      const primeiro = itens[0]; const ultimo = itens[itens.length - 1];
      if (event.shiftKey && document.activeElement === primeiro) { event.preventDefault(); ultimo.focus(); }
      else if (!event.shiftKey && document.activeElement === ultimo) { event.preventDefault(); primeiro.focus(); }
    };
    const ampliar = () => { if (window.innerWidth >= 900) setAberto(false); };
    document.addEventListener('keydown', teclado); window.addEventListener('resize', ampliar);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', teclado); window.removeEventListener('resize', ampliar); botao.current?.focus(); };
  }, [aberto, aoAbrir]);
  const entrada = (i: number) => desativado ? {} : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.12 + i * 0.07, ease: [0.16, 1, 0.3, 1] as const } };
  return <>
    <header className={`topo ${rolou ? 'topo-rolou' : ''}`}>
      <div className="topo-dentro">
        <a href="#inicio" className="topo-marca" aria-label={site.nomeCompleto}><Marca eager decorativa /><span><strong>{site.nome}</strong><small>{textos.menu.assinatura}</small></span></a>
        <nav className="nav-desktop" aria-label={textos.menu.nome}>{textos.menu.links.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
        <div className="topo-contato"><Botao compacto href="#orcamento" icone={false}>{textos.menu.conversar}</Botao></div>
        <button ref={botao} className="menu-toggle" aria-label={textos.menu.abrir} aria-expanded={aberto} aria-controls="menu-mobile" onClick={() => setAberto(true)}><Menu aria-hidden="true" /></button>
      </div>
    </header>
    <AnimatePresence>{aberto && <motion.div id="menu-mobile" ref={painel} className="menu-mobile" role="dialog" aria-modal="true" aria-label={textos.menu.nome}
      initial={desativado ? false : { clipPath: 'inset(0% 0% 100% 0%)' }} animate={{ clipPath: 'inset(0% 0% 0% 0%)' }} exit={desativado ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: desativado ? 0 : 0.55, ease: [0.76, 0, 0.24, 1] }}>
      <span className="menu-mobile-feixe" aria-hidden="true" />
      <div className="menu-mobile-topo"><Marca decorativa /><span><strong>{site.nome}</strong><small>{textos.menu.assinatura}</small></span><button className="menu-toggle" aria-label={textos.menu.fechar} onClick={() => setAberto(false)}><X aria-hidden="true" /></button></div>
      <nav>{textos.menu.links.map((link, i) => <motion.a {...entrada(i)} href={link.href} key={link.href} onClick={() => setAberto(false)}><small>{String(i + 1).padStart(2, '0')}</small>{link.label}</motion.a>)}</nav>
      <motion.div className="menu-mobile-base" {...entrada(textos.menu.links.length)}>
        <Botao href="#orcamento" aoClicar={() => setAberto(false)}>{textos.menu.conversar}</Botao>
        <a className="menu-mobile-telefone" href={whatsapp()} target="_blank" rel="noopener noreferrer">{site.telefoneExibicao}</a>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </>;
}
