import { site } from '../config/site';
import { textos } from '../content/textos';

export function whatsapp(mensagem: string = site.mensagens.geral): string {
  return `https://wa.me/${site.telefone}?text=${encodeURIComponent(mensagem)}`;
}

export interface PedidoOrcamento {
  nome: string; cidade: string; bairro: string; imovel: string;
  servicos: string[]; material: string; ambientes: string[]; area: string; tom: string;
  pisoAtual: string; condicao: string; ocupacao: string; prazo: string; acesso: string;
  detalhes: string; fotos: boolean;
}
export type CampoTextoOrcamento = { [K in keyof PedidoOrcamento]: PedidoOrcamento[K] extends string ? K : never }[keyof PedidoOrcamento];
export type ErrosOrcamento = Partial<Record<'nome' | 'cidade' | 'area', string>>;

export const pedidoVazio: PedidoOrcamento = {
  nome: '', cidade: '', bairro: '', imovel: '', servicos: [], material: '', ambientes: [], area: '', tom: '',
  pisoAtual: '', condicao: '', ocupacao: '', prazo: '', acesso: '', detalhes: '', fotos: false,
};

export function validarOrcamento(pedido: PedidoOrcamento): ErrosOrcamento {
  const erros: ErrosOrcamento = {};
  if (!pedido.nome.trim()) erros.nome = textos.orcamento.erros.nome;
  if (!pedido.cidade.trim()) erros.cidade = textos.orcamento.erros.cidade;
  const area = pedido.area.trim();
  if (area && (!/^\d{1,6}([.,]\d{1,2})?$/.test(area) || Number(area.replace(',', '.')) <= 0)) {
    erros.area = textos.orcamento.erros.area;
  }
  return erros;
}

export function mensagemOrcamento(pedido: PedidoOrcamento): string {
  const t = site.mensagens.orcamentoDetalhado;
  const grupos: CampoTextoOrcamento[][] = [
    ['nome', 'cidade', 'bairro', 'imovel'],
    ['material', 'area', 'tom'],
    ['pisoAtual', 'condicao', 'ocupacao', 'prazo', 'acesso', 'detalhes'],
  ];
  const blocos = grupos.map((campos, i) => {
    const linhas: string[] = [];
    if (i === 1) {
      if (pedido.servicos.length) linhas.push(`${t.campos.servicos}: ${pedido.servicos.join(', ')}`);
      if (pedido.ambientes.length) linhas.push(`${t.campos.ambientes}: ${pedido.ambientes.join(', ')}`);
    }
    for (const campo of campos) {
      let valor = pedido[campo].trim();
      if (!valor) continue;
      if (campo === 'area') valor = `${valor.replace('.', ',')} ${t.unidadeArea}`;
      linhas.push(`${t.campos[campo]}: ${valor}`);
    }
    return linhas.length ? `*${t.grupos[i]}*\n${linhas.join('\n')}` : '';
  }).filter(Boolean);
  return [t.inicio, ...blocos, pedido.fotos ? t.fotos : '', t.fim].filter(Boolean).join('\n\n');
}
