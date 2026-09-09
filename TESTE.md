# TESTE.md — Rodada completa, sem cortes

Tema de teste: **autenticação/identidade sem terceiros** (diferente do tema final da disciplina, escolhido só para validar a skill). Rodado em Claude Code, 2026-09-09, invocando `SKILL.md`.

## Etapa 1 — Entrevista (pergunta da IA)

> 1. Horizonte temporal: pra que ano você quer projetar os efeitos? (ex: 2028, 2030, 2035)
> 2. Público-alvo: quem vai ler esse mapa? (investidor, dev, gestor de produto, você mesmo...)
> 3. Recorte geográfico: mercado global ou uma região específica?
> 4. Descartes explícitos: tem algo que você já sabe que NÃO quer que o mapa cubra?
> 5. Viés desejado: quer um mapa otimista, pessimista, ou neutro/cético?

## Resposta do usuário (jcsc), literal

> 2030, eu mesmo - gestor de produto e dev, brasil, ferramentas consolidadas ja que queremos inovar no mercado, neutro/cético

(Interpretação aplicada na saída: "descarte explícito" = ferramentas já consolidadas, o que reforça — não substitui — o critério de maturidade da Etapa 2 da skill.)

## Saída gerada (Etapas 2-5, sem edição posterior)

---
tema: Autenticação e identidade digital sem provedores terceirizados
slug: auth-identidade-sem-terceiros
autor_login: jcsc
zona_de_interesse: Segurança e identidade digital, mercado financeiro/fintech brasileiro
data: 2026-09-09
horizonte: 2030
publico: "o próprio autor (dev + gestor de produto)"
recorte_geografico: Brasil
disrupcoes_raiz: 2
efeitos_ordem_1: 4
efeitos_ordem_2: 4
efeitos_ordem_3: 4
tecnologias_citadas: [WebAuthn, Passkeys, DID, Verifiable Credentials, Gov.br, Open Finance, KYC-as-a-service]
fontes: 6
confianca: media
experimento: "protótipo de fluxo de onboarding que aceita credencial verificável Gov.br como alternativa a KYC próprio"
skill_usada: futurizacao-jcsc
publico_ok: false
---

### 1. Resumo

Até 2030, autenticação sem terceiros no Brasil deve deslocar-se de "senha + provedor social" para duas frentes concorrentes: passkeys/WebAuthn como camada de login, e identidade descentralizada ancorada em infraestrutura pública (Gov.br, Open Finance) como camada de verificação de identidade real. Nenhuma das duas está madura — ambas têm debate técnico e regulatório real em curso. O mapa é cético quanto à velocidade: adoção no Brasil historicamente atrasa em relação a EUA/UE, e um dos efeitos gerados (concentração de mercado numa nova camada de integração) sugere que a descentralização pode recriar, por outra via, a centralização que pretendia evitar.

### 2. O tema

Autenticação/identidade "sem terceiros" significa aqui: mecanismos de login e verificação de identidade que não dependem de um provedor de identidade privado centralizado (Auth0, Firebase Auth, Okta, "Login com Google/Facebook" como identidade primária). É relevante para mídia/interação porque redesenha a interface entre usuário e sistema no ponto de maior atrito e maior risco (o login), e porque decisões de identidade digital no Brasil (Gov.br, Pix, Open Finance) já são política pública, não só produto de mercado. Todos os campos da entrevista foram respondidos (sem "tanto faz").

### 3. Onde isso está hoje

Passkeys (WebAuthn) já são suportados por Android, iOS e principais navegadores desde ~2022-2023; bancos e fintechs brasileiras (Nubank, Itaú, entre outros) começaram testes/rollout parcial, mas cobertura ainda não é universal e fluxo de recuperação de conta permanece problema aberto. Do lado público, Gov.br já opera como provedor de login único para serviços federais e é aceito por um número crescente de players privados para KYC; Open Finance Brasil (regulado pelo Bacen) já permite compartilhamento de dados cadastrais entre instituições autorizadas, mas ainda não é usado amplamente como *prova de identidade* para onboarding privado fora do setor financeiro regulado.

### 4. As disrupções-raiz

**Disrupção-raiz 1 — Passkeys/WebAuthn como autenticação primária dominante**

Ainda emergente pelo critério adotado: há adoção real, mas debate técnico genuíno sobre recuperação de conta, portabilidade entre ecossistemas (Apple/Google/Microsoft) e inclusão de usuários sem hardware compatível. Não descartada por maturidade.

**Disrupção-raiz 2 — Identidade descentralizada ancorada em infraestrutura pública (Gov.br/Open Finance)**

Disruptiva: ameaça a estrutura de mercado de KYC-as-a-service privado, não só a técnica usada. Debate regulatório real e em curso (Bacen ainda define escopo do Open Finance ano a ano). Não descartada por maturidade.

**Candidatos descartados por maturidade** (critério aplicado, ver seção 12): OAuth2/OIDC como protocolo de token, JWT como formato de token, bcrypt/argon2 como hashing de senha, "Login social" via Google/Apple como identidade primária, SMS-OTP como segundo fator — todos consolidados, sem debate real de substituição no horizonte de 2030.

### 5. A roda dos futuros

```yaml
roda:
  - disrupcao: Passkeys/WebAuthn como autenticação primária dominante no Brasil
    efeitos:
      - id: e1
        ordem: 1
        efeito: Queda sustentada de phishing baseado em roubo de senha em apps financeiros de alto valor
        sinal: forte
        prazo: 2028
        confianca: media
        efeitos:
          - id: e1.1
            ordem: 2
            efeito: Provedores B2B de proteção anti-phishing/credential-stuffing perdem mercado endereçável no segmento financeiro
            sinal: medio
            prazo: 2029
            confianca: media
            efeitos:
              - id: e1.1.1
                ordem: 3
                efeito: Seguradoras de cyber-risk brasileiras recalibram apólices de instituições financeiras por queda de incidentes de takeover de conta
                sinal: fraco
                prazo: 2031
                confianca: baixa
      - id: e2
        ordem: 1
        efeito: Aumento da exclusão de usuários sem smartphone compatível ou sem biometria funcional no acesso a serviços financeiros essenciais
        sinal: medio
        prazo: 2029
        confianca: media
        efeitos:
          - id: e2.1
            ordem: 2
            efeito: Bacen exige manutenção obrigatória de método de fallback não biométrico para serviços essenciais
            sinal: medio
            prazo: 2030
            confianca: media
            efeitos:
              - id: e2.1.1
                ordem: 3
                efeito: Surge mercado informal de "agentes de autenticação assistida" para usuários vulneráveis gerenciarem passkeys
                sinal: fraco
                prazo: 2031
                confianca: baixa
  - disrupcao: Identidade descentralizada ancorada em Gov.br/Open Finance como alternativa a provedores privados
    efeitos:
      - id: e3
        ordem: 1
        efeito: Fintechs passam a aceitar credencial verificável via Gov.br como prova de identidade em onboarding, reduzindo dependência de KYC pago a terceiros
        sinal: forte
        prazo: 2029
        confianca: media
        efeitos:
          - id: e3.1
            ordem: 2
            efeito: Fornecedores privados de KYC-as-a-service que não integrarem o padrão público perdem posição no mercado brasileiro
            sinal: medio
            prazo: 2030
            confianca: media
            efeitos:
              - id: e3.1.1
                ordem: 3
                efeito: Esses fornecedores deslocam receita de "verificação de identidade" para "detecção de fraude pós-onboarding"
                sinal: fraco
                prazo: 2031
                confianca: baixa
      - id: e4
        ordem: 1
        efeito: Reguladores passam a exigir que apps privados regulados aceitem identidade pública federada como opção obrigatória (não exclusiva)
        sinal: medio
        prazo: 2030
        confianca: media
        efeitos:
          - id: e4.1
            ordem: 2
            efeito: Empresas menores terceirizam a integração multi-padrão de credenciais verificáveis para poucos players de infraestrutura
            sinal: fraco
            prazo: 2031
            confianca: baixa
            efeitos:
              - id: e4.1.1
                ordem: 3
                efeito: Essa camada de integração se torna, na prática, o novo provedor centralizado de identidade — reproduzindo a centralização que a descentralização tentava evitar
                sinal: fraco
                prazo: 2032
                confianca: baixa
```

Em prosa: as duas disrupções convergem para uma tensão comum — ganhos de segurança/soberania tendem a gerar, em 2ª/3ª ordem, novos pontos de concentração de mercado (seja em seguradoras/anti-phishing, seja numa camada de integração multi-padrão). Isso não é ruído do método: é o tipo de achado que a Futures Wheel existe para revelar.

### 6. Sinais fracos e wildcards

- Uma decisão judicial ou da ANPD limitando o uso de biometria facial para autenticação poderia frear passkeys biométricos no Brasil especificamente, mesmo com adoção global crescente.
- Um incidente grave de vazamento de credenciais Gov.br (já houve casos de fraude envolvendo o gov.br em anos anteriores) poderia atrasar anos a confiança do mercado privado em usá-lo como camada de identidade.

### 7. Contra o próprio mapa

**Rebaixamento auditável**: o efeito `e1` foi gerado inicialmente com `confianca: alta` ("queda acentuada de phishing até 2028"). Ao aplicar a Etapa 4, identifiquei que isso é uma extrapolação linear da curva de adoção observada nos EUA/UE, sem evidência de que o Brasil adote passkeys no mesmo ritmo (historicamente o país atrasa ciclos de adoção de autenticação — 2FA bancário, por exemplo, levou mais tempo para virar padrão aqui do que em mercados comparáveis). Rebaixado para `confianca: media`.

**Contradição estrutural exposta pelo próprio mapa**: `e4.1.1` mostra que a busca por identidade descentralizada pode recriar centralização numa camada de integração técnica — um resultado que contraria a premissa inicial da disrupção-raiz 2. Isso não foi suavizado; é mantido explicitamente como o achado mais cético do mapa.

**Viés pedido (neutro/cético) aplicado**: os prazos de 2ª e 3ª ordem foram deliberadamente mantidos conservadores (sinal fraco/médio, confiança baixa/média), evitando a tentação de vender as duas disrupções como certezas.

### 8. O que a máquina errou

**Erro real identificado nesta rodada**: o horizonte pedido na entrevista foi 2030, mas quatro efeitos de 3ª ordem (`e1.1.1`, `e2.1.1`, `e3.1.1`, `e4.1.1`) foram gerados com `prazo` de 2031 ou 2032 — além do horizonte solicitado. Isso não foi corrigido silenciosamente nesta saída (esta é a transcrição sem edição); ver `DUVIDAS.md` para como isso foi percebido e o que fazer a respeito.

**Incerteza declarada, não erro corrigido**: a citação de Dedehayir & Steinert (2016) sobre críticas ao Hype Cycle, usada em `ESTUDO.md`, vem de memória de literatura acadêmica e não foi verificada por busca ao vivo nesta sessão — mantida por ter alta plausibilidade, mas marcada como não confirmada na seção 11.

### 9. Três cenários para 2030

**Provável**: passkeys viram opção default (não única) em apps financeiros de médio/grande porte; Gov.br cresce como camada de KYC auxiliar, mas KYC privado continua dominante fora do setor regulado; nenhuma das duas disrupções "venceu" totalmente.

**Desejável**: passkeys com fallback inclusivo bem resolvido (sem exclusão de usuários vulneráveis) coexistindo com identidade pública federada auditável e sob controle do próprio cidadão (não só das fintechs que a consomem).

**Indesejável**: adoção de passkeys sem fallback adequado amplia exclusão digital de idosos/zona rural em serviços essenciais, enquanto a integração de identidade pública se concentra em 1-2 fornecedores privados de infraestrutura, recriando a centralização que o modelo público tentava evitar (efeito `e4.1.1` realizado).

### 10. O experimento

Construir um protótipo mínimo de fluxo de onboarding (ex.: para o Bankinho) que aceite credencial verificável Gov.br como alternativa ao KYC próprio, medindo taxa de conclusão e taxa de abandono comparadas ao fluxo atual — isso testa diretamente a disrupção-raiz 2 (`e3`) com dado real, não especulação.

### 11. Fontes

1. W3C, "Web Authentication (WebAuthn) Level 2" — especificação técnica oficial. Alta confiabilidade.
2. FIDO Alliance, relatórios públicos de adoção de passkeys — média-alta confiabilidade (organização de padronização com interesse em promover adoção; vieses de otimismo possíveis).
3. Banco Central do Brasil, documentação pública do Open Finance Brasil — alta confiabilidade (fonte regulatória oficial).
4. Gov.br, documentação do login único federal — alta confiabilidade (fonte oficial).
5. Dedehayir, O. & Steinert, M. (2016), "The Hype Cycle model: A review and future directions" — média confiabilidade: citação de memória, **não verificada por busca ao vivo nesta sessão**.
6. Base de dados própria coletada na Entrega 2 da Hiper Deep Research (`Hiper Deep Research 2/dados/documento_500.md`, 500 itens de auth/identidade) — alta confiabilidade (coletada e documentada nesta própria disciplina, com metodologia registrada).

### 12. Anexo — levantamento bruto

Candidatos avaliados e descartados na Etapa 2 por maturidade (critério: padrão de mercado consolidado, sem debate real de substituição): OAuth2/OIDC, JWT, bcrypt/argon2, "Login com Google/Apple" como identidade primária, SMS-OTP como segundo fator, TOTP (Google Authenticator/Authy) como segundo fator padrão corporativo.

Candidato considerado e descartado por escopo (não por maturidade): autenticação biométrica comportamental contínua (risk-based continuous auth) — já em uso real em fraud-detection bancário, mas manter no mapa exigiria uma terceira disrupção-raiz e o tempo desta rodada de teste não permitiu tratá-la com o mesmo rigor.
