# Layout Specification - Oftbook Landing Page v2

> Especificacao de Diretor de Arte para reconstrucao completa da landing page.
> Cada secao esta documentada com nivel de detalhe pixel-perfect.

---

## Design System Global

### Paleta de Cores

```
--bg-primary:      #FFFFFF
--bg-secondary:    #F8FAFC        (cinza azulado, clinicamente limpo)
--bg-dark:         #0B1319        (navy profundo para secoes escuras)
--bg-surface:      rgba(255,255,255,0.85)

--accent-primary:  #0D9488        (teal medico — profissional, confiavel)
--accent-light:    #5EEAD4        (teal claro para highlights)
--accent-dark:     #0F766E        (teal escuro para hover/texto)
--accent-glow:     rgba(13,148,136,0.15)

--text-primary:    #0F172A        (slate profundo — quase preto)
--text-secondary:  #475569        (slate medio — corpo)
--text-muted:      #94A3B8        (cinza claro — labels, captions)
--text-inverse:    #F8FAFC        (texto sobre fundo escuro)

--border-subtle:   rgba(15,23,42,0.06)
--border-accent:   rgba(13,148,136,0.15)

--shadow-sm:       0 1px 3px rgba(15,23,42,0.04)
--shadow-md:       0 8px 30px rgba(15,23,42,0.06)
--shadow-lg:       0 25px 60px rgba(15,23,42,0.08)
--shadow-glow:     0 0 40px rgba(13,148,136,0.12)
```

### Tipografia

```
Fontes: Fraunces (heading) + Geist (body) — "Medical Editorial Premium"

Heading (Fraunces):
  - h1: clamp(2.8rem, 5.5vw, 4.5rem), weight 400, line-height 1.05, letter-spacing -0.03em
  - h2: clamp(2.2rem, 4vw, 3.5rem), weight 400, line-height 1.08, letter-spacing -0.02em
  - h3: 1.35rem, weight 600 (usar Geist), line-height 1.3, letter-spacing -0.01em

Body (Geist):
  - body: 1rem, weight 400, line-height 1.65, letter-spacing 0
  - large: 1.15rem, weight 400, line-height 1.7
  - small: 0.875rem, weight 500, line-height 1.5
  - caption: 0.75rem, weight 700, letter-spacing 0.12em, uppercase
```

### Espacamento Base

```
--space-section:    clamp(100px, 12vh, 160px)    (entre secoes)
--space-header:     clamp(48px, 6vh, 80px)       (apos header de secao)
--container-max:    1200px
--container-pad:    clamp(20px, 5vw, 80px)
```

### Breakpoints

```
Desktop:   > 1100px
Tablet:    768px - 1100px
Mobile:    < 768px
```

---

## Secao 1: HERO

### Arquetipo e Constraints
- **Arquetipo:** Split Assimetrico (55/45) + Hero Dominante
- **Constraints:** Texto com Gradiente, Glassmorphism, Mouse Parallax, Float Loop, Overlap Elements
- **Justificativa:** O hero precisa comunicar autoridade medica + tecnologia. O split cria tensao visual; o glassmorphism no mockup transmite modernidade; o parallax adiciona profundidade sem distrair.

### Conteudo
- Badge: "Inteligencia Artificial Medica"
- Titulo: "A Inteligencia Artificial que Revoluciona" + "a Pratica Oftalmologica."
- Subtitulo: "Tome decisoes clinicas mais rapidas e seguras com calculadoras especializadas, condutas embasadas em evidencias e uma IA treinada em literatura medica oficial."
- CTA primario: "Comecar Agora" (com icone download)
- CTA secundario: "Ver Funcionalidades"
- Metricas: 8+ Calculadoras | 300+ Condutas | 10x Mais Rapido
- Trust badge: "Confiado por mais de 2.000 profissionais da area de oftalmologia"
- Mockup: Chat do Lens AI com pergunta "O que e o sinal de Hoyt?"

### Layout
```
Display: CSS Grid
Grid: 55% (conteudo) | 45% (visual)
Min-height: 100vh
Padding: 0 var(--container-pad)
Background:
  - Radial gradient no canto superior direito: rgba(13,148,136,0.06), radius 50%
  - Radial gradient no canto inferior esquerdo: rgba(248,250,252,1), radius 60%
  - Sutil noise texture: opacity 0.02

Conteudo (coluna esquerda):
  - Flex column, justify center
  - Padding-top: 120px, padding-bottom: 80px
  - Max-width do texto: 560px

Visual (coluna direita):
  - Flex, align center, justify flex-end
  - Mockup: max-width 520px
  - Mockup sangra 40px alem da margem direita (overflow visible na secao)
```

### Tipografia
```
Badge:
  - Geist, 0.75rem, weight 700
  - Letter-spacing: 0.12em, uppercase
  - Margin-bottom: 28px

Titulo linha 1 (editorial-text):
  - Fraunces, clamp(2.8rem, 5.5vw, 4.5rem), weight 400
  - Color: var(--text-primary)
  - Line-height: 1.05

Titulo linha 2 (gradient-tech):
  - Geist, clamp(2rem, 3.8vw, 3.2rem), weight 600
  - Background: linear-gradient(135deg, var(--accent-dark) 0%, var(--accent-primary) 50%, var(--accent-light) 100%)
  - -webkit-background-clip: text
  - -webkit-text-fill-color: transparent
  - Letter-spacing: -0.03em

Subtitulo:
  - Geist, clamp(1.05rem, 1.2vw, 1.2rem), weight 400
  - Color: var(--text-secondary)
  - Max-width: 520px
  - Margin-bottom: 48px
```

### Cores
```
Badge:
  - BG: linear-gradient(90deg, rgba(13,148,136,0.12), rgba(13,148,136,0.04))
  - Border: 1px solid rgba(13,148,136,0.3)
  - Box-shadow: 0 0 20px rgba(13,148,136,0.15), inset 0 0 10px rgba(13,148,136,0.08)
  - Text: var(--accent-dark)
  - Pseudo ::before animado (tech-scan): linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)

Btn Primary:
  - Normal: bg var(--text-primary), color #fff
  - Hover: bg var(--accent-dark), translateY(-3px), box-shadow 0 12px 35px rgba(13,148,136,0.25)
  - Transition: all 350ms cubic-bezier(0.165, 0.84, 0.44, 1)

Btn Secondary:
  - Normal: bg transparent, border 1px solid rgba(15,23,42,0.15), color var(--text-primary)
  - Hover: bg #fff, border-color rgba(15,23,42,0.08), box-shadow 0 6px 20px rgba(0,0,0,0.04)

Trust Badge:
  - BG: rgba(13,148,136,0.04)
  - Border: 1px solid rgba(13,148,136,0.1)
  - Border-radius: 100px
  - Padding: 12px 20px
  - Text: var(--text-secondary), strong em var(--text-primary)
  - Icon: var(--accent-primary)
```

### Elementos Visuais
```
Glow Orb (atras do mockup):
  - Width/height: 500px
  - Background: radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 65%)
  - Filter: blur(60px)
  - Position: centered no mockup

Mockup Frame:
  - BG: rgba(255,255,255,0.85)
  - Backdrop-filter: blur(30px)
  - Border: 1px solid rgba(255,255,255,0.7)
  - Box-shadow: -15px 30px 80px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,1)
  - Border-radius: 24px
  - Height: 640px
  - Overflow: hidden

Chat Bubbles:
  - User: bg #F1F5F9, border-radius 14px (bottom-right 4px), max-width 80%
  - AI: bg rgba(13,148,136,0.06), border 1px solid rgba(13,148,136,0.1), border-radius 14px (top-left 4px)

Citation badge:
  - BG: rgba(255,255,255,0.9)
  - Border: 1px solid rgba(13,148,136,0.15)
  - Border-radius: 8px
  - Padding: 6px 14px
  - Font-size: 0.75rem, weight 600, color var(--accent-dark)
```

### Animacoes
```
Badge tech-scan:
  - @keyframes tech-scan { 0% { left:-100% } 100% { left:200% } }
  - Duration: 4s, linear, infinite
  - Pseudo-element: width 50%, linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)

Parallax (mouse):
  - Amplitude: +-12px horizontal, +-12px vertical
  - Performance: requestAnimationFrame
  - Easing: none (instant tracking)
  - Trigger: mousemove sobre hero, observar visibilidade com IntersectionObserver

Mockup Float:
  - @keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-12px) } }
  - Duration: 6s, ease-in-out, infinite
  - Aplicar no .mockup-container

Metricas counter:
  - Numeros animam de 0 ate valor final
  - Duration: 2s, ease-out
  - Trigger: quando hero entra no viewport (IntersectionObserver)
  - Formato: "8+", "300+", "10x"
```

### Interatividade
```
Botoes:
  - Hover: translateY(-3px) + shadow crescente
  - Active: translateY(0px) + shadow reduzida
  - Transition: 350ms cubic-bezier(0.165, 0.84, 0.44, 1)

Mockup:
  - Mouse Parallax no container (amplitude +-12px)
  - Float animation constante (6s loop)
  - Sombra responde ao mouse: intensifica na direcao oposta
```

### Responsividade
```
Tablet (< 1100px):
  - Grid: 1fr (empilhado)
  - Texto: text-align center, align-items center
  - Mockup: max-width 440px, margin 0 auto
  - Metricas: justify-content center
  - Trust badge: justify-content center

Mobile (< 768px):
  - Padding-top: 80px
  - Buttons: flex-direction column, max-width 300px
  - Metricas: flex-wrap wrap, gap 24px
  - Mockup: max-width 100%, height auto (aspect-ratio: 3/4)
  - Float animation: desativar (prefers-reduced-motion)
```

---

## Secao 2: APP EM ACAO (Carrossel)

### Arquetipo e Constraints
- **Arquetipo:** Carousel Coverflow (perspectiva 3D leve)
- **Constraints:** Scale In (entrada), Hover Scale, Depth Blur nos slides laterais, Stagger
- **Justificativa:** O coverflow cria sensacao premium de app showcase. Os slides laterais com blur e escala reduzida dao profundidade. As imagens reais dos screenshots do app sao o protagonista — minimo de decoracao, maximo de clareza.

### Conteudo
- Badge: "O APP EM ACAO"
- Titulo: "Conheca o Oftbook por Dentro"
- Subtitulo: "Navegue pelas principais telas do aplicativo e descubra como o Oftbook transforma sua pratica clinica diaria."
- 8 slides com screenshots reais (titulo + subtitulo + descricao):
  1. **Pagina Inicial** — "Tudo ao Alcance dos Seus Dedos" — "Acesse rapidamente a Lens AI, perguntas rapidas, condutas e todas as ferramentas do Oftbook direto da tela inicial. Interface intuitiva pensada para o dia a dia do oftalmologista."
  2. **Inteligencia Artificial** — "Lens AI — IA Especializada em Oftalmologia" — "Faca perguntas clinicas complexas e receba respostas detalhadas com protocolos de tratamento, posologias e referencias bibliograficas. Treinada exclusivamente com literatura oftalmologica."
  3. **Calculadoras Clinicas** — "8+ Calculadoras Especializadas" — "Glaucoma OHTS, Acuidade Visual, PIO/Lasik, Hidroxicloroquina, PIO/Paquimetria, Trauma Ocular, Ishihara e Equiascopia. Resultados precisos com faixas de referencia integradas."
  4. **Condutas Clinicas** — "300+ Protocolos Atualizados" — "Condutas completas com manejo inicial, investigacao diagnostica e tratamento farmacologico. Organizadas por especialidade para acesso rapido no plantao ou consultorio."
  5. **Tratamento Detalhado** — "Protocolos Farmacologicos Completos" — "Cada conduta inclui tratamento farmacologico detalhado com doses, frequencias, criterios de gravidade e orientacoes de manejo."
  6. **Ferramentas** — "Tudo em Um So Lugar" — "Condutas, Angiografia Fluoresceínica, Lentes de Contato, Bulario, Guia Cirurgico, Videoaulas e Guias especializados de Retinopatia Diabetica e Edema Macular Diabetico."
  7. **Codigos e Classificacoes** — "CID-10, CID-11 e Classificacoes" — "Acesso rapido a todos os codigos e classificacoes oftalmologicas organizados de forma pratica. Busca inteligente para encontrar o codigo certo em segundos."
  8. **Atlas de Imagens** — "Referencia Visual Clinica" — "Imagens clinicas detalhadas organizadas por patologia para apoio diagnostico. Visualize achados oftalmologicos reais com descricoes e classificacoes integradas."
- Cada slide: imagem + titulo (h4) + subtitulo (span accent) + descricao (p muted)
- Navegacao: setas prev/next + indicador "1/8"

### Layout
```
Background: var(--bg-primary)
Padding: var(--space-section) var(--container-pad)

Carrossel:
  - Container max-width: 1200px, margin 0 auto
  - Viewport: overflow hidden, perspective 1200px
  - Track: display flex, transition transform 600ms cubic-bezier(0.32, 0.72, 0, 1)

Slides:
  - Slide ativo: min-width 360px, max-width 380px, centered
  - Slides laterais: scale(0.85), opacity 0.4, filter blur(2px)
  - Slide ativo: scale(1), opacity 1, filter none
  - Transicao entre estados: 600ms cubic-bezier(0.32, 0.72, 0, 1)
  - Gap visual entre slides: 40px
```

### Tipografia
```
Badge: mesmo estilo global (Geist, 0.75rem, 700, uppercase, letter-spacing 0.12em)

Titulo da secao:
  - Fraunces, clamp(2.2rem, 4vw, 3.5rem), weight 400
  - Margin-bottom: 16px

Subtitulo da secao:
  - Geist, 1.15rem, weight 400
  - Color: var(--text-secondary)
  - Max-width: 560px
  - Margin: 0 auto var(--space-header)

Titulo do slide:
  - Geist, 1.1rem, weight 600
  - Color: var(--text-primary)
  - Margin-top: 20px

Descricao do slide:
  - Geist, 0.9rem, weight 400
  - Color: var(--text-secondary)
  - Max-width: 320px
  - Line-height: 1.5
```

### Cores
```
Slide mockup container:
  - Border-radius: 24px
  - Box-shadow: var(--shadow-lg)
  - Overflow: hidden

Slide ativo: box-shadow 0 25px 60px rgba(15,23,42,0.12)
Slides inativos: box-shadow 0 8px 20px rgba(15,23,42,0.04)

Controles:
  - Botao: width 48px, height 48px, border-radius 50%
  - Normal: bg #fff, border 1px solid var(--border-subtle), color var(--text-primary)
  - Hover: bg var(--accent-primary), color #fff, border-color var(--accent-primary), box-shadow 0 6px 20px rgba(13,148,136,0.3)
  - Transition: all 300ms ease

Indicador:
  - Geist, 0.9rem, weight 600, color var(--text-muted)
```

### Animacoes
```
Entrada da secao:
  - Header: fade-up 800ms ease-out, triggered at 20% viewport
  - Carrossel: fade-up 800ms ease-out, delay 200ms

Slides transition:
  - Transform + opacity + filter: 600ms cubic-bezier(0.32, 0.72, 0, 1)

Auto-play:
  - Intervalo: 5000ms
  - Reset ao interagir manualmente
  - Pause on hover (opcional)

Slide image:
  - Na entrada: scale(0.95) -> scale(1), opacity 0 -> 1, 500ms ease-out
```

### Interatividade
```
Setas:
  - Click: muda slide + reset autoplay
  - Hover: scale(1.05) + cor accent

Swipe (touch):
  - Touch start/move/end tracking
  - Threshold: 50px para mudar slide
  - Momentum: nenhum (snap direto)

Teclado:
  - ArrowLeft/Right quando focus no carrossel
```

### Responsividade
```
Tablet:
  - Slide width: 320px
  - Slides laterais: hidden (overflow hidden)
  - Mostrar apenas slide ativo

Mobile:
  - Slide width: 100% - 40px
  - Controles: menores (40px)
  - Swipe habilitado
  - Titulo/descricao do slide: text-align center
```

---

## Secao 3: FUNCIONALIDADES

### Arquetipo e Constraints
- **Arquetipo:** Bento Box (celulas de tamanhos variados)
- **Constraints:** Hover Lift, Overlap Elements (icones transbordam borda), Stagger, Hover Reveal (descricao extra)
- **Justificativa:** Bento box evita o padrao generico de "4 cards iguais". Celulas de tamanhos diferentes criam hierarquia visual natural — o Lens AI (destaque) ocupa mais espaco. Os icones que transbordam a borda adicionam dinamismo.

### Conteudo
- Badge: "FUNCIONALIDADES"
- Titulo: "Tudo que Voce Precisa na Pratica Clinica"
- Subtitulo: "Do diagnostico inicial ao tratamento completo. Ferramentas essenciais para medicos e estudantes de oftalmologia."
- 4 funcionalidades:
  1. **Calculadoras Clinicas** (card medio) — "Apoio a decisao em tempo real com 8+ calculadoras especializadas. Conversao automatica de acuidade visual entre Snellen, Decimal e LogMAR."
  2. **300+ Condutas Medicas** (card medio) — "Acesso rapido a protocolos atualizados para urgencias e rotinas. Categorizacao por especialidade."
  3. **Inteligencia Lens AI** (card GRANDE — destaque) — "Nao apenas respostas, mas seguranca clinica embasada em literatura medica oficial. Cada resposta treinada exclusivamente com conteudo de oftalmologia."
  4. **Seguranca Clinica Garantida** (card medio) — "Com nossas ferramentas a sua decisao sera segura. Sem duvidas, sem arrependimentos."
- Link: "Explorar Todas as Funcionalidades →"

### Layout
```
Background: var(--bg-primary)
Padding: var(--space-section) var(--container-pad)

Bento Grid:
  - Display: grid
  - Grid: 3 colunas
  - grid-template-columns: 1fr 1fr 1fr
  - grid-template-rows: auto auto
  - Gap: 20px
  - Max-width: var(--container-max)

Card placement:
  - Calculadoras: col 1, row 1 (1x1)
  - Condutas: col 2, row 1 (1x1)
  - Lens AI: col 3, row 1-2 (1x2 — vertical tall, destaque)
  - Seguranca: col 1-2, row 2 (2x1 — horizontal wide)

Card paddings:
  - Normal cards: 40px
  - Lens AI (tall): 40px 40px 48px
  - Seguranca (wide): 40px

Icone:
  - Width/height: 52px
  - Position: relative
  - Margin-bottom: 24px
  - Background: var(--accent-glow)
  - Border-radius: 14px
  - Display: flex, align/justify center
  - SVG stroke: var(--accent-primary), stroke-width 1.5
```

### Tipografia
```
Card titulo (h3):
  - Geist, 1.25rem, weight 600, color var(--text-primary)
  - Letter-spacing: -0.01em
  - Margin-bottom: 12px

Card descricao:
  - Geist, 0.95rem, weight 400, color var(--text-secondary)
  - Line-height: 1.6

Lens AI titulo:
  - Geist, 1.5rem, weight 600 (ligeiramente maior por ser destaque)

Link:
  - Geist, 1.05rem, weight 600
  - Color: var(--accent-primary)
  - Display: inline-flex, align-items center, gap 8px
```

### Cores
```
Cards normais:
  - BG: var(--bg-secondary)
  - Border: 1px solid var(--border-subtle)
  - Border-radius: 20px
  - Box-shadow: none (estado normal)

Card Lens AI (destaque):
  - BG: linear-gradient(180deg, #fff 0%, rgba(13,148,136,0.04) 100%)
  - Border: 1px solid rgba(13,148,136,0.12)
  - Box-shadow: 0 8px 30px rgba(13,148,136,0.06)

Card hover (todos):
  - Transform: translateY(-6px)
  - BG: #fff
  - Border-color: rgba(13,148,136,0.1)
  - Box-shadow: 0 20px 50px rgba(15,23,42,0.06)

Card hover::before (linha topo):
  - Content: ''
  - Position: absolute, top 0, left 0, right 0
  - Height: 2px
  - Background: linear-gradient(90deg, transparent, var(--accent-primary), transparent)
  - Opacity: 0 -> 1 no hover

Icone container:
  - BG: rgba(13,148,136,0.08)
  - Border-radius: 14px
  - Hover: bg rgba(13,148,136,0.12), scale(1.05)

Lens AI card mini-glow:
  - Width/height: 80px
  - Background: var(--accent-light)
  - Filter: blur(30px)
  - Opacity: 0.2
  - Position: absolute, centered no icone
```

### Animacoes
```
Entrada:
  - Header: fade-up 800ms ease-out-cubic
  - Cards: fade-up com stagger
    - Card 1: delay 100ms
    - Card 2: delay 200ms
    - Card 3: delay 300ms
    - Card 4: delay 400ms
  - Link: fade-up delay 500ms

Hover:
  - Cards: translateY(-6px), 400ms cubic-bezier(0.165, 0.84, 0.44, 1)
  - Linha topo (::before): opacity 0->1, 400ms ease
  - Icone: scale 1->1.05, 300ms ease

Link arrow:
  - Hover: gap 8px -> 14px, 300ms ease
```

### Responsividade
```
Tablet (< 1100px):
  - Grid: 2 colunas
  - Lens AI: col span 2 (horizontal em vez de vertical)
  - Seguranca: col span 2

Mobile (< 768px):
  - Grid: 1 coluna
  - Todos os cards: span 1
  - Padding dos cards: 32px
```

---

## Secao 4: LENS AI (Scroll Cinematico)

### Arquetipo e Constraints
- **Arquetipo:** Scroll Storytelling + Split com Overlap
- **Constraints:** Sticky Element (mockup gruda), Progressive Reveal (features revelam com scroll), Glassmorphism, Texto com Gradiente
- **Justificativa:** A experiencia scroll-linked cria narrativa cinematica — o mockup permanece fixo enquanto os pontos de texto rolam, criando sensacao de profundidade e engajamento. O exemplo clinico (episclerite vs esclerite) demonstra competencia real.

### Conteudo
- Badge: "IA PARA OFTALMOLOGIA"
- Titulo: "Uma Inteligencia Artificial que Entende Oftalmologia de Verdade."
- Subtitulo: "O Lens AI nao apenas responde suas duvidas clinicas complexas. Ele embasa cada resposta na literatura cientifica especializada em oftalmologia, sem inventar, sem alucinar."
- Features (scroll reveal):
  1. "Respostas Treinadas em Oftalmologia" — "Confianca total e seguranca clinica. Cada resposta treinada exclusivamente com literatura confiavel de oftalmologia."
  2. "Especializacao Absoluta" — "Treinado com literatura de todas as areas de oftalmologia. Conhecimento especifico para cada subespecialidade."
  3. "Historico de Conversas" — "Retome de onde parou para comparar evolucoes de casos. Acompanhamento completo do historico clinico."
- Link: "Conhecer o Lens AI →"
- Mockup: Chat Lens AI com pergunta "Olho vermelho e dor. Como diferenciar episclerite de esclerite?"

### Layout
```
Background: linear-gradient(180deg, #fff 0%, var(--bg-secondary) 100%)
Padding: 120px 0 240px 0
Position: relative

Container:
  - Display: grid
  - Grid: 50% | 50%
  - Max-width: var(--container-max)
  - Margin: 0 auto
  - Padding: 0 var(--container-pad)
  - Gap: 60px

Coluna esquerda (texto):
  - Flex column
  - Header: margin-bottom 80px, padding-top 40px
  - Features: flex column, sem gap (items controlam proprio spacing)

Feature items:
  - Padding-bottom: 100px (espaco para scroll)
  - Estado inicial: opacity 0.25, translateX(-20px)
  - Estado ativo (no viewport): opacity 1, translateX(0)

Coluna direita (mockup):
  - Position: sticky
  - Top: 120px
  - Height: calc(100vh - 240px)
  - Display: flex, align center, justify center
```

### Mockup Detalhado
```
Lens Mockup:
  - Width: 100%, max-width 480px
  - Height: 580px
  - BG: rgba(255,255,255,0.75)
  - Backdrop-filter: blur(30px)
  - Border: 1px solid rgba(13,148,136,0.15)
  - Box-shadow: 0 30px 60px rgba(15,23,42,0.05), inset 0 0 0 1px rgba(255,255,255,0.5)
  - Border-radius: 24px
  - Flex column, overflow hidden

Chat bubble user:
  - BG: #fff
  - Box-shadow: 0 4px 15px rgba(15,23,42,0.04)
  - Border: 1px solid rgba(15,23,42,0.02)

Chat bubble AI:
  - BG: linear-gradient(135deg, rgba(13,148,136,0.04), rgba(13,148,136,0.08))
  - Border: 1px solid rgba(13,148,136,0.15)
  - Box-shadow: 0 4px 20px rgba(13,148,136,0.04)

Resposta AI (episclerite vs esclerite):
  - Texto com <strong> para "episclerite" e "esclerite"
  - Strong color: var(--text-primary), weight 600
```

### Animacoes
```
Feature items:
  - IntersectionObserver com rootMargin '-30% 0px -30% 0px'
  - Estado inativo: opacity 0.25, transform translateX(-20px)
  - Estado ativo: opacity 1, transform translateX(0)
  - Transition: opacity 800ms cubic-bezier(0.165,0.84,0.44,1), transform 800ms same

Mockup:
  - Float sutil: translateY(0) -> translateY(-8px), 7s ease-in-out infinite

Gradient text ("Entende Oftalmologia"):
  - Same gradient-tech class do hero
```

### Responsividade
```
Tablet/Mobile (< 991px):
  - Grid: 1 coluna
  - Sticky container: position relative, top auto, height auto
  - Mockup: margin-top 40px, max-width 400px
  - Feature items: padding-bottom 48px
  - Secao padding: 80px 6%
```

---

## Secao 5: CALCULADORAS (Spotlight Dark)

### Arquetipo e Constraints
- **Arquetipo:** Spotlight + Dark Mode
- **Constraints:** Mouse Tilt (3D), Gradiente Radial (glow), Marquee scroll, Scale In
- **Justificativa:** A inversao para dark mode cria contraste dramatico com o resto da pagina, destacando as calculadoras como feature premium. O tilt 3D no mockup convida interacao. O marquee cria ritmo e sugere a variedade de calculadoras disponiveis.

### Layout e Detalhes
Manter o design atual que ja esta excelente:
- Fundo: #0B1319
- Marquee tracks topo e base
- Mockup centralizado com spotlight glow
- Tilt 3D interativo com mouse
- Calculadoras listadas no marquee

### Ajustes de cor para nova paleta
```
- Spotlight glow: var(--accent-primary), filter blur(80px), opacity 0.12
- Mockup border: 1px solid rgba(13,148,136,0.2)
- Calc result: linear-gradient(135deg, rgba(13,148,136,0.12), rgba(15,118,110,0.18))
- Result label: var(--accent-light)
- Marquee text: rgba(255,255,255,0.35)
- Marquee dots: var(--accent-primary), opacity 0.5
```

---

## Secao 6: CONDUTAS E BULARIO (Tabs)

### Arquetipo e Constraints
- **Arquetipo:** Tabs (interativo) + Balanced
- **Constraints:** Slide In (transicao de tabs), Hover Lift (items), Selective Color (badges de categoria)
- **Justificativa:** Tabs sao o padrao correto para este conteudo (alternar entre 2 views). A animacao de slide e as cores seletivas nos badges (URG vermelho, INF amarelo, RET azul) criam hierarquia imediata.

### Ajustes
Manter design atual com ajustes de cor:
```
- Tab indicator bg: var(--accent-primary)
- Tab active text: #fff
- Condutas: "Mais de 300 condutas clinicas atualizadas..."
- Badge URG: #EF4444
- Badge INF: #F59E0B
- Badge RET: #3B82F6
- Cat chip active: bg var(--accent-primary), color #fff
```

---

## Secao 7: DEPOIMENTOS

### Arquetipo e Constraints
- **Arquetipo:** Masonry + Card Stack (nao grid simetrico!)
- **Constraints:** Float Loop (cards flutuam sutilmente), Stagger (entrada escalonada), Counter Animation (stats), Selective Color (estrelas douradas)
- **Justificativa:** Masonry evita o padrao generico de "4 cards iguais". Cards de alturas diferentes criam ritmo visual organico. Os avatares com iniciais + gradiente sao mais modernos que fotos circulares. Os stats com counter animation criam momento de impacto.

### Conteudo
(Mesmo do site alvo — 4 depoimentos + 3 stats)

### Layout
```
Background: var(--bg-secondary)
Padding: var(--space-section) var(--container-pad)

Grid de depoimentos:
  - Display: grid
  - Grid: repeat(2, 1fr) — MAS com grid-auto-rows: masonry (ou simular)
  - Gap: 20px
  - Max-width: 960px
  - Margin: 0 auto

  Para simular masonry sem JS:
  - Card 1: padding 40px (conteudo longo)
  - Card 2: padding 36px (conteudo medio)
  - Card 3: padding 36px (conteudo medio)
  - Card 4: padding 36px (conteudo curto — "E a ferramenta que todo oftalmologista deveria ter")

Stats row:
  - Display: flex, justify-content center
  - Gap: 80px
  - Margin-top: 80px
  - Padding-top: 60px
  - Border-top: 1px solid var(--border-accent)
```

### Cores e Detalhes
```
Cards:
  - BG: #fff
  - Border: 1px solid var(--border-subtle)
  - Border-radius: 20px
  - Box-shadow: var(--shadow-sm)
  - Hover: translateY(-4px), box-shadow var(--shadow-md)

Estrelas:
  - Color: #F59E0B (amber)
  - Font-size: 1rem
  - Gap: 2px

Quote text:
  - Font-style: italic
  - Color: var(--text-primary)
  - Font-size: 1rem
  - Line-height: 1.7

Avatar:
  - Width/height: 44px
  - Border-radius: 50%
  - BG: linear-gradient(135deg, var(--accent-primary), var(--accent-dark))
  - Color: #fff
  - Font: Geist, 0.85rem, weight 700
  - Display: flex, center

Stats number:
  - Fraunces, 2.8rem, weight 500
  - Color: var(--accent-dark)
  - Animate: counter from 0 to value, 2s ease-out, triggered on viewport entry
  - .star dentro do strong: color #F59E0B

Stats label:
  - Geist, 0.85rem, weight 600, uppercase
  - Letter-spacing: 0.05em
  - Color: var(--text-muted)
```

### Animacoes
```
Entrada:
  - Cards: fade-up stagger (100ms, 200ms, 300ms, 400ms)
  - Stats: fade-up delay 400ms
  - Counter: 0 -> valor, 2s ease-out, IntersectionObserver

Hover cards:
  - translateY(-4px), 400ms cubic-bezier(0.165,0.84,0.44,1)
  - Box-shadow transition

Float sutil (cards):
  - Card 1: float 8s ease-in-out infinite (amplitude 4px)
  - Card 3: float 9s ease-in-out infinite delay 2s (amplitude 3px)
  - Apenas nos cards impares para criar assimetria
```

### Responsividade
```
Tablet (< 991px):
  - Grid: 1 coluna
  - Stats gap: 40px

Mobile (< 768px):
  - Stats: flex-direction column, gap 32px
  - Card padding: 28px
```

---

## Secao 8: FAQ

### Arquetipo e Constraints
- **Arquetipo:** Reveal on Demand (nao accordion generico!)
- **Constraints:** Clip Reveal (resposta revelada com clip-path), Spring animation, Stagger entrada
- **Justificativa:** Ao inves de um accordion basico com toggle, usamos clip-path para revelar as respostas com uma animacao mais sofisticada. O spring no chevron cria sensacao de interacao fisica. Items de FAQ entram com stagger para criar ritmo.

### Conteudo
(10 perguntas — mesmo conteudo do site alvo)

### Layout
```
Background: var(--bg-primary)
Padding: var(--space-section) var(--container-pad)

FAQ list:
  - Max-width: 760px
  - Margin: 0 auto
  - Display: flex column
  - Gap: 10px

FAQ item:
  - Border: 1px solid var(--border-subtle)
  - Border-radius: 16px
  - Overflow: hidden
  - Background: #fff

Question button:
  - Width: 100%
  - Padding: 24px 28px
  - Display: flex, justify-content space-between, align-items center
  - Gap: 16px
  - Cursor: pointer
  - Background: none
  - Border: none

Answer container:
  - Overflow: hidden
  - Transition: max-height 500ms cubic-bezier(0.32,0.72,0,1), padding 400ms ease

  Estado fechado:
    - max-height: 0
    - padding: 0 28px

  Estado aberto:
    - max-height: 300px
    - padding: 0 28px 24px
```

### Cores
```
FAQ item normal:
  - Border: 1px solid rgba(15,23,42,0.06)
  - BG: #fff

FAQ item hover:
  - Border-color: rgba(13,148,136,0.12)

FAQ item active:
  - Border-color: rgba(13,148,136,0.2)
  - Box-shadow: 0 8px 30px rgba(13,148,136,0.05)

Question text:
  - Color: var(--text-primary)
  - Hover: color var(--accent-dark)

Chevron:
  - Color: var(--text-muted)
  - Active: color var(--accent-primary), rotate(180deg)
  - Transition: transform 400ms cubic-bezier(0.34,1.56,0.64,1) (spring overshoot)

Answer text:
  - Color: var(--text-secondary)
  - Line-height: 1.7
```

### Animacoes
```
Entrada:
  - FAQ items: stagger fade-up (cada item delay +50ms)
  - Trigger: AOS at 20% viewport

Chevron rotation:
  - 0deg -> 180deg
  - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) — spring overshoot
  - Duration: 400ms

Answer reveal:
  - max-height: 0 -> 300px
  - Easing: cubic-bezier(0.32, 0.72, 0, 1)
  - Duration: 500ms

Comportamento:
  - Apenas 1 item aberto por vez
  - Click em item aberto: fecha
  - Click em outro: fecha atual, abre novo
```

### Responsividade
```
Mobile (< 768px):
  - Question padding: 20px
  - Answer padding: 0 20px 20px
  - Font-size question: 0.95rem
```

---

## Secao 9: CTA FINAL

### Arquetipo e Constraints
- **Arquetipo:** Single Focus + Contained Center
- **Constraints:** Gradiente Radial (glow background), Scale In (entrada), Hover Glow (botao), Breathe Loop (glow sutil)
- **Justificativa:** Todo o design converge para esta secao. Single focus = uma unica acao clara. O glow que "respira" no fundo cria urgencia sutil. Os beneficios aparecem como tag pills em vez de checkmark list (evitando o padrao generico).

### Conteudo
- Titulo: "Pronto Para Elevar Sua Pratica Oftalmologica?"
- Subtitulo: "Junte-se a oftalmologistas e residentes que ja usam o Oftbook para diagnosticos rapidos, seguros e baseados em evidencias."
- Beneficios (4 pills, NAO lista com checkmarks):
  - "Acesso completo" | "Suporte 24/7" | "Atualizacoes continuas" | "Garantia 7 dias"
- CTA primario: "Assinar Agora" (com arrow icon)
- CTA secundario: "Fale com Especialista" (link WhatsApp)
- Trust line: "7 dias de garantia incondicional · Cancele a qualquer momento · Suporte especializado"

### Layout
```
Background: var(--bg-secondary)
Padding: var(--space-section) var(--container-pad)
Text-align: center
Position: relative
Overflow: hidden

Container:
  - Max-width: 640px
  - Margin: 0 auto
  - Position: relative, z-index 1

Glow background (::before):
  - Position: absolute
  - Bottom: -80px, left 50%, translateX(-50%)
  - Width: 500px, height: 300px
  - Background: radial-gradient(ellipse, rgba(13,148,136,0.06), transparent 70%)
  - Filter: blur(50px)
  - Animation: breathe 4s ease-in-out infinite (opacity 0.5 -> 1 -> 0.5)

Benefit pills:
  - Display: flex, flex-wrap wrap, justify-content center
  - Gap: 10px
  - Margin: 0 auto 40px
  - Cada pill: inline-flex, padding 10px 20px, border-radius 100px
  - BG: rgba(13,148,136,0.06)
  - Border: 1px solid rgba(13,148,136,0.12)
  - Font: Geist, 0.9rem, weight 500, color var(--accent-dark)

Botoes:
  - Display: flex, justify-content center, gap 16px
  - Margin-bottom: 32px
```

### Animacoes
```
@keyframes breathe {
  0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(0.95); }
  50% { opacity: 0.8; transform: translateX(-50%) scale(1.05); }
}

Entrada:
  - Container: zoom-in (scale 0.95 -> 1, opacity 0 -> 1), 1000ms ease-out
  - Trigger: AOS

Btn glow (::after):
  - Radial gradient branco
  - Opacity 0 -> 1 no hover
  - Scale 0.5 -> 1 no hover
  - Duration: 400ms ease
```

### Responsividade
```
Mobile (< 768px):
  - Botoes: flex-direction column, align center
  - Btn width: 100%, max-width 300px
  - Benefit pills: gap 8px
  - Trust line: font-size 0.8rem
```

---

## Secao 10: FOOTER

### Arquetipo e Constraints
- **Arquetipo:** Balanced + Sparse
- **Constraints:** Fade Up (entrada), Hover Underline (links)
- **Justificativa:** Footer nao precisa ser elaborado. Limpo, funcional, com informacoes claras. O grid de 3 colunas organiza marca + contato + legal sem poluicao visual.

### Layout
```
Background: var(--bg-primary)
Border-top: 1px solid var(--border-subtle)
Padding: 60px var(--container-pad) 0

Grid:
  - Display: grid
  - Grid: 2fr 1fr 1fr
  - Gap: 60px
  - Max-width: var(--container-max)
  - Margin: 0 auto
  - Padding-bottom: 40px

Footer bottom:
  - Border-top: 1px solid var(--border-subtle)
  - Padding: 24px 0
  - Text-align: center
```

### Tipografia e Cores
```
Logo: Fraunces, 1.5rem, weight 600, color var(--text-primary)

Tagline:
  - Geist, 0.95rem, weight 400
  - Color: var(--text-secondary)
  - Max-width: 340px
  - Line-height: 1.6

Section titles (h4):
  - Geist, 0.85rem, weight 600, uppercase
  - Letter-spacing: 0.08em
  - Color: var(--text-primary)
  - Margin-bottom: 8px

Links:
  - Color: var(--text-secondary)
  - Text-decoration: none
  - Hover: color var(--accent-primary)
  - Transition: color 300ms ease
  - Hover underline: pseudo ::after, width 0->100%, bg var(--accent-primary), height 1px

Copyright:
  - Geist, 0.85rem, weight 400
  - Color: var(--text-muted)
```

### Responsividade
```
Tablet (< 1100px):
  - Grid: 2 colunas
  - Brand: col span 2

Mobile (< 768px):
  - Grid: 1 coluna
  - Text-align: center
  - Brand: align-items center
  - Contact/Links: align-items center
```

---

## Resumo de Arquetipos por Secao

| Secao | Arquetipo | Constraints |
|-------|-----------|-------------|
| 1. Hero | Split Assimetrico + Hero Dominante | Texto Gradiente, Glassmorphism, Mouse Parallax, Float Loop |
| 2. App em Acao | Carousel Coverflow | Scale In, Depth Blur, Stagger, Hover Scale |
| 3. Funcionalidades | Bento Box | Hover Lift, Overlap Elements, Stagger, Hover Reveal |
| 4. Lens AI | Scroll Storytelling + Split Overlap | Sticky Element, Progressive Reveal, Glassmorphism |
| 5. Calculadoras | Spotlight + Dark Mode | Mouse Tilt, Gradiente Radial, Marquee, Scale In |
| 6. Condutas/Tabs | Tabs + Balanced | Slide In, Hover Lift, Selective Color |
| 7. Depoimentos | Masonry + Card Stack | Float Loop, Stagger, Counter Animation |
| 8. FAQ | Reveal on Demand | Clip Reveal (max-height), Spring, Stagger |
| 9. CTA Final | Single Focus + Contained Center | Gradiente Radial, Breathe Loop, Scale In, Hover Glow |
| 10. Footer | Balanced + Sparse | Fade Up, Hover Underline |

**Nenhum arquetipo repetido em secoes consecutivas.**
**Nenhum padrao generico usado (sem 3 cards iguais, sem circular photos, sem accordion basico, sem checkmark list).**
