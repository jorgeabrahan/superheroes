import { types } from '../../../src/auth/types/types'
import { describe, test, expect } from '@jest/globals'

describe('Pruebas en types', () => {
  test('Debe de regresar estos types', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout'
    })
  })
})
