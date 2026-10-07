---
tema: "O navegador como console: 3D e XR sem instalação"
slug: o-navegador-como-console-3d-e-xr-sem-instalacao
autor_login: jcsc
zona_de_interesse: Criação e plataforma — jogos, visualização 3D e XR distribuídos por link
data: 2026-10-07
horizonte: 2030
publico: "o próprio autor (dev + gestor de produto)"
recorte_geografico: brasil
disrupcoes_raiz: 3
efeitos_ordem_1: 6
efeitos_ordem_2: 11
efeitos_ordem_3: 11
tecnologias_citadas: [WebGPU, WebGL 2, WebAssembly 3.0, WasmGC, WebXR, WebTransport, WebCodecs, WebNN, glTF, KTX2/Basis Universal, Draco, meshopt, KHR_gaussian_splatting, Gaussian splatting, three.js, Babylon.js, PlayCanvas, SuperSplat, Spark, Unity 6, Godot 4, Bevy, Unreal Engine, 8th Wall, YouTube Playables, Discord Activities, Embedded App SDK, Reddit Devvit, Telegram Mini Apps, Poki, CrazyGames, Facebook Instant Games, Xbox Cloud Gaming, GeForce NOW, Amazon Luna, Apple Vision Pro, Meta Quest Browser, Android XR, Samsung Galaxy XR, Meta Ray-Ban Display, Pix]
fontes: 62
confianca: media
experimento: "Mesmo jogo, três portas: protótipo 3D em WebGPU (com fallback WebGL 2) aberto por link/QR em sala, medindo tempo-até-jogar e falhas por aparelho contra a mesma cena instalada"
skill_usada: futurizacao-jcsc
publico_ok: false
---

## 1. Resumo

Até 2030, o navegador deixa de ser o lugar do jogo "casual de portal" e passa a rodar 3D de porte médio, visualização profissional e parte do XR — porque pela primeira vez todos os grandes motores de navegador entregam WebGPU (Chrome 113/Android 121, Safari 26, Firefox 141+) e WebAssembly 3.0. A ruptura maior, porém, não é gráfica: é de distribuição. O jogo sai da loja e vira link dentro de outras plataformas (YouTube Playables, Discord Activities, Reddit, Poki com 100 milhões de jogadores/mês), enquanto decisões judiciais e regulatórias (Epic v. Apple, DMA, lei japonesa) abrem o pagamento fora da loja. O mapa é cético em três pontos: o XR por link cresce num mercado de headsets que encolhe; o iPhone continua sem WebXR; e o "fim do gatekeeper" provavelmente só troca o gatekeeper de dono. No Brasil (Android ~79% do tráfego, celular como plataforma preferida, zero-rating favorecendo apps), a web leva vantagem de alcance e desvantagem de custo de dados.

## 2. O tema

"O navegador como console" é a hipótese de que jogo, visualização 3D e experiência imersiva passam a ser distribuídos como **link**, e não como **app instalado**. Encosta em mídia e interação em três pontos: (a) o *tempo até a primeira interação* cai de minutos (loja, download, permissão) para segundos, o que muda o design de onboarding de qualquer experiência 3D; (b) o link é compartilhável dentro de outras mídias (vídeo, chat, rede social), então o jogo passa a viver *dentro* de outra plataforma; (c) o mesmo link pode abrir em tela plana, celular ou headset — o XR vira modo de exibição, não produto separado.

Merece mapa de futuro, e não só levantamento de estado da arte, porque as três peças que tornam isso possível (WebGPU universal, Wasm 3.0, abertura regulatória das lojas) amadureceram entre 2023 e 2026 e ainda não produziram seus efeitos de segunda ordem — sobre quem é dono da distribuição, quem cobra a taxa, que engine se escolhe, e se o XR sobrevive como categoria.

**Registro da entrevista (Etapa 1 da skill) — leia isto.** A entrevista não foi feita ao vivo para este tema: o aluno estava em outra aula e pediu explicitamente para a IA reaproveitar o que já sabia do projeto. As cinco respostas abaixo foram **reaproveitadas da rodada de teste da skill (`TESTE.md`, 2026-09-09, tema auth/identidade)**, não dadas para este tema. Isso é desvio do processo da própria skill e fica registrado aqui e na seção 8, não escondido:

| Pergunta | Resposta usada | Origem |
|---|---|---|
| Horizonte | 2030 | reaproveitada do TESTE.md |
| Público | o próprio autor (dev + gestor de produto) | reaproveitada do TESTE.md |
| Recorte | Brasil (evidência majoritariamente global, lida com lente brasileira) | reaproveitada do TESTE.md |
| Descartes | tecnologia já consolidada (WebGL clássico, portais de jogo 2D, PWA genérico) | reaproveitada e adaptada ao tema pela IA |
| Viés | neutro/cético | reaproveitada do TESTE.md |

## 3. Onde isso está hoje

### O que já existe e funciona

- **WebGPU em todos os motores.** Chrome/Edge desde a versão 113 (ChromeOS, Windows, macOS; Linux ainda "coming soon") [1]; Android desde o Chrome 121, em Android 12+ com GPUs Qualcomm e ARM [2]; Safari 26.0 em macOS, iOS, iPadOS e visionOS, com a Apple declarando que WebGPU "supersedes WebGL" para sites novos [3]; Firefox 141 no Windows [4] e Firefox 145 no macOS 26 em Apple Silicon [5]. Cobertura global ~88% segundo o caniuse [6]. A especificação ainda é *Candidate Recommendation Draft* no W3C (15/09/2026) [7].
- **WebAssembly 3.0** virou padrão em 17/09/2025 (GC, Memory64, exceptions, tail calls, relaxed SIMD) e já está nos principais navegadores [8]; a tabela oficial mostra GC no Safari desde 18.2 e Memory64 ainda atrás de flag no Safari [9].
- **Engines.** Unity 6.6 tirou WebGPU do status experimental (WebGL 2 segue como padrão, WebGPU é opt-in, exige HTTPS) [10]. three.js tenta WebGPU por padrão no `WebGPURenderer` e cai para WebGL 2 se não houver [11]. Babylon.js 8.0 tem shaders nativos em WGSL, ficando "2x menor" em WebGPU [12]. PlayCanvas tem WebGPU no editor desde 2024 [13].
- **3D capturado do mundo real por link.** Gaussian splatting ganhou padrão ratificado no glTF (`KHR_gaussian_splatting`) [14]. SuperSplat (PlayCanvas) reporta, em benchmark próprio, 5,7× de fps com renderer WebGPU e cena de 24M gaussians aparecendo "quase instantaneamente" no celular via streaming com LOD [15]; Spark 2.0 (three.js) faz streaming de splats via HTTP Range e tem modo XR [16].
- **Distribuição por link já tem escala.** Poki: 100 milhões de jogadores/mês e 625 milhões no ano de 2025 (dado da própria empresa) [17]. CrazyGames: 35 milhões de usuários mensais (dado da empresa via imprensa) [18]. YouTube Playables em 50+ mercados, com o "Playables Builder" gerando jogos com Gemini em beta fechado [19][20]. Discord Activities abertas a todos os devs desde 09/2024, com compras dentro do app [21]. Reddit paga devs de apps/jogos Devvit [22].
- **Pagamento fora da loja.** Em 30/04/2025 a Apple foi declarada em "violação deliberada" e obrigada a permitir links de compra na web sem comissão nos EUA [23]; Fortnite voltou à App Store americana com compra pela web [24]; a Suprema Corte aceitou julgar o recurso da Apple em 30/06/2026 [25]. No Japão, a Apple abriu lojas alternativas em 12/2025 [26]. A Supercell passou a linkar sua web shop dentro dos jogos [27]. A Xsolla — vendedora de pagamentos, viés forte — diz que a venda direta cresceu 26% em 2025 contra 0,2% do mercado mobile [28].
- **XR por link funciona em headsets.** Vision Pro suporta sessões `immersive-vr` desde Safari 18 [29]; Meta Quest Browser segue adicionando WebGPU e recursos WebXR experimentais em 2026 [30]; Chrome no Android XR suporta WebXR com hit test, mãos, âncoras e profundidade [31]. WebXR também é *Candidate Recommendation Draft* [32].

### O que existe e não funciona (ou funciona mal)

- **iPhone sem WebXR.** O caniuse não lista suporte a WebXR em nenhuma versão do Safari iOS [33]. O AR por link de massa no iOS continua bloqueado.
- **Godot não exporta C# para web e não tem WebGPU**; a própria documentação diz que o nativo mobile "sempre" será bem mais rápido [34]. **Unreal saiu da web** desde a 4.24 [35].
- **Memória no iOS.** Relatos (não documentação da Apple) de abas mortas por volta de 500 MB; o iOS 18.2 corrigiu um bug de fragmentação de memória Wasm, mas aparelhos com pouca RAM continuam quebrando [36]. A Apple não publica limite oficial [37].
- **Armazenamento descartável.** O WebKit apaga dados por origem inteira (LRU) sob pressão de espaço; persistência é concedida por heurística [38] — jogo grande por link pode ter que baixar tudo de novo.
- **Threads exigem cross-origin isolation**, o que atrapalha anúncios e integrações de terceiros [34].
- **Bateria/temperatura:** a API para o jogo saber da pressão térmica (Compute Pressure) ainda é experimental [39].
- **Mini-jogos de plataforma podem ser bolha.** Jogos no Telegram retiveram só 5–20% dos jogadores no 4º tri de 2024; Hamster Kombat caiu de 300M para 41M após o airdrop [40].

### Quem está construindo, e quem está recuando

- Construindo: Google (Playables, Android XR), Discord, Reddit, Poki/CrazyGames, Unity (WebGPU), PlayCanvas, comunidade three.js, Khronos (glTF/splats).
- Recuando: Meta fechou três estúdios VR e cortou ~10% do Reality Labs em 01/2026 [41], e moveu o Horizon Worlds para "quase exclusivamente mobile" [42]; Vision Pro com vendas fracas e marketing cortado (estimativas de analistas) [43]; a Niantic encerrou o 8th Wall comercial e o abriu como código aberto [44]; a Meta encerra a plataforma legada de Web Games do Facebook em 30/09/2026 [45].
- O modelo concorrente de "sem instalação" — **cloud gaming** — esbarra em custo: Stadia fechou em 2023 [46], e o Xbox Cloud Gaming impõe limite mensal de horas a partir de 11/2026 porque "o custo cresce conforme mais pessoas jogam" [47].

### Brasil

- Smartphone é a plataforma preferida de 44,1% dos jogadores (PGB 2026) [48]; 82,8% dos brasileiros jogam (PGB 2025) [49].
- Android tem 78,8% do tráfego web mobile no Brasil (StatCounter, 09/2026) [50] — ou seja, a maioria da base tem WebGPU (Chrome Android) e potencialmente WebXR, e não depende do iOS.
- 67% dos planos móveis da América Latina têm zero-rating para apps (WhatsApp em 61%) [51]: o app "patrocinado" não gasta franquia, o link de jogo web gasta.
- Portal brasileiro de jogos web existe há duas décadas (Click Jogos, 2004, autodeclarado maior portal infantil do país) [52] — o jogo 2D por link é presente, não futuro.

## 4. As disrupções-raiz

### Candidatos recusados por maturidade (critério da skill aplicado)

Critério: recusar o que já é padrão de mercado consolidado, amplamente adotado pelos líderes e sem debate real de substituição até 2030.

- **WebGL 1/2 e three.js "clássico"** — maduros desde a década de 2010; são o incumbente que o WebGPU disputa, não futuro.
- **Portais de jogos 2D/casual em HTML5** (Click Jogos, a geração pós-Flash) — maduros; o que é novo é 3D de porte e jogo dentro de plataformas hospedeiras.
- **PWA genérico** — padrão consolidado; a disputa de 2024 sobre PWA na UE entra como sinal regulatório, não como disrupção.
- **Cloud gaming** — não é maduro, mas foi **recusado por escopo**: é "navegador como TV" (o processamento fica no servidor), não "navegador como console". Entra no mapa como força contrária e comparação.
- **Gaussian splatting como disrupção própria** — cogitado como quarta raiz e cortado: é o núcleo do Tema 10 (captura de realidade e renderização neural). Aqui entra só como efeito de streaming dentro da raiz 1.

### Disrupção-raiz 1 — GPU de verdade atrás de um link (WebGPU + Wasm 3.0 em todos os navegadores)

- **O que rompe:** a premissa de que 3D sério (compute shaders, milhões de primitivas, física em threads) exige instalação. WebGL nunca deu compute; WebGPU dá.
- **Por que agora e não há cinco anos:** em 2021 só havia WebGL. O fechamento do ciclo foi em 2025–2026: Safari 26 (set/2025) trouxe WebGPU a iPhone e Vision Pro [3]; Firefox fechou Windows e macOS [4][5]; Wasm 3.0 padronizou GC e Memory64 [8]; Unity 6.6 tirou WebGPU de experimental (ago/2026) [10].
- **O que ainda falta:** Linux no Chrome, Firefox Android [1][6]; Godot com WebGPU [34]; resolver memória e armazenamento descartável no iOS [36][38]; a spec sair de CR Draft [7].

### Disrupção-raiz 2 — O jogo sai da loja: link hospedado em outras plataformas + pagamento fora da loja

- **O que rompe:** a estrutura de poder da distribuição. Não é melhoria técnica: muda quem é o "console" (a loja de app → plataformas de conteúdo e chat) e quem fica com a taxa.
- **Por que agora:** Discord abriu Activities a todos (2024) [21]; YouTube expandiu Playables para 50+ mercados (2026) [19]; a decisão Epic v. Apple (abr/2025) e a lei japonesa (dez/2025) abriram links de pagamento [23][26]; grandes estúdios já usam web shop [27].
- **O que ainda falta:** a Suprema Corte dos EUA decidir o recurso da Apple [25]; prova de que mini-jogos hospedados retêm jogador (o caso Telegram mostra o contrário) [40]; um modelo de taxa das plataformas hospedeiras que seja melhor que os 30% da loja (não verificado — as plataformas não publicam taxas comparáveis de forma clara).

### Disrupção-raiz 3 — XR por link: a experiência imersiva distribuída como URL, sem loja do headset

- **O que rompe:** a necessidade de publicar em cada loja de headset (Quest, visionOS, Android XR) para uma experiência imersiva curta. O mesmo link abre em tela plana ou imersivo.
- **Por que agora:** Vision Pro com `immersive-vr` [29], Android XR com WebXR completo [31], Quest Browser com WebGPU em XR [30] — três plataformas de headset com navegador imersivo ao mesmo tempo, pela primeira vez.
- **O que ainda falta:** WebXR no iPhone (sem sinal algum) [33]; um mercado de headsets que pare de encolher [41][42][43]; navegador imersivo em óculos leves — os óculos que vendem (Ray-Ban Meta, 7 milhões em 2025 [53]; Ray-Ban Display [54]) não têm WebXR verificado. **Esta é a raiz com maior risco de não se concretizar** (ver seção 7).

## 5. A roda dos futuros

```yaml
roda:
  - disrupcao: GPU de verdade atrás de um link (WebGPU + WebAssembly 3.0 em todos os grandes navegadores)
    efeitos:
      - id: e1
        ordem: 1
        efeito: Jogos 3D de porte médio passam a lançar versão jogável no navegador junto com a versão nativa, como porta de entrada
        sinal: medio
        prazo: 2028
        confianca: baixa
        efeitos:
          - id: e1.1
            ordem: 2
            efeito: A demo instalável perde espaço para a demo por link compartilhada em vídeo e rede social
            sinal: fraco
            prazo: 2029
            confianca: baixa
            efeitos:
              - id: e1.1.1
                ordem: 3
                efeito: A métrica principal de marketing de jogos passa de downloads e wishlists para sessões iniciadas a partir de um link
                sinal: fraco
                prazo: 2030
                confianca: baixa
          - id: e1.2
            ordem: 2
            efeito: Exportar bem para a web passa a pesar na escolha de engine, pressionando engines abertas sem WebGPU
            sinal: medio
            prazo: 2028
            confianca: media
            efeitos:
              - id: e1.2.1
                ordem: 3
                efeito: A Unity recupera parte do terreno perdido para a Godot no nicho de jogos web enquanto a Godot não tiver WebGPU
                sinal: fraco
                prazo: 2029
                confianca: baixa
      - id: e2
        ordem: 1
        efeito: Visualização 3D profissional (produto, arquitetura, ensino) migra do software instalado para o link com processamento na GPU do cliente
        sinal: medio
        prazo: 2028
        confianca: media
        efeitos:
          - id: e2.1
            ordem: 2
            efeito: Visualizadores 3D trocam licença por máquina por cobrança por link ou por visualização
            sinal: fraco
            prazo: 2029
            confianca: baixa
            efeitos:
              - id: e2.1.1
                ordem: 3
                efeito: A TI corporativa passa a governar o acesso a 3D por política de navegador e não por instalação de software
                sinal: fraco
                prazo: 2030
                confianca: baixa
          - id: e2.2
            ordem: 2
            efeito: O gargalo deixa de ser a API gráfica e passa a ser memória e download no celular, tornando streaming com nível de detalhe uma competência obrigatória
            sinal: forte
            prazo: 2027
            confianca: media
            efeitos:
              - id: e2.2.1
                ordem: 3
                efeito: Surge um mercado de entrega e otimização especializado em assets 3D por link, como o CDN de vídeo surgiu para o streaming
                sinal: fraco
                prazo: 2030
                confianca: baixa
  - disrupcao: O jogo sai da loja e vira link hospedado em outras plataformas, com pagamento fora da loja aberto por via judicial e regulatória
    efeitos:
      - id: e3
        ordem: 1
        efeito: Plataformas de vídeo, chat e comunidade viram consoles hospedeiros onde o jogo vive como link embutido
        sinal: forte
        prazo: 2027
        confianca: media
        efeitos:
          - id: e3.1
            ordem: 2
            efeito: O gatekeeper muda de dono em vez de desaparecer, e taxa e regras passam da loja de apps para as plataformas hospedeiras
            sinal: medio
            prazo: 2029
            confianca: media
            efeitos:
              - id: e3.1.1
                ordem: 3
                efeito: O escrutínio antitruste hoje focado em lojas de apps passa a mirar as plataformas hospedeiras de mini-jogos
                sinal: fraco
                prazo: 2030
                confianca: baixa
          - id: e3.2
            ordem: 2
            efeito: Jogos curtos gerados por IA dentro das próprias plataformas inundam o catálogo de jogos por link
            sinal: medio
            prazo: 2028
            confianca: media
            efeitos:
              - id: e3.2.1
                ordem: 3
                efeito: Descoberta vira o recurso escasso e o algoritmo de recomendação decide quem ganha, como no vídeo curto
                sinal: fraco
                prazo: 2030
                confianca: baixa
      - id: e4
        ordem: 1
        efeito: A loja web vira o caixa padrão do jogo mobile nos mercados onde a lei permite, mesmo quando o jogo continua instalado
        sinal: forte
        prazo: 2027
        confianca: media
        efeitos:
          - id: e4.1
            ordem: 2
            efeito: Estúdios mobile constroem um companheiro web do jogo com loja, eventos e modos jogáveis no navegador
            sinal: medio
            prazo: 2028
            confianca: media
            efeitos:
              - id: e4.1.1
                ordem: 3
                efeito: A fronteira entre app e link some para o jogador, com o mesmo progresso e inventário vivendo nos dois
                sinal: fraco
                prazo: 2030
                confianca: baixa
          - id: e4.2
            ordem: 2
            efeito: No Brasil, Pix combinado com loja web torna o país campo de teste de monetização de jogos fora da loja
            sinal: fraco
            prazo: 2028
            confianca: baixa
            efeitos:
              - id: e4.2.1
                ordem: 3
                efeito: Plataformas de jogos por link negociam zero-rating com operadoras para não perder para apps patrocinados
                sinal: fraco
                prazo: 2030
                confianca: baixa
  - disrupcao: XR por link, com a experiência imersiva distribuída como URL sem passar pela loja do headset
    efeitos:
      - id: e5
        ordem: 1
        efeito: Experiências imersivas curtas (marca, turismo, museu, ensino) migram do app nativo para o link porque a base instalada de headsets não paga um app
        sinal: medio
        prazo: 2028
        confianca: media
        efeitos:
          - id: e5.1
            ordem: 2
            efeito: O fim do 8th Wall comercial desloca o AR web de marca para stacks abertas como three.js, Spark e PlayCanvas
            sinal: medio
            prazo: 2027
            confianca: media
            efeitos:
              - id: e5.1.1
                ordem: 3
                efeito: Agências criativas absorvem a competência de XR web e o estúdio especializado em XR encolhe
                sinal: fraco
                prazo: 2030
                confianca: baixa
          - id: e5.2
            ordem: 2
            efeito: Sem WebXR no iPhone, o AR por link de massa cresce primeiro onde o Android domina
            sinal: medio
            prazo: 2028
            confianca: media
            efeitos:
              - id: e5.2.1
                ordem: 3
                efeito: O Brasil vira mercado de teste de AR por link no Android para varejo e educação
                sinal: fraco
                prazo: 2030
                confianca: baixa
      - id: e6
        ordem: 1
        efeito: Com o recuo dos headsets, o XR web se reorienta para celular e óculos leves em vez de capacetes imersivos
        sinal: fraco
        prazo: 2029
        confianca: baixa
        efeitos:
          - id: e6.1
            ordem: 2
            efeito: Desenvolvedores passam a fazer 3D plano com modo imersivo opcional em vez de apps exclusivamente imersivos
            sinal: medio
            prazo: 2028
            confianca: media
            efeitos:
              - id: e6.1.1
                ordem: 3
                efeito: A categoria app de VR se dissolve na web 3D comum e o imersivo vira um modo de exibição, não um produto
                sinal: fraco
                prazo: 2030
                confianca: baixa
```

**O que o bloco não consegue dizer.**

- **Convergência interna:** as três raízes desembocam no mesmo lugar — `e3.1` (o gatekeeper troca de dono), `e1.2.1` (a engine com WebGPU ganha poder) e `e5.1` (o AR web migra para stacks abertas depois que um fornecedor fechou). O tema parece ser sobre "sem intermediário", mas a roda mostra um **rearranjo de intermediários**, não o fim deles. É o achado mais forte do mapa e o melhor ponto de partida para a discussão em sala.
- **Convergência com outros temas da turma (provável):** `e3.2` (jogos gerados por IA dentro da plataforma) encosta no Tema 08 (narrativa gerativa) e no Tema 14 (gerar geradores); `e2.2` (streaming de splats) encosta no Tema 10 (captura de realidade); a GPU no navegador é a mesma infraestrutura do Tema 16 (IA local no navegador), que apresenta no mesmo dia.
- **Cadeias que continuariam depois do 3º nível (cortadas pela regra de profundidade):** `e3.2.1` continuaria em "criadores de jogos passam a ser remunerados como criadores de vídeo (por atenção, não por venda)"; `e4.2.1` continuaria em debate de neutralidade de rede aplicado a jogos.
- **Checagem de horizonte (correção do `DUVIDAS.md` aplicada):** nenhum `prazo` passa de 2030. Os efeitos `e1.1.1`, `e2.1.1`, `e3.1.1` e `e6.1.1` provavelmente só se *consolidam* depois de 2030; o prazo 2030 indica quando o efeito começa a ser observável, não quando está consolidado.
- **Como sinal foi calibrado:** sinal = quanta evidência existe *hoje* (viés cético pedido), não a ordem do efeito. Por isso `e2.2` (2ª ordem) tem sinal forte e `e6` (1ª ordem) tem sinal fraco.

## 6. Sinais fracos e wildcards

**Sinais fracos**
- **IA gerando jogo dentro da plataforma** (Playables Builder com Gemini, beta fechado em 4 países) [20] — se escalar, o gargalo do jogo por link deixa de ser produção e vira descoberta (`e3.2`).
- **Netflix e Amazon Luna usando o celular como controle** de jogos de festa na TV [55][56] — o "console" vira a TV + o celular de cada um, sem instalação, com a web no meio.
- **Meta levando o Horizon Worlds para o celular** [42] — sinal de que até a maior aposta de VR do mundo está virando "3D plano com modo imersivo" (`e6.1`).
- **Splats padronizados no glTF** [14] — o formato mais comum de 3D na web passa a carregar cenas capturadas do mundo real.

**Wildcards (baixa probabilidade, alto impacto)**
- **Apple liga WebXR no iPhone** (ex.: `immersive-ar` no Safari iOS). Probabilidade baixa — nenhum sinal hoje [33]. Impacto: a raiz 3 deixa de ser nicho de headset e vira AR por link para ~1 bilhão de aparelhos; `e5.2` e `e5.2.1` se invertem (o Brasil deixa de ter vantagem relativa).
- **A Suprema Corte dos EUA reverte Epic v. Apple** [25]. Impacto: `e4` (loja web como caixa padrão) cai para sinal fraco nos EUA, e o centro de gravidade vai para UE e Japão.
- **Uma vulnerabilidade grave de WebGPU** (GPU exposta à web é uma superfície de ataque nova) leva navegadores a desligar ou restringir a API. Não verifiquei incidentes concretos — é hipótese, não sinal. Impacto: a raiz 1 inteira volta alguns anos.

## 7. Contra o próprio mapa

**Rebaixamentos auditáveis (Etapa 4 da skill).** Cada efeito com confiança inicial "alta" ou "média" passou pelas três perguntas da skill (extrapolação linear? adoção sem precedente? força contrária ignorada?). Ficaram registrados estes rebaixamentos (o valor original está no anexo, seção 12):

| Efeito | Antes | Depois | Por quê |
|---|---|---|---|
| `e2.2` | alta | media | Assume que o limite de memória do iOS continua. O iOS 18.2 já corrigiu o bug de memória Wasm [36] — é força contrária real que o efeito ignorava. |
| `e4` | alta | media | Depende de uma decisão judicial ainda aberta (Suprema Corte, recurso aceito em 06/2026) [25]. Também usa número de vendedor de pagamentos (Xsolla) [28]. |
| `e3` | alta | media | Extrapolação linear do crescimento de Poki/Playables. O caso Telegram (retenção de 5–20% e queda de 300M para 41M) mostra que mini-jogos hospedados podem ser bolha [40]. |
| `e1` | media | baixa | Assume uma velocidade de adoção sem precedente: nenhum estúdio grande de jogos 3D de porte médio lança versão web no mesmo dia hoje, a Godot não tem WebGPU [34] e o Unreal saiu da web [35]. |

**Extrapolação linear do presente:** `e3` (plataformas como consoles hospedeiros) e `e5.1` (AR web migrando para stacks abertas) são essencialmente "o que já está acontecendo, um pouco mais". Por isso têm sinal alto mas pouco valor de previsão.

**Velocidade de adoção sem caso comparável:** `e1` (lançamento web junto com o nativo) — o caso comparável mais próximo, Unity WebGL, existe há uma década e nunca levou jogos 3D de porte médio para a web em escala.

**Disrupção que pode não se concretizar: a raiz 3 (XR por link).** Ela depende de um mercado de headsets que está encolhendo (Meta cortou estúdios e o Reality Labs acumula quase US$ 80 bi de prejuízo [41][42]; Vision Pro com vendas fracas [43]). Os óculos que vendem não têm navegador imersivo verificado [53][54]. Se ela não vingar, o mapa perde `e5`/`e6` e o tema vira "3D sem instalação", sem o "XR". O resto do mapa (raízes 1 e 2) não depende dela — isso é uma qualidade do mapa, e não um defeito.

**O que pode estar errado na raiz 2:** o "jogo sai da loja" pode ser apenas mais um canal, e não uma substituição. O jogo mobile instalado continua sendo onde está o dinheiro (mobile = US$ 108 bi em 2025 [57]), e os jogos por link vivem de anúncio (Poki) com receita por usuário bem menor (não verifiquei números comparáveis).

**A força contrária mais subestimada:** o **zero-rating no Brasil** [51]. O jogador de plano pré-pago que não paga dados para abrir o app patrocinado paga dados para abrir o link. Isso pode anular a vantagem de alcance do Android no recorte brasileiro.

**Vieses.**
- O tema não foi escolhido por gosto declarado. Mas o autor é dev web (Rails + Remix no Bankinho), o que puxa para ver a web como "solução" — o viés cético pedido serve de contrapeso.
- Viés de fonte: a maior parte da evidência de adoção vem das próprias empresas (Poki, Xsolla, PlayCanvas, Unity, VIVERSE) e não é auditada.
- Viés de processo: a IA produziu a maior parte deste texto, com o aluno com pouco tempo (ver seção 8). O mapa tende a refletir o que é fácil de achar em inglês e em fontes de desenvolvedor, e a sub-representar o Brasil.

## 8. O que a máquina errou

1. **A IA pulou a entrevista da própria skill.** A Etapa 1 manda nunca pular a entrevista, nem quando o usuário pede para "ir direto". O aluno estava em outra aula e pediu para reaproveitar o que a IA já sabia, e a IA aceitou: reaproveitou as respostas do `TESTE.md` (tema auth/identidade) para um tema totalmente diferente. O pior impacto está no **recorte "Brasil"**: a evidência levantada é majoritariamente global, e o recorte brasileiro entrou como lente, não como base de dados. **Como percebi:** as respostas estão marcadas como reaproveitadas na tabela da seção 2. Antes de apresentar, o aluno deve dizer se mantém ou troca cada uma.
2. **Contradição entre fontes que a IA quase repassou como fato.** O caniuse marca WebGPU no Firefox como "disabled by default", enquanto as release notes oficiais dizem que ele está habilitado no Windows (141) e no macOS 26 (145) [4][5][6]. **Como percebi:** o agente de pesquisa comparou as duas fontes. Ficou valendo a fonte primária; o caniuse provavelmente marca "suportado só em parte das plataformas" como não suportado.
3. **Página oficial desatualizada.** A página de exemplos WebGPU do Bevy ainda diz "somente Chrome 113, somente desktop", o que contradiz o Safari 26 e o Chrome Android. Não foi usada como fonte de estado atual.
4. **Números que só existiam em resumos de busca foram cortados, não usados.** Exemplos: CrazyGames com 40–50M de usuários (ficou o 35M verificado), "crescimento de 45% nas horas" do Xbox Cloud, data de lançamento do Galaxy XR via página da Samsung (timeout), "três.js r171 production-ready", "taxa de 30%→15% no Discord", "regra dos 7 dias" do Safari (não aparece na página do WebKit aberta). Estão no anexo como "não verificado".
5. **Número disputado.** O "300M → 41M" do Hamster Kombat é da Helika; a equipe do jogo contesta (diz que 300M era o total e o pico mensal passou de 155M) [40]. A IA quase o usou como fato limpo. Ficou citado com a disputa.
6. **Sobreposição de escopo que a IA criou e depois desfez.** Na primeira versão, gaussian splatting era uma quarta disrupção-raiz. Foi cortado por ser o núcleo do Tema 10. Ficou só como efeito de streaming (`e2.2`).
7. **Fontes lidas pela IA, não pelo aluno.** A regra do formato é "só o que você leu". As fontes da seção 11 foram abertas pelos agentes de pesquisa (IA), com cada link conferido, mas o aluno não leu todas. Isso é declarado aqui em vez de escondido.

## 9. Três cenários para 2030

**Provável.** Em 2030, abrir um jogo 3D por link é normal para jogos curtos, demos e visualização. Jogos grandes continuam instalados, mas com loja web e modos de navegador ao lado. YouTube, Discord e os portais são os maiores "consoles" de jogo por link do mundo e cobram suas próprias taxas: o gatekeeper mudou de endereço. O WebGPU está em todo lugar, inclusive no Linux, e a disputa é sobre streaming de assets, memória e bateria. O XR por link existe e funciona bem em headsets, mas os headsets são nicho. O imersivo virou um botão opcional dentro de experiências 3D comuns. No Brasil, o Android dominante deixa a base técnica maior que a média global, mas o custo de dados faz o jogo por link ficar concentrado no Wi-Fi.

**Desejável.** O link virou de fato o formato aberto da experiência interativa: qualquer pessoa publica um jogo ou uma visita 3D de museu, ensino ou patrimônio sem pedir permissão a uma loja, com pagamento via Pix ou cartão sem taxa de intermediário obrigatória. Para chegar lá: (a) decisões regulatórias que tratem plataformas hospedeiras com o mesmo rigor aplicado às lojas; (b) engines abertas (Godot, three.js, Bevy) com WebGPU maduro; (c) operadoras ou políticas públicas que não penalizem a web via zero-rating; (d) a Apple liberando WebXR no iOS.

**Indesejável.** A web vira só a porta de entrada de três ou quatro plataformas fechadas. Para alcançar alguém, o jogo por link precisa viver dentro do YouTube ou do Discord, sob as regras deles e com algoritmo de recomendação opaco (`e3.1`, `e3.2.1`). O catálogo é inundado de jogos gerados por IA e o criador independente some. **Sinal precoce:** as plataformas hospedeiras publicarem taxas e regras de conteúdo mais restritivas que as das lojas, sem o mesmo escrutínio regulatório. Também vale observar se o Playables Builder sai do beta com prioridade de recomendação para jogos gerados na própria plataforma.

## 10. O experimento

**O que é.** "Mesmo jogo, três portas." Um protótipo 3D pequeno (uma cena com física simples e uma cena capturada em gaussian splat), em three.js com `WebGPURenderer` e fallback automático para WebGL 2. A mesma cena é aberta de três jeitos: (1) por QR code/link no celular de cada um; (2) por link embutido (iframe) dentro de outra página, simulando a plataforma hospedeira; (3) como app instalado (PWA instalado ou build nativo de referência). O protótipo registra anonimamente: tempo até o primeiro frame interativo, se rodou em WebGPU ou caiu para WebGL, quedas de fps, crash ou recarga da aba, aparelho e navegador.

**Que pergunta sobre o futuro responde.** Em 2030, o que vai pesar mais para quem joga: os segundos que o link economiza para começar, ou a qualidade e estabilidade que o app instalado ainda entrega? E em quantos dos aparelhos reais da turma (não os de benchmark) a "GPU atrás de um link" de fato funciona hoje?

**Que tecnologia emergente usa, e por que não dá com tecnologia madura.** WebGPU (compute para física e ordenação de splats), streaming de splats com LOD (SOG/Spark), glTF com KTX2. Com WebGL puro não há compute shader. O experimento estaria medindo justamente o incumbente que a raiz 1 diz estar sendo substituído.

**O que a turma faz em sala.** Escaneia o QR, joga 2 minutos em cada porta e responde duas perguntas: qual porta preferiu, e se jogaria de novo pelo link ou instalaria. O painel mostra ao vivo quantos aparelhos rodaram em WebGPU, quantos caíram no fallback e quantos travaram.

**O que me faria mudar de ideia.** Se mais de um terço dos aparelhos da turma cair no fallback ou travar, a raiz 1 está otimista demais para o Brasil de 2026 e `e1`/`e2` devem ser rebaixados. Se a maioria preferir a versão instalada mesmo esperando mais, a premissa "o link vence pela fricção" está errada e a raiz 2 se sustenta só por regulação e plataforma, não por preferência do usuário.

## 11. Fontes

Todas as fontes abaixo foram abertas pelos agentes de pesquisa (IA) em 06–07/10/2026. Os links foram conferidos por script antes da entrega (`curl -L`, 07/10/2026): 56 de 62 responderam 200. Os outros 6 — [10], [12], [36], [40], [42] e [47] — responderam 403 ao `curl` por bloqueio anti-robô, mas foram abertos pelos agentes via navegador. O aluno não leu todas (ver seção 8, item 7).

1. https://developer.chrome.com/docs/web-platform/webgpu/overview — WebGPU no Chrome 113 por sistema operacional; Linux ainda pendente. Doc oficial do Google, alta.
2. https://developer.chrome.com/blog/new-in-webgpu-121 — WebGPU ligado no Android (Chrome 121). Oficial, alta.
3. https://webkit.org/blog/17333/webkit-features-in-safari-26-0/ — WebGPU no Safari 26 (macOS, iOS, iPadOS, visionOS); `<model>` e vídeo imersivo no visionOS. Oficial (Apple/WebKit), alta.
4. https://mozillagfx.wordpress.com/2025/07/15/shipping-webgpu-on-windows-in-firefox-141/ — WebGPU no Firefox 141 para Windows. Blog da equipe Mozilla, alta.
5. https://www.firefox.com/en-US/firefox/145.0/releasenotes/ — WebGPU no macOS 26 com Apple Silicon. Release notes oficiais, alta.
6. https://caniuse.com/webgpu — cobertura global (~88%). Agregador, média-alta; classifica de forma conservadora (ver seção 8).
7. https://www.w3.org/TR/webgpu/ — status: Candidate Recommendation Draft. Oficial, alta.
8. https://webassembly.org/news/2025-09-17-wasm-3.0/ — Wasm 3.0 como padrão. Oficial, alta.
9. https://webassembly.org/features/ — suporte por navegador de cada recurso Wasm. Oficial, alta.
10. https://discussions.unity.com/t/webgpu-out-of-experimental-in-unity-6-6/1734694 — WebGPU fora de experimental no Unity 6.6. Post de funcionário em fórum, média-alta.
11. https://threejs.org/docs/pages/WebGPURenderer.html — WebGPURenderer com fallback para WebGL 2. Doc oficial, alta.
12. https://blogs.windows.com/windowsdeveloper/2025/03/27/announcing-babylon-js-8-0/ — Babylon 8 com WGSL nativo. Blog da Microsoft (vendor), média-alta.
13. https://forum.playcanvas.com/t/webgpu-support-lands-in-the-playcanvas-editor/35676 — WebGPU no editor PlayCanvas. Fórum oficial, média.
14. https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_gaussian_splatting/README.md — extensão de splats ratificada. Fonte primária Khronos, alta.
15. https://blog.playcanvas.com/new-in-supersplat-webgpu-and-streaming-bring-huge-performance-wins/ — ganhos de fps e streaming de splats. Benchmark do próprio vendor, média.
16. https://sparkjs.dev/docs/new-features-2.0/ — Spark 2.0: LOD, streaming via HTTP Range, modo XR. Doc oficial, média-alta.
17. https://poki.com/blog/2025-at-poki-a-year-in-review — 100M jogadores/mês e 625M no ano. Dado da própria empresa, média.
18. https://gamesbeat.com/crazygames-hits-35m-users-for-browser-games-and-launches-social-multiplayer-features/ — CrazyGames com 35M mensais. Imprensa repassando número da empresa, média.
19. https://www.pocketgamer.biz/youtube-playables-expands-to-more-than-50-markets-including-the-eu-and-nordics/ — Playables em 50+ mercados; Playables Builder. Imprensa B2B, média-alta.
20. https://developers.google.com/youtube/gaming/playables — requisitos técnicos e engines aceitas. Oficial, alta.
21. https://www.pocketgamer.biz/discord-activities-opens-up-to-all-developers-to-make-games-on-the-platform/ — Discord Activities abertas a todos. Imprensa B2B, média-alta.
22. https://ppc.land/reddit-to-halt-public-data-api-access-in-march-2027-as-14-000-apps-register — fundos do Reddit para apps Devvit. Site de nicho, média.
23. https://techcrunch.com/2025/04/30/epic-games-just-scored-a-major-win-against-apple/ — decisão de 30/04/2025. Imprensa, alta.
24. https://www.macrumors.com/2025/05/20/fortnite-returns-to-u-s-app-store/ — volta do Fortnite com compra pela web. Imprensa, alta.
25. https://9to5mac.com/2026/06/30/supreme-court-agrees-to-hear-apple-appeal-over-epic-games-ruling/ — Suprema Corte aceita o recurso da Apple. Imprensa, alta.
26. https://techcrunch.com/2025/12/18/apple-opens-up-its-app-store-to-competition-in-japan — lojas alternativas no Japão. Imprensa, alta.
27. https://www.stash.gg/blog/supercell-store — web shop da Supercell. Blog de fornecedor de web shop, viés comercial, média-baixa.
28. https://xsolla.com/blog/the-xsolla-report-vol-10-2026-d2c-is-reshaping-monetization — venda direta +26% em 2025. Vendedor de pagamentos, viés forte, baixa-média.
29. https://webkit.org/blog/15865/webkit-features-in-safari-18-0/ — `immersive-vr` no Vision Pro. Oficial, alta.
30. https://developers.meta.com/horizon/documentation/web/browser-release-notes/ — WebGPU e WebXR experimentais no Quest Browser. Oficial (vendor), alta.
31. https://developer.android.com/develop/xr/web — WebXR no Chrome do Android XR. Oficial, alta.
32. https://www.w3.org/TR/webxr/ — status: Candidate Recommendation Draft. Oficial, alta.
33. https://caniuse.com/webxr — iPhone sem WebXR. Agregador, alta para este dado.
34. https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html — Godot web: sem C#, sem WebGPU, threads, desempenho. Oficial, alta.
35. https://forums.unrealengine.com/t/html5-not-in-4-26/477510 — Unreal saiu da web na 4.24. Declaração de funcionário da Epic, média-alta.
36. https://discussions.unity.com/t/webgl-memory-increment-issue-and-crash-on-ios/894771?page=2 — limites de memória e crashes no iOS. Relatos de usuários, média-baixa.
37. https://developer.apple.com/forums/thread/741624 — pergunta sem resposta oficial sobre o limite. Fórum Apple; vale como evidência de ausência de documentação.
38. https://webkit.org/blog/14403/updates-to-storage-policy/ — cotas e descarte de armazenamento no WebKit. Oficial, alta.
39. https://developer.mozilla.org/en-US/docs/Web/API/Compute_Pressure_API — API de pressão térmica ainda experimental. MDN, alta.
40. https://www.theblock.co/post/339563/telegram-games-had-trouble-earning-revenue-retaining-users-in-q4-report — retenção baixa nos jogos do Telegram, número contestado pela equipe do jogo. Imprensa cripto citando empresa de analytics, média.
41. https://www.gamedeveloper.com/extended-reality/meta-shutters-three-vr-studios-as-part-of-reality-labs-layoffs — Meta fecha estúdios VR. Imprensa especializada, alta.
42. https://techcrunch.com/2026/02/20/meta-metaverse-leaves-vr-horizon-worlds-mobile/ — Horizon Worlds vai para o mobile; prejuízo do Reality Labs. Imprensa, alta.
43. https://www.macrumors.com/2026/01/02/vision-pro-still-failing-to-catch-on/ — vendas fracas do Vision Pro. Estimativas de analistas, média.
44. https://forum.8thwall.com/t/important-changes-to-8th-wall-business/8578 — fim do 8th Wall comercial. Fórum oficial, alta.
45. https://ppc.land/meta-announces-web-games-sunset-by-september-2026/ — fim do Web Games do Facebook. Site de nicho resumindo anúncio da Meta, média.
46. https://www.gematsu.com/2022/09/stadia-to-shut-down-on-january-18-2023-all-purchases-to-be-refunded — fim do Stadia. Imprensa, alta.
47. https://news.xbox.com/en-us/2026/09/03/xbox-cloud-gaming-changes/ — limite de horas no Xbox Cloud. Fonte primária, alta.
48. https://canaltech.com.br/hardware/pesquisa-game-brasil-2026-pc-gamer-vive-nova-era-de-ouro-no-pais/ — PGB 2026. Imprensa repassando pesquisa, média-alta.
49. https://www.mobiletime.com.br/noticias/26/03/2025/pesquisa-pgb-jogos/ — PGB 2025. Imprensa repassando pesquisa, média-alta.
50. https://gs.statcounter.com/os-market-share/mobile/brazil — Android x iOS no Brasil. Medição de tráfego web (não de base instalada), média-alta.
51. https://teletime.com.br/11/08/2025/na-america-latina-67-dos-planos-de-celular-tem-zero-rating-para-apps/ — zero-rating na América Latina. Imprensa setorial citando estudo, média-alta.
52. https://www.clickjogos.com.br/perguntas-frequentes — Click Jogos desde 2004. Autodeclaração, baixa-média.
53. https://www.uploadvr.com/meta-essilorluxottica-sold-7-million-smart-glasses-in-2025/ — 7 milhões de óculos vendidos em 2025. Imprensa especializada, média-alta.
54. https://roadtovr.com/meta-ray-ban-smart-glasses-display-price-release-date-specs/ — Meta Ray-Ban Display. Imprensa especializada, alta.
55. https://www.tvtechnology.com/news/netflix-launches-party-games-for-tvs — jogos de festa da Netflix na TV. Imprensa, alta.
56. https://www.engadget.com/gaming/amazons-revamped-luna-streaming-service-is-available-now-130000613.html — relançamento do Luna. Imprensa, alta.
57. https://www.gameblast.com.br/2025/12/mercado-dos-games-cresce-75-em-2025-revela-relatorio-da-newzoo.html — mercado global e mobile (Newzoo). Imprensa repassando relatório, média.
58. https://www.videogameschronicle.com/news/unity-has-cancelled-its-controversial-runtime-fee/ — cancelamento da Runtime Fee. Imprensa, alta.
59. https://www.gamedeveloper.com/programming/godot-adoption-is-rising-what-are-devs-enjoying-about-the-engine- — crescimento da Godot. Imprensa especializada, média-alta.
60. https://gamesbeat.com/frvr-acquires-free-to-play-shooter-krunker-io/ — Krunker, FPS web com 200M+ jogadores. Imprensa repassando números da empresa, média.
61. https://roadtovr.com/samsung-galaxy-xr-headset-price-specs-release-date/ — Galaxy XR com Android XR. Imprensa especializada, alta.
62. https://caniuse.com/webtransport — WebTransport no Safari 26.4+. Agregador, média-alta.

## 12. Anexo — o levantamento bruto

Sem edição. Contém: (A) as decisões e valores originais da rodada; (B) o relatório bruto do agente de pesquisa de tecnologia; (C) o relatório bruto do agente de pesquisa de mercado. Ambos os relatórios foram gerados por agentes de IA instruídos a abrir cada fonte e a marcar como "não verificado" o que não conseguissem confirmar.

### A. Decisões da rodada e valores originais

**Contexto da rodada.** 2026-10-07, Claude Code (Opus 5.5), skill `futurizacao-jcsc`. O tema foi o 15, atribuído ao aluno no site da disciplina, com apresentação em 08/10. O aluno estava em aula de francês e pediu para a IA "ir adiantando o máximo" e "pegar do que já sabe no projeto". Por isso a entrevista foi substituída pelas respostas do `TESTE.md` (ver seção 2).

**Correção aplicada a partir do `DUVIDAS.md`.** Checagem de que nenhum `prazo` excede o `horizonte` (2030). Resultado: 0 violações.

**Candidatos a disrupção-raiz.**

- Aceitos: WebGPU + Wasm 3.0; jogo-como-link em plataformas hospedeiras + pagamento fora da loja; XR por link.
- Recusados por maturidade: WebGL 1/2, three.js clássico, portais HTML5 2D/casual, PWA genérico.
- Recusados por escopo:
  - cloud gaming: é "navegador como TV" e entrou como força contrária;
  - gaussian splatting como raiz própria: é o Tema 10;
  - WebNN / IA no navegador: é o Tema 16, apresentado no mesmo dia; WebNN ainda está em origin trial (Chrome 156–160 TBD) e é CR Draft no W3C.

**Confiança original antes da Etapa 4.**

| Efeito | Original | Final |
|---|---|---|
| e1 | media | baixa |
| e2 | media | media |
| e2.2 | alta | media |
| e3 | alta | media |
| e4 | alta | media |
| e5 | media | media |
| e6 | baixa | baixa |
| demais efeitos de 2ª e 3ª ordem | sem alteração | sem alteração |

**Efeitos cortados ou não incluídos.**

- "Cloud gaming perde para o jogo por link no segmento casual": cortado porque o cloud gaming ficou fora de escopo, mas a evidência ficou na seção 3 (limite de horas do Xbox).
- "Escolas viram distribuidores de jogos por link via Chromebook (caso Bloxd.io)": cortado porque a fonte é da VIVERSE/HTC, parte interessada, e não há evidência para o Brasil.
- "Telegram Mini Apps como console hospedeiro": rebaixado a contraexemplo (bolha pós-airdrop).

**Buscas que não deram em nada ou não abriram.**

- Dados de uso real de WebXR: nenhuma fonte primária encontrada.
- Taxas que as plataformas hospedeiras cobram, comparáveis com as das lojas: não encontrado.
- Netflix games no navegador: não verificado.
- Páginas que não abriram: CNBC, Devpost, Variety, Adrenaline (PGB 2026), news.samsung.com, release notes do Unreal 4.24 e Phoronix.

### B. Relatório bruto — agente de pesquisa de tecnologia

#### Relatório: o navegador como console (3D, jogos e XR sem instalação), estado em out/2026

Usei apenas páginas que abri. Quando uma informação veio só do resumo de uma busca e eu não abri a página, marquei como **não verificado**.

---

#### 1. WebGPU

- **Chrome/Edge:** estreou no Chrome 113, no ChromeOS (com Vulkan), no Windows (com D3D12) e no macOS. Para Linux, o Chrome ainda diz "coming soon". [https://developer.chrome.com/docs/web-platform/webgpu/overview] Doc oficial do Google, fonte primária.
- **Android:** ligado por padrão no Chrome 121, em Android 12 ou mais novo com GPUs Qualcomm e ARM. [https://developer.chrome.com/blog/new-in-webgpu-121] Fonte primária.
- **Safari 26.0:** "now shipping in Safari 26.0 for macOS, iOS, iPadOS, and visionOS". A Apple diz que ele "supersedes WebGL… preferred for new sites". [https://webkit.org/blog/17333/webkit-features-in-safari-26-0/] Fonte primária (WebKit). Foi anunciado em beta na WWDC25 já citando Babylon.js, Three.js e Unity. [https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/]
- **Firefox:**
  - Windows desde o Firefox 141. Mac e Linux viriam "in the coming months" e o Android depois. [https://mozillagfx.wordpress.com/2025/07/15/shipping-webgpu-on-windows-in-firefox-141/] Blog da equipe gráfica da Mozilla, fonte primária.
  - Firefox 145: "WebGPU DOM API is now available on macOS 26 (Tahoe) on Apple Silicon". [https://www.firefox.com/en-US/firefox/145.0/releasenotes/] Release notes oficiais.
  - Extensão para todas as versões do macOS no Firefox 147: **não verificado** (só apareceu em resumo de busca).
  - Linux e Android: **não verificado**.
- **caniuse:** cobertura global de cerca de 87,8%. Chrome desde a 113, Safari iOS 26+, Samsung Internet 24+. Safari desktop aparece como "parcial". Firefox aparece como "disabled by default", o que contradiz as release notes. Provavelmente o caniuse classifica suporte só em parte das plataformas como "não suportado". [https://caniuse.com/webgpu] Agregador confiável, mas a classificação é conservadora.
- **W3C:** o documento é um **Candidate Recommendation Draft** de 15/09/2026. [https://www.w3.org/TR/webgpu/] Fonte primária.

#### 2. WebXR

- **Spec:** também é um W3C **Candidate Recommendation Draft**, de 09/06/2026. Para virar PR precisa de duas implementações independentes e interoperáveis. [https://www.w3.org/TR/webxr/] Fonte primária.
- **caniuse:**
  - Chrome/Edge 79+ e Samsung Internet 12+ aparecem como "partial".
  - Firefox e Safari macOS aparecem como desativados por padrão.
  - **Safari iOS não suporta WebXR em nenhuma versão listada.** O iPhone continua sem WebXR.
  - [https://caniuse.com/webxr] Agregador confiável.
- **Apple Vision Pro:**
  - O Safari 18.0 (visionOS 2) "adds support for `immersive-vr` sessions". Também trouxe o input `transient-pointer` (olhar + pinça) e hand tracking. [https://webkit.org/blog/15865/webkit-features-in-safari-18-0/] Fonte primária.
  - Que o WebXR vem ativado por padrão e que é só VR, sem `immersive-ar`: vem de imprensa (UploadVR/RoadToVR) que **não abri**, então **não verificado** em fonte primária.
  - O Safari 26 no visionOS acrescenta o elemento `<model>` (USDZ, arrastável para o espaço físico) e vídeo imersivo (180°, 360°, Apple Immersive) via HLS. [https://webkit.org/blog/17333/webkit-features-in-safari-26-0/]
- **Meta Quest Browser:** pelas release notes oficiais:
  - 146.0 (21/04/2026): "Experimental WebGPU and WebXR depth projection support".
  - 149.1 (27/07/2026): "WebGPU support for space-warp layers".
  - 150.1 (28/08/2026): "Experimental WebGPU foveation support", MV-HEVC.
  - [https://developers.meta.com/horizon/documentation/web/browser-release-notes/] Fonte primária (vendor).
- **Android XR:** o Chrome no Android XR suporta WebXR com Device API, AR Module, Gamepads, Hit Test, Hand Input, Anchors, Depth Sensing e Light Estimation. A página não cita aparelhos específicos. [https://developer.android.com/develop/xr/web] Fonte primária (Google).
- **Samsung Galaxy XR:** lançamento em 21/10/2025 por US$ 1.799, Android XR com OpenXR/WebXR. **Não verificado**: a página da Samsung deu timeout e o dado veio só de resumo de busca.

#### 3. WebAssembly

- **Wasm 3.0** virou o novo padrão "live" em 17/09/2025. Inclui Memory64, GC, multiple memories, exception handling, typed references, tail calls, relaxed SIMD e um perfil determinístico. O anúncio diz que já está "shipping in most major web browsers". [https://webassembly.org/news/2025-09-17-wasm-3.0/] Fonte primária.
- **Versões por navegador**, da tabela oficial [https://webassembly.org/features.json, a mesma fonte da página https://webassembly.org/features/]. Fonte primária.

| Recurso | Chrome | Firefox | Safari |
|---|---|---|---|
| Threads | 74 | 79 | 14.1 (iOS 14.5) |
| SIMD | 91 | 89 | 16.4 |
| Relaxed SIMD | 114 | 145 | atrás de flag |
| GC | 119 | 120 | 18.2 |
| Exceptions (exnref) | 137 | 131 | 18.4 |
| Memory64 | 133 | 134 | flag (STP 251) |
| JSPI | 137 | 153 | 27 |
| Tail calls | 112 | 121 | 18.2 |

- **Relevância para engines:**
  - Threads exigem SharedArrayBuffer e isolamento cross-origin. Pelo doc do Godot (abaixo), isso atrapalha anúncios e integrações de terceiros.
  - No Unity, Wasm64 "doesn't currently support multithreading" (ver item 4).

#### 4. Engines que exportam para a web

- **Unity:**
  - Um post da equipe Unity Web Graphics (staff, 24/08/2026) diz: "as of Unity 6000.6, the WebGPU graphics API is no longer experimental".
  - WebGL 2 continua como padrão e o WebGPU precisa ser ativado à mão.
  - Exige HTTPS.
  - Libera compute shaders: GPU Resident Drawing, VFX Graph, Adaptive Probe Volumes.
  - [https://discussions.unity.com/t/webgpu-out-of-experimental-in-unity-6-6/1734694] Fonte primária, mas é post de fórum, não release note formal.
  - A documentação de compatibilidade do Unity 6.3 lista iOS Safari 15+ e Chrome 58+ no Android, e avisa que o Safari não suporta IndexedDB em iframes. [https://docs.unity3d.com/6000.3/Documentation/Manual/webgl-browsercompatibility.html] Fonte primária.
- **Godot (doc 4.7):**
  - "Projects written in C# using Godot 4 currently cannot be exported to the web."
  - Usa só WebGL 2 com o renderer Compatibility. "Godot currently does not support WebGPU."
  - A exportação single-thread é o padrão. Threads exigem cross-origin isolation.
  - Exportações nativas de mobile "will always perform better by a significant margin".
  - O .wasm comprime para cerca de 1/4 com gzip.
  - [https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html] Fonte primária.
- **Unreal:** um funcionário da Epic (Tim-Fronsee, 20/01/2021) escreveu: "HTML5 was migrated out of the engine as of 4.24, thus there is no plan to integrate it back". O suporte foi para uma Platform Extension mantida pela comunidade no GitHub. [https://forums.unrealengine.com/t/html5-not-in-4-26/477510] Confiável: é declaração de staff. Não consegui abrir as release notes 4.24 da Epic (403 e página vazia).
- **three.js:** "By default, the renderer tries to use a WebGPU backend… If not, WebGPURenderer falls back to a WebGL 2 backend." [https://threejs.org/docs/pages/WebGPURenderer.html] Fonte primária. A afirmação de que o r171 seria "production-ready" veio de um blog de terceiros que não abri: **não verificado**.
- **Babylon.js 8.0** (27/03/2025): todos os shaders do core agora existem em GLSL e WGSL. Isso elimina um conversor de mais de 3 MB, o que deixa o Babylon "2x smaller when targeting WebGPU". [https://blogs.windows.com/windowsdeveloper/2025/03/27/announcing-babylon-js-8-0/] Blog da Microsoft (vendor).
- **PlayCanvas:** "WebGPU is now supported in the PlayCanvas Editor" (23/04/2024). [https://forum.playcanvas.com/t/webgpu-support-lands-in-the-playcanvas-editor/35676] Fórum oficial. Se hoje ainda é opt-in ou já é o padrão: **não verificado**.
- **Bevy:**
  - O 0.17 (30/09/2025) carrega assets via http/https, usando fetch no Wasm. O hot-patching não funciona em Wasm. [https://bevy.org/news/bevy-0-17/] Fonte primária.
  - A página de exemplos WebGPU ainda diz "only supported on Chrome starting with version 113, and only on desktop" e oferece exemplos WebGL2 como alternativa. [https://bevy.org/examples-webgpu/] Fonte primária, mas o texto parece **desatualizado**.

#### 5. Gaussian splatting e renderização neural no navegador

- **PlayCanvas SuperSplat** (03/06/2026):
  - Com o novo renderer WebGPU por compute, uma cena de 35M gaussians foi de 13,3 para 75,8 fps num Apple M4 Max (5,7×). No iPhone 13 Pro Max o ganho foi de 2× a 2,1×.
  - O formato "Streamed SOG" usa LOD progressivo. Uma cena de 24M gaussians "appears almost instantly" no celular.
  - [https://blog.playcanvas.com/new-in-supersplat-webgpu-and-streaming-bring-huge-performance-wins/] Blog do vendor: os números são benchmarks próprios.
- **Spark 2.0** (renderer de splats para three.js):
  - LOD com orçamento fixo de N splats por frame.
  - Formato .RAD com streaming via HTTP Range.
  - Classe SparkXr para AR/VR com hand tracking.
  - [https://sparkjs.dev/docs/new-features-2.0/] Doc oficial. A página não diz quem é o autor. A autoria da World Labs aparece só em resumo de busca: **não verificado**.
- **Padrão:** a extensão **KHR_gaussian_splatting** está com status "Complete, Ratified by the Khronos Group". Contribuíram Cesium, Niantic Spatial, Esri, Huawei, Autodesk e NVIDIA. [https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_gaussian_splatting/README.md] Fonte primária. A data de 03/09/2026 veio de uma issue de terceiros que não abri: **não verificado**.
- **8th Wall (Niantic):**
  - Anúncio de 20/11/2025: logins e edições acabaram em 28/02/2026. Os projetos hospedados continuam no ar até 28/02/2027 e depois o hosting encerra. [https://forum.8thwall.com/t/important-changes-to-8th-wall-business/8578] Fórum oficial.
  - O blog oficial tem os posts "Goodbye 8thwall.com. Hello 8thwall.org." (02/03/2026, código aberto) e "Agog Supports 8th Wall's Next Chapter" (14/08/2026). [https://8thwall.org/blog?site_path=…] Fonte primária. A licença não aparece nessa página: **não verificado**.

#### 6. Streaming e compressão de assets

- glTF 2.0 é a norma ISO/IEC 12113:2022. Pela extensão KHR_texture_basisu, aceita texturas KTX2 com Basis Universal, o que reduz tamanho de arquivo e uso de memória da GPU. [https://www.khronos.org/gltf/] Fonte primária.
- No registro de extensões, KHR_draco_mesh_compression, EXT_meshopt_compression, KHR_texture_basisu e KHR_gaussian_splatting aparecem como ratificadas. [https://github.com/KhronosGroup/glTF/blob/main/extensions/README.md] Fonte primária.
- **WebTransport** (HTTP/3, streams não confiáveis): Chrome 97+, Firefox 114+ e **Safari/iOS 26.4+**, cobertura global de cerca de 91,6%. Ainda é W3C Working Draft. [https://caniuse.com/webtransport] Agregador.
- **WebCodecs:** Chrome 94+, Firefox 130+, Safari completo a partir do 26.0 (parcial entre 16.4 e 18.7). Firefox Android sem suporte. [https://caniuse.com/webcodecs] Agregador.

#### 7. Limites: o que ainda não funciona bem

- **Memória no iOS:**
  - Relatos no fórum Unity dizem que o watchdog do iOS mata abas por volta de 500 MB (CodeSmile, fev/2025). O iOS 18.2 corrigiu o bug do WebKit #269937 (fragmentação de memória Wasm) e há relatos de alocar até 4 GB depois disso. Ainda assim, aparelhos com menos RAM continuam crashando.
  - [https://discussions.unity.com/t/webgl-memory-increment-issue-and-crash-on-ios/894771?page=2] Relatos de usuários, não documentação da Apple. A Apple não publica um limite oficial: o tópico do Apple Developer Forums sobre isso não tem resposta [https://developer.apple.com/forums/thread/741624].
- **Armazenamento (WebKit):**
  - A cota por origem é de até 60% do disco em apps de navegador e até 15% em outros apps.
  - O descarte é por LRU, por origem inteira, quando há pressão de espaço ou inatividade longa.
  - Um site pode pedir `persist()`, concedido por heurísticas (por exemplo, se foi instalado na Home Screen).
  - [https://webkit.org/blog/14403/updates-to-storage-policy/] Fonte primária.
  - A regra dos 7 dias **não aparece nessa página**: não verificado.
- **Gamepad API:** cobertura global de cerca de 97%, Safari iOS 10.3+. [https://caniuse.com/gamepad] Agregador.
- **Áudio:** `AudioContext.outputLatency` é Baseline desde março de 2025. A latência "varies depending on the platform and hardware". [https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/outputLatency] Fonte de referência (MDN). Não achei medições de latência por plataforma.
- **Bateria e calor:** a Compute Pressure API (estados "cpu" e "thermals", com jogos citados como caso de uso) é experimental, não é Baseline e exige HTTPS. [https://developer.mozilla.org/en-US/docs/Web/API/Compute_Pressure_API] MDN.
- **Outros limites citados acima:** o WebGPU exige HTTPS (Unity). Threads exigem cross-origin isolation (Godot). Mobile web fica bem abaixo do nativo (Godot).
- **Tamanho de download:** não achei números oficiais por engine. Só há o dado de compressão gzip do Godot (cerca de 1/4) e o caso dos 3 MB do Babylon.

#### 8. WebNN (IA no aparelho)

- A spec é um W3C **Candidate Recommendation Draft** de 10/09/2026, com mais de 100 mudanças desde o CR Snapshot de 22/01/2026, incluindo operadores para transformers e MLTensor. [https://www.w3.org/TR/webnn/] Fonte primária.
- O origin trial está listado como "Chrome: 156 (TBD) to 160" e "Edge: 156 (TBD) to 160". [https://webnn.io/en/learn/get-started/ot_registration] Site da comunidade WebML.
- Que o trial começou no Chrome 146: **não verificado** (Phoronix deu 403).
- Ainda **não é padrão em nenhum navegador**. Na prática, IA no navegador hoje passa pelo WebGPU.

---

#### Pontos úteis para o mapa do futuro
1. Pela primeira vez, todos os grandes motores de navegador têm WebGPU. Ainda faltam peças: Linux (Chrome e Firefox) e Firefox Android.
2. O XR "via link" já funciona no Quest, no Vision Pro (VR) e no Android XR. **Não funciona no iPhone**.
3. O gargalo deixou de ser API e virou memória e download no iOS. A resposta do setor tem sido streaming com LOD (SOG, .RAD, KTX2, meshopt).
4. Unity é a única engine "grande" com WebGPU oficial. Godot ainda é só WebGL2 e não exporta C# para a web. Unreal saiu da web oficial desde a 4.24.

#### URLs que abri
- https://caniuse.com/webgpu
- https://developer.chrome.com/docs/web-platform/webgpu/overview
- https://developer.chrome.com/blog/new-in-webgpu-121
- https://mozillagfx.wordpress.com/2025/07/15/shipping-webgpu-on-windows-in-firefox-141/
- https://www.firefox.com/en-US/firefox/145.0/releasenotes/
- https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
- https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/
- https://webkit.org/blog/15865/webkit-features-in-safari-18-0/
- https://webkit.org/blog/14403/updates-to-storage-policy/
- https://www.w3.org/TR/webgpu/
- https://www.w3.org/TR/webxr/
- https://www.w3.org/TR/webnn/
- https://caniuse.com/webxr
- https://developer.android.com/develop/xr/web
- https://developers.meta.com/horizon/documentation/web/browser-release-notes/
- https://webassembly.org/news/2025-09-17-wasm-3.0/
- https://webassembly.org/features.json
- https://discussions.unity.com/t/webgpu-out-of-experimental-in-unity-6-6/1734694
- https://docs.unity3d.com/6000.3/Documentation/Manual/webgl-browsercompatibility.html
- https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html
- https://forums.unrealengine.com/t/html5-not-in-4-26/477510
- https://threejs.org/docs/pages/WebGPURenderer.html
- https://blogs.windows.com/windowsdeveloper/2025/03/27/announcing-babylon-js-8-0/
- https://forum.playcanvas.com/t/webgpu-support-lands-in-the-playcanvas-editor/35676
- https://bevy.org/news/bevy-0-17/
- https://bevy.org/examples-webgpu/
- https://blog.playcanvas.com/new-in-supersplat-webgpu-and-streaming-bring-huge-performance-wins/
- https://sparkjs.dev/docs/new-features-2.0/
- https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_gaussian_splatting/README.md
- https://github.com/KhronosGroup/glTF/blob/main/extensions/README.md
- https://www.khronos.org/gltf/
- https://forum.8thwall.com/t/important-changes-to-8th-wall-business/8578
- https://8thwall.org/blog?site_path=blog%2Fpost%2F202888018234%2F8th-wall-update-engine-distribution-and-open-source-plans
- https://discussions.unity.com/t/webgl-memory-increment-issue-and-crash-on-ios/894771?page=2
- https://developer.apple.com/forums/thread/741624
- https://caniuse.com/webtransport
- https://caniuse.com/webcodecs
- https://caniuse.com/gamepad
- https://developer.mozilla.org/en-US/docs/Web/API/Compute_Pressure_API
- https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/outputLatency
- https://webnn.io/en/learn/get-started/ot_registration
- https://en.wikipedia.org/wiki/Unreal_Engine_4 (não sustentou o dado da 4.24)
- https://github.com/SpeculativeCoder/UnrealEngine-HTML5-ES3 e https://github.com/ufna/UE-HTML5 (não sustentaram o dado)

Não consegui abrir: news.samsung.com (timeout), as release notes 4.24 da Epic (403 e página vazia), phoronix.com (403) e threejs.org/manual (404).
### C. Relatório bruto — agente de pesquisa de mercado

#### Mercado, distribuição e política do "navegador como console" (2025–2026)

**Como verifiquei:** cada fato abaixo vem de uma página que abri com WebFetch. O que só apareceu em resumos de busca ficou de fora ou está marcado como "não verificado". Abri tudo entre 06 e 07/10/2026.

**Fontes que não abriram (403):** CNBC, Devpost (Reddit), AppleInsider (Supreme Court), Variety, Adrenaline (PGB 2026), blog da Meta e o caminho testado no ChromeStatus. Nenhum fato depende delas.

---

#### 1. Portais web e "instant games"

**Poki**
- O post de 03/12/2025 diz 625 milhões de jogadores no ano e 100 milhões por mês. Também diz 11,1 bilhões de partidas, 227 jogos lançados, 1.018 jogos com mais de 1 milhão de plays, jogadores em 193 países e equipe de 50 para 65 funcionários. [https://poki.com/blog/2025-at-poki-a-year-in-review]
  - *Confiabilidade:* dados da própria empresa, sem auditoria.
- Uma matéria diz que a Poki passou de 10 para 100 milhões de jogadores mensais em cerca de cinco anos. Diz também que as partidas mensais foram de 50 milhões para 1 bilhão entre 2020 e 2025. A Poki trabalha com mais de 600 desenvolvedores (por exemplo SYBO e Fingersoft) e divide a receita de anúncios com eles. Alguns desenvolvedores ganham até US$ 1 milhão por ano. [https://www.mgoddess.com/news/inside-poki-s-vision-for-the-future-of-browser-gaming/?lang=en]
  - *Confiabilidade:* matéria de divulgação em site menor.

**CrazyGames**
- 35 milhões de usuários ativos mensais, mais de 4.000 jogos grátis, sede em Leuven (Bélgica). O CEO Raf Mertens fala em jogar "sem instalação nem compras". A matéria saiu em 20/06/2024 e foi atualizada em 18/06/2025. [https://gamesbeat.com/crazygames-hits-35m-users-for-browser-games-and-launches-social-multiplayer-features/]
  - *Confiabilidade:* imprensa especializada repetindo número da empresa.
  - Números de 40M ou 50M+ aparecem só em resumos de busca: **não verificado**.

**YouTube Playables**
- Segundo o Google, são "jogos publicados no YouTube, jogáveis pelos apps e pelo site". O acesso para desenvolvedores ainda é antecipado, via formulário de interesse. O jogo precisa renderizar com WebGL ou Canvas, e a lista de engines inclui Unity, Godot, three.js, Phaser, PlayCanvas e BabylonJS. [https://developers.google.com/youtube/gaming/playables]
  - *Confiabilidade:* documentação oficial. A página não traz números de uso.
- Matéria de 28/09/2026: os Playables chegaram a mais de 50 mercados, incluindo a UE. No fim de 2025 o YouTube lançou o "Playables Builder", um beta fechado que usa Gemini 3 para criadores gerarem jogos (EUA, Canadá, Reino Unido e Austrália). [https://www.pocketgamer.biz/youtube-playables-expands-to-more-than-50-markets-including-the-eu-and-nordics/]
  - *Confiabilidade:* imprensa B2B confiável.

**Discord Activities**
- Abertas a todos os desenvolvedores em 27/09/2024. Activities são web apps dentro do Discord. Na prévia do Embedded App SDK participaram "dezenas de milhares" de criadores. Há compras no app nos EUA, Reino Unido e UE (no desktop). Exemplos: Krunker Strike FRVR e Farm Merge Valley. [https://www.pocketgamer.biz/discord-activities-opens-up-to-all-developers-to-make-games-on-the-platform/]
  - *Confiabilidade:* boa.
  - A taxa de 30%→15% vista na busca: **não verificado**.

**Telegram Mini Apps**
- Relatório da Helika, noticiado pelo The Block em 07/02/2025:
  - os jogos no Telegram retiveram só 5–20% dos jogadores no 4º tri de 2024, contra 20–30% nos jogos tradicionais;
  - a receita por usuário foi "volátil e baixa";
  - Hamster Kombat caiu de 300M (agosto) para 41M (novembro) depois do airdrop. A equipe do jogo disse que 300M era o total de jogadores e que o pico mensal passou de 155M.
  
  [https://www.theblock.co/post/339563/telegram-games-had-trouble-earning-revenue-retaining-users-in-q4-report]
  - *Confiabilidade:* imprensa cripto citando empresa de analytics. Mostra uma bolha que estourou.
  - Números agregados de 2026 sobre Mini Apps: **não verificado**.

**Netflix**
- Em 10/10/2025 a Netflix lançou jogos de festa na TV usando o celular como controle: LEGO Party!, Pictionary, Boggle Party, Tetris Time Warp e Party Crashers. No início, só nos EUA e em TVs selecionadas. [https://www.tvtechnology.com/news/netflix-launches-party-games-for-tvs]
  - *Confiabilidade:* boa.
  - Suporte a navegador web: **não verificado** (a página da Netflix Tudum não carregou por completo).

**Facebook**
- A plataforma legada "Web Games" do Facebook (que existe desde 2007) acaba em **30/09/2026**. Os jogos precisam migrar para Instant Games com o novo login "Zero Permissions" (obrigatório para jogos novos desde 01/08/2025). [https://ppc.land/meta-announces-web-games-sunset-by-september-2026/]
  - *Confiabilidade:* site de nicho que resume um anúncio da Meta.

**Reddit (Devvit)**
- Reddit Developer Funds paga até US$ 167 mil por app. Há um programa de migração de US$ 1 milhão (US$ 1 mil por app). Os Interactive Ads em alpha (nov/2025) usam Devvit. Até 30/09/2026, mais de 14 mil apps e bots se registraram para migrar. [https://ppc.land/reddit-to-halt-public-data-api-access-in-march-2027-as-14-000-apps-register]
  - *Confiabilidade:* média.
  - Detalhes do hackathon de jogos (Devpost deu 403): **não verificado**.

#### 2. Regulação das lojas empurrando para a web

**UE / DMA (2024)**
- No beta do iOS 17.4, a Apple reduziu os PWAs na UE a simples atalhos, alegando o DMA. Recuou depois de mais de 500 reclamações e de pressão regulatória. A Comissão Europeia disse que o bloqueio "não era exigido nem justificado" pelo DMA. A volta vale só para web apps em WebKit. [https://techcrunch.com/2024/03/01/apple-reverses-decision-about-blocking-web-apps-on-iphones-in-the-eu/]
  - *Confiabilidade:* alta.

**Epic v. Apple (EUA)**
- Em 30/04/2025, a juíza Yvonne Gonzalez Rogers declarou a Apple em "violação deliberada" da liminar de 2021. A Apple passou a ser obrigada a permitir links para compra na web sem cobrar comissão. O caso foi enviado à Procuradoria para possível desacato criminal. [https://techcrunch.com/2025/04/30/epic-games-just-scored-a-major-win-against-apple/]
  - *Confiabilidade:* alta.
- Fortnite voltou à App Store dos EUA em 20/05/2025, com compra de moeda pelo site da Epic. [https://www.macrumors.com/2025/05/20/fortnite-returns-to-u-s-app-store/]
- Em 30/06/2026 a Suprema Corte aceitou julgar o recurso da Apple. A questão é se cobrar comissão sobre links externos violava a liminar. O 9º Circuito tinha mantido o desacato. [https://9to5mac.com/2026/06/30/supreme-court-agrees-to-hear-apple-appeal-over-epic-games-ruling/]
  - *Ponto aberto:* o caso está em andamento (o termo da Corte começa em outubro de 2026).

**Google Play**
- As mudanças da liminar Epic v. Google foram adiadas para 29/10/2025, com aprovação do juiz Donato. [https://9to5google.com/2025/10/21/google-epic-agree-week-long-extension-play-store-changes/]
  - *Confiabilidade:* boa.
  - As taxas de 9%/20% que aparecem na busca: **não verificado**.

**Japão (MSCA)**
- Em 18/12/2025 a Apple abriu lojas alternativas e pagamentos externos no Japão. Ela cobra 21% sobre compras no app processadas por terceiros. Tim Sweeney disse que o Fortnite **não** voltará ao iOS japonês. [https://techcrunch.com/2025/12/18/apple-opens-up-its-app-store-to-competition-in-japan]
  - *Confiabilidade:* alta.

**Web shops**
- Depois da decisão de 30/04/2025, a Supercell colocou links diretos para sua loja web dentro dos jogos (no Clash Royale, um pop-up e um botão na loja). A loja existe desde 2021. Cinco dos seis jogos ativos da Supercell passaram de US$ 1 bilhão em receita total. [https://www.stash.gg/blog/supercell-store]
  - *Confiabilidade:* **blog de fornecedor de web shop (viés comercial).**
- Relatório da Xsolla (15/07/2026): em 2025 a receita de venda direta (D2C) cresceu 26%, enquanto o mercado mobile cresceu só 0,2%. Nos 100 maiores títulos, o D2C cresceu 38%. A economia líquida estimada fica entre 10 e 20% em relação às taxas das lojas. [https://xsolla.com/blog/the-xsolla-report-vol-10-2026-d2c-is-reshaping-monetization]
  - *Confiabilidade:* **vendedor de pagamentos (viés forte).**

#### 3. Cloud gaming, o modelo concorrente de "sem instalação"

**Stadia**
- Encerrado em 18/01/2023, com reembolso de tudo. Phil Harrison disse que o serviço "não ganhou a tração esperada". [https://www.gematsu.com/2022/09/stadia-to-shut-down-on-january-18-2023-all-purchases-to-be-refunded]

**Xbox Cloud Gaming**
- Em outubro de 2025 saiu do beta, com uso ilimitado também nos planos Essential e Premium e 1440p no Ultimate. [https://www.purexbox.com/news/2025/10/xbox-cloud-gaming-expands-with-unlimited-usage-and-special-perks-for-game-pass-members]
- Anúncio oficial de 03/09/2026: a partir de **novembro de 2026** haverá limite mensal de 15h (Ultimate), 10h (Premium) e 5h (Essential), com horas extras pagas. A Microsoft diz que "o custo cresce conforme mais pessoas jogam" e que a mudança afeta 4% dos assinantes. [https://news.xbox.com/en-us/2026/09/03/xbox-cloud-gaming-changes/]
  - *Confiabilidade:* fonte primária.
  - Para o seu tema, isso mostra o limite econômico do streaming de jogos frente a jogos que rodam no próprio navegador.
  - O crescimento de 45% nas horas e a menção ao Brasil: **não verificado** (vi só no resumo da busca).

**GeForce NOW**
- Em 18/08/2025 a Nvidia anunciou servidores classe RTX 5080 no plano Ultimate (US$ 19,99), mais de 2.300 jogos pré-instalados e o "Install-to-Play", que leva o catálogo a mais de 4.500 títulos. [https://nvidianews.nvidia.com/news/nvidia-blackwell-architecture-comes-to-geforce-now]
  - *Confiabilidade:* **press release.**

**Amazon Luna**
- Relançado em 23/10/2025, incluído no Prime. O foco é o "GameNight": jogos de festa controlados pelo celular, como Jackbox e um jogo com IA estrelando Snoop Dogg. [https://www.engadget.com/gaming/amazons-revamped-luna-streaming-service-is-available-now-130000613.html]

#### 4. Mercado de XR

**Apple Vision Pro**
- Segundo IDC via FT: 390 mil unidades em 2024 e cerca de 45 mil novas unidades esperadas no 4º tri de 2025. A Luxshare parou a produção no início de 2025. O marketing foi cortado em mais de 95% nos EUA e no Reino Unido. Existem cerca de 3.000 apps nativos. Pela Counterpoint, os embarques de headsets VR caíram 14% e a Meta tem cerca de 80% do mercado. [https://www.macrumors.com/2026/01/02/vision-pro-still-failing-to-catch-on/]
  - *Confiabilidade:* estimativas de analistas, não números da Apple.

**Meta**
- Em 13/01/2026 a Meta fechou três estúdios VR (Sanzaru, Twisted Pixel, Armature) e cortou cerca de 10% do Reality Labs. A empresa diz que está movendo investimento "do Metaverso para Wearables". [https://www.gamedeveloper.com/extended-reality/meta-shutters-three-vr-studios-as-part-of-reality-labs-layoffs]
- Em 20/02/2026: Horizon Worlds passa a ser "quase exclusivamente mobile" e se separa do Quest. Reality Labs acumula quase US$ 80 bilhões de prejuízo desde 2020. Foram cerca de 1.500 demissões, e o Supernatural entrou em modo de manutenção. [https://techcrunch.com/2026/02/20/meta-metaverse-leaves-vr-horizon-worlds-mobile/]

**Óculos inteligentes**
- EssilorLuxottica vendeu 7 milhões de óculos Ray-Ban/Oakley Meta em 2025, mais que o triplo dos 2 milhões acumulados até fevereiro de 2025. Divulgado em 11/02/2026. [https://www.uploadvr.com/meta-essilorluxottica-sold-7-million-smart-glasses-in-2025/]
- Meta Ray-Ban Display: US$ 799, lançado em 30/09/2025 nos EUA. Tela monocular de 600×600 e pulseira Neural Band (sEMG). [https://roadtovr.com/meta-ray-ban-smart-glasses-display-price-release-date-specs/]

**Android XR**
- Samsung Galaxy XR, primeiro headset com Android XR, custa US$ 1.800. [https://roadtovr.com/samsung-galaxy-xr-headset-price-specs-release-date/]
  - A matéria não fala de WebXR.

**WebXR**
- O caniuse indica cerca de 76% de suporte global, quase todo em Chromium. Safari no iOS não suporta, e Firefox não suporta ou vem desativado. [https://caniuse.com/webxr]
  - **Dados de uso real do WebXR: não verificado.** Não encontrei fonte primária. O "crescimento de 40%" do vr.org não foi checado e é provavelmente fraco.

#### 5. Brasil

**Pesquisa Game Brasil (PGB)**
- PGB 2025:
  - 82,8% dos brasileiros jogam (+8,9 pontos);
  - plataforma preferida: smartphone 40,8% (−8 pontos), console 24,7%, PC 20,3%;
  - 6.282 entrevistados entre janeiro e fevereiro de 2025;
  - mulheres são 53,2% dos jogadores;
  - cerca de 39% jogam jogos de aposta pelo menos uma vez por semana.
  
  [https://www.mobiletime.com.br/noticias/26/03/2025/pesquisa-pgb-jogos/]
- PGB 2026:
  - smartphone 44,1%, console 24%, PC 21,2%;
  - a Geração Z (16–29) é 36,5% do público e tende a migrar direto do celular para o PC;
  - a falta de memória RAM encarece o hardware.
  
  [https://canaltech.com.br/hardware/pesquisa-game-brasil-2026-pc-gamer-vive-nova-era-de-ouro-no-pais/]
  - Amostra de 7.115 pessoas (março de 2026): **não verificado** (vi só no resumo da busca).

**Newzoo**
- Mercado global em 2025: cerca de US$ 197 bilhões (+7,5%). Mobile: US$ 108 bilhões. [https://www.gameblast.com.br/2025/12/mercado-dos-games-cresce-75-em-2025-revela-relatorio-da-newzoo.html]
  - O valor de R$ 12,7 bilhões para o Brasil (resumo de busca): **não verificado**.

**Android x iOS**
- No Brasil, em setembro de 2026: Android 78,78%, iOS 21,21% (StatCounter, medido por tráfego web). [https://gs.statcounter.com/os-market-share/mobile/brazil]

**Zero-rating**
- Estudo da Tarifica (agosto de 2025): 67% dos 1.997 planos analisados em 17 países da América Latina têm zero-rating, e o WhatsApp aparece em 61%. O plano pós-pago mais barato com WhatsApp ilimitado no Brasil custa cerca de US$ 11 (R$ 60). [https://teletime.com.br/11/08/2025/na-america-latina-67-dos-planos-de-celular-tem-zero-rating-para-apps/]
  - Implicação para o seu tema (é dedução minha): jogo web gasta dados da franquia, enquanto apps com zero-rating não gastam.

**Portal brasileiro**
- Click Jogos: fundado em 2004, mais de 30 mil jogos, vertical do Grupo NZN. Diz ser "o maior portal de jogos infantis online do Brasil". [https://www.clickjogos.com.br/perguntas-frequentes]
  - *Confiabilidade:* autodeclaração.

**Pix**
- Tutorial de 2023 mostra recarga de Free Fire via Pix na web (smile.one), com CPF e ID do jogo. [https://olhardigital.com.br/2023/09/23/dicas-e-tutoriais/como-fazer-uma-recarga-no-free-fire-com-pix/]
  - Que o "Recarga Jogo" é o site oficial da Garena com bônus no Pix aparece só na busca: **não verificado**.

#### 6. Casos web-first e engines

**Krunker.io**
- Comprado pela FRVR (Lisboa) em maio de 2022. FPS no navegador sem instalação, com mais de 200 milhões de jogadores únicos. A plataforma da FRVR soma 1,5 bilhão de jogadores. [https://gamesbeat.com/frvr-acquires-free-to-play-shooter-krunker-io/]

**Bloxd.io**
- Criado em 2021 por Arthur Baker com a engine aberta Noa. Mais de 8 milhões de jogadores registrados, 4,36 milhões de visitas em março de 2026 e cerca de 14,8 mil jogadores simultâneos. Roda em Chromebooks escolares. [https://news.viverse.com/post/bloxd-io-free-browser-game-on-viverse]
  - *Confiabilidade:* **blog da plataforma VIVERSE/HTC (parte interessada).**

**Shell Shockers, Narrow One, Venge.io**
- **Não verificado** (não abri fontes sobre eles).

**Spline**
- Série A de US$ 10 milhões liderada pela Third Point Ventures. A base de usuários dobrou em 12 meses, com mais de 7 milhões de cenas criadas. [https://pulse2.com/spline-collaborative-3d-design-platform-company-secures-10-million-series-a/]
  - *Confiabilidade:* repete press release.
  - A data (agosto de 2024) vem só do resumo de busca.
- Figma: **não verificado.**

**Unity e Godot**
- Runtime Fee da Unity: anunciada em setembro de 2023 e cancelada em setembro de 2024 (Matt Bromberg). No lugar, o Unity Pro subiu 8% (US$ 2.200 por ano) e o Enterprise 25%. [https://www.videogameschronicle.com/news/unity-has-cancelled-its-controversial-runtime-fee/]
- Godot:
  - 12% dos desenvolvedores na pesquisa Game Developer Collective (+8 pontos ao ano);
  - engine de 47% das inscrições na game jam da GMTK, encerrando 9 anos de liderança da Unity;
  - a adoção disparou depois da Runtime Fee.
  
  [https://www.gamedeveloper.com/programming/godot-adoption-is-rising-what-are-devs-enjoying-about-the-engine-]

---

#### Leitura transversal

- **Distribuição:** a distribuição web cresce por três caminhos ao mesmo tempo:
  - portais financiados por anúncios (Poki com 100M por mês);
  - "jogos dentro de plataformas" (YouTube, Discord, Reddit, Netflix);
  - pagamentos fora da loja abertos pela via judicial e regulatória (EUA, UE, Japão).
- **Cloud gaming:** está limitado pelo custo (Stadia fechou, Xbox impôs limite de horas).
- **XR:** os headsets recuam (Vision Pro, Meta) e os óculos crescem.
- **Brasil:** combina Android dominante, celular como plataforma principal e zero-rating que favorece apps, não a web.

#### URLs abertas com sucesso
1. https://poki.com/blog/2025-at-poki-a-year-in-review
2. https://www.mgoddess.com/news/inside-poki-s-vision-for-the-future-of-browser-gaming/?lang=en
3. https://gamesbeat.com/crazygames-hits-35m-users-for-browser-games-and-launches-social-multiplayer-features/
4. https://www.pocketgamer.biz/youtube-playables-expands-to-more-than-50-markets-including-the-eu-and-nordics/
5. https://developers.google.com/youtube/gaming/playables
6. https://www.pocketgamer.biz/discord-activities-opens-up-to-all-developers-to-make-games-on-the-platform/
7. https://www.theblock.co/post/339563/telegram-games-had-trouble-earning-revenue-retaining-users-in-q4-report
8. https://www.tvtechnology.com/news/netflix-launches-party-games-for-tvs
9. https://ppc.land/meta-announces-web-games-sunset-by-september-2026/
10. https://ppc.land/reddit-to-halt-public-data-api-access-in-march-2027-as-14-000-apps-register
11. https://techcrunch.com/2024/03/01/apple-reverses-decision-about-blocking-web-apps-on-iphones-in-the-eu/
12. https://techcrunch.com/2025/04/30/epic-games-just-scored-a-major-win-against-apple/
13. https://www.macrumors.com/2025/05/20/fortnite-returns-to-u-s-app-store/
14. https://9to5mac.com/2026/06/30/supreme-court-agrees-to-hear-apple-appeal-over-epic-games-ruling/
15. https://9to5google.com/2025/10/21/google-epic-agree-week-long-extension-play-store-changes/
16. https://techcrunch.com/2025/12/18/apple-opens-up-its-app-store-to-competition-in-japan
17. https://www.stash.gg/blog/supercell-store
18. https://xsolla.com/blog/the-xsolla-report-vol-10-2026-d2c-is-reshaping-monetization
19. https://www.gematsu.com/2022/09/stadia-to-shut-down-on-january-18-2023-all-purchases-to-be-refunded
20. https://www.purexbox.com/news/2025/10/xbox-cloud-gaming-expands-with-unlimited-usage-and-special-perks-for-game-pass-members
21. https://news.xbox.com/en-us/2026/09/03/xbox-cloud-gaming-changes/
22. https://nvidianews.nvidia.com/news/nvidia-blackwell-architecture-comes-to-geforce-now
23. https://www.engadget.com/gaming/amazons-revamped-luna-streaming-service-is-available-now-130000613.html
24. https://www.macrumors.com/2026/01/02/vision-pro-still-failing-to-catch-on/
25. https://www.gamedeveloper.com/extended-reality/meta-shutters-three-vr-studios-as-part-of-reality-labs-layoffs
26. https://techcrunch.com/2026/02/20/meta-metaverse-leaves-vr-horizon-worlds-mobile/
27. https://www.uploadvr.com/meta-essilorluxottica-sold-7-million-smart-glasses-in-2025/
28. https://roadtovr.com/meta-ray-ban-smart-glasses-display-price-release-date-specs/
29. https://roadtovr.com/samsung-galaxy-xr-headset-price-specs-release-date/
30. https://caniuse.com/webxr
31. https://www.mobiletime.com.br/noticias/26/03/2025/pesquisa-pgb-jogos/
32. https://canaltech.com.br/hardware/pesquisa-game-brasil-2026-pc-gamer-vive-nova-era-de-ouro-no-pais/
33. https://www.gameblast.com.br/2025/12/mercado-dos-games-cresce-75-em-2025-revela-relatorio-da-newzoo.html
34. https://gs.statcounter.com/os-market-share/mobile/brazil
35. https://teletime.com.br/11/08/2025/na-america-latina-67-dos-planos-de-celular-tem-zero-rating-para-apps/
36. https://www.clickjogos.com.br/perguntas-frequentes
37. https://olhardigital.com.br/2023/09/23/dicas-e-tutoriais/como-fazer-uma-recarga-no-free-fire-com-pix/
38. https://gamesbeat.com/frvr-acquires-free-to-play-shooter-krunker-io/
39. https://news.viverse.com/post/bloxd-io-free-browser-game-on-viverse
40. https://pulse2.com/spline-collaborative-3d-design-platform-company-secures-10-million-series-a/
41. https://www.videogameschronicle.com/news/unity-has-cancelled-its-controversial-runtime-fee/
42. https://www.gamedeveloper.com/programming/godot-adoption-is-rising-what-are-devs-enjoying-about-the-engine-