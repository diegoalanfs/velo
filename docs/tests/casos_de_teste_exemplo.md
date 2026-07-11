# Documento de Casos de Teste - Velô Sprint

Este documento apresenta a especificação dos Casos de Teste (CT) funcionais (caixa-preta) para o sistema **Velô Sprint - Configurador de Veículo Elétrico**, mapeados a partir da análise da base de código do sistema.

---

## 1. Módulo: Landing Page

### CT01 - Navegação para o Configurador via Hero CTA (Landing Page)

#### Objetivo
Validar que o usuário comum consegue acessar a página de configuração a partir do botão principal da seção Hero na Landing Page.

#### Pré-Condições
- O usuário deve estar na página inicial (Landing Page) `/`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar no botão "Configure Agora" com `data-testid="hero-cta-primary"` | O sistema deve redirecionar o usuário para a página de configuração `/configure`. |

#### Resultados Esperados
- O usuário é redirecionado para a URL `/configure`, e a tela do configurador do veículo (com o palco em 3D/imagem e o painel de opções) é renderizada com sucesso.

#### Critérios de Aceitação
- A URL atual deve ser correspondente a `/configure`.
- A seção de palco do carro (`CarStage`) e o painel lateral de customização (`ConfigPanel`) devem estar visíveis na tela.

---

### CT02 - Navegação para o Configurador via Cabeçalho (Landing Page)

#### Objetivo
Validar que o usuário comum consegue navegar para a página de configuração utilizando o botão do cabeçalho da página (desktop).

#### Pré-Condições
- O usuário deve estar na página inicial (Landing Page) `/`.
- A largura de tela do navegador deve ser maior que 768px (modo desktop).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar no botão "Configure o Seu" localizado no canto superior direito do cabeçalho | O sistema deve processar o clique e carregar a rota `/configure`. |

#### Resultados Esperados
- O usuário é redirecionado para a tela de configuração `/configure`.

#### Critérios de Aceitação
- O redirecionamento ocorre de forma instantânea sem falhas visuais.
- A URL de destino final é `/configure`.

---

### CT03 - Responsividade e Navegação do Cabeçalho em Dispositivo Móvel

#### Objetivo
Validar o comportamento do menu hambúrguer em dispositivos móveis, bem como a navegação através dele.

#### Pré-Condições
- O usuário deve estar na página inicial (Landing Page) `/`.
- A largura da tela do navegador deve ser configurada para menor que 768px (modo mobile/celular).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar no botão de menu (ícone de hambúrguer) com `data-testid="header-menu-toggle"` | O menu móvel deve se expandir verticalmente com uma animação suave, exibindo os links disponíveis. |
| 2  | Clicar no link "Consultar Pedido" dentro do menu expandido | O menu móvel se fecha e o usuário é redirecionado para a rota `/lookup`. |

#### Resultados Esperados
- O menu hambúrguer abre e fecha corretamente. Ao clicar no link de consulta, o usuário é levado à tela de consulta de pedidos.

#### Critérios de Aceitação
- O menu expandido deve conter as opções "Consultar Pedido" e o botão "Configure o Seu".
- O redirecionamento leva à URL `/lookup`.

---

## 2. Módulo: Configurador de Veículo

### CT04 - Seleção de Cor Externa (Configurador)

#### Objetivo
Validar que o usuário consegue alterar a cor do carro no painel lateral e que a visualização do carro e o resumo são atualizados adequadamente.

#### Pré-Condições
- O usuário deve estar na página do Configurador `/configure`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar na cor "Midnight Black" usando a amostra de cor com `data-testid="color-option-midnight-black"` | A amostra de cor deve mostrar a borda de seleção ativa e a imagem do carro na esquerda deve atualizar para a versão preta. |
| 2  | Clicar na cor "Lunar White" usando a amostra de cor com `data-testid="color-option-lunar-white"` | A amostra de cor "Lunar White" fica ativa e a imagem do carro na esquerda atualiza para a versão branca. |

#### Resultados Esperados
- As opções de cores mudam as imagens e os estados no store local do cliente.

#### Critérios de Aceitação
- Ao selecionar uma cor, o estado `configuration.exteriorColor` no store é modificado.
- A imagem exibida no palco do carro reflete exatamente a cor selecionada.

---

### CT05 - Alteração de Preço ao Selecionar Rodas "Sport" (Configurador)

#### Objetivo
Validar que a escolha de rodas do tipo "Sport" adiciona o acréscimo de R$ 2.000 ao preço do carro.

#### Pré-Condições
- O usuário deve estar na página do Configurador `/configure`.
- O carro deve estar com a configuração padrão inicial (Preço Base: R$ 40.000,00).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar na opção de rodas "Sport Wheels" com `data-testid="wheel-option-sport"` | A interface deve selecionar visualmente as rodas Sport e atualizar o preço final do veículo no rodapé. |

#### Resultados Esperados
- O preço de venda exibido no rodapé da página deve aumentar dinamicamente para R$ 42.000,00.

#### Critérios de Aceitação
- O preço final no painel (`data-testid="total-price"`) deve mostrar "R$ 42.000,00".
- O estado de rodas do veículo no store passa a ser `'sport'`.

---

### CT06 - Adição de Recursos Opcionais e Cálculo Dinâmico de Preço (Configurador)

#### Objetivo
Validar o acréscimo de preços dos itens opcionais "Precision Park" e "Flux Capacitor" cumulativamente ao valor total do carro.

#### Pré-Condições
- O usuário deve estar na página do Configurador `/configure` (preço inicial em R$ 40.000,00).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar no checkbox de "Precision Park" (`data-testid="opt-precision-park"`) | O checkbox é marcado e o preço total é acrescido de R$ 5.500,00. Preço vai para R$ 45.500,00. |
| 2  | Clicar no checkbox de "Flux Capacitor" (`data-testid="opt-flux-capacitor"`) | O checkbox é marcado e o preço total recebe mais R$ 5.000,00. Preço final vai para R$ 50.500,00. |
| 3  | Desmarcar o checkbox de "Precision Park" (`data-testid="opt-precision-park"`) | O checkbox é limpo e o preço total deduz R$ 5.500,00, retornando para R$ 45.000,00. |

#### Resultados Esperados
- A precificação dinamicamente reflete cada seleção e deseleção instantaneamente no painel e na memória do configurador.

#### Critérios de Aceitação
- O preço total no elemento `data-testid="total-price"` reflete a soma correta a cada passo:
  - Passo 1: `R$ 45.500,00`
  - Passo 2: `R$ 50.500,00`
  - Passo 3: `R$ 45.000,00`

---

## 3. Módulo: Checkout/Pedido

### CT07 - Validação de Campos Obrigatórios e Mensagens de Erro (Checkout)

#### Objetivo
Validar que o formulário de Checkout impede a submissão do pedido se houver dados obrigatórios vazios ou formatados de forma inválida.

#### Pré-Condições
- O usuário configurou um veículo e clicou no botão "Monte o Seu".
- O usuário está na tela de Checkout `/order`.
- Os campos do formulário devem estar inicialmente vazios.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar no botão "Confirmar Pedido" com `data-testid="checkout-submit"` | O formulário não é enviado e mensagens de erro aparecem abaixo de todos os campos obrigatórios vazios. |
| 2  | Digitar "A" no campo "Nome" e tentar submeter | O erro do campo "Nome" deve indicar que são necessários pelo menos 2 caracteres. |
| 3  | Digitar um e-mail inválido (ex: `cliente_teste.com`) e tentar submeter | O campo "Email" exibe a mensagem de formato de e-mail inválido. |

#### Resultados Esperados
- O sistema bloqueia a submissão do formulário de checkout e indica visualmente os campos com erros, auxiliando na correção.

#### Critérios de Aceitação
- A tela permanece no endereço `/order`.
- As seguintes mensagens de erro de validação devem estar visíveis:
  - Nome: `Nome deve ter pelo menos 2 caracteres`
  - Sobrenome: `Sobrenome deve ter pelo menos 2 caracteres`
  - Email: `Email inválido`
  - Telefone: `Telefone inválido`
  - CPF: `CPF inválido`
  - Loja para Retirada: `Selecione uma loja`
  - Termos: `Aceite os termos`

---

### CT08 - Máscaras e Formatação de Telefone e CPF (Checkout)

#### Objetivo
Validar que os campos de Telefone e CPF aplicam automaticamente as máscaras e padrões numéricos definidos.

#### Pré-Condições
- O usuário está na tela de Checkout `/order`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar no campo "Telefone" e digitar sequencialmente "11988887777" | Os números digitados devem receber a máscara de telefone brasileira enquanto são digitados. |
| 2  | Clicar no campo "CPF" e digitar sequencialmente "12345678909" | Os números digitados devem receber a máscara de CPF. |

#### Resultados Esperados
- Os valores inseridos nos inputs são exibidos de forma formatada.

#### Critérios de Aceitação
- O valor visível no input "Telefone" (`data-testid="checkout-phone"`) é `(11) 98888-7777`.
- O valor visível no input "CPF" (`data-testid="checkout-cpf"`) é `123.456.789-09`.

---

### CT09 - Cálculo de Financiamento Sem Entrada (Checkout)

#### Objetivo
Validar o cálculo das parcelas mensais e o valor total do pedido com a opção de financiamento sem entrada definida.

#### Pré-Condições
- O veículo configurado tem preço de R$ 40.000,00.
- O usuário está na tela de Checkout `/order`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar na forma de pagamento "Financiamento" (`data-testid="payment-financiamento"`) | A seção expande exibindo os cálculos dinâmicos de financiamento e o campo para valor de entrada. |
| 2  | Garantir que o campo de Entrada (`data-testid="input-entry-value"`) está limpo ou contendo `0` | Os campos de resumo abaixo do formulário calculam os juros baseados no valor integral de R$ 40.000,00. |

#### Resultados Esperados
- O sistema calcula e exibe as informações financeiras corretas com base na taxa de juros fixa aplicada de 2% sobre o montante financiado total dividida em 12 vezes.

#### Critérios de Aceitação
- O valor total financiado exibido no bloco de detalhes deve ser `R$ 40.800,00` (calculado por `(40000 / 12) * 1.02 * 12`).
- O valor da parcela mensal é `R$ 3.400,00`.
- O total geral de pagamento no resumo del pedido (`data-testid="summary-total-price"`) exibe `R$ 40.800,00`.

---

### CT10 - Cálculo de Financiamento Com Entrada Parcial (Checkout)

#### Objetivo
Validar o recálculo do valor de financiamento e parcelas quando o cliente preenche um valor de entrada no checkout.

#### Pré-Condições
- O veículo configurado tem preço de R$ 40.000,00.
- O usuário está na tela de Checkout `/order`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar la forma de pagamento "Financiamento" | A seção de detalhes do financiamento é apresentada. |
| 2  | Inserir `10000` no input "Valor da Entrada" com `data-testid="input-entry-value"` | O sistema calcula o valor restante a ser financiado (R$ 30.000,00). As parcelas e juros são recalculados sobre R$ 30.000,00. |

#### Resultados Esperados
- O valor financiado cai para R$ 30.000,00 + 2% de juros flat (R$ 30.600,00). A parcela é calculada em R$ 2.550,00. O total geral da transação passa a ser R$ 40.600,00 (R$ 10.000,00 de entrada + R$ 30.600,00 financiados).

#### Critérios de Aceitação
- O valor a financiar indicado na tela é `R$ 30.000,00`.
- A parcela (12x) indicada é `R$ 2.550,00`.
- O total geral exibido em `data-testid="summary-total-price"` é `R$ 40.600,00`.

---

## 4. Módulo: Análise de Crédito Automática

### CT11 - Análise de Crédito Automática: Score Alto (Aprovação)

#### Objetivo
Validar que a análise de crédito aprova automaticamente o pedido parcelado se o score do CPF simulado for maior que 700.

#### Pré-Condições
- O usuário está na tela de Checkout `/order`.
- Utilizar um CPF simulado no formulário que retorne score maior que 700 (ex: 750).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados pessoais válidos e informar o CPF de score alto | O formulário aceita a digitação. |
| 2  | Selecionar forma de pagamento "Financiamento" | O modo de financiamento é ativado. |
| 3  | Marcar o checkbox dos termos de uso e clicar em "Confirmar Pedido" (`data-testid="checkout-submit"`) | O sistema faz a chamada de análise de crédito à Edge Function do Supabase e processa a aprovação. |

#### Resultados Esperados
- O pedido é salvo com status `APROVADO`. O usuário é redirecionado para a tela de confirmação `/success`.

#### Critérios de Aceitação
- A tela final deve exibir o título "Pedido Aprovado!" (`data-testid="success-status"`).
- O número do pedido gerado é gravado no banco de dados com status `APROVADO`.

---

### CT12 - Análise de Crédito Automática: Score Médio (Em Análise)

#### Objetivo
Validar que o pedido é classificado como status `EM_ANALISE` caso o score de crédito esteja entre 501 e 700.

#### Pré-Condições
- O usuário está na tela de Checkout `/order`.
- Utilizar um CPF simulado no formulário que retorne score entre 501 e 700 (ex: 600).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados pessoais válidos e informar o CPF de score médio | Dados aceitos. |
| 2  | Selecionar forma de pagamento "Financiamento" | O financiamento é ativado. |
| 3  | Aceitar termos e clicar em "Confirmar Pedido" | O sistema consome a Edge Function de análise de crédito e avalia o score. |

#### Resultados Esperados
- O pedido é criado no banco de dados Supabase com a coluna `status` contendo o valor `'EM_ANALISE'`. 

> [!WARNING]
> **Nota de Validação (Divergência entre UI e Banco)**:
> Devido ao bug no arquivo `Success.tsx`, a interface de confirmação exibirá "Crédito Reprovado" para o status `EM_ANALISE`. O comportamento esperado do banco de dados (gravação correta do status `EM_ANALISE`) deve ser verificado diretamente ou via tela de consulta `/lookup`.

#### Critérios de Aceitação
- O registro inserido no banco de dados possui o status `EM_ANALISE`.
- Ao buscar o pedido em `/lookup`, o badge exibe o status de `EM_ANALISE` em cor âmbar (amarela).

---

### CT13 - Análise de Crédito Automática: Score Baixo (Reprovação)

#### Objetivo
Validar que a análise de crédito reprova automaticamente o pedido se o score do CPF simulado for menor ou igual a 500.

#### Pré-Condições
- O usuário está na tela de Checkout `/order`.
- Utilizar um CPF simulado no formulário que retorne score inferior ou igual a 500 (ex: 400).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados pessoais válidos e informar o CPF de score baixo | Dados aceitos. |
| 2  | Selecionar forma de pagamento "Financiamento" com entrada R$ 0 | O financiamento é ativado. |
| 3  | Aceitar termos e clicar em "Confirmar Pedido" | O sistema chama a Edge Function de crédito, que avalia e reprova a solicitação. |

#### Resultados Esperados
- O pedido é gravado no banco de dados com o status `REPROVADO`. O usuário é redirecionado para a tela `/success` com indicação de reprovação de crédito.

#### Critérios de Aceitação
- A tela de confirmação exibe o título "Crédito Reprovado" com a cor vermelha destrutiva (`data-testid="success-status"`).
- O número do pedido gerado é gravado com status `REPROVADO` no banco.

---

### CT14 - Exceção de Entrada Alta (Entrada >= 50% com Score Baixo)

#### Objetivo
Validar a regra de negócio que aprova o crédito automaticamente se a entrada for maior ou igual a 50% do valor total do veículo, mesmo se o score do cliente for reprovado (<= 500).

#### Pré-Condições
- O veículo configurado tem preço total de R$ 40.000,00.
- O usuário está na tela de Checkout `/order`.
- Utilizar um CPF com score reprovado (ex: 350).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados do formulário e informar o CPF de score baixo | Dados aceitos. |
| 2  | Selecionar "Financiamento" | O financiamento é ativado. |
| 3  | Inserir R$ 20.000,00 (exatamente 50% do valor) no campo de Entrada | O campo registra o valor. |
| 4  | Aceitar os termos e clicar em "Confirmar Pedido" | O sistema chama a Edge Function e avalia a regra especial de entrada alta. |

#### Resultados Esperados
- O pedido é aprovado com sucesso, contornando a reprovação do score. O usuário é redirecionado para a tela de aprovação.

#### Critérios de Aceitação
- A tela final deve exibir o título "Pedido Aprovado!" (`data-testid="success-status"`).
- O registro correspondente no Supabase é salvo com o status `APROVADO`.

---

### CT15 - Bug de Borda: Entrada Alta com Score de Exatamente 700

#### Objetivo
Registrar e testar a falha de comportamento do sistema quando o Score retornado da API é exatamente 700 e a Entrada é igual ou maior que 50% (Bug da ordem das condicionais).

#### Pré-Condições
- O veículo configurado tem preço de R$ 40.000,00.
- O usuário está na tela de Checkout `/order`.
- Utilizar um CPF configurado para retornar exatamente Score 700.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados do formulário e informar o CPF de score igual a 700 | Dados aceitos. |
| 2  | Selecionar "Financiamento" e definir entrada de R$ 20.000,00 (50%) | O sistema calcula os dados de financiamento. |
| 3  | Aceitar termos e clicar em "Confirmar Pedido" | O sistema processa o pedido. |

#### Resultados Esperados
- O sistema define o status do pedido como `EM_ANALISE` porque a primeira condição do código avalia apenas scores estritamente menores que 700 (`score < 700`), pulando a regra de entrada para o score 700 exato.

#### Critérios de Aceitação
- O pedido é salvo no banco de dados com status `EM_ANALISE` em vez de `APROVADO`. (Esse caso de teste documenta um desvio da regra de negócio que prevê aprovação automática para qualquer entrada >= 50%).

---

## 5. Módulo: Confirmação

### CT16 - Exibição de Resumo e Acesso à Consulta (Confirmação)

#### Objetivo
Validar que a tela de Confirmação exibe as informações corretas do pedido e fornece as ações corretas de navegação.

#### Pré-Condições
- Um pedido válido acaba de ser finalizado e o usuário é redirecionado para `/success`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Visualizar os dados apresentados na tela | O sistema deve exibir o número do pedido (`data-testid="order-id"`), os dados do cliente, modelo e o resumo financeiro. |
| 2  | Clicar no botão "Consultar Pedido" com `data-testid="goto-consultar"` | O sistema deve redirecionar o usuário para a página de consulta de pedidos `/lookup`. |

#### Resultados Esperados
- A tela apresenta o resumo fiel do pedido efetuado e a navegação funciona corretamente.

#### Critérios de Aceitação
- A tela exibe o número correto do pedido (ex: `VLO-XXXXXX`).
- Ao clicar no botão de consulta, a URL muda para `/lookup`.

---

## 6. Módulo: Consulta de Pedidos

### CT17 - Consulta de Pedido Aprovado (Order Lookup)

#### Objetivo
Validar que a busca por um número de pedido válido e aprovado carrega corretamente os detalhes e o status APROVADO.

#### Pré-Condições
- O usuário está na tela de Consulta de Pedido `/lookup`.
- Deve existir no banco um pedido cadastrado sob o número a ser consultado com o status `APROVADO` (ex: `VLO-HJO7UV`).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Digitar o código do pedido `VLO-HJO7UV` no campo "Número do Pedido" | O input aceita a digitação. |
| 2  | Clicar no botão "Buscar Pedido" | O sistema busca os dados no Supabase e carrega o painel de resultados. |

#### Resultados Esperados
- Os detalhes do pedido aparecem na tela, exibindo o badge verde com o texto "APROVADO".

#### Critérios de Aceitação
- A tela exibe um elemento com `data-testid="order-result-VLO-HJO7UV"`.
- O badge de status possui a classe `bg-green-100` e o texto "APROVADO".
- O nome do cliente, modelo do veículo e preço correspondem exatamente ao pedido inserido no banco.

---

### CT18 - Consulta de Pedido Inexistente (Order Lookup)

#### Objetivo
Validar o tratamento de erro e exibição de mensagem apropriada ao buscar por um número de pedido inexistente no banco.

#### Pré-Condições
- O usuário está na tela de Consulta de Pedido `/lookup`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Digitar um código de pedido inexistente (ex: `VLO-INVALI`) | O input aceita a digitação. |
| 2  | Clicar no botão "Buscar Pedido" | O sistema realiza a busca, não encontra resultados e apresenta erro. |

#### Resultados Esperados
- O sistema renderiza uma mensagem clara informando que o pedido não foi localizado.

#### Critérios de Aceitação
- É exibido o bloco com o título "Pedido não encontrado" e o parágrafo "Verifique o número do pedido e tente novamente".
- Não é exibida nenhuma caixa com detalhes de pedidos anteriores.

---

### CT19 - Bloqueio de Busca Vazia ou Apenas com Espaços (Order Lookup)

#### Objetivo
Validar que o botão de busca permanece desativado caso o campo do número do pedido esteja vazio ou contenha apenas caracteres invisíveis/espaços.

#### Pré-Condições
- O usuário está na tela de Consulta de Pedido `/lookup`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Visualizar o botão "Buscar Pedido" com o campo de texto vazio | O botão "Buscar Pedido" deve estar desabilitado para cliques. |
| 2  | Digitar "      " (apenas espaços em branco) no input e observar o botão | O botão deve permanecer desabilitado. |

#### Resultados Esperados
- O usuário fica impossibilitado de submeter o formulário sem prover uma string de busca válida.

#### Critérios de Aceitação
- O botão "Buscar Pedido" possui o atributo `disabled` em ambos os passos.
