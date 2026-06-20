import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'
import { OrderLockupPage } from '../support/pages/OrderLockupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

    test.beforeEach(async ({ page }) => {
        // Arrange
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {

        // Test Data
        const order = {
            status: 'APROVADO' as const,
            number: 'VLO-HJO7UV',
            color: 'Lunar White',
            wheels: 'aero Wheels',
            customer: {
                name: 'Alan Ferreira',
                email: 'alan@velo.dev',
            },
            payment: 'À Vista'
        }

        // Act  
        // await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
        // await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        const orderLookupPage = new OrderLockupPage(page)
        await orderLookupPage.searchOrder(order.number)

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    
        await orderLookupPage.validateStatusBadge(order.status)

    })

    test('deve consultar um pedido reprovado', async ({ page }) => {

        // Test Data
        const order = {
            status: 'REPROVADO' as const,
            number: 'VLO-T45VMG',
            color: 'Midnight Black',
            wheels: 'sport Wheels',
            customer: {
                name: 'QA Tester',
                email: 'qa@velo.dev',
            },
            payment: 'À Vista'
        }

        // Act  
        // await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
        // await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        const orderLookupPage = new OrderLockupPage(page)
        await orderLookupPage.searchOrder(order.number)

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      await orderLookupPage.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido em analise', async ({ page }) => {

        // Test Data
        const order = {
            status: 'EM_ANALISE' as const,
            number: 'VLO-ID79H5',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Diego Alan',
                email: 'diego@velo.dev',
            },
            payment: 'À Vista'
        }

        // Act  
        // await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
        // await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        const orderLookupPage = new OrderLockupPage(page)
        await orderLookupPage.searchOrder(order.number)

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      await orderLookupPage.validateStatusBadge(order.status)
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

        const order = generateOrderCode()

        // await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
        // await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        const orderLookupPage = new OrderLockupPage(page)
        await orderLookupPage.searchOrder(order)


        await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)

    })
})