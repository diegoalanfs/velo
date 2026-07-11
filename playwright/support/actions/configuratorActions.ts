import { Page, expect } from '@playwright/test'

export type ExteriorColorId = 'glacier-blue' | 'midnight-black' | 'lunar-white'
export type WheelTypeId = 'aero' | 'sport'

export type VehiclePreview = {
  exteriorColor?: ExteriorColorId
  wheelType: WheelTypeId
}

export const CONFIGURATOR_PRICES = {
  base: 'R$ 40.000,00',
  withSportWheels: 'R$ 42.000,00',
  withPrecisionPark: 'R$ 45.500,00',
  withBothOptionals: 'R$ 50.500,00',
} as const

export type OptionalFeature = 'Precision Park' | 'Flux Capacitor'

export function createConfiguratorActions(page: Page) {
  const totalPrice = page.getByTestId('total-price')

  return {
    elements: {
      totalPrice,
    },

    async open() {
      await page.goto('/configure')
      await expect(page).toHaveURL('/configure')
      await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
    },

    async selectExteriorColor(label: string) {
      await page.getByRole('button', { name: label }).click()
    },

    async selectWheels(label: string | RegExp) {
      await page.getByRole('button', { name: label }).click()
    },

    async validatePrice(expected: string) {
      await expect(totalPrice).toHaveText(expected)
    },

    async validateVehicleImage(preview: VehiclePreview) {
      const color = preview.exteriorColor ?? 'glacier-blue'
      const pattern = new RegExp(
        `Velô Sprint - ${color} with ${preview.wheelType} wheels`,
        'i'
      )
      await expect(page.getByRole('img', { name: pattern })).toBeVisible()
    },

    async validateWheelOptionsVisible() {
      await expect(page.getByRole('button', { name: /Aero Wheels/ })).toBeVisible()
      await expect(page.getByRole('button', { name: /Sport Wheels/ })).toBeVisible()
    },

    async checkOptional(label: OptionalFeature) {
      await page.getByRole('checkbox', { name: new RegExp(label) }).check()
    },

    async uncheckOptional(label: OptionalFeature) {
      await page.getByRole('checkbox', { name: new RegExp(label) }).uncheck()
    },

    async proceedToCheckout() {
      await page.getByRole('button', { name: 'Monte o Seu' }).click()
      await expect(page).toHaveURL('/order')
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
    },

    async validateCheckoutPrice(expected: string) {
      const cashPaymentButton = page.getByRole('button', { name: /^À Vista/ })
      await expect(cashPaymentButton).toBeVisible()
      await expect(cashPaymentButton).toContainText(expected)
      await expect(page.getByTestId('summary-total-price')).toHaveText(expected)
    },
  }
}
