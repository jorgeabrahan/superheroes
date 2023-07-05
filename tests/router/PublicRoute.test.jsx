import { describe, test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { AuthContext } from '../../src/auth/context/AuthContext'
import { PublicRoute } from '../../src/PublicRoute'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('Pruebas en <PublicRoute />', () => {
  test('Debe de mostrar el children si no esta autenticado', () => {
    const contextValue = { authState: { logged: false } }

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Public route')).toBeTruthy()
  })

  test('Debe de navegar si esta autenticado', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'Fernando',
        id: '123'
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Public route</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Marvel element</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Marvel element')).toBeTruthy()
  })
})
