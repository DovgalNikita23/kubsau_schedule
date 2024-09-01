import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ShedulePage } from './ShedulePage'

describe('MainPage', () => {
  it('ContentExists', () => {
    render(<ShedulePage />)

    const searchElem = screen.getByTestId('content')

    expect(searchElem).toHaveTextContent('Content here')
  })
})
