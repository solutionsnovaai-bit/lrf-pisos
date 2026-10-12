# Zênite Revestimentos Premium

Site de uma página, em português, com atendimento em São Paulo e no litoral.

## Executar

Requer Node.js 22 ou superior e npm.

```bash
npm install
npm run check
npm run build
npm run dev
```

`npm run check` executa `tsc --noEmit`. O build estático é gerado em `dist`.

## Vercel

Na Vercel, importe este repositório com o preset Vite e a raiz que contém `package.json`. O `vercel.json` já define o comando `npm run check && npm run build` e a saída `dist`. Não há banco de dados, variáveis secretas ou backend.

## Dados e textos

- `src/config/site.ts`: nome, telefone, região, mensagens do WhatsApp e SEO.
- `src/config/imagens.ts`: caminhos, dimensões e o ponto de quebra do hero.
- `src/content/textos.ts` e `servicos.ts`: textos e rótulos.
- `src/styles/tema.css`: cores, fontes e tokens em `@theme`.

WhatsApp: **+55 11 99419-9540**. Não foram informados endereço físico, horários ou razão social; não há dados fictícios nesses campos. O mapa mostra a região de atendimento, não uma loja. Disponibilidade de materiais, execução, prazo e valores são consultados pelo WhatsApp.

A seção Sobre fica oculta enquanto `imagens.sobre` for `null`. As categorias da página são assuntos para consulta baseados nas fotos, não um catálogo com disponibilidade garantida.

## Identidade

- Paleta: grafite (`#08090b`, `#101216`), ardósia da marca (`#3e4e60`), dourado champanhe (`#d6b06a`) e seções claras em pedra e marfim (`#f2f0eb`, `#faf9f6`).
- Tipografia: Newsreader (títulos, com itálico nas linhas de destaque) e Manrope (textos). Fontes locais em `public/fonts`, com licenças OFL; nenhuma requisição ao Google Fonts.
- `public/marca/zenite-logo-v1.webp`: logo plano nas cores originais, com fundo transparente.
- `public/marca/zenite-logo-claro-v1.webp`: logo plano para fundos escuros (ardósia em prata clara).
- `public/marca/zenite-emblema-v1`: emblema texturizado recortado da arte do hero, usado no convite final.
- `public/fotos/zenite-piso-luz-v1`: piso de pedra polida com reflexo de luz, recortado da arte mobile, usado no manifesto.

## Hero

Duas composições: desktop horizontal (`zenite-desktop-v1`) e mobile vertical (`zenite-mobile-v1`). A composição vertical vale para celulares e para telas em pé: `(max-width: 767px), (max-aspect-ratio: 1/1)`, mantida igual em `imagens.ts`, `hero.css` e nos preloads do `index.html`.

- Desktop: a arte sangra pela direita e pelo topo, com altura igual à da seção. O logo fica inteiro sempre: a altura do hero é limitada pela largura da tela, a arte desce quando a tela é baixa para o logo não ficar sob o menu, e o texto tem largura calculada para nunca encostar no logo. Em telas ultralargas, a arte se funde ao fundo pela esquerda.
- Mobile: a arte sangra pelo topo e o texto entra sobre o piso, abaixo do logo.
- Movimento: entrada com leve zoom, brilho do feixe de luz respirando, partículas de poeira no feixe (canvas, desligado fora da tela e com movimento reduzido) e parallax na rolagem.

## Movimento e acessibilidade

Abertura com feixe de luz zenital descendo, logo revelado de cima para baixo com brilho, anel de progresso dourado e contagem. A contagem espera as fontes, o logo e a imagem do hero; saída de segurança após 8 segundos. Primeira entrada com apresentação completa e versão curta na mesma sessão. Com movimento reduzido, a abertura é ignorada.

Galeria com dois carrosséis em sentidos opostos, pausa no hover/foco, arrasto, controles por botão e setas do teclado, e lupa que amplia a textura das fotos ao passar o mouse. Com movimento reduzido ou pausa manual, os carrosséis viram listas roláveis. A preferência de pausa é salva no navegador. Inclui foco visível, link de pular, menu com Escape e foco preso, textos alternativos e dimensões das imagens.

## Pedido de orçamento

Os botões de orçamento levam a `#orcamento`. O formulário pede nome e cidade; os demais campos são opcionais. A prévia mostra a mensagem completa e o envio abre o WhatsApp com os campos preenchidos, sem incluir campos vazios; o visitante confirma o envio na conversa. O formulário não calcula valores, não cria pedidos em servidor e não salva os dados no navegador.

## Prévia e indexação

A chave `indexar: false` mantém o HTML com `noindex,nofollow`. O build gera `robots.txt`, `sitemap.xml` e `manifest.webmanifest`.

O endereço configurado em `site.url` ainda é `https://lrf-pisos.vercel.app`, usado em Open Graph e canonical. Ao trocar o domínio ou o nome do projeto na Vercel, atualize `site.url`. Para permitir a indexação, altere `indexar` para `true` e faça novo deploy.

## Cache

`/assets`, `/fonts`, `/hero`, `/marca`, `/fotos` e `/icones` têm cache de um ano com `immutable`. Para substituir qualquer arquivo dessas pastas, mude o sufixo do nome (por exemplo de `-v1` para `-v2`) e atualize as referências. `og.jpg` não usa esse cache longo.
