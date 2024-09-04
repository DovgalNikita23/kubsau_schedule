import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { ShedulePage } from './ShedulePage'

describe('MainPage', () => {
  it('ContentExists', () => {
    const { container } = render(<ShedulePage />)

    expect(container).toBeInTheDocument()
  })
})
