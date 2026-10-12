export const site = {
  nome: 'LRF',
  nomeCurto: 'LRF',
  categoria: 'Pisos e acabamentos',
  telefone: '5511994199540',
  telefoneExibicao: '(11) 99419-9540',
  pais: 'BR',
  areaAtendida: 'São Paulo e litoral',
  regioes: ['São Paulo', 'Litoral paulista'],
  indexar: false,
  url: '' as string,
  seo: {
    titulo: 'LRF | Pisos em São Paulo e no litoral',
    descricao: 'A mudança começa pelo chão. Conheça pisos, texturas e acabamentos para o seu ambiente. Atendimento em São Paulo e no litoral. Peça seu orçamento à LRF.',
  },
  mensagens: {
    geral: 'Olá, LRF! Vim pelo site e quero conversar sobre pisos para o meu ambiente.',
    catalogo: 'Olá, LRF! Gostaria de conhecer as opções de pisos, cores e acabamentos disponíveis.',
    orcamento: 'Olá, LRF! Quero solicitar um orçamento de piso. Posso enviar fotos, as medidas aproximadas e a cidade do imóvel?',
    atendimento: 'Olá, LRF! Gostaria de confirmar o atendimento para a minha cidade e combinar os próximos passos.',
    horario: 'Olá, LRF! Gostaria de consultar os horários de atendimento.',
    servico: (nome: string) => `Olá, LRF! Vim pelo site e tenho interesse em ${nome}. Posso enviar fotos e medidas do ambiente para consultar as opções e o orçamento?`,
  },
} as const;
