export interface ImagemFonte { avif: string; webp: string; width: number; height: number }
export interface Recorte { x: number; y: number; width: number; height: number }
export type FotoId = 'claro' | 'cinza' | 'sala' | 'integrado' | 'quente' | 'escada' | 'amostras' | 'preparo' | 'escuro' | 'padroes';
export interface FotoGaleria { id: FotoId; fonte: ImagemFonte; recorte?: Recorte }
export const mediaMobile = '(max-width: 767px)';
const fonte = (base: string, width: number, height: number): ImagemFonte => ({ avif: `${base}.avif`, webp: `${base}.webp`, width, height });
export const imagens = {
  heroDesktop: fonte('/hero/lrf-desktop-v1', 1672, 941),
  heroMobile: fonte('/hero/lrf-mobile-v1', 941, 1672),
  marca: fonte('/marca/lrf-textura-v1', 1254, 1254),
  ripado: fonte('/fotos/ripado-carvalho-v1', 900, 1200),
  sobre: null as ImagemFonte | null,
  galeria: [
    { id: 'claro', fonte: fonte('/fotos/piso-claro-v1', 1200, 1600) },
    { id: 'cinza', fonte: fonte('/fotos/piso-cinza-v1', 1200, 1600) },
    { id: 'sala', fonte: fonte('/fotos/sala-madeira-v1', 1200, 1600) },
    { id: 'integrado', fonte: fonte('/fotos/piso-integrado-v1', 1200, 1600) },
    { id: 'quente', fonte: fonte('/fotos/piso-quente-v1', 900, 1600) },
    { id: 'escada', fonte: fonte('/fotos/escada-clara-v1', 1200, 1600) },
    { id: 'amostras', fonte: fonte('/fotos/amostras-madeira-v1', 900, 1600) },
    { id: 'preparo', fonte: fonte('/fotos/preparo-ambiente-v1', 1200, 1600) },
    { id: 'escuro', fonte: fonte('/fotos/piso-escuro-v1', 900, 1600) },
    { id: 'padroes', fonte: fonte('/fotos/padroes-madeira-v1', 740, 1600), recorte: { x: 40, y: 437, width: 664, height: 823 } },
  ] satisfies FotoGaleria[],
};
