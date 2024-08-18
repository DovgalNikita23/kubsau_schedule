import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { fn } from '@storybook/test'

type Story = StoryObj<typeof meta>

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    type: { control: 'radio' },
  },
  args: { onClick: fn(() => {}) },
} satisfies Meta<typeof Button>

export const Border: Story = {
  args: {
    type: 'submit',
    fontSize: '12px',
    border: '3px solid red',
    children: 'С обводкой',
  },
}

export const Empty: Story = {
  args: {
    fontSize: '12px',
    children: 'Без обводки',
    border: 'none',
  },
}

export default meta
