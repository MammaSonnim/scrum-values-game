export const quizData = [
  {
    correctAnswerId: '4', // temp
    question: {
      id: '1',
      title: 'Команда разработки саботирует ежедневный скрам',
      text:
        'Команда приходит на Ежедневный Скрам и рассказывает друг другу стихи, поёт песни и всё не про работу. Что сделали бы вы как Скрам-команда?',
      example: null
    },
    answers: [
      {
        id: '1',
        text: 'Задействовать административный ресурс, т.е. заставить',
        scores: {
          courage: 0,
          focus: 1,
          commitment: -3,
          respect: -2,
          opennes: -2
        },
        error: null,
        comment: null
      },
      {
        id: '2',
        text: 'Провести тренинг по Скрам для команды',
        scores: null,
        error: 'Проблема не в этом!',
        comment:
          'Данный ответ никак не решает проблему. Состояние ценностей не поменялось. Обсудите эту ситуацию с командой и двигайтесь дальше по игре'
      },
      {
        id: '3',
        text:
          'Ежедневный Скрам ведёт Владелец Продукта, команда рассказывает «кто что сделал»',
        scores: {
          courage: 0,
          focus: 2,
          commitment: -1,
          respect: 0,
          opennes: -1
        },
        error: null,
        comment: null
      },
      {
        id: '4',
        text:
          'Провести интервью с участниками команды и убрать причину саботажа',
        scores: {
          courage: 3,
          focus: 2,
          commitment: 1,
          respect: 0,
          opennes: 0
        },
        error: null,
        comment: null
      },
      {
        id: '5',
        text:
          'Дисциплинировать команду, пригласив непосредственных бизнес-заказчиков на Ежедневный Скрам',
        scores: {
          courage: -2,
          focus: -2,
          commitment: -2,
          respect: -2,
          opennes: -2
        },
        error: 'Противоречит руководству по Скраму. -2 все Ценности',
        comment: null
      }
    ]
  },
  {
    correctAnswerId: '4', // temp
    question: {
      id: '2',
      title: 'В оценке задач участвует не вся команда',
      text:
        'Часть команды не хочет участвовать в оценке задач, т.к. не имеют соответствующих знаний.',
      example: 'Например: в Беклоге Продукта 80% фронтенд-задач'
    },
    answers: [
      {
        id: '1',
        text: 'Обучение команды недостающим навыкам',
        scores: {
          courage: 0,
          focus: -1,
          commitment: 0,
          respect: 0,
          opennes: 1
        },
        error: null,
        comment: null
      },
      {
        id: '2',
        text: 'Ввести подход No estimate и перестать оценивать задачи',
        scores: {
          courage: -2,
          focus: -2,
          commitment: -3,
          respect: 0,
          opennes: -2
        },
        error: null,
        comment: null
      },
      {
        id: '3',
        text: 'Оценивать задачи теми людьми, у кого максимальные знания',
        scores: {
          courage: 0,
          focus: -3,
          commitment: -2,
          respect: 0,
          opennes: 0
        },
        error: null,
        comment: null
      },
      {
        id: '4',
        text:
          'Попросить переформулировать задачи в Беклоге Продукта. Декомпозировать задачи до уровня командной работы, а не конкретных компетенций',
        scores: {
          courage: 1,
          focus: 3,
          commitment: 3,
          respect: 0,
          opennes: 0
        },
        error: null,
        comment: null
      }
    ]
  }
];
