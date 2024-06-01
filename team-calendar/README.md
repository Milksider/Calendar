# Шаблон React приложения

Базовый шаблон React приложения с использованием TypeScript для быстрого старта.\
Подключено и настроено: 
- [Redux](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) state-менеджер и [Redux Toolkit](https://redux-toolkit.js.org/tutorials/overview) для работы с ним;
- Маршрутизация через [React Router](https://reactrouter.com/docs/en/v6/getting-started/tutorial);
- Линтинг и форматирование кода [ESLint](https://eslint.org/docs/latest/user-guide/getting-started), [Prettier](https://prettier.io/docs/en/index.html);
- Пре-коммит хук для линтинга и форматирования кода;
- Подключен UI-kit [MUI](https://mui.com/material-ui/getting-started/overview/);
- Стилизация MUI происходит с помощью [Emotion](https://emotion.sh/docs/introduction);
- i18next - локализация приложения на разные языки, все переводы хранятся в папке `public/locales/`;
- Кастомные хук `useAuth` и компоненты wrappers для работы с авторизацией и защиты роутов;
- Кастомные хук `useActions` для работы со store actions;
- Кастомные хук `useAppSelector` типизирующий хук `useSelector`;
- Функции помощники: для работы с localStorage;
- GH workflows для проверки тестов, линтинга, форматирования и сборки с деплоем на GH Pages;
- aliases для сокращения импортов, при добавлении новых добавлять нужно в `tsconfig.paths.json` и `craco.config.js`;

## Скрипты проекта

### `npm start`
Запуск проекта в режиме разработки и hot-reload.\
Откройте [http://localhost:3000](http://localhost:3000) для просмотра в браузере.

### `npm run build`

Собирает приложение для production в папку `build`.\
Сборка минимизирована, а имена файлов содержат хеши.

О том как произвести deploy проекта можно прочитать в разделе [deployment](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run build:gh-pages`

Сборка работает так же как и скрипт `npm run build`, но добавляет страницу 404 для работы BrowserRouter на GitHub Pages

### `npm run lint`

Запуск линтинга кода с помощью ESLint.

### `npm run lint:fix`

Запуск линтинга кода и автоматическое исправление ошибок с помощью ESLint.

### `npm run format`

Запуск проверки форматирования кода с помощью Prettier.

### `npm run format:fix`

Запуск исправления форматирования кода с помощью Prettier.

### `npm run format:fix`

Запуск тестов с помощью jest.


## Соглашение о структуре React компонентов

- Используются функциональные компоненты, классовые только по необходимости;
- Компоненты страниц в названии содержат постфикс `Page`;
- Компонент экспортируется без `default`;
- Название папки с компонентом и всех файлов компонента пишется в стиле `PascalCase`;
- Структура папки с компонентом:
```text
.
└── /Component                             ## Папка с компонентом
    ├── /Component.tsx                     ## Главный файл с разметкой
    ├── /Component.module.[css,scss,less]  ## Файл стилей импортируется в разметку как модуль
    ├── /Component.types.еы                ## Типы и интерфейсы компонента
    └── /index.ts                          ## Экспортирование компонента
```

## Используемые библиотеки

[React](https://ru.react.js.org/) - JS фреймворк для создания приложений\
[React Router](https://reactrouter.com/docs/en/v6/getting-started/tutorial) - маршрутизация для React\
[React Redux](https://react-redux.js.org/tutorials/quick-start) - библиотека для работы со state-менеджером [Redux](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)\
[Emotion](https://emotion.sh/docs/introduction) - стилизация компонентов через шаблонные литералы\
[Redux Toolkit](https://redux-toolkit.js.org/tutorials/overview) - инструменты для работы с Redux.\
[i18next](https://www.i18next.com/) - библиотека для интернационализации приложения.\
[ESLint](https://eslint.org/docs/latest/user-guide/getting-started) - линтинг кода\
[Prettier](https://prettier.io/docs/en/index.html) - форматироване кода\
[husky](https://www.npmjs.com/package/husky), [lint-staged](https://www.npmjs.com/package/lint-staged) - запуск линтинга и форматирования кода перед коммитом\
[MUI](https://mui.com/material-ui/getting-started/overview/) - UI-kit готовых стилей\
[Craco](https://www.npmjs.com/package/@craco/craco) - Конфигурирование `create-react-app`


## Структура проекта

```text
.
├── /build             ## Папка с собранным билдом приложения
├── /public            ## Папка с index.html, favicon
├── /src               ## Папка с ресурсами
    ├── /assets        ## Глобальные статические assets, такие как изображения, SVG, логотип компании и т. д.
        └── /images    ## Все изображения в проекте
    ├── /components    ## Глобальные общие/повторно используемые компоненты, такие как макет (оболочки, навигация), компоненты формы, кнопки
        ├── /layouts   ## Компоненты layouts
        ├── /wrappers  ## Обертки для защиты роутов авторизацией и разграничения по ролям
        └── /ui        ## UI компоненты
    ├── /hooks         ## Кастомные хуки
    ├── /models        ## TypeScript типы, интерфейсы
    ├── /services      ## Модули TypeScript
    ├── /store         ## Глобальное хранилище Redux
    ├── /utils         ## Утилиты, помощники, константы и т. д.
    ├── /pages         ## Страницы приложения
    ├── App.tsx        ## Главный компонент
    ├── App.css        ## Глобальные стили
    └── index.tsx      ## Подключаемый к html js файл
├── .eslintignore      ## Игнор-лист ESLint
├── .eslintrc.json     ## Настройки ESLint
├── .gitignore         ## Игнор-лист Lint-staged
├── .lintstagedrc      ## Игнор-лист ESLint
├── .prettierignore    ## Игнор-лист Prettier
├── .prettierrc        ## Настройки Prettier
├── craco.config.js    ## Конфиграция сборки приложения, настройка кастомных путей
├── tsconfig.json      ## Настройки TypeScript
└── tsconfig.paths.json## Настройки кастомных путей для TypeScript
```

## Структура компонента

```text
- Хуки ## useParams,useDispatch...
- Селекторы ## useSelector
- Стейты ## useState
- Константы
- Еффекты ## useEffect
- Методы ## Функции
- jsx
```

  Между слоями пустая строка,так же пустая строка в блоках между Еффектами и Функциями

## Настройки репозитория в GH

- Включить GH Pages c источником GH Actions для срабатывания сборки и деплоя приложения + в `package.json` указать `homepage` репозитория;
- В секретах репозитория добавьте ключ `PUBLIC_URL` со значением `/{{repository-name}}`;
- Добавить следующие правила защиты для веток main, master, dev: 
  - Branch name pattern: `[dm][ea][vs]*` для master и dev, либо `[dm][ea][vi]*` для main и dev;
  - Require a pull request before merging - запрещает изменение веток через коммиты;
  - Require approvals = 1 - для мерджа необходим хотя бы один коммит
  - Require status checks to pass before merging - добавляет проверку на прохождение actions, обязательно выбрать actions для проверки;
  - Require linear history - линейная история коммитов;
  - Require conversation resolution before merging - все замечания должны быть разрешены для закрытия pr;
- В главных настройках включить: 
  - Automatically delete head branches;
  - Allow squash merging;
- В главных настройках отключить:
  - Allow merge commits;
  - Allow rebase merging;

## Рекомендуемые библиотеки

[Axios](https://axios-http.com/docs/intro) - HTTP клиент\
[Сборник библиотек на все случаи жизни](https://github.com/brillout/awesome-react-components)
