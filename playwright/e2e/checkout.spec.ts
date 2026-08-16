
import { test } from '../support/fixtures'
import { CHECKOUT_VALIDATION_MESSAGES } from '../support/actions/checkoutActions'
import { deleteOrderByEmail } from '../support/database/orderRepository'

test.describe('Checkout - Validação de Campos', () => {

  test.beforeEach(async ({ app }) => {
    await app.checkout.openFromConfigurator()
  })

  test('deve exibir erros ao confirmar pedido com todos os campos em branco', async ({ app }) => {
    await app.checkout.confirmOrder()

    await app.checkout.validateStillOnCheckout()
    await app.checkout.validateErrorsVisible([
      CHECKOUT_VALIDATION_MESSAGES.nameMinLength,
      CHECKOUT_VALIDATION_MESSAGES.lastnameMinLength,
      CHECKOUT_VALIDATION_MESSAGES.emailInvalid,
      CHECKOUT_VALIDATION_MESSAGES.phoneInvalid,
      CHECKOUT_VALIDATION_MESSAGES.documentInvalid,
      CHECKOUT_VALIDATION_MESSAGES.storeRequired,
      CHECKOUT_VALIDATION_MESSAGES.termsRequired,
    ])
  })

  test('deve exigir mínimo de 2 caracteres no nome e sobrenome', async ({ app }) => {
    await app.checkout.fillCustomerData({
      name: 'A',
      lastname: 'B',
    })
    await app.checkout.confirmOrder()

    await app.checkout.validateStillOnCheckout()
    await app.checkout.validateErrorVisible(CHECKOUT_VALIDATION_MESSAGES.nameMinLength)
    await app.checkout.validateErrorVisible(CHECKOUT_VALIDATION_MESSAGES.lastnameMinLength)
  })

  test('deve exibir erro para email inválido', async ({ app }) => {
    await app.checkout.fillCustomerData({
      name: 'Maria',
      lastname: 'Silva',
      email: '',
    })
    await app.checkout.confirmOrder()

    await app.checkout.validateStillOnCheckout()
    await app.checkout.validateErrorVisible(CHECKOUT_VALIDATION_MESSAGES.emailInvalid)
  })

  test('deve exibir erro para document inválido', async ({ app }) => {
    await app.checkout.fillCustomerData({
      name: 'Maria',
      lastname: 'Silva',
      email: 'maria@email.com',
      phone: '11999998888',
      store: /Velô Paulista/,
    })
    await app.checkout.confirmOrder()

    await app.checkout.validateStillOnCheckout()
    await app.checkout.validateErrorVisible(CHECKOUT_VALIDATION_MESSAGES.documentInvalid)
  })

  test('deve exigir aceite dos termos com demais campos válidos', async ({ app }) => {
    await app.checkout.fillCustomerData({
      name: 'Maria',
      lastname: 'Silva',
      email: 'maria@email.com',
      phone: '11999998888',
      document: '52998224725',
      store: /Velô Paulista/,
    })
    await app.checkout.confirmOrder()

    await app.checkout.validateStillOnCheckout()
    await app.checkout.validateErrorVisible(CHECKOUT_VALIDATION_MESSAGES.termsRequired)
  })
})

test.describe('Checkout - Pagamento à Vista', () => {
  test.beforeEach(async ({ app }) => {
    await app.checkout.openFromConfigurator()
  })

  test('CT05 - deve criar um pedido com sucesso utilizando pagamento à vista (Fluxo Feliz)', async ({ app }) => {
    const validCashOrderData = {
      name: 'João',
      lastname: 'Silva',
      email: 'joao.silva@email.com',
      phone: '11988887777',
      document: '52998224725',
      store: /Velô Paulista/,
      expectedTotalPrice: 'R$ 40.000,00',
    }

    await deleteOrderByEmail(validCashOrderData.email)

    await app.checkout.fillCustomerData({
      name: validCashOrderData.name,
      lastname: validCashOrderData.lastname,
      email: validCashOrderData.email,
      phone: validCashOrderData.phone,
      document: validCashOrderData.document,
      store: validCashOrderData.store,
    })
    await app.checkout.selectCashPayment()
    await app.checkout.validateSummaryTotal(validCashOrderData.expectedTotalPrice)

    await app.checkout.acceptTerms()
    await app.checkout.confirmOrder()

    await app.checkout.validateOrderApproved()
  })
})

