export const defaultRoom = {
  name: 'Ирина Морозова',
  avatar: 'morozova.jpg',
  role: 'менеджер',
  online: true,
}

export const defaultMessages = [
  {
    author: 'Ирина Морозова',
    avatar: 'morozova.jpg',
    data: { type: 'message', text: 'Привет, задача ясна' },
    time: 1734880883000,
  },
  {
    author: 'Ирина Морозова',
    avatar: 'morozova.jpg',
    data: {
      type: 'message',
      text: 'Привет, задача ясна',
      file: {
        name: 'text.txt',
        type: 'text/plain',
        size: 478,
      },
    },
    time: 1734880883000,
  },
  {
    author: 'Анна Иванова',
    data: {
      type: 'message',
      text: 'Привет, задача ясна',
      file: {
        name: 'icons/morozova.jpg',
        type: 'image/jpeg',
        size: 3447872,
      },
    },
    time: 1734880883000,
  },
]

export const users = [
  {
    name: 'Ирина Морозова',
    avatar: 'morozova.jpg',
    role: 'менеджер',
    email: 'test@test.ru',
    phone: '8 (888) 888-88-88',
  },
  {
    name: 'Анна Иванова',
    role: 'менеджер',
    email: 'test.mail@test.ru',
    phone: '8 (901) 234-56-78',
  },
]

export const defaultUser = {
  role: 'пользователь',
  email: 'tester@test.ru',
  phone: '8 (800) 555-35-35',
}
