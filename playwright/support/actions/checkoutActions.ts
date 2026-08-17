import { Page, expect } from '@playwright/test'

export type CheckoutPersonalData = {
  name?: string
  lastname?: string
  email?: string
  phone?: string
  document?: string
  store?: string | RegExp
}

export const CHECKOUT_VALIDATION_MESSAGES = {
  nameMinLength: 'Nome deve ter pelo menos 2 caracteres',
  lastnameMinLength: 'Sobrenome deve ter pelo menos 2 caracteres',
  emailInvalid: 'Email inválido',
  phoneInvalid: 'Telefone inválido',
  documentInvalid: 'CPF inválido',
  storeRequired: 'Selecione uma loja',
  termsRequired: 'Aceite os termos',
} as const
/*
export function createCheckoutActions(page: Page) {
  return {
    async expectLoaded() {
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
    },

    async expectSummaryTotal(price: string) {
      await expect(page.getByTestId('summary-total-price')).toHaveText(price)
    },

    async fillCustomerData(data: {
      name: string
      lastname: string
      email: string
      phone: string
      document: string
    }) {
      await page.getByTestId('checkout-name').fill(data.name)
      await page.getByTestId('checkout-lastname').fill(data.lastname)
      await page.getByTestId('checkout-email').fill(data.email)
      await page.getByTestId('checkout-phone').fill(data.phone)
      await page.getByTestId('checkout-document').fill(data.document)
    },

    async selectStore(storeName: string) {
      await page.getByTestId('checkout-store').click()
      await page.getByRole('option', { name: storeName }).click()
    },

    async acceptTerms() {
      await page.getByTestId('checkout-terms').check()
    },

    async submit() {
      await page.getByRole('button', { name: 'Confirmar Pedido' }).click()
    }
  }
}
  */


export function createCheckoutActions(page: Page) {
  const nameInput = page.getByLabel('Nome', { exact: true })
  const lastnameInput = page.getByLabel('Sobrenome', { exact: true })
  const emailInput = page.getByLabel('Email', { exact: true })
  const phoneInput = page.getByLabel('Telefone', { exact: true })
  const documentInput = page.getByLabel('CPF', { exact: true })
  const storeCombobox = page.getByRole('combobox', { name: 'Loja para Retirada' })
  const termsCheckbox = page.getByRole('checkbox', {
    name: /Li e aceito os Termos de Uso e Política de Privacidade/,
  })
  const submitButton = page.getByRole('button', { name: 'Confirmar Pedido' })
  const cashPaymentButton = page.getByRole('button', { name: /^À Vista/ })
  const financePaymentButton = page.getByRole('button', { name: /^Financiamento/ })

  return {
    elements: {
      nameInput,
      lastnameInput,
      emailInput,
      phoneInput,
      documentInput,
      storeCombobox,
      termsCheckbox,
      submitButton,
      cashPaymentButton,
    },

    async openFromConfigurator() {
      await page.goto('/configure')
      await expect(page).toHaveURL('/configure')
      await page.getByRole('button', { name: 'Monte o Seu' }).click()
      await expect(page).toHaveURL('/order')
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
    },

    async fillCustomerData(data: CheckoutPersonalData) {
      if (data.name !== undefined) {
        await nameInput.fill(data.name)
      }
      if (data.lastname !== undefined) {
        await lastnameInput.fill(data.lastname)
      }
      if (data.email !== undefined) {
        await emailInput.fill(data.email)
      }
      if (data.phone !== undefined) {
        await phoneInput.fill(data.phone)
      }
      if (data.document !== undefined) {
        await documentInput.fill(data.document)
      }
      if (data.store !== undefined) {
        await storeCombobox.click()
        await page.getByRole('option', { name: data.store }).click()
      }
    },

    async selectCashPayment() {
      await cashPaymentButton.click()
    },

    async selectFinancePayment() {
      await financePaymentButton.click()
    },

    async selectPaymentMethod(method: 'avista' | 'financiamento') {
      if (method === 'financiamento') {
        await financePaymentButton.click()
      } else {
        await cashPaymentButton.click()
      }
    },

    async acceptTerms() {
      await termsCheckbox.check()
    },

    async confirmOrder() {
      await submitButton.click()
    },

    async validateStillOnCheckout() {
      await expect(page).toHaveURL('/order')
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
    },

    async validateErrorVisible(message: string) {
      await expect(
        page.getByRole('paragraph').filter({ hasText: new RegExp(`^${message}$`) })
      ).toBeVisible()
    },

    async validateErrorsVisible(messages: readonly string[]) {
      for (const message of messages) {
        await expect(
          page.getByRole('paragraph').filter({ hasText: new RegExp(`^${message}$`) })
        ).toBeVisible()
      }
    },

    async validateSummaryTotal(price: string) {
      await expect(page.getByTestId('summary-total-price')).toHaveText(price)
    },

    async validateOrderApproved() {
      await expect(page).toHaveURL('/success')
      await expect(page.getByRole('heading', { name: 'Pedido Aprovado!' })).toBeVisible()
      await expect(page.getByTestId('order-id')).toBeVisible()
    },
  }
}

