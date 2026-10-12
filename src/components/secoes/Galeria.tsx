import { MoveHorizontal } from 'lucide-react';
import { imagens } from '../../config/imagens';
import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { Titulo } from '../ui/Titulo';
import { Botao } from '../ui/Botao';
import { Carrossel } from '../ui/Carrossel';

export function Galeria() {
  const t = textos.galeria;
  return <section id="galeria" className="galeria espaco" aria-labelledby="galeria-titulo">
    <div className="container cabecalho-secao"><div><p className="eyebrow">{t.selo}</p><Titulo linhas={t.linhas} id="galeria-titulo" /></div><p className="cabecalho-nota">{t.descricao}</p></div>
    <Carrossel fotos={imagens.galeria.slice(0, 5)} direcao={-1} titulo={t.fileiras[0]} numero="01" />
    <Carrossel fotos={imagens.galeria.slice(5)} direcao={1} titulo={t.fileiras[1]} numero="02" />
    <div className="container galeria-base"><div><span className="arraste"><MoveHorizontal size={18} aria-hidden="true" />{t.arrastar}</span><p className="nota-pequena">{t.fotosNota}</p></div><Botao mensagem={site.mensagens.orcamento}>{t.cta}</Botao></div>
  </section>;
}
