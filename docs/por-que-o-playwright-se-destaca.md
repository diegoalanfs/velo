# Por que o Playwright se destaca

---

## Eu errei por anos sem saber que estava errando

Por muito tempo, eu avaliava ferramentas de automação pelo que elas faziam. Nunca parei para pensar em *como* elas faziam.

Escolhia com base no que a maioria usava, no que a empresa já tinha, no que aparecia primeiro nas buscas. Selenium? Funciona. Cypress? Moderno, todo mundo fala bem. Pronto, decisão tomada.

Foi só quando entrei a fundo na arquitetura do Playwright que percebi o quanto essa mentalidade me custou — em horas investigando testes instáveis, em pipelines lentos, em reuniões explicando por que "passou ontem mas falhou hoje".

Não estava escolhendo ferramentas. Estava aceitando problemas sem saber que eles tinham solução.

---

## O que ninguém explica quando você começa

Ninguém te conta que a ferramenta de teste se comunica com o navegador de formas completamente diferentes — e que essa diferença muda tudo.

O Selenium abre uma nova conexão HTTP para *cada comando* que envia ao navegador. Clicou num botão: nova conexão. Preencheu um campo: nova conexão. Verificou se um elemento existe: nova conexão. É como se você precisasse ligar e desligar o telefone a cada frase de uma conversa.

O Playwright faz diferente: abre uma conexão WebSocket única com o navegador e mantém esse canal aberto. Os comandos fluem por ele, e o navegador responde com eventos em tempo real. É uma conversa contínua, não um vaivém de chamadas.

Parece detalhe. Na prática, essa diferença se traduz em:

- Testes que terminam em 4 minutos no Playwright contra 15 minutos no Selenium para a mesma suíte
- Até 80% menos testes instáveis (flaky tests)
- Auto-waiting que realmente funciona — porque ele escuta eventos do navegador, não fica adivinhando quando algo ficou pronto

---

## O flaky test que me fez perder uma tarde

Lembro de um teste específico que vivia quebrando em CI, mas passava na minha máquina. O clássico.

Passei horas adicionando `waitForTimeout`, ajustando timeouts, tentando reproduzir localmente. No fim, o problema era simples: o Selenium não sabia que a animação de carregamento ainda estava rodando. Ele enviou o próximo comando antes da página estar pronta. Sem como saber. Sem como avisar.

Com o Playwright, esse tipo de problema praticamente desapareceu. O auto-waiting não é um `sleep()` glorificado — ele usa os próprios eventos internos do navegador (via Chrome DevTools Protocol) para saber exatamente quando um elemento está visível, estável, interagível. Não há chute. Há comunicação real.

```typescript
// Isso aqui parece simples. Por baixo, é sofisticado.
await expect(page.getByTestId('order-result-status')).toBeVisible()
```

Essa linha não fica em loop verificando se o elemento apareceu. Ela recebe uma notificação do próprio navegador dizendo: "pronto, pode continuar". A diferença de mentalidade é enorme.

---

## Cypress: eu gostava, mas tinha um teto invisível

Fui fã do Cypress por um tempo. Interface bonita, feedback rápido, aquele time-travel debugging que parece mágica. Para projetos menores, ele entrega muito.

O problema aparece quando o sistema cresce.

Fluxos com OAuth? O Cypress trava em iframes cross-origin. Múltiplas abas? Sem suporte nativo. Paralelização? Existe, mas é paga — você precisa do Cypress Cloud para rodar testes em paralelo de verdade.

E tudo isso não é bug. É arquitetura. O Cypress roda *dentro* do navegador, o que dá acesso direto ao DOM mas impõe as mesmas restrições de segurança que o próprio navegador aplica. Não tem como contornar sem sair do modelo.

Percebi que tinha chegado no teto quando comecei a fazer malabarismos para testar coisas que deveriam ser simples. Esse é o sinal.

---

## O que mudou na minha cabeça (não só na minha stack)

A maior mudança não foi técnica. Foi de perspectiva.

Antes, eu pensava: *"preciso automatizar esse fluxo, qual ferramenta uso?"*

Agora penso: *"qual arquitetura sustenta o crescimento desse projeto sem virar dívida técnica?"*

São perguntas diferentes. A segunda leva a decisões melhores.

O Playwright não é superior porque tem uma API mais bonita ou porque a Microsoft está por trás. Ele se destaca porque foi projetado a partir de uma premissa mais sólida: comunicação bidirecional e persistente com o navegador, sem as limitações de execução in-browser e sem o overhead de protocolo HTTP por comando.

Isso resulta em:

- **Performance real em CI/CD** — não só nos benchmarks, mas no dia a dia de quem roda centenas de testes por dia
- **Estabilidade que não depende de você calibrar sleeps** — o navegador avisa quando está pronto
- **Escalabilidade sem pagar a mais por isso** — paralelização nativa, múltiplos navegadores, multi-aba, tudo incluso

---

## Uma coisa que aprendi sobre ser QA

Saber *usar* uma ferramenta é o mínimo. Qualquer pessoa com um tutorial de tarde aprende a escrever um `page.click()`.

O que diferencia um QA sênior é entender *por que* a ferramenta funciona daquele jeito — e o que isso implica para o projeto a longo prazo.

Quando você consegue explicar para o time de engenharia que a migração para Playwright vai reduzir o tempo de pipeline em X minutos e diminuir os falsos positivos que estão travando o deploy, você para de ser "a pessoa que escreve os testes" e começa a ser alguém com voz nas decisões de arquitetura.

Esse é o movimento que vale a pena fazer.

---

## Referências

1. PAPITO, F. *Por que o Playwright se destaca?* Especialização em Automação de Testes com Playwright e IA. Disponível em: https://hackmd.io/@fernandopapito/por-que-o-playwright-se-destaca
2. Microsoft. *Playwright Documentation*. Disponível em: https://playwright.dev/docs/intro
3. W3C. *WebDriver Specification*. Disponível em: https://www.w3.org/TR/webdriver/
4. Chrome DevTools Protocol. *CDP Documentation*. Google Chrome. Disponível em: https://chromedevtools.github.io/devtools-protocol/
5. Cypress. *How Cypress Works*. Disponível em: https://docs.cypress.io/guides/overview/why-cypress

---

*#AutomatizAi*