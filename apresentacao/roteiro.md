# Roteiro: "O que era app vira link" (Tema 15)

Quinta, 08/10, 8h, online. Cada mapa tem cerca de 50 minutos de aula: a sua apresentação, depois o mapa adversarial do professor, depois a discussão que **você** conduz. O roteiro abaixo dá uns **13–15 minutos de fala**. Fale em tom de conversa; o texto é guia, não precisa ler palavra por palavra.

---

## Slide 1 — Capa (30s)

> Bom dia. Meu tema é o 15, "O navegador como console: 3D e XR sem instalação". A frase do tema no site resume bem: o que era app vira link. Fiz o mapa até 2030, com um viés propositalmente cético, e olhando para o Brasil.

## Slide 2 — A tese (1min)

> Se eu tivesse que resumir o mapa numa frase seria esta: a ruptura maior aqui não é gráfica, é sobre quem manda na distribuição.
>
> Eu cheguei em três disrupções-raiz. A primeira é técnica: pela primeira vez dá para ter GPU de verdade atrás de um link. A segunda é de poder: o jogo está saindo da loja de apps e indo morar dentro de outras plataformas — YouTube, Discord, Reddit — e a Justiça americana, a União Europeia e o Japão abriram o pagamento fora da loja. A terceira é o XR por link, e já adianto que é a raiz mais frágil do mapa.

## Slide 3 — Onde está hoje: o que mudou (2min)

> Por que agora e não há cinco anos? Por causa dessa linha do tempo. Em 2023 o Chrome lançou o WebGPU no desktop. Em 2024 chegou no Android. E em 2025 veio a peça que faltava: o Safari 26 trouxe WebGPU para iPhone, iPad, Mac e Vision Pro, e o Firefox ligou no Windows. Também em 2025 o WebAssembly 3.0 virou padrão. Em 2026 a Unity tirou o WebGPU do modo experimental.
>
> O WebGPU importa porque o WebGL, que é o que a gente usa há uma década, não tem compute shader. O WebGPU tem. É isso que separa "joguinho de navegador" de 3D sério.
>
> Ainda falta coisa: Linux no Chrome, Firefox no Android, e a Godot não suporta WebGPU.
>
> E a distribuição por link já tem escala: a Poki diz ter 100 milhões de jogadores por mês — dado da própria empresa, então com cuidado. O YouTube Playables está em mais de 50 mercados.
>
> No Brasil: celular é a plataforma preferida de quem joga, o Android é quase 79% do tráfego mobile — o que é bom para a web, porque o Android tem WebGPU. Mas 67% dos planos da América Latina têm zero-rating para apps. Guardem esse dado, ele volta.

## Slide 4 — O que ainda não funciona (1min30)

> O que não funciona: o iPhone não tem WebXR, em nenhuma versão. A Godot não exporta C# para a web, e a própria documentação dela diz que nativo sempre vai ser mais rápido no celular. O Unreal saiu da web em 2019.
>
> E tem a memória: o iOS mata a aba quando o jogo usa memória demais — os relatos falam em uns 500 MB, mas a Apple não publica o limite. Ou seja: o gargalo saiu da API gráfica e foi para memória, download e plano de dados.
>
> Do lado do mercado: a Meta fechou três estúdios de VR este ano, o Vision Pro vende pouco. Os mini-jogos do Telegram tiveram retenção de 5 a 20%. E o cloud gaming, que é o outro jeito de jogar sem instalar, esbarra em custo: o Stadia fechou, e o Xbox Cloud vai ter limite de horas a partir de novembro.

## Slide 5 — O que ficou fora (1min)

> Minha skill tem um critério explícito: tecnologia madura não entra. Então WebGL e three.js clássico ficaram fora — eles são o incumbente. Portal de jogo 2D também: o Click Jogos existe desde 2004. Isso é presente, não futuro.
>
> E tirei três coisas por escopo: cloud gaming, que é "navegador como TV", não como console; gaussian splatting como raiz, que é o tema 10; e IA no navegador, que é o tema da meap, que apresenta hoje também.

## Slides 6, 7 e 8 — A roda (4min no total, ~1min20 cada)

**Slide 6 — Raiz 1**
> Aqui está a roda. Cada coluna é uma ordem de efeito, e a cor da borda é a confiança: amarelo é média, vermelho é baixa. Repararam que quase tudo é vermelho? É de propósito: viés cético.
>
> Na raiz técnica, o efeito que eu mais acredito é o `e2.2`: streaming de assets com nível de detalhe vira competência obrigatória. Porque se o gargalo é memória e download, você não manda o modelo inteiro, você manda aos poucos. Isso já está acontecendo com o SuperSplat e o Spark. O efeito em que eu menos acredito é o primeiro — jogo 3D lançar versão web junto com a nativa. Já explico por quê.

**Slide 7 — Raiz 2**
> Na raiz de distribuição, a cadeia que mais me interessa é esta: plataformas viram consoles hospedeiros → o gatekeeper muda de dono em vez de sumir → e lá em 2030, o antitruste, que hoje briga com a App Store, passa a olhar para essas plataformas. E tem um efeito brasileiro: Pix mais loja web pode fazer do Brasil um campo de teste de monetização fora da loja — mas com sinal fraco, porque a única evidência que achei é recarga de Free Fire via Pix na web.

**Slide 8 — Raiz 3**
> No XR, o efeito mais sólido é que experiências curtas — museu, marca, ensino — trocam o app pelo link, porque não compensa fazer app para tão pouca gente com headset. E tem um efeito curioso para o Brasil: como o iPhone não tem WebXR, o AR por link cresce primeiro onde o Android domina. Ou seja, aqui.

## Slide 9 — O achado (1min) — **este é o slide principal**

> Se vocês lembrarem de um slide, que seja este. O tema promete "sem intermediário": sem loja, sem instalar, é só um link. Mas quando eu construí a roda, as três raízes acabaram no mesmo lugar: os intermediários trocam de lugar.
>
> A taxa sai da App Store e vai para o YouTube e o Discord. A engine que tem WebGPU ganha poder sobre quem publica na web. E quando um fornecedor fechado sai — o 8th Wall fechou — o AR migra para stacks abertas. Não é o fim do gatekeeper, é a troca de gatekeeper.

## Slide 10 — Contra o próprio mapa (1min30)

> Agora, onde eu provavelmente estou errado. Minha skill tem uma etapa obrigatória de autocrítica e registra cada rebaixamento.
>
> Três efeitos começaram com confiança alta e caíram para média. O de streaming caiu porque assumia que o limite de memória do iOS continua, e o iOS 18.2 já corrigiu parte disso. O da loja web caiu porque depende da Suprema Corte americana, que aceitou o recurso da Apple em junho. O das plataformas hospedeiras caiu porque é extrapolação linear — e o Telegram mostrou que mini-jogo pode ser bolha.
>
> E o `e1` caiu para baixa: a Unity exporta para WebGL há uns dez anos e isso nunca levou o 3D de porte médio para a web. Por que agora seria diferente?
>
> E a raiz 3 inteira pode não acontecer. Se cair, o tema vira "3D sem instalação" e as outras duas raízes continuam de pé.

## Slide 11 — Cenários 2030 (1min30)

> Três cenários. O provável: jogo curto, demo e visualização abrem por link; jogo grande continua instalado, com loja web ao lado; YouTube e Discord viram os grandes consoles e cobram suas taxas; no Brasil, a gente joga por link no Wi-Fi.
>
> O desejável: o link vira um formato aberto de verdade — qualquer um publica, com Pix, sem taxa obrigatória. Para isso precisaria de regulação que trate plataformas como lojas, Godot com WebGPU, e WebXR no iPhone.
>
> O indesejável: a web vira só a porta de três ou quatro plataformas fechadas, cheias de jogos gerados por IA. O sinal precoce para observar: plataformas publicando regras mais duras que as das lojas, sem ninguém fiscalizando.

## Slide 12 — O que a máquina errou (1min)

> Usei IA no processo, e esta seção é obrigatória. O erro mais sério: a IA pulou a entrevista da minha própria skill e reaproveitou as respostas que eu tinha dado num teste de outro tema. Isso fez o recorte "Brasil" entrar como lente, não como base de dados — a maior parte da evidência é global.
>
> Outros: o caniuse diz que o WebGPU vem desligado no Firefox, e as release notes da Mozilla dizem o contrário — valeu a fonte primária. Um número do Hamster Kombat que a própria equipe do jogo contesta. E números que só apareciam em resumo de busca foram cortados.

## Slide 13 — O experimento (1min)

> O experimento que sai daqui é o "mesmo jogo, três portas". Uma cena 3D pequena em three.js com WebGPU, que cai para WebGL se o aparelho não tiver. A turma abre de três jeitos: QR code no celular, embutida em outra página, e instalada. Eu meço tempo até jogar, se rodou em WebGPU, fps e crash.
>
> A pergunta é: o que pesa mais em 2030, os segundos que o link economiza ou a estabilidade do app? E o que me faria mudar de ideia: se mais de um terço dos celulares da turma cair no fallback ou travar, minha raiz 1 está otimista demais para o Brasil.

## Slide 14 — Discussão (passa a palavra)

> Antes do professor trazer o mapa dele, quero ouvir vocês. Começo com a primeira: qual foi a última coisa 3D que vocês abriram por link, sem instalar? E voltaram nela depois?

(Deixe a pergunta 1 rodar, depois puxe a 2 — ela conversa direto com o achado do slide 9 e é a mais provável de render debate.)

## Slide 15 — Fontes

Só para deixar na tela se alguém pedir. A lista completa, com 62 fontes, está no documento.

---

## Para conduzir a discussão

**Ordem sugerida das perguntas (slide 14):**
1. Experiência pessoal (quebra o gelo).
2. "Ficamos mais livres ou só trocamos de dono?" — é o achado do mapa, a que mais rende.
3. XR por link num mercado de headsets que encolhe.
4. Zero-rating no Brasil.

**Se a conversa travar:**
- "Quem aqui já jogou algo no Discord ou no YouTube sem instalar? Vocês sabiam quem fica com o dinheiro?"
- "Se a Apple ligasse o WebXR no iPhone amanhã, o que mudaria?" (é o wildcard do mapa)

## Perguntas que o professor pode fazer (e o que responder)

- **"Isso não é só WebGL de novo? O que é novo?"** → WebGL não tem compute shader; WebGPU tem, e desde 2025 está em todos os motores, inclusive no iPhone. E a novidade maior nem é técnica, é a distribuição (raiz 2).
- **"Por que cloud gaming ficou de fora?"** → Porque ali o navegador é só uma TV: o processamento fica no servidor. Usei como força contrária: o Stadia fechou e o Xbox Cloud vai ter limite de horas porque "o custo cresce conforme mais gente joga". Rodar no aparelho do jogador não tem esse custo.
- **"Seu recorte é Brasil, mas os dados são globais."** → Verdade, e está registrado na seção 8. Os dados brasileiros que usei: PGB, StatCounter (Android 79%) e zero-rating. O experimento serve justamente para medir com os aparelhos reais da turma.
- **"Qual efeito é extrapolação linear?"** → `e3` (plataformas como consoles) e `e5.1` (AR migrando para stacks abertas): sinal alto, pouco valor preditivo.
- **"Você fez isso com IA, o que é seu?"** → Responda com sinceridade sobre o que você revisou e decidiu. Antes da aula, leia pelo menos as seções 4, 5 e 7 do documento.

---

## ⚠️ Antes da aula — checklist

- [ ] **Hoje até 23h59**: colar o link do documento `tendencia-o-navegador-como-console-3d-e-xr-sem-instalacao.md` na página "Escolher" (Passo 4).
- [ ] Ler as seções 4, 5 e 7 do documento e confirmar se concorda com as 5 respostas reaproveitadas da entrevista (seção 2). Se discordar de alguma, avisa que eu ajusto.
- [ ] Decidir o `publico_ok` (hoje está `false`: seu nome não aparece na galeria pública).
- [ ] Abrir `slides.pdf` em tela cheia e testar o compartilhamento no Meet.
- [ ] Depois da aula, até 23h59: responder o feedback do colega (meap) na página "Escolher" — é o registro de presença.
