import { test, expect } from '@playwright/test'

//AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
    const orderId = 'VLO-HJO7UV'

    //Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    //Act
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    //   await page.getByTestId('search-order-id').fill('VLO-HJO7UV') 
    //   await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-HJO7UV')
    await page.getByLabel('Número do Pedido').fill(orderId)
    // await page.getByTestId('search-order-button').click()
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    //Assert
    const pedidoHeader = page
        .getByText('Pedido', { exact: true })
        .locator('..')

    const statusHeader = page
        .locator('svg[class*="circle-check"]')
        .locator('..')

    await expect(pedidoHeader).toBeVisible({ timeout: 10_000 })
    await expect(page.getByText(orderId, { exact: true })).toBeVisible()
    await expect(pedidoHeader).toContainText(orderId)
    await expect(page.getByText('APROVADO', { exact: true })).toBeVisible()
    await expect(statusHeader).toContainText('APROVADO')
}) //end of test