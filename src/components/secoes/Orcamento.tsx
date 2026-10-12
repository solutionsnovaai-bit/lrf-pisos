import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, Check, ChevronDown, ClipboardList, MapPin, MessageCircle, Ruler } from 'lucide-react';
import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { mensagemOrcamento, pedidoVazio, validarOrcamento, whatsapp, type CampoTextoOrcamento, type ErrosOrcamento, type PedidoOrcamento } from '../../lib/whatsapp';
import { BrandIcon } from '../ui/BrandIcon';
import { Titulo } from '../ui/Titulo';

const t = textos.orcamento;
const icones = [MapPin, Ruler, MessageCircle];

function Grupo({ indice, children }: { indice: number; children: ReactNode }) {
  const grupo = t.grupos[indice];
  return <fieldset className="orcamento-grupo">
    <legend><span aria-hidden="true">{grupo.numero}</span>{grupo.titulo}</legend>
    <p className="orcamento-grupo-nota">{grupo.descricao}</p>
    <div className="orcamento-campos">{children}</div>
  </fieldset>;
}

function Escolhas({ campo, selecionadas, alterar }: { campo: 'servicos' | 'ambientes'; selecionadas: string[]; alterar: (opcao: string) => void }) {
  const dados = t.campos[campo];
  return <fieldset className="orcamento-escolhas orcamento-largura">
    <legend>{dados.label}</legend><p id={`ajuda-${campo}`}>{t.multipla}</p>
    <div>{dados.opcoes.map(opcao => <label className="orcamento-opcao" key={opcao}>
      <input type="checkbox" checked={selecionadas.includes(opcao)} onChange={() => alterar(opcao)} aria-describedby={`ajuda-${campo}`} />
      <span><Check size={14} aria-hidden="true" />{opcao}</span>
    </label>)}</div>
  </fieldset>;
}

export function Orcamento() {
  const [pedido, setPedido] = useState<PedidoOrcamento>(pedidoVazio);
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const erros: ErrosOrcamento = tentouEnviar ? validarOrcamento(pedido) : {};
  const mensagem = mensagemOrcamento(pedido);
  const temDados = Object.values(pedido).some(valor => Array.isArray(valor) ? valor.length > 0 : typeof valor === 'string' ? Boolean(valor.trim()) : valor);
  const alterar = (campo: CampoTextoOrcamento, valor: string) => setPedido(atual => ({ ...atual, [campo]: valor }));
  const marcar = (campo: 'servicos' | 'ambientes', opcao: string) => setPedido(atual => ({ ...atual,
    [campo]: atual[campo].includes(opcao) ? atual[campo].filter(item => item !== opcao) : [...atual[campo], opcao],
  }));
  const enviar = (event: FormEvent<HTMLFormElement>) => {
    const pendencias = validarOrcamento(pedido);
    const primeiro = Object.keys(pendencias)[0];
    if (primeiro) {
      event.preventDefault();
      setTentouEnviar(true);
      event.currentTarget.querySelector<HTMLInputElement>(`#orcamento-${primeiro}`)?.focus();
    }
  };
  const campo = (chave: CampoTextoOrcamento, configuracao: { obrigatorio?: boolean; completo?: boolean; max?: number; autocomplete?: string } = {}) => {
    const dados = t.campos[chave];
    const id = `orcamento-${chave}`;
    const erro = erros[chave as keyof ErrosOrcamento];
    const ajuda = 'ajuda' in dados ? dados.ajuda : undefined;
    const descrito = [ajuda ? `${id}-ajuda` : '', erro ? `${id}-erro` : ''].filter(Boolean).join(' ') || undefined;
    const comum = { id, value: pedido[chave], required: configuracao.obrigatorio, 'aria-describedby': descrito, 'aria-invalid': erro ? true as const : undefined };
    return <div className={`orcamento-campo ${configuracao.completo ? 'orcamento-largura' : ''}`}>
      <label htmlFor={id}>{dados.label}{configuracao.obrigatorio && <small>{t.obrigatorio}</small>}</label>
      {'opcoes' in dados ? <div className="orcamento-select"><select {...comum} onChange={event => alterar(chave, event.target.value)}>
        <option value="">{t.selecionar}</option>{dados.opcoes.map(opcao => <option key={opcao} value={opcao}>{opcao}</option>)}
      </select><ChevronDown size={16} aria-hidden="true" /></div>
        : chave === 'detalhes' ? <textarea {...comum} placeholder={dados.placeholder} maxLength={800} rows={4} onChange={event => alterar(chave, event.target.value)} data-lenis-prevent />
        : <input {...comum} type="text" autoComplete={configuracao.autocomplete} inputMode={chave === 'area' ? 'decimal' : 'text'}
          maxLength={configuracao.max ?? 80} placeholder={dados.placeholder} onChange={event => alterar(chave, event.target.value)} />}
      {ajuda && <p className="orcamento-ajuda" id={`${id}-ajuda`}>{ajuda}</p>}
      {erro && <p className="orcamento-erro" id={`${id}-erro`}>{erro}</p>}
    </div>;
  };

  return <section id="orcamento" className="orcamento espaco" aria-labelledby="orcamento-titulo">
    <div className="container orcamento-grade">
      <div className="orcamento-intro">
        <p className="eyebrow">{t.selo}</p><Titulo linhas={t.linhas} id="orcamento-titulo" />
        <p className="orcamento-descricao">{t.descricao}</p>
        <ul className="orcamento-destaques">{t.destaques.map((item, i) => { const Icone = icones[i]; return <li key={item}><Icone size={19} aria-hidden="true" /><span>{item}</span></li>; })}</ul>
        <a className="link-seta" href={whatsapp(site.mensagens.orcamento)} target="_blank" rel="noopener noreferrer">{t.direto}<ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
      <form className="orcamento-form" action={`https://wa.me/${site.telefone}`} method="get" target="_blank" rel="noopener noreferrer" onSubmit={enviar} noValidate aria-labelledby="orcamento-form-titulo" aria-describedby="orcamento-instrucoes">
        <input type="hidden" name="text" value={mensagem} />
        <div className="orcamento-form-topo"><span className="orcamento-simbolo"><ClipboardList size={23} aria-hidden="true" /></span><div>
          <h3 id="orcamento-form-titulo">{t.titulo}</h3><p id="orcamento-instrucoes">{t.instrucoes}</p>
        </div></div>
        <Grupo indice={0}>
          {campo('nome', { obrigatorio: true, autocomplete: 'given-name' })}
          {campo('cidade', { obrigatorio: true, autocomplete: 'address-level2' })}
          {campo('bairro', { autocomplete: 'address-level3' })}{campo('imovel')}
        </Grupo>
        <Grupo indice={1}>
          <Escolhas campo="servicos" selecionadas={pedido.servicos} alterar={opcao => marcar('servicos', opcao)} />
          <Escolhas campo="ambientes" selecionadas={pedido.ambientes} alterar={opcao => marcar('ambientes', opcao)} />
          {campo('material')}{campo('tom')}{campo('area', { max: 9 })}
        </Grupo>
        <Grupo indice={2}>
          {campo('pisoAtual')}{campo('condicao')}{campo('ocupacao')}{campo('prazo')}
          {campo('acesso', { completo: true, max: 160 })}{campo('detalhes', { completo: true })}
          <div className="orcamento-fotos orcamento-largura">
            <label><input type="checkbox" checked={pedido.fotos} onChange={event => setPedido(atual => ({ ...atual, fotos: event.target.checked }))} aria-describedby="orcamento-fotos-ajuda" />{t.campos.fotos.label}</label>
            <p id="orcamento-fotos-ajuda">{t.campos.fotos.ajuda}</p>
          </div>
        </Grupo>
        <div className="orcamento-envio">
          <details className="orcamento-previa"><summary><MessageCircle size={17} aria-hidden="true" /><span>{t.previa}</span><ChevronDown size={16} aria-hidden="true" /></summary>
            <pre>{temDados ? mensagem : t.previaVazia}</pre>
          </details>
          {Object.keys(erros).length > 0 && <p className="orcamento-erro orcamento-alerta" role="alert">{t.erros.resumo}</p>}
          <button className="botao orcamento-enviar" type="submit"><BrandIcon /><span>{t.enviar}</span><ArrowUpRight size={18} aria-hidden="true" /></button>
          <p className="orcamento-envio-nota">{t.envioNota}</p><p className="orcamento-condicoes">{t.condicoes}</p>
        </div>
      </form>
    </div>
  </section>;
}
