# ESTUDO.md — O que aprendi sobre os métodos

## Futures Wheel

Proposto por Jerome Glenn (The Futures Group, anos 1970) como técnica de brainstorming estruturado: parte de uma disrupção-raiz no centro e ramifica efeitos de 1ª ordem (consequências diretas), depois 2ª ordem (consequências das consequências) e assim por diante, formando uma "roda" visual. Não tem um critério de parada formal no método original — Glenn deixava a profundidade a critério de quem conduzia a sessão, geralmente até os efeitos ficarem óbvios demais ou especulativos demais para render debate. Nesta skill, fixei em 3 níveis porque é o limite do formato de entrega — uma decisão de engenharia, não do método em si.

**Para que não serve**: não estima probabilidade nem prazo com rigor — é uma ferramenta de imaginação estruturada, não um modelo preditivo. Também não prioriza entre efeitos: gera uma lista ramificada, mas não diz qual efeito é mais importante de monitorar.

## Hype Cycle (Gartner)

Modelo proprietário da Gartner com 5 fases: Gatilho de Inovação → Pico de Expectativas Infladas → Vale da Desilusão → Rampa de Esclarecimento → Platô de Produtividade. Afirma que toda tecnologia emergente passa por essa curva de expectativa antes de amadurecer.

**Crítica de validação empírica**: a Gartner nunca publicou a metodologia estatística por trás do posicionamento das tecnologias na curva — não há dados brutos, nem retrospectiva pública mostrando que tecnologias historicamente seguiram esse formato de curva específico (em vez de, por exemplo, crescimento linear ou adoção em degraus). Pesquisadores (ex. Dedehayir & Steinert, 2016, "The hype cycle model: A review and future directions") apontam que o modelo é mais uma ferramenta de comunicação de mercado da própria Gartner do que um modelo cientificamente validado — algumas tecnologias nunca saem do "vale da desilusão", outras pulam fases, e o mesmo relatório às vezes reposiciona uma tecnologia de forma inconsistente ano a ano.

**Para que não serve**: não deveria ser usado como previsão determinística de quando uma tecnologia "vai vingar" — é melhor lido como um retrato da narrativa de mercado num dado momento, não do destino técnico da tecnologia.

## Quadrante Mágico (Gartner)

Também da Gartner: posiciona fornecedores (não tecnologias) em dois eixos — "capacidade de execução" (eixo vertical) e "completude de visão" (eixo horizontal) — gerando 4 quadrantes (Líderes, Visionários, Desafiantes, Nichos). Mede a posição competitiva de empresas num mercado já existente e definido pela própria Gartner.

**Para que não serve**: não mede o futuro de uma tecnologia, mede a posição atual de fornecedores dentro de uma categoria de mercado já consolidada o suficiente para a Gartner definir critérios de avaliação. Uma tecnologia genuinamente emergente frequentemente não tem quadrante ainda — o método pressupõe que o mercado já existe e já tem categoria, o que o torna inadequado para captar disrupção real (ele descreve competição dentro do status quo, não ruptura do status quo).

## Emergente × disruptivo × maduro

Critério adotado nesta skill: uma tecnologia é **madura** quando já é padrão de mercado consolidado — amplamente adotada pelos players líderes e sem debate técnico real e atual sobre sua substituição (ex.: JWT, OAuth2, bcrypt). É **emergente** quando existe adoção real mas ainda em curso, com incerteza genuína sobre se vai virar padrão (ex.: passkeys/WebAuthn). É **disruptiva** quando, além de emergente, ameaça mudar a estrutura de poder do mercado (quem são os players dominantes), não só a técnica usada (ex.: identidade auto-soberana via DID ameaça o modelo de "provedor de identidade centralizado" como categoria, não só substituir uma biblioteca por outra).

## Efeitos de 1ª, 2ª e 3ª ordem

1ª ordem: consequência direta e imediata de uma disrupção-raiz (ex.: "passkeys reduzem phishing de credenciais"). 2ª ordem: consequência da consequência, geralmente envolvendo um ator ou sistema diferente do afetado na 1ª ordem (ex.: "queda de phishing de credenciais reduz o mercado de ferramentas anti-phishing corporativas"). 3ª ordem: efeito estrutural, frequentemente social/regulatório/econômico, distante o bastante da causa original que a cadeia causal fica mais especulativa (ex.: "resseguradoras de cyber-risk recalibram apólices por queda sustentada de incidentes de credential stuffing"). O diferenciador prático entre as ordens não é o tempo decorrido, é o número de saltos causais e a queda de confiança que cada salto introduz — por isso a skill exige registrar `confiança` em cada nível, não só no efeito-raiz.

## Método adicional: Three Horizons Framework

Proposto por Bill Sharpe (International Futures Forum, formalizado no livro "Three Horizons: The Patterning of Hope", 2013). Descreve a transição entre três sistemas coexistentes: Horizonte 1 (o sistema dominante atual, em declínio de adequação), Horizonte 2 (inovações de transição, algumas das quais serão cooptadas pelo H1, outras evoluirão para o H3), Horizonte 3 (o sistema emergente que eventualmente domina). Útil para mapear não só "o que vem a seguir" mas a tensão simultânea entre manter o sistema atual e investir no emergente.

**Para que não serve**: não gera uma lista ramificada de efeitos causais como a Futures Wheel — é uma lente de classificação (isto é H1, H2 ou H3?), não um método de geração de conteúdo. Também não diferencia bem H2 genuíno (que vai virar H3) de H2 que será apenas absorvido pelo H1 sem mudar a estrutura — essa distinção fica a critério de quem aplica o método, tanto quanto na Futures Wheel.

---

**Nota de honestidade**: este documento foi redigido por mim (IA) com base em conhecimento técnico verificável sobre os métodos (autoria, mecânica, críticas documentadas na literatura). O aluno (jcsc) revisou e validou o conteúdo antes da entrega — a leitura e o entendimento genuíno deste texto são de responsabilidade dele, não apenas a existência do arquivo.
