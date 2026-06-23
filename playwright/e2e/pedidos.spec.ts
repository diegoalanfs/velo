import { expect, test } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import { OrderDetails } from '../support/actions/orderLockupActions'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    await app.orderLockup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {

    // Test Data
    const order: OrderDetails = {
      status: 'APROVADO',
      number: 'VLO-HJO7UV',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Alan Ferreira',
        email: 'alan@velo.dev',
      },
      payment: 'À Vista'
    }

    await app.orderLockup.searchOrder(order.number)

    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ app }) => {

    // Test Data
    const order: OrderDetails = {
      status: 'REPROVADO',
      number: 'VLO-T45VMG',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'QA Tester',
        email: 'qa@velo.dev',
      },
      payment: 'À Vista'
    }

    await app.orderLockup.searchOrder(order.number)

    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {

    // Test Data
    const order: OrderDetails = {
      status: 'EM_ANALISE',
      number: 'VLO-ID79H5',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Diego Alan',
        email: 'diego@velo.dev',
      },
      payment: 'À Vista'
    }

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()
    await app.orderLockup.searchOrder(order)
    await app.orderLockup.validateNotFound()
  })

  test('deve exibir mensagem quando o pedido em qualquer formato fornecido não é encontrado', async ({ app }) => {
    await app.orderLockup.searchOrder('ABC123')
    await app.orderLockup.validateNotFound()
  })

  test('deve manter o botão de busca desabilitado com campo vazio ou apenas espaços', async ({app, page}) =>{
    const button = app.orderLockup.elements.searchButton
    await expect(button).toBeDisabled()

    await app.orderLockup.elements.orderInput.fill('        ')
    await expect(button).toBeDisabled()
  })
})
