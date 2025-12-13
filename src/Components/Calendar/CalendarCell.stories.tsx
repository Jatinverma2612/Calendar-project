import type { Meta, StoryObj } from '@storybook/react';
import { CalendarCell } from './CalendarCell';


const meta = {
  title: 'Calendar/CalendarCell',
  component: CalendarCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: () => console.log('Date Clicked'),
    onEventClick: () => console.log('Event Clicked'),
  },
} satisfies Meta<typeof CalendarCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(2025, 11, 15),
    isToday: false,
    isCurrentMonth: true,
    events: [],
  },
};

export const Today: Story = {
  args: {
    date: new Date(),
    isToday: true,
    isCurrentMonth: true,
    events: [],
  },
};

export const WithEvents: Story = {
  args: {
    date: new Date(2025, 11, 20),
    isToday: false,
    isCurrentMonth: true,
    events: [
      {
        id: '1',
        title: 'Maths Exam',
        startDate: new Date(),
        endDate: new Date(),
        color: '#ef4444',
      },
      {
        id: '2',
        title: 'Project Submission',
        startDate: new Date(),
        endDate: new Date(),
        color: '#10b981',
      }
    ],
  },
};