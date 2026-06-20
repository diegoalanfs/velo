import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'


//AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

    test.beforeEach(async ({ page }) => {
        //Arrange
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

        //Act
        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {

        //Test Data
        // const orderId = 'VLO-HJO7UV'
        const order = {
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

        //Act
        //   await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-HJO7UV')
        await page.getByLabel('Número do Pedido').fill(`${order.number}`)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        //Assert
        // const pedidoHeader = page
        //     .getByText('Pedido', { exact: true })
        //     .locator('..')

        // const statusHeader = page
        //     .locator('svg[class*="circle-check"]')
        //     .locator('..')

        // await expect(pedidoHeader).toBeVisible({ timeout: 10_000 })
        // await expect(page.getByText(orderId, { exact: true })).toBeVisible()
        // await expect(pedidoHeader).toContainText(orderId)
        // await expect(page.getByText('APROVADO', { exact: true })).toBeVisible()
        // await expect(statusHeader).toContainText('APROVADO')

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
            `)

        const statusBadge = page.getByRole('status').filter({ hasText: 'APROVADO' })

        await expect(statusBadge).toHaveClass(/bg-green-100/)
        await expect(statusBadge).toHaveClass(/text-green-70/)

        const statusIcon = statusBadge.locator('svg')
        await expect(statusIcon).toHaveClass(/circle-check/)

    })

    test('deve consultar um pedido reprovado', async ({ page }) => {

        //Test Data
        const order = {
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

        //Act
        //   await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-HJO7UV')
        await page.getByLabel('Número do Pedido').fill(`${order.number}`)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        //Assert
        // const pedidoHeader = page
        //     .getByText('Pedido', { exact: true })
        //     .locator('..')

        // const statusHeader = page
        //     .locator('svg[class*="circle-check"]')
        //     .locator('..')

        // await expect(pedidoHeader).toBeVisible({ timeout: 10_000 })
        // await expect(page.getByText(orderId, { exact: true })).toBeVisible()
        // await expect(pedidoHeader).toContainText(orderId)
        // await expect(page.getByText('APROVADO', { exact: true })).toBeVisible()
        // await expect(statusHeader).toContainText('APROVADO')

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
            `)

        const statusBadge = page.getByRole('status').filter({ hasText: 'REPROVADO' })

        await expect(statusBadge).toHaveClass(/bg-red-100/)
        await expect(statusBadge).toHaveClass(/text-red-70/)

        const statusIcon = statusBadge.locator('svg')
        await expect(statusIcon).toHaveClass(/circle-x/)
    })

    test('deve consultar um pedido em analise', async ({ page }) => {

        //Test Data
        const order = {
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

        //Act
        //   await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-HJO7UV')
        await page.getByLabel('Número do Pedido').fill(`${order.number}`)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        //Assert
        // const pedidoHeader = page
        //     .getByText('Pedido', { exact: true })
        //     .locator('..')

        // const statusHeader = page
        //     .locator('svg[class*="circle-check"]')
        //     .locator('..')

        // await expect(pedidoHeader).toBeVisible({ timeout: 10_000 })
        // await expect(page.getByText(orderId, { exact: true })).toBeVisible()
        // await expect(pedidoHeader).toContainText(orderId)
        // await expect(page.getByText('APROVADO', { exact: true })).toBeVisible()
        // await expect(statusHeader).toContainText('APROVADO')

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
            `)

        const statusBadge = page.getByRole('status').filter({ hasText: 'EM_ANALISE' })

        await expect(statusBadge).toHaveClass(/bg-amber-100/)
        await expect(statusBadge).toHaveClass(/text-amber-70/)

        const statusIcon = statusBadge.locator('svg')
        await expect(statusIcon).toHaveClass(/clock-icon/)
    })

    test('deve exibir mensagem quando o pedido não for encontrado', async ({ page }) => {
        //Test Data
        const orderId = generateOrderCode()

        //Act
        await page.getByLabel('Número do Pedido').fill(orderId)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        //Assert
        // const title = page.getByRole('heading', {name: 'Pedido não encontrado'})
        // await expect(title).toBeVisible()

        // const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
        // await expect(message).toBeVisible()

        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - img
            - heading "Pedido não encontrado" [level=3]
            - paragraph: Verifique o número do pedido e tente novamente
            `);
    })
})