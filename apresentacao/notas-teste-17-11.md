# Notas — teste do Pinta Chão (17/11)

> Notas pessoais, fora do Git. São lembretes, não um roteiro: a fala é sua.

## Links

| Para quem | Link |
|---|---|
| **Turma** (mandar no chat) | https://kinhosz.github.io/futurizacao-jcsc/experimento/ |
| **Eu** (observador) | https://kinhosz.github.io/futurizacao-jcsc/experimento/?painel |
| README | https://github.com/kinhosz/futurizacao-jcsc/tree/main/experimento |

- Sala padrão: `aula`. Para testar sozinho antes, use `?sala=teste`, para não misturar com a turma.
- Rodada mais curta: `?painel&segundos=60`.

## Checklist

**Até 16/11, 23h59**
- [ ] Link salvo na página do movimento 3 (sem isso, perco 1,5 ponto e o teste vai para a última vaga livre)

**No dia, antes de começar**
- [ ] Confirmar o horário da aula (fuso: a Bélgica está 4h à frente de Recife)
- [ ] Abrir o meu `?painel` e conferir se a barra de status diz "3D em WebGPU/WebGL"
- [ ] Abrir no celular `?sala=teste` + o painel `?painel&sala=teste`, para ver se os relays estão funcionando hoje
- [ ] Notebook na tomada, Wi-Fi bom e outras abas fechadas

## Estrutura da aula (≈50 min)

1. **5 min, meus.** Sem slides. Tópicos:
   - o que é (jogo 3D multiplayer que é só um link: sem instalação, sem servidor de jogo)
   - a pergunta: *a fricção para jogar junto some, ou só muda de lugar (rede, aparelho, navegador)?*
   - o que eu quero observar: quem consegue entrar, quanto tempo leva, WebGPU × WebGL
   - pedir: **"se não conseguir entrar ou não vir ninguém, falem no chat qual aparelho e se estão no Wi-Fi ou no 4G"**
   - mandar o link no chat
2. **25 min da turma usando: eu NÃO conduzo.** Só observo e anoto. Se quebrar, deixo quebrar.
   - Iniciar uma rodada quando a maioria entrar; depois, outras rodadas.
   - Anotar falas, reclamações e o que surpreender (abaixo).
3. **20 min de conversa.** O que surpreendeu, o que fariam diferente, o que o mapa não previa. O professor entra com as perguntas da §7.

## O painel: como ler

| Coluna | Significado |
|---|---|
| até entrar | tempo do carregamento da página até ver o primeiro colega |
| 3D | WebGPU (verde) ou WebGL (vermelho, volta para o modo antigo) |
| vê | com quantos colegas a pessoa está conectada / total. **Vermelho = conexão parcial** |
| ping | ida e volta entre mim e a pessoa (ms) |
| falhas de conexão | pares que se acharam mas não conectaram (= o caso do 4G) |

- **No fim: clicar em "Baixar dados (JSON)"** antes de fechar a aba. É a matéria-prima do `REGISTRO.md`.
- O painel some? Botão **"Mostrar painel"** no canto ou tecla **P**.

## Minhas apostas (as do README, para conferir depois)

1. Uns poucos falham (2 a 3 pessoas)
2. Meio a meio entre WebGPU e WebGL
3. A turma vai comentar a tecnologia
4. A fricção vai aparecer na rede/4G e no carregamento da página

## Se der problema

| Sintoma | Provável causa | O que fazer |
|---|---|---|
| Alguém fica sozinho na arena | rede bloqueia conexão direta (4G, NAT de operadora) | **É dado.** Anotar o aparelho e a rede. Pode sugerir trocar para o Wi-Fi e anotar se resolveu |
| Ninguém se encontra | relays Nostr fora do ar | A mensagem de aviso diz isso. Tentar outra sala (`?sala=aula2`). Se persistir, é dado também (dependência de terceiros) |
| Botão "Entrar" travado | o 3D (≈2 MB) ainda está carregando | esperar; anotar quem demorou |
| Alguém só vê parte da turma | conexão parcial (coluna "vê" em vermelho) | anotar; é a falha que um servidor central esconderia |
| Placar diferente entre telas | mensagens chegando em ordens diferentes | o painel é o árbitro; o chão oficial é sincronizado a cada 2 s |

## Cola técnica (para perguntas)

- **three.js + WebGPU:** biblioteca 3D. Tenta usar WebGPU; se o navegador não tiver, volta sozinho para WebGL. O chão são 400 ladrilhos desenhados numa chamada só (`InstancedMesh`).
- **WebRTC:** conexão direta entre navegadores (a mesma do Google Meet). Os dados do jogo vão de navegador para navegador.
- **STUN = espelho.** Diz "lá fora você aparece como IP:porta". Google e Cloudflare, grátis. Não repassa dados.
- **Nostr = praça pública.** Rede aberta de relays mantidos por terceiros. Serve só para os navegadores se apresentarem (trocar endereços). O jogo usa eventos efêmeros (não ficam guardados) e criptografados.
- **TURN = carteiro.** Repassa os dados de quem não consegue se conectar direto. Custa dinheiro. **Decidi não usar.**
- **4G falha** porque a operadora muda a porta para cada destino, então o furo no NAT (*hole punching*) não acerta.
- **"Sem servidor" com precisão:** sem servidor *de jogo*. Depende de peças públicas de terceiros: GitHub Pages, relays Nostr e STUN.
- **IP:** os jogadores veem o IP uns dos outros (chrome://webrtc-internals). O painel não registra IP. Trade-off: tirar o intermediário custa privacidade.

## Ligações com a §7 do meu mapa ("Contra o próprio mapa")

- **Rebaixamento de `e1` / raiz 1 (WebGPU em todo lugar):** a proporção WebGPU × WebGL na turma é um teste direto. O Ubuntu já caiu para WebGL.
- **Zero-rating no Brasil:** quem está no 4G já paga dados pelo link e, além disso, **nem conecta**. Força contrária a mais para o recorte Brasil.
- **Viés de dev web** ("a web como solução"): o experimento mostra onde a web *não* resolve (rede da operadora, dependência de relays).
- **Caso Telegram (retenção):** observar se o pessoal joga mais de uma rodada ou larga logo.

## Anotações do dia

**O que fizeram que eu não esperava (fatos):**
-

**O que disseram:**
-

**Onde travaram:**
-

**Apostas: confirmou ou não?**
1.
2.
3.
4.
