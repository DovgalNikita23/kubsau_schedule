export interface ILessonsData {
  startTime: string
  endTime: string
  isLecture?: boolean
  teacher?: string
  lesson?: string
  audience?: string
}

export const lessonsData: ILessonsData[] = [
  {
    startTime: '08:00',
    endTime: '09:30',
  },
  {
    startTime: '09:45',
    endTime: '11:15',
  },
  {
    startTime: '11:30',
    endTime: '13:00',
    isLecture: true,
    teacher: 'Великанова Л.О.',
    lesson: 'Надежность информационных систем',
    audience: '305эк',
  },
  {
    startTime: '13:50',
    endTime: '15:20',
    isLecture: true,
    teacher: 'Луценко Е.В.',
    lesson: 'Управление интеллектуальными информационными системами',
    audience: '403эк',
  },
  {
    startTime: '15:35',
    endTime: '17:05',
    isLecture: true,
    teacher: 'Попова Е.В.',
    lesson: 'Многокритериальные методы оптимизации',
    audience: '403эк',
  },
  {
    startTime: '17:20',
    endTime: '18:50',
    isLecture: true,
    teacher: 'Попова Е.В.',
    lesson: 'Многокритериальные методы оптимизации',
    audience: '403эк',
  },
]
