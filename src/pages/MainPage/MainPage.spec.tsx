import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MainPage } from './MainPage'

describe('MainPage', () => {
  it('ContentExists', () => {
    render(<MainPage />)

    const searchElem = screen.getByTestId('content')

    expect(searchElem).toHaveTextContent('Content here')
  })

  it('Button produce alert', () => {
    render(<MainPage />)

    const button = screen.getByTestId('button')

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})

    fireEvent.click(button)
    waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Привет')
    })

    alertMock.mockRestore()
  })
})
