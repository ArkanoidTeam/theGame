import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  test('отображает кнопки навигации', () => {
    render(
      <Router>
        <Footer hasLinks={true} />
      </Router>
    )

    expect(screen.getByText('Аккаунт')).toBeInTheDocument()
    expect(screen.getByText('Форум')).toBeInTheDocument()
    expect(screen.getByText('Справка')).toBeInTheDocument()
    expect(screen.getByText('Рейтинг')).toBeInTheDocument()
  })

  test('при нажатии кнопки проиcхлдит переход на страницу', () => {
    const { getByText } = render(
      <Router>
        <Footer hasLinks={true} />
      </Router>
    )

    fireEvent.click(getByText('Рейтинг'))

    expect(window.location.pathname).toBe('/leaderboard')
  })

  test('отображает стек элементов', () => {
    render(
      <Router>
        <Footer hasLinks={false}>Some content</Footer>
      </Router>
    )

    expect(screen.getByText('Some content')).toBeInTheDocument()
  })
})
