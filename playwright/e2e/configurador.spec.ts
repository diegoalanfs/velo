import { test } from '../support/fixtures'
import { CONFIGURATOR_PRICES } from '../support/actions/configuratorActions'

test.describe('Configurador de Veículo', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.open()
  })

  test('deve atualizar a imagem do veículo ao alterar a cor exterior sem alterar o preço', async ({
    app,
  }) => {
    await app.configurator.validatePrice(CONFIGURATOR_PRICES.base)
    await app.configurator.selectExteriorColor('Midnight Black')
    await app.configurator.validateVehicleImage({
      exteriorColor: 'midnight-black',
      wheelType: 'aero',
    })
    await app.configurator.validatePrice(CONFIGURATOR_PRICES.base)
  })

  test('deve atualizar o preço e a imagem ao selecionar rodas Sport e voltar ao selecionar Aero', async ({
    app,
  }) => {
    await app.configurator.validateWheelOptionsVisible()
    await app.configurator.validatePrice(CONFIGURATOR_PRICES.base)
    await app.configurator.selectWheels(/Sport Wheels/)
    await app.configurator.validateVehicleImage({ wheelType: 'sport' })
    await app.configurator.validatePrice(CONFIGURATOR_PRICES.withSportWheels)
    await app.configurator.selectWheels(/Aero Wheels/)
    await app.configurator.validateVehicleImage({ wheelType: 'aero' })
    await app.configurator.validatePrice(CONFIGURATOR_PRICES.base)
  })
})
