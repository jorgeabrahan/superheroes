import { describe, test, jest, expect } from '@jest/globals'
import { AuthContext } from '../../src/auth'
import { PrivateRoute } from '../../src/PrivateRoute'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('Pruebas en el privateRoute', () => {
  test('Debe de mostrar el children si esta autenticado', () => {
    Storage.prototype.setItem = jest.fn()

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
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Private route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Private route')).toBeTruthy()
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman')
  })
})
