import { imagens } from '../../config/imagens';
import { textos } from '../../content/textos';
import { Imagem } from './Imagem';

/** Logo plano da Zênite. `tom="claro"` é a versão para fundos escuros. */
export function Marca({ className = '', decorativa = false, eager = false, tom = 'claro' }: { className?: string; decorativa?: boolean; eager?: boolean; tom?: 'claro' | 'original' }) {
  return <Imagem fonte={tom === 'claro' ? imagens.marcaClara : imagens.marca} alt={decorativa ? '' : textos.marcaAlt} className={`marca ${className}`} eager={eager} />;
}
