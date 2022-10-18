export const quizData = [
  {
    question: {
      id: '1',
      title: 'Команда разработки саботирует ежедневный скрам',
      text: 'Команда приходит на Ежедневный Скрам и рассказывает друг другу стихи, поёт песни и всё не про работу. Что сделали бы вы как Скрам-команда?',
      example: null,
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
          opennes: -2,
        },
        warning: null,
        note: null,
      },
      {
        id: '2',
        text: 'Провести тренинг по Скрам для команды',
        scores: null,
        warning: 'Проблема не в этом!',
        note: 'Данный ответ никак не решает проблему. Состояние ценностей не поменялось. Обсудите эту ситуацию с командой и двигайтесь дальше по игре',
      },
      {
        id: '3',
        text: 'Ежедневный Скрам ведёт Владелец Продукта, команда рассказывает «кто что сделал»',
        scores: {
          courage: 0,
          focus: 2,
          commitment: -1,
          respect: 0,
          opennes: -1,
        },
        warning: null,
        note: null,
      },
      {
        id: '4',
        text: 'Провести интервью с участниками команды и убрать причину саботажа',
        scores: {
          courage: 3,
          focus: 2,
          commitment: 1,
          respect: 0,
          opennes: 0,
        },
        warning: null,
        note: null,
      },
      {
        id: '5',
        text: 'Дисциплинировать команду, пригласив непосредственных бизнес-заказчиков на Ежедневный Скрам',
        scores: {
          courage: -2,
          focus: -2,
          commitment: -2,
          respect: -2,
          opennes: -2,
        },
        warning: 'Противоречит руководству по Скраму. -2 все Ценности',
        note: null,
      },
    ],
  },
  {
    question: {
      id: '2',
      title: 'В оценке задач участвует не вся команда',
      text: 'Часть команды не хочет участвовать в оценке задач, т.к. не имеют соответствующих знаний.',
      example: 'Например: в Беклоге Продукта 80% фронтенд-задач',
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
          opennes: 1,
        },
        warning: null,
        note: null,
      },
      {
        id: '2',
        text: 'Ввести подход No estimate и перестать оценивать задачи',
        scores: {
          courage: -2,
          focus: -2,
          commitment: -3,
          respect: 0,
          opennes: -2,
        },
        warning: null,
        note: null,
      },
      {
        id: '3',
        text: 'Оценивать задачи теми людьми, у кого максимальные знания',
        scores: {
          courage: 0,
          focus: -3,
          commitment: -2,
          respect: 0,
          opennes: 0,
        },
        warning: null,
        note: null,
      },
      {
        id: '4',
        text: 'Попросить переформулировать задачи в Беклоге Продукта. Декомпозировать задачи до уровня командной работы, а не конкретных компетенций',
        scores: {
          courage: 1,
          focus: 3,
          commitment: 3,
          respect: 0,
          opennes: 0,
        },
        warning: null,
        note: null,
      },
    ],
  },
  {
    question: {
      id: '3',
      title: 'Команда не формулирует цель спринта',
      text: 'Цель спринта не формулируется из-за того, что в Беклоге продукта разноплановые требования, равнозначные по приоритету.',
      example:
        'Например: продуктовая и техническая функциональность, которую можно сделать за спринт, непредсказуемые баги и время на их починку. Что бы вы делали как Владелец Продукта?',
    },
    answers: [
      {
        id: '1',
        text: 'Определить цель существования команды',
        scores: {
          courage: 0,
          focus: 1,
          commitment: 3,
          respect: 0,
          opennes: 0,
        },
        warning: null,
        note: null,
      },
      {
        id: '2',
        text: 'Сформулировать какую цель ставит бизнес перед продуктом',
        scores: {
          courage: 0,
          focus: 1,
          commitment: 2,
          respect: 0,
          opennes: 0,
        },
        warning: null,
        note: null,
      },
      {
        id: '3',
        text: 'Подумать о том, какие вещи нужно будет сделать, если завтра половина команды уйдёт в длительный отпуск',
        scores: {
          courage: 0,
          focus: 2,
          commitment: 0,
          respect: 0,
          opennes: 0,
        },
        warning: null,
        note: null,
      },
      {
        id: '4',
        text: 'Владельцу Продукта создать vision и стратегию продукта, роадмап развития и рассказать это команде и после этого получить цель спринта',
        scores: {
          courage: 0,
          focus: 2,
          commitment: 3,
          respect: 0,
          opennes: 1,
        },
        warning: null,
        note: null,
      },
    ],
  },
  {
    question: {
      id: '4',
      title: 'Владелец Продукта не взаимодействует с рынком',
      text: 'Владелец Продукта приглашает на Обзор Спринта всех бизнес-заказчиков, но не приглашает конечных пользователей. Обзор Спринта превратился в отчётную встречу. Владельцу продукта не хватает смелости изменить ситуацию даже после обсуждения с командой. Что бы вы делали как Скрам-мастер?',
      example: null,
    },
    answers: [
      {
        id: '1',
        text: 'Команда разработки уходит от Владельца Продукта',
        scores: null,
        warning: 'Скрам-команда перестала существовать',
        note: 'Обсудите с группой причины и последствия. Выберите новую карточку команды.',
      },
      {
        id: '2',
        text: 'Позвать бизнес-заказчиков на Ретроспективу и показать им проблему и её последствия',
        scores: {
          courage: -2,
          focus: 0,
          commitment: -1,
          respect: -2,
          opennes: -3,
        },
        warning: null,
        note: null,
      },
      {
        id: '3',
        text: 'Конечных пользователей на Обзор зовёт Скрам-мастер или сама команда',
        scores: {
          courage: 1,
          focus: 0,
          commitment: 2,
          respect: -1,
          opennes: 1,
        },
        warning: null,
        note: null,
      },
      {
        id: '4',
        text: 'Обсудить тет-а-тет ситуацию с Владельцем Продукта, узнать, почему не решается менять ситуацию. Убедить рассказать команде',
        scores: {
          courage: 1,
          focus: 0,
          commitment: 0,
          respect: 2,
          opennes: 1,
        },
        warning: null,
        note: null,
      },
    ],
  },
];
