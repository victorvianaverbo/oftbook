# Especificação de Layout - Oftbook

**Direção de Arte Geral:**
A linguagem visual combina a elegância editorial da Anthropic com a estética tech e imersiva do Antigravity.Google.
- **Tipografia:** `Fraunces` (Serif, Editorial Headline) + `Geist` (Sans-serif, interface tech e legibilidade corpo).
- **Cores base:** Fundo `#F8FAFC`, Superfícies `#FFFFFF`, Texto Principal `#1A202C`, Texto Secundário `#4A5568`.
- **Cores de Destaque:** Teal Principal `#0ca5a5`, Teal Claro `#5CE1E6`, Teal Escuro `#077B7B`.
- **Estilo:** Interfaces flutuantes (Glassmorphism sutil), micro-interações magnéticas, scroll cinematográfico suave com texturas limpas (estilo medical niche, mas high-end tech).

---

## Seção 1: Hero

### Arquétipo e Constraints
- **Arquétipo:** Split com Overlap (Grid 48% / 52%)
- **Constraints:** Blur Glow (Fundo), Glassmorphism (Frame da UI), Gradiente no Texto, Parallax no Mouse.
- **Justificativa:** Cria uma introdução imediata de alto impacto. O lado esquerdo mantém foco editorial (texto forte), enquanto o direito mergulha na interação tech (UI flutuante).

### Conteúdo
- **Pill badge:** IA PARA OFTALMOLOGIA
- **Headline:** A Inteligência Artificial que Revoluciona a Prática Oftalmológica.
- **Subheadline:** Tome decisões clínicas mais rápidas e seguras com calculadoras especializadas, condutas embasadas em evidências e uma IA treinada em literatura médica oficial.
- **CTA 1:** Baixar no TestFlight [Ícone de Seta]
- **CTA 2:** Ver Funcionalidades
- **Métricas:** 8+ Calculadoras Clínicas | 100+ Condutas Médicas | 2x Decisão Mais Rápida

### Layout
- `min-height: 100vh`, padding 100px topo, 80px base. `display: grid; grid-template-columns: 48% 52%;`
- A coluna da direita se sobrepõe levemente à esquerda.
- Os indicadores (Métricas) ficam contidos no rodapé do lado esquerdo, separados do conteúdo principal por uma linha sutil.

### Tipografia
- **Headline:** `Fraunces`, 400. Tamanho `clamp(2.5rem, 5vw, 4.2rem)`, `line-height: 1.05`, `letter-spacing: -0.02em`. Parte final tem `Geist`, 600, com Gradient Text.
- **Subheadline:** `Geist`, 400. Tamanho `clamp(1.1rem, 1.2vw, 1.25rem)`, cor `#4A5568`.
- **Botões:** `Geist`, 500, `1rem`.

### Cores
- Fundo: Radial gradient top right `rgba(12, 165, 165, 0.08)` e bottom left `#ffffff`.
- Botão Principal: Bg `#1A202C`, Cor `#FFFFFF`.
- Pill Badge: Bg `rgba(12, 165, 165, 0.1)`, Texto `#077B7B`.

### Elementos Visuais
- **Mockup do App:** Container de largura 580px, proporção alta (680px height).
- O container principal do Mockup usa Glassmorphism (`rgba(255, 255, 255, 0.85)`, `backdrop-filter: blur(24px)`, borda de `rgba(255,255,255,0.8)`, `box-shadow: -20px 40px 100px rgba(0,0,0,0.08)`).
- Atrás do Mockup, um `glow-orb`: círculo de 600px com `radial-gradient` no hex `#0ca5a5`, blur de `50px`, 12% opacidade.

### Animações e Interatividade
- Botões possuem interação magnética (`transform: translateY(-2px); box-shadow: 0 10px 30px rgba(12, 165, 165, 0.2)`).
- Layer Parallax na imagem: ao mover o mouse (`clientXY`), move o Mockup e reflexos num grau sutil (`x/y * 15px`). 

### Responsividade
- Abaixo de `991px`: Transforma em uma coluna, centraliza tudo. Mockup fica abaixo das ações. O tamanho das fontes responde usando clamps. O parallax desativa.

---

## Seção 2: Benefícios Principais

### Arquétipo e Constraints
- **Arquétipo:** Floating Cards (Grid 3 colunas, limpo, espaçado)
- **Constraints:** Hover Lift, Stagger Anim, Glow Accent
- **Justificativa:** Exposição clara e rápida dos três pilares fundamentais. Cards com muito espaço em branco, respiro visual, que interagem gentilmente com o mouse imitando botões flutuantes para encorajar toque.

### Conteúdo
- **Título:** Precisão e Velocidade na Palma da Mão
- **Conteúdo (Sub):** Transforme sua rotina no consultório ou plantão com ferramentas criadas por e para oftalmologistas.
- **Card 1:** 01. Calculadoras Clínicas. Apoio à decisão em tempo real com 8+ calculadoras especializadas, com faixas de referência e conversões instantâneas.
- **Card 2:** 02. 100+ Condutas. Acesso rápido a protocolos atualizados para urgências e rotinas perfeitamente categorizadas por especialidade.
- **Card 3:** 03. Inteligência Lens AI. Não apenas respostas, mas segurança clínica embasada em literatura médica oficial com citações exatas.

### Layout
- `padding: 180px 6%;`, background branco sólido (`#FFFFFF`).
- Seção de cabeçalho (Título + Desc) centralizada, `max-width: 700px`.
- Grid de 3 colunas: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;`.
- Cada Card tem `padding: 48px 40px`, e um `border-radius: 20px`.

### Tipografia
- **Título da Seção:** `Fraunces`, `clamp(2.5rem, 4vw, 3.5rem)`, cor `#1A202C`.
- **Números nos cards (01, 02, 03):** `Fraunces`, 500, tamanho `3rem`, cor teal `#0ca5a5`.
- **Títulos dos cards:** `Geist`, 600, `1.35rem`.
- **Corpo dos cards:** `Geist`, 400, `1rem`, linha de `1.6`, texto mutado.

### Cores
- Fundo da seção: `#FFFFFF`.
- Fundo dos Cards normais: `#F8FAFC`, Borda `#000` em `0.04%` opacity.
- O Card de Destaque (03): Gradient sutil descendo para `rgba(12, 165, 165, 0.03)` com bordas em `rgba(12, 165, 165, 0.15)`.

### Elementos Visuais
- Os cards têm uma borda de topo usando linear gradient escondida que revela em hover.
- O card de destaque possui um "mini-glow" atrás do número (`width: 60px; height: 60px; background: #5CE1E6; filter: blur(20px); opacity: 0.3`).

### Animações e Interatividade
- **Scroll Reveal (Em exibição):** Cards aparecem via `fade-up`, com `duration 800ms`, atrasos escalonados (100ms, 200ms, 300ms).
- **Hover Reveal:** O card sobe `translateY(-8px)`, o fundo vira branco completo, com o aparecimento forte da sombra (`box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06)`) e borda superior gradiente ganha `opacity: 1`.

### Responsividade
- Abaixo de 1100px: Muda para 2 colunas.
- Abaixo de 768px: Muda para 1 coluna vertical empilhada, diminui gaps para 24px.

---

## Seção 3: Lens AI (Inteligência Artificial)

### Arquétipo e Constraints
- **Arquétipo:** Split Vertical Revelador / Scroll Cinematográfico
- **Constraints:** Sticky Element, Progressive Reveal, Text with Focus Color.
- **Justificativa:** Uma seção de features densa. O usuário dá scroll e a UI do chatbot do Lens AI (à direita) fica "sticky", enquanto os tópicos de texto (bullets) passam por baixo (à esquerda), acendendo e dando foco interativo visualmente em scroll progressivo.

### Conteúdo
- **Subtítulo:** IA para Oftalmologia
- **Título:** Uma Inteligência Artificial que Entende Oftalmologia de Verdade
- **Conteúdo:** O Lens AI não apenas responde suas dúvidas clínicas complexas. Ele embasa cada resposta na literatura científica especializada, citando a fonte, o livro e a página exata da resposta.
- **Bullet 1:** Respostas com Referências Bibliográficas (Rastreabilidade total e segurança clínica)
- **Bullet 2:** Especialização Absoluta (Treinado com literatura de glaucoma, retina, córnea e neuro-oftalmologia)
- **Bullet 3:** Histórico de Conversas (Retome de onde parou para comparar evoluções de casos)
- **Mockup Sugerido:** Interação de Chat (Lens AI) na interface flutuante.

### Layout
- Duas colunas em desktop `grid-template-columns: 50% 50%; max-width: 1240px`.
- Coluna ESQUERDA: Flui livremente com scroll. Bullet margins bem espaçadas.
- Coluna DIREITA: `position: sticky; top: 120px; height: calc(100vh - 240px); display: flex; align-items: center`.
- Total do container na vertical em y precisa ser grande para reter longo scroll (`padding: 120px 0 240px 0`).

### Tipografia
- **Subtítulo:** Badge pill igual ao do Hero (text uppercase, letter spacing).
- **Título Principal Sec:** `Fraunces`, `clamp(2rem, 3.5vw, 3.5rem)`, `#1A202C`.
- **Textos dos Bullets:** Titulo (Geist 600, 1.5rem), Definição (Geist 400, 1.125rem).

### Cores
- Fundo: Misto suave para `#F8FAFC`.
- Mockup Background: Vidro com borda Teal (`rgba(12, 165, 165, 0.2)`).

### Elementos Visuais
- Os "Bullets" (3 items) na esquerda ganham respiro massivo (`padding-bottom: 80px`).
- O "Mockup" é uma reprodução do app rodando um loop de conversa médica ou interatividade, alocado como card fixo na direita.

### Animações e Interatividade
- A opacidade de cada Bullet inicia inativa `opacity: 0.3`.
- Revela ao encostar no centro da viewport (`opacity: 100%`) via Observer nativo, dando a sensação de leitura progressiva.

### Responsividade
- Limitou viewport pra 991px ou mobile: Coluna direita e esquerda viram full wide stacked. Remove sticky. App mockup desce pro final da seção em position relative simples.

---

## Seção 4: Funcionalidades

### Arquétipo e Constraints
- **Arquétipo:** Bento Box Layout (Grid modular e assimétrico).
- **Constraints:** Imagens Overlay Texturas (Overflow Visible), Hover Scale nas Imagens, Hover Lift.
- **Justificativa:** Foge da monotonia dos quadros repetitivos. Um Bento box preenche o espaço visual elegantemente oferecendo caixas com diferentes proporções (verticais, horizontais) distribuindo o peso do "feature set" com um ritmo instigante.

### Conteúdo
- **Título:** Tudo que Você Precisa na Prática Clínica
- **Conteúdo:** Do diagnóstico inicial ao tratamento completo. Ferramentas essenciais para médicos e estudantes de oftalmologia.
- **Item 1:** Calculadoras Clínicas (Apoio à decisão em tempo real). Vertical Tall.
- **Item 2:** Condutas Clínicas (Guias práticos organizados). Horizontal Wide.
- **Item 3:** Bulário Oftalmológico (Busca rápida). Square.
- **Item 4:** CID-10 e CID-11 (Classificação completa). Square.
- **Item 5:** Especializações (Módulos educacionais). Horizontal Largo no footer.

### Layout
- Grid CSS Base: `display: grid; grid-template-columns: repeat(4, 1fr); auto-rows: 280px; gap: 24px; max-width: 1240px; margin: 0 auto;`.
- Alturas das caixas reguladas por Row. 
- Cada `grid-element` tem `border-radius: 24px`, e display flex.

### Tipografia
- **Título da Seção:** `Fraunces`, `3.5rem`.
- **Textos da Caixa Bento:** Título rápido (`Geist 500`, `1.25rem`), Subtexto leve descritivo (`Geist 400`, `0.95rem` , `#4A5568`).

### Cores
- Células tem box interno de background simples `#FFFFFF` sólido limpo, dropado na borda sutil cinza.

### Elementos Visuais
- Ilustrações ou mockups em svg interconectados que vazam internamente. O container de caixa restrita encobre e corta a imagem (`overflow: hidden`). 

### Animações e Interatividade
- Ao dar hover a caixa sobe sutilmente e reage à imagem interna escalando `scale(1.05)` (450ms).

### Responsividade
- Tablet Drop: 2 Column Bento Grid. Mobile: Coluna única, pilha de content blocks, perdendo a "magia" mas respeitando UI.

---

## Seção 5: Calculadoras Especializadas

### Arquétipo e Constraints
- **Arquétipo:** Spotlight / Zoom Focus Center
- **Constraints:** Dark Mode Reverso, 3D Tilt Hover, Endless Marquee Horizontal.
- **Justificativa:** Muda brutalmente a paleta de cores para causar impacto. Seta a cena imersiva da interface em Neon glow sobre fundo deep dark.

### Conteúdo
- **Título:** Cálculos Essenciais em Segundos
- **Conteúdo:** Nossas calculadoras exibem faixas de referência integradas. Converta a Acuidade Visual automaticamente entre Snellen, Decimal e LogMAR em um piscar de olhos.
- **Tags Infinitas:** OHTS • Acuidade Visual • PIO/LASIK • Hidroxicloroquina • PIO/Paquimetria • Trauma Ocular • Ishihara • Equiascopia

### Layout
- Secção isolada full width background escuro. `min-height: 85vh`.
- Centraliza texto descritivo. Abaixo, foca-se no Mockup (App rodando a calculadora).

### Tipografia
- Cores invertem para branco. `Fraunces` gigante `4rem` header. Corpo `Geist` num cinza gelo `#94A3B8`.

### Cores
- Fundo: `#0B1319` Deep Navy escuro. Gradiente Radial por tras da UI (`#0ca5a5` opacidade 10%).

### Elementos Visuais
- Marquee tag banner rodando de ponta a ponta continuamente nas extremidades da seção.
- Botões glow neon na tela com cor de destaque Teal saturado.

### Animações e Interatividade
- **Tilt Anim:** Evento MouseMove aplica `transform: perspective(1000px) rotateX(...) rotateY(...)` para olhar interativo. Marquee css.

---

## Seção 6: Condutas e Bulário

### Arquétipo e Constraints
- **Arquétipo:** Tabs Animadas (Split interativo)
- **Constraints:** Box-shadow Depth, Crossfade content.
- **Justificativa:** Área densa de dados pede Tab modular interativa que condensa o conhecimento e traz transições limpas.

### Conteúdo
- **Título:** Segurança Para o Seu Plantão
- **Conteúdo:** Mais de 100 condutas clínicas atualizadas para acesso rápido na urgência. Bulário completo com posologias, indicações e contraindicações filtrado por categorias terapêuticas.
- **Guias/Tabs:** ["Condutas" / "Bulário"].

### Layout
- Fundo volta para claro `#F8FAFC`. Padding generoso `140px 0`. Switcher de Abas no topo e card gigante interativo embaixo.

### Tipografia
- Hierarchy: H2 de `Fraunces`, Parágrafos desc de `Geist`. Abas no tab-switcher usam `Geist 600`.

### Cores e Interação Visual
- Background da Card Ativa Branco absoluto com elevação e sombra limpa de espalhamento alto (`box-shadow: 0 30px 60px rgba(0,0,0,0.05)`).
- Interação click tab anima o offset indicador da aba, sumindo com Fade e transpondo lateralmente a nova no lugar.

---

## Seção 7: CTA Final

### Arquétipo e Constraints
- **Arquétipo:** Single Focus Minimal Centralizado
- **Constraints:** Glow Button Magnetic Hover, Container Limitado.
- **Justificativa:** Evita distrações, mantendo alta conversão. Espaço negativo infinito focando a ação de Baixar no app.

### Conteúdo
- **Título:** Pronto Para Elevar Sua Prática Oftalmológica?
- **Conteúdo:** Junte-se a oftalmologistas e estudantes que já usam o Oftbook para diagnósticos rápidos, seguros e baseados em evidências.
- **CTA:** Baixar no TestFlight

### Layout
- Max width `600px`, padding altíssimo e centralizado (`text-align: center`).

### Tipografia e Cores
- Font Header enorme. Text secondary. Fundo branco limpo.
- CTA Button Invertido escuro `#1A202C`.

---

## Seção 8: Footer

### Arquétipo e Constraints
- **Arquétipo:** Split Horizontal (Base Modular Linear)
- **Constraints:** Texto Mute.
- **Justificativa:** Encerrando o assunto com base tecnológica solida, simples, legível.

### Layout e Formato
- Divisão horizontal top `1px borda fraca`.
- Esq: `Oftbook` bold. Dir: Copy de copyright e manifesto. Cores cinzas (`#4A5568`).
