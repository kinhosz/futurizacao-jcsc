---
name: futurizacao
description: Mapeia o futuro de um tema tecnológico usando Futures Wheel, Hype Cycle e Quadrante Mágico. Entrevista o usuário antes de gerar qualquer conteúdo, aplica um critério explícito para recusar tecnologias já maduras, e questiona ativamente os próprios efeitos gerados antes de produzir o documento final.
---

# Skill de Futurização

**Testada em:** Claude Code (Sonnet 5), 2026-09-09, tema de teste "autenticação/identidade sem terceiros" (ver `TESTE.md`).

## Quando usar

Invocada quando o usuário pede um mapa de futuro/tendência sobre um tema tecnológico e quer uma saída no formato `FORMATO-documento-tendencia.md`.

## Processo obrigatório

### Etapa 1 — Entrevista (nunca pular)

Antes de gerar qualquer conteúdo, faça estas 5 perguntas ao usuário e aguarde as respostas antes de prosseguir para a Etapa 2:

1. **Horizonte temporal**: para que ano você quer projetar os efeitos? (ex: 2028, 2030, 2035)
2. **Público-alvo**: quem vai ler/usar esse mapa? (investidor, desenvolvedor, gestor de produto, você mesmo)
3. **Recorte geográfico**: mercado global, ou uma região específica?
4. **Descartes explícitos**: existe algo que você já sabe que NÃO quer que o mapa cubra?
5. **Viés desejado**: você quer um mapa otimista, pessimista, ou neutro/cético?

Se o usuário responder "tanto faz" ou pular alguma pergunta, registre isso explicitamente na seção 2 do documento final — nunca assuma um padrão em silêncio.

Nunca pule esta etapa mesmo que o usuário peça para "ir direto ao resultado": explique por que a entrevista é necessária e repita o pedido.

### Etapa 2 — Levantamento e filtro de maturidade

Levante candidatos a "disrupção-raiz" dentro do tema, a partir de fontes reais (busca, conhecimento verificável) — nunca invente nomes de tecnologias, empresas ou números.

**Critério explícito de recusa por maturidade** (aplicar a cada candidato):

> Recuse — trate como "presente", não "futuro" — qualquer tecnologia ou prática que já seja **padrão de mercado consolidado**: amplamente adotada pelos players líderes do setor E sem debate técnico real e atual sobre sua substituição no horizonte considerado.

Exemplos de aplicação (tema auth/identidade): JWT, OAuth2 e bcrypt/argon2 são maduros — consolidados, sem debate real de substituição. WebAuthn/passkeys, identidade descentralizada (DID/verifiable credentials) e prova de conhecimento zero para autenticação ainda são candidatos válidos — adoção em curso, debate real sobre se e como vão substituir o incumbente.

Documente na seção 4 (ou 8, se descoberto tarde) qualquer candidato inicialmente cogitado e depois descartado por este critério — isso é evidência de que o critério foi de fato aplicado, não só citado.

### Etapa 3 — Construção da roda dos futuros

Para cada disrupção-raiz aceita, gere efeitos de 1ª ordem, depois 2ª ordem (efeitos dos efeitos de 1ª ordem), depois 3ª ordem (efeitos dos efeitos de 2ª ordem).

**Critério de parada**: máximo 3 níveis de profundidade. Nunca gere um 4º nível, mesmo que pareça haver mais desdobramentos plausíveis — corte ali e, se relevante, mencione em prosa (fora do YAML) que a cadeia continuaria.

Para cada efeito, atribua: `id` hierárquico único (`e1`, `e1.1`, `e1.1.1`...), `ordem`, `sinal` (forte/médio/fraco), `prazo` estimado, `confiança` (alta/média/baixa).

### Etapa 4 — Autocrítica (obrigatória, não pular)

Depois de gerar a roda completa, releia e tente ativamente derrubar os próprios efeitos gerados, principalmente os de confiança "alta". Para cada um, pergunte:

- É uma extrapolação linear de uma tendência atual, ou pressupõe uma ruptura real?
- Assume uma taxa de adoção sem precedente observável em algo comparável?
- Existe força contrária (regulação, custo, inércia de mercado, interoperabilidade) que este efeito ignorou?

Rebaixe a confiança de qualquer efeito que falhe nesse teste, e registre a rebaixa explicitamente na seção 7 ("Contra o próprio mapa"), incluindo o valor original antes do rebaixamento — a autocrítica precisa ser auditável, não apenas afirmada.

### Etapa 5 — Saída no formato padrão

Gere o documento final seguindo exatamente `FORMATO-documento-tendencia.md`: frontmatter YAML completo, as 12 seções numeradas, bloco YAML da roda dentro da seção 5 (respeitando o limite de 3 níveis).

Preencha a seção 8 ("O que a máquina errou") com qualquer erro real cometido durante as etapas 1-4 (fato não verificável, número que não pôde ser confirmado, confusão de conceitos). Se nenhum erro ocorreu nesta rodada específica, diga isso explicitamente — mas isso deve ser raro; se acontecer sempre, é sinal de que a autocrítica da Etapa 4 não está sendo levada a sério.

## Regras gerais

- Nunca invente fontes, números ou nomes de empresas/produtos sem confiança real de que existem. Na dúvida, escreva "não consegui verificar" em vez de inventar — e registre isso na seção 11 (Fontes) ou 8 (Erros), conforme o caso.
- Nunca pule a Etapa 1 (entrevista) ou a Etapa 4 (autocrítica). Uma saída sem entrevista visível ou sem autocrítica auditável é inválida para esta skill.
