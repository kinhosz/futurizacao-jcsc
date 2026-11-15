# Pinta Chão — experimento do Movimento 3

**Aluno:** jcsc · **Tema 15:** O navegador como console: 3D e XR sem instalação · **Teste com a turma:** 17/11/2026 (remoto)

**Link para jogar:** https://kinhosz.github.io/futurizacao-jcsc/experimento/

## O que é

Um jogo 3D multiplayer que é só um link. Cada pessoa abre o endereço no celular ou no computador, escolhe um apelido e entra numa arena compartilhada com uma bolinha da sua cor. Andando, ela pinta o chão. Ganha quem tiver mais chão pintado ao fim de uma rodada de 2 minutos. Não tem instalação, loja, conta ou servidor de jogo: os navegadores se conectam direto entre si. Enquanto a turma joga, uma aba de observador registra quem conseguiu entrar, quanto tempo levou, em que aparelho e se o 3D rodou em WebGPU ou caiu para WebGL.

## A pergunta sobre o futuro

Se um jogo 3D multiplayer virar só um link, sem loja, sem instalação e sem servidor, a fricção para jogar junto some, ou só muda de lugar (rede, aparelho, navegador)?

## Tecnologia emergente, e por que não dá com tecnologia madura

- **WebGPU** (via `WebGPURenderer` do three.js). A raiz 1 do meu mapa diz que a WebGPU acabou de chegar a todos os navegadores principais. O jogo tenta usá-la e, onde não existe, cai automaticamente para WebGL. Cada volta para WebGL fica registrada, e a proporção WebGPU × WebGL na turma é um dos dados do experimento.
- **Multiplayer sem servidor de jogo:** conexão direta entre navegadores por WebRTC, usando a biblioteca [Trystero](https://github.com/dmotz/trystero). Para se encontrarem, os navegadores usam relays públicos da rede Nostr; depois disso, os dados do jogo vão direto de um navegador para o outro.

**Por que não com o que já é comum:** hoje, jogar 3D junto com outras pessoas quer dizer instalar um app de loja (ou um cliente como a Steam) e passar por um servidor da empresa que fez o jogo. O experimento testa o contrário: o "console" é o navegador que a pessoa já tem, e a "infraestrutura" é só um link estático. Isso só é possível com WebGPU nos navegadores e com conexão direta entre eles. É justamente a combinação que o mapa aponta como recente, e o que se quer saber é se ela já funciona com gente de verdade, em casa, cada um no seu aparelho.

## Como usar

**Para jogar (turma):**
1. Abra https://kinhosz.github.io/futurizacao-jcsc/experimento/ no celular ou no computador. Qualquer navegador moderno serve.
2. Espere o botão mudar de "carregando o jogo…" para "Entrar", digite um apelido e entre.
3. **Celular:** encoste o dedo na tela e arraste na direção em que quer andar. **Computador:** setas ou WASD.
4. Quando a rodada começar, aparece um relógio no topo. Pinte o máximo de chão que conseguir.
5. Se depois de uns 25 segundos ninguém aparecer na arena, o jogo avisa. Nesse caso, conte no chat da chamada qual aparelho você usa e se está no Wi-Fi ou no 4G. Isso também é dado.

**Para observar (quem conduz):**
- Abra o link com `?painel` no fim: https://kinhosz.github.io/futurizacao-jcsc/experimento/?painel
- O painel mostra cada jogador (aparelho, navegador, WebGPU ou WebGL, tempo até se conectar, com quantos outros ele está conectado, ping e fps) e uma linha do tempo.
- O botão **Iniciar rodada** começa a partida para todos. A duração muda com `&segundos=60`.
- O botão **Baixar dados (JSON)** salva tudo o que foi registrado (também fica guardado no navegador do observador).
- Tecla **P** mostra ou esconde o painel. Por trás dele dá para ver a arena.

**Parâmetros do link:**

| Parâmetro | O que faz |
|---|---|
| `?sala=nome` | Usa outra sala, por exemplo para testar sem misturar com a turma. O padrão é `aula`. |
| `?painel` | Abre como observador: não joga, vê os dados e inicia as rodadas. |
| `?segundos=60` | Duração da rodada (só no painel). O padrão é 120. |
| `?webgl` | Força o modo antigo (WebGL), para comparar. |

**Rodar localmente:** é uma página estática. Na pasta `experimento/`, rode `python3 -m http.server 8000` e abra `http://localhost:8000`. Não precisa instalar nada; as bibliotecas vêm de CDN (three.js 0.186.1 e trystero 0.26.0, com versões fixas).

## O que espero que aconteça (escrito antes do teste)

> ⚠️ **Rascunho: revisar com as minhas palavras antes de entregar.** Ponto de partida: as expectativas que escrevi para a ideia A no `ideias.md` (14/10), adaptadas ao teste remoto.

- A maioria entra em menos de 30 segundos, mas uma parte trava em coisas que não são gráficas: rede (sobretudo 4G, que costuma bloquear conexão direta entre aparelhos), navegador desatualizado ou aba que carrega devagar.
- Uma parte dos aparelhos não vai rodar em WebGPU e vai cair para WebGL. Imagino que sejam principalmente iPhones mais antigos e celulares Android baratos. Quase ninguém vai perceber a diferença jogando.
- Algumas pessoas vão se conectar com parte da turma e não com todo mundo: vão ver só alguns colegas na arena. Esse é o tipo de falha que um servidor central esconde e que um jogo só de link expõe.
- Se mais de um quarto da turma não conseguir jogar nos primeiros 2 minutos, a fricção não sumiu, só mudou de lugar: saiu da loja e da instalação e foi para a rede e o aparelho.

## Limitações conhecidas

- Quem estiver em redes muito fechadas (4G com NAT de operadora, algumas redes corporativas ou de universidade) pode não conseguir se conectar direto. Não há servidor TURN de reserva, de propósito: medir isso faz parte da pergunta.
- Cada navegador conecta com todos os outros. Isso funciona bem para uma turma (até cerca de 20 pessoas), mas não para centenas.
- O painel do observador é o "árbitro" do placar: ele manda o chão oficial a cada 2 segundos e no fim da rodada. Sem observador aberto, o jogo funciona em modo livre, sem rodadas.
- Os relays públicos da rede Nostr são de terceiros. Se estiverem fora do ar no dia, ninguém se encontra. O status mostra isso, e o aviso para a pessoa diz se o problema é esse.
