import { ArrowUp, Pause, Play } from 'lucide-react';
import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { whatsapp } from '../../lib/whatsapp';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { Marca } from '../ui/Marca';

export function Rodape() {
  const { pausado, reduzido, alternar } = useMotionPreferences();
  const t = textos.rodape;
  return <footer className="rodape escuro"><div className="container">
    <div className="rodape-principal">
      <div className="rodape-marca"><Marca /><p className="rodape-assinatura">{t.assinatura}</p></div>
      <div><span className="eyebrow">{t.contato}</span><a className="rodape-telefone" href={whatsapp()} target="_blank" rel="noopener noreferrer">{site.telefoneExibicao}</a><p className="rodape-detalhe">{t.politica}</p></div>
      <div className="rodape-local"><span className="eyebrow">{t.local}</span><p>{t.atendimento}</p>
        <nav aria-label={textos.menu.nome}>{textos.menu.links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      </div>
    </div>
    <p className="rodape-palavra" aria-hidden="true">Zênite</p>
    <div className="rodape-base"><small>© {new Date().getFullYear()} {t.direitos}</small>
      <div className="rodape-acoes">
        <button className="controle-movimento" onClick={alternar} disabled={reduzido} aria-pressed={pausado || reduzido}>{pausado || reduzido ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}{reduzido ? t.reduzido : pausado ? t.retomar : t.pausar}</button>
        <a className="rodape-topo" href="#inicio"><ArrowUp size={15} aria-hidden="true" />{t.topo}</a>
      </div>
    </div>
  </div></footer>;
}
