# LRF — Pisos e acabamentos

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

## GitHub e Vercel

Extraia o ZIP e envie o conteúdo da pasta `lrf-pisos` para a raiz de um repositório GitHub. Não envie `node_modules` ou `dist`.

Na Vercel, importe esse repositório. Use o preset Vite e a raiz que contém `package.json`. O `vercel.json` já define o comando `npm run check && npm run build` e a saída `dist`. Não é necessário configurar banco de dados, variáveis secretas ou backend.

Para criar a branch main e enviar pelo terminal, dentro da pasta extraída:

```bash
git init -b main
git add .
git commit -m "Site LRF"
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

## Dados e textos

- `src/config/site.ts`: identificação, telefone, região, mensagens do WhatsApp e SEO.
- `src/config/imagens.ts`: caminhos, dimensões e enquadramentos.
- `src/content/textos.ts` e `servicos.ts`: textos e rótulos.
- `src/styles/tema.css`: cores, fontes e tokens em `@theme`.

WhatsApp: **+55 11 99419-9540**. Identificação utilizada: **LRF**, conforme o logotipo enviado. O nome presente na interface do aplicativo do print não é usado. Não foram informados endereço físico, horários, razão social ou domínio; não há dados fictícios nesses campos. O mapa mostra a região de atendimento e não uma loja. Disponibilidade de materiais, execução, prazo e valores são consultados pelo WhatsApp.

A seção Sobre fica oculta enquanto `imagens.sobre` for `null`. As categorias da página são assuntos para consulta baseados nas fotos, não um catálogo com disponibilidade garantida.

## Prévia e indexação

A chave `indexar: false` mantém o HTML com `noindex,nofollow`. O build gera `robots.txt`, `sitemap.xml` e `manifest.webmanifest`.

Depois de definir o domínio final, preencha `site.url` com a URL HTTPS completa e altere `indexar` para `true`. Faça novo build/deploy. A URL final também é necessária para links absolutos de Open Graph e canonical.

## Imagens e fontes

Duas composições de hero: desktop horizontal e mobile vertical. O símbolo permanece dentro da arte. O componente usa `picture` e o mesmo breakpoint de 767 px do CSS; a arte é contida, sem corte. Em telas muito largas, a largura da arte é limitada pela altura disponível e alinhada à direita, sobre fundo contínuo de ponta a ponta. A navegação flutua sobre o topo; no celular, o início fica transparente para preservar a imagem.

As dez fotos e referências recebidas estão em AVIF com reserva em WebP. As fotografias preservam o conteúdo e as dimensões originais; não receberam reconstrução ou aumento artificial de resolução. O print de padrões é enquadrado pelo CSS para retirar a interface ao redor. Logo e capas são composições visuais, não fotografias de obra.

As fontes Manrope e Newsreader estão em `public/fonts`, com preload e licenças locais. Não há requisição de fonte ao Google.

## Movimento e acessibilidade

Abertura com logo montado em sete faixas diagonais, reflexo de luz, órbitas e saída em cortina. Contagem vinculada às duas fontes, à marca e à imagem do hero; saída de segurança após 8 segundos. Primeira entrada com apresentação de 2,45 segundos e versão curta na mesma sessão. Com movimento reduzido, a abertura é ignorada.

Dois carrosséis em sentidos opostos, com pausa no hover/foco, arrasto, controles por botão e setas do teclado. Com movimento reduzido ou pausa manual, tornam-se listas roláveis. A preferência de pausa é salva no navegador. Inclui foco visível, link de pular, menu com Escape e foco preso, textos alternativos e dimensões das imagens.

## Cache

`/assets`, `/fonts`, `/hero`, `/marca`, `/fotos` e `/icones` têm cache de um ano com `immutable`. Para substituir qualquer arquivo dessas pastas, mude seu nome, por exemplo de `-v1` para `-v2`, e atualize as referências. `og.jpg` não usa esse cache longo.

## Verificação

Antes da entrega: instalação, TypeScript e build de produção. Consulte a mensagem de entrega para as limitações de teste visual e de publicação. Este pacote não inclui credenciais ou vínculo automático com uma conta GitHub/Vercel.
