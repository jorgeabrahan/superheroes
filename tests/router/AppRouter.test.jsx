import { describe, test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/auth'
import AppRouter from '../../src/AppRouter'

describe('Pruebas en <AppRouter />', () => {
  test('Debe mostrar el login si no esta autenticado', () => {
    const contextValue = {
      authState: {
        logged: false
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
  })

  test('Debe mostrar el componente de marvel si esta autenticado', () => {
    const contextValue = {
      authState: {
        logged: true,
        user: {
          name: 'Jorge',
          id: '123'
        }
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Marvel Comics')).toBeTruthy()
  })
})
