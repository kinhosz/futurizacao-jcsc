# Ideias de experimento — Movimento 3

**Aluno:** jcsc · **Tema 15:** O navegador como console: 3D e XR sem instalação · **Data:** 14/10/2026

## 1. Como foi o brainstorming

**Método.** Brainstorming com IA (Claude, via Claude Code), em duas rodadas. Ponto de partida: o meu mapa de futuro do movimento 2 (`tendencia-o-navegador-como-console-3d-e-xr-sem-instalacao.md`).

- **Rodada 0 (06–07/10, junto com o mapa).** A skill de futurização gerou uma ideia, "Mesmo jogo, três portas", registrada na seção 10 do mapa e apresentada no slide 17 da aula de 08/10.
- **Rodada 1 (14/10).** A IA gerou 9 candidatas. Cada uma partiu de um ponto específico do mapa: as três disrupções-raiz (seção 4), os sinais fracos (seção 6), os rebaixamentos e forças contrárias de "Contra o próprio mapa" (seção 7) e o cenário indesejável (seção 9). A ideia da rodada 0 entrou como candidata 1.

**Quantas ideias saíram:** 9 candidatas no total, listadas abaixo com a origem de cada uma.

| # | Candidata | Origem no mapa |
|---|---|---|
| 1 | Mesmo jogo, três portas (link × iframe × instalado) | §10 |
| 2 | Censo de GPU dos celulares da turma | raiz 1, rebaixamento de `e1` |
| 3 | **Celular como controle, tela compartilhada como console** | §6, sinal fraco Netflix/Luna |
| 4 | Discord Activity × link avulso (retenção) | raiz 2, caso Telegram (§7) |
| 5 | Quanto custa o link em dados | §7, zero-rating |
| 6 | **Do plano ao imersivo pelo mesmo link** | raiz 3 |
| 7 | **Jogo gerado por IA na hora, publicado como link** | §6, Playables Builder; cenário indesejável (§9) |
| 8 | O save sobrevive no navegador? | raiz 1, armazenamento descartável no iOS |
| 9 | Quanto cabe no celular (JS × Wasm × WebGPU) | raiz 1 |

**Seleção.** A escolha das três ideias (3, 6 e 7) foi minha. A IA gerou e organizou as candidatas, mas não escolheu. Vou explicar em aula por que escolhi essas três e deixei de fora a "três portas" do mapa.

**O que ficou de fora (declarado).** O confronto com o mapa adversarial do professor e a conversa da aula de 08/10 não foram incorporados de forma estruturada a este brainstorming. A sessão em que essas ideias foram discutidas não ficou registrada, e não houve tempo de reconstruí-la. Levo isso para a aula de 15/10.

## 2. Três ideias selecionadas

### Ideia A — O projetor é o console, o celular é o controle (candidata 3)

**O que é.** Um jogo de festa curto. O projetor da sala roda a cena 3D num navegador. Cada aluno escaneia um QR code e o próprio celular vira controle (toque e inclinação), sem instalar nada. A partida suporta a turma inteira ao mesmo tempo. O sistema registra quanto tempo cada um leva para entrar, quantos não conseguem e qual é a latência do controle.

**Pergunta sobre o futuro.** Em 2030, quando o "console" for uma tela compartilhada mais o celular de cada um, ligados só por um link, a fricção de entrar some de fato, ou ela só muda de lugar (rede, QR, permissão de sensor, navegador)?

**Tecnologia emergente.** WebGPU (`WebGPURenderer` do three.js) na tela compartilhada, com física e partículas para muitos jogadores em compute shader. WebTransport para o controle: datagramas sem a espera por pacote perdido do WebSocket/TCP. Onde o WebTransport não existir, o controle cai para WebSocket, e a taxa de fallback também é dado. *Por que não com tecnologia madura:* o padrão de hoje (Jackbox, Netflix, Luna) usa servidor e app proprietários. Rodar o console inteiro num link aberto, com compute na GPU e transporte de baixa latência, depende justamente das APIs que a raiz 1 diz que acabaram de chegar a todos os navegadores.

**O que espero observar.** A maioria entra em menos de 30 segundos, mas uma parte trava em coisas que não são gráficas: o Wi-Fi do CIn, a permissão de sensor de movimento no iPhone, a câmera que não lê o QR. A latência vai ser perceptível em parte dos aparelhos. Se mais de um quarto da turma não conseguir jogar nos primeiros 2 minutos, o sinal fraco "celular como controle" (§6) é mais frágil do que o mapa supõe.

### Ideia B — Do plano ao imersivo pelo mesmo link (candidata 6)

**O que é.** Uma cena 3D aberta por link que funciona em qualquer tela. Onde o aparelho suporta, aparece um botão "Entrar em AR/VR", e a mesma cena passa a ser vista no espaço físico (celular Android com AR) ou num headset, se houver um na sala. O protótipo registra quantos aparelhos mostram o botão, quantos entram e quanto tempo ficam no imersivo, comparando com o modo plano.

**Pergunta sobre o futuro.** Em 2030 o XR é um botão opcional dentro de experiências comuns por link, ou continua nicho de headset? Hoje, numa turma real, quem consegue entrar e quem fica de fora?

**Tecnologia emergente.** WebXR Device API (`immersive-ar` com hit-test, `immersive-vr`) combinado com WebGPU. A raiz 3 do mapa aponta Vision Pro, Android XR e Quest Browser, pela primeira vez com navegador imersivo ao mesmo tempo, e WebGPU dentro de XR ainda experimental. *Por que não com tecnologia madura:* AR madura é app nativo (ARKit/ARCore) publicado em loja, uma build por plataforma. O que se testa aqui é justamente o mesmo link servindo plano e imersivo sem loja, e isso só existe nessa geração de navegadores.

**O que espero observar.** Os iPhones da turma não mostram o botão: o Safari do iOS não tem WebXR (§6, wildcard). A turma vai se dividir de forma visível entre quem entra e quem não entra. Quem entra no AR fica pouco tempo e volta para o plano. Se isso se confirmar, a raiz 3 é mesmo a de maior risco (§7), e o tema tende a "3D sem instalação" sem o "XR".

### Ideia C — Jogo gerado na hora, publicado como link (candidata 7)

**O que é.** Uma página em que qualquer aluno descreve um mini-jogo em uma frase. Uma IA gera a cena 3D jogável, que vira link e QR na hora. A turma gera vários jogos e depois escolhe o que jogar numa "vitrine". O sistema registra quantos jogos rodam e quantos quebram, quais são escolhidos, por quê e por quanto tempo são jogados.

**Pergunta sobre o futuro.** Se fazer um jogo por link virar uma frase (o rumo do Playables Builder do YouTube), o gargalo deixa de ser a produção e passa a ser a descoberta? O que faz alguém escolher um jogo e não outro, num catálogo que não para de crescer?

**Tecnologia emergente.** Geração de código por LLM produzindo cenas three.js/WebGPU executáveis em segundos, rodando isoladas num iframe com sandbox. *Por que não com tecnologia madura:* com ferramentas maduras, um jogo 3D por link exige alguém que programe ou monte numa engine. A geração em segundos é o que o mapa trata como sinal fraco (§6, Playables Builder em beta fechado), e ainda não é comum.

**O que espero observar.** Boa parte dos jogos gerados quebra ou fica parecida com os outros. A escolha na vitrine vai seguir o título e quem gerou, não a qualidade, o que reproduz em miniatura o cenário indesejável (§9): catálogo inundado e descoberta decidida por fora do jogo. **Risco a discutir na pré-análise:** esta ideia encosta no tema de IA de colegas. O foco aqui é a distribuição por link, não a IA em si.
