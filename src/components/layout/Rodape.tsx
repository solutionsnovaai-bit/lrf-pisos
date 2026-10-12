import { Pause, Play } from 'lucide-react';
import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { whatsapp } from '../../lib/whatsapp';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { Marca } from '../ui/Marca';
export function Rodape() {
  const { pausado, reduzido, alternar } = useMotionPreferences();
  return <footer className="rodape"><div className="container">
    <div className="rodape-principal"><div><Marca /><p className="rodape-assinatura">{textos.rodape.assinatura}</p></div>
      <div><span className="eyebrow">{textos.rodape.contato}</span><a className="rodape-telefone" href={whatsapp()} target="_blank" rel="noopener noreferrer">{site.telefoneExibicao}</a><p className="rodape-detalhe">{textos.rodape.politica}</p></div>
      <div><p>{textos.rodape.local}</p><p>{textos.rodape.atendimento}</p></div>
    </div>
    <div className="rodape-base"><small>© {new Date().getFullYear()} {textos.rodape.direitos}</small>
      <button className="controle-movimento" onClick={alternar} disabled={reduzido} aria-pressed={pausado || reduzido}>{pausado || reduzido ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}{reduzido ? textos.rodape.reduzido : pausado ? textos.rodape.retomar : textos.rodape.pausar}</button>
    </div>
  </div></footer>;
}
