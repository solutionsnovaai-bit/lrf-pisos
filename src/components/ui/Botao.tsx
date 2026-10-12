import { motion, useMotionValue, useSpring } from 'motion/react';
import type { ReactNode, PointerEvent } from 'react';
import { ArrowUpRight, ClipboardList } from 'lucide-react';
import { whatsapp } from '../../lib/whatsapp';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { BrandIcon } from './BrandIcon';

interface Props {
  children: ReactNode; mensagem?: string; href?: `#${string}`; aoClicar?: () => void;
  tom?: 'dourado' | 'escuro' | 'fantasma'; compacto?: boolean; icone?: boolean;
}
export function Botao({ children, mensagem, href, aoClicar, tom = 'dourado', compacto = false, icone = true }: Props) {
  const { desativado } = useMotionPreferences();
  const x = useMotionValue(0); const y = useMotionValue(0);
  const suaveX = useSpring(x, { stiffness: 250, damping: 22 });
  const suaveY = useSpring(y, { stiffness: 250, damping: 22 });
  const mover = (event: PointerEvent<HTMLAnchorElement>) => {
    if (desativado || event.pointerType !== 'mouse' || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.05);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
  };
  return <motion.a className={`botao botao-${tom} ${compacto ? 'botao-compacto' : ''}`} href={href ?? whatsapp(mensagem)} target={href ? undefined : '_blank'} rel={href ? undefined : 'noopener noreferrer'} onClick={aoClicar}
    style={{ x: desativado ? 0 : suaveX, y: desativado ? 0 : suaveY }} onPointerMove={mover} onPointerLeave={() => { x.set(0); y.set(0); }}>
    {icone && (href ? <ClipboardList aria-hidden="true" /> : <BrandIcon />)}<span>{children}</span><ArrowUpRight size={18} aria-hidden="true" />
  </motion.a>;
}
