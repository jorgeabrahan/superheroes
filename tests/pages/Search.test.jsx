import { describe, test, jest, expect } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Search } from '../../src/heroes/pages'

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <SearchPage />', () => {
  test('Debe de mostrarse correctamente con valores por defecto', () => {
    const { container } = render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    )
    expect(container).toMatchSnapshot()
  })

  test('Debe de mostrar a batman y el input con el valor del query string', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Search />
      </MemoryRouter>
    )
    const input = screen.getByRole('textbox')
    expect(input.value).toBe('batman')

    const img = screen.getByRole('img')
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg')
  })

  test('Debe de mostrar un error si no se encuentra un hero', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <Search />
      </MemoryRouter>
    )
    expect(screen.getByText('No results for batman123')).toBeTruthy()
  })

  test('Debe de llamar el navigate a la pantalla nueva', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <Search />
      </MemoryRouter>
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { name: 'searchQuery', value: 'superman' } })
    const form = screen.getByRole('form')
    fireEvent.submit(form)
    expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman')
  })
})
