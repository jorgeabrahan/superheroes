import { authReducer } from '../../../src/auth/context/authReducer'
import { types } from '../../../src/auth/types/types'
import { describe, test, expect } from '@jest/globals'

describe('Pruebas en authReducer', () => {
  test('Debe retornar el estado por defecto', () => {
    const state = authReducer({ logged: false }, {})
    expect(state).toEqual({ logged: false })
  })

  test('Debe llamar el login autenticar y establecer el usuario', () => {
    const action = {
      type: types.login,
      payload: { name: 'Jorge', id: '123' }
    }
    const state = authReducer({ logged: false }, action)
    expect(state).toEqual({
      logged: true,
      user: action.payload
    })
  })

  test('Debe de borrar el name del usuario y establecer la propiedad logged en false', () => {
    const state = {
      logged: true,
      user: { name: 'Juan', id: '234' }
    }
    const action = {
      type: types.logout
    }
    const newState = authReducer(state, action)
    expect(newState).toEqual({ logged: false, user: {} })
  })
})
