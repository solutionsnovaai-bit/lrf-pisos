import { site } from '../../config/site';
export function DadosEstruturados() {
  const dados = {
    '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: site.nomeCompleto, alternateName: site.nome,
    description: site.seo.descricao, telephone: `+${site.telefone}`,
    ...(site.url ? { url: site.url, image: `${site.url.replace(/\/$/, '')}/og.jpg` } : {}),
    areaServed: site.regioes.map(name => ({ '@type': 'Place', name })),
    hasOfferCatalog: { '@type': 'OfferCatalog', name: site.categoria },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }} />;
}
