import { describe, test, jest, expect, beforeEach } from '@jest/globals'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { AuthContext } from '../../src/auth'
import AppRouter from '../../src/AppRouter'

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <Navbar />', () => {
  const userName = 'Jorge'
  const contextValue = {
    authState: {
      logged: true,
      user: {
        name: userName,
        id: '123'
      }
    },
    logout: jest.fn()
  }
  beforeEach(() => jest.clearAllMocks())
  test('Debe de mostrar el nombre del usuario', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText(userName)).toBeTruthy()
  })

  test('Debe de llamar el logout y navigate cuando se hace click en el boton de logout', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const logoutBtn = screen.getByRole('button')
    fireEvent.click(logoutBtn)
    expect(contextValue.logout).toHaveBeenCalled()
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true })
  })
})
