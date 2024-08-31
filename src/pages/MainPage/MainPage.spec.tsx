import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MainPage } from './MainPage'

describe('MainPage', () => {
  it('ContentExists', () => {
    render(<MainPage />)

    const searchElem = screen.getByTestId('content')

    expect(searchElem).toHaveTextContent('Content here')
  })
})
