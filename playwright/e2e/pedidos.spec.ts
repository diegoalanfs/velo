import { test } from '@playwright/test'

import { Navbar } from '../support/components/Navbar'
import { generateOrderCode } from '../support/helpers'
import { LandingPage } from '../support/pages/LandingPage'
import { OrderLockupPage, OrderDetails } from '../support/pages/OrderLockupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  let orderLookupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {
    await new LandingPage(page).goto()
    await new Navbar(page).orderlockupLink()

    orderLookupPage = new OrderLockupPage(page)
    await new OrderLockupPage(page).validatePageLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

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

    await orderLookupPage.searchOrder(order.number)

    await orderLookupPage.validateOrderDetails(order)
    await orderLookupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

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

    await orderLookupPage.searchOrder(order.number)

    await orderLookupPage.validateOrderDetails(order)
    await orderLookupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

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

    await orderLookupPage.searchOrder(order.number)
    await orderLookupPage.validateOrderDetails(order)
    await orderLookupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    const order = generateOrderCode()
    await orderLookupPage.searchOrder(order)
    await orderLookupPage.validateNotFound()
  })

  test('deve exibir mensagem quando o pedido em qualquer formato fornecido não é encontrado', async ({ page }) => {
    await orderLookupPage.searchOrder('ABC123')
    await orderLookupPage.validateNotFound()
  })
})