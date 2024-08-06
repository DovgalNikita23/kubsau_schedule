import { render, screen } from '@testing-library/react'
import { MainPage } from './MainPage'
import '@testing-library/jest-dom'

describe('Example test', () => {
  it('Render of component', () => {
    render(<MainPage />)

    const searchElem = screen.getByTestId('content')

    expect(searchElem).toHaveTextContent('Content here')
  })
})
