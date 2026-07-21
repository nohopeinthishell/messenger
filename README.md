# Messenger

Учебный проект мессенджера на TypeScript, Vite и Handlebars.

## Функциональность

- Роутинг страниц: `/`, `/sign-up`, `/messenger`, `/settings`, `/profile-edit`, `/profile-password`, `/404`, `/500`.
- Защита приватных страниц: неавторизованный пользователь перенаправляется на страницу входа.
- Защита гостевых страниц: авторизованный пользователь перенаправляется в мессенджер.
- Регистрация, вход и выход через HTTP API Яндекс Практикума.
- Получение и изменение данных профиля.
- Изменение пароля.
- Загрузка и отображение аватара.
- Получение списка чатов.
- Создание и удаление чатов.
- Добавление и удаление пользователя из чата по логину.
- Поиск по текущему списку чатов.
- Получение истории сообщений через WebSocket.
- Отправка и получение сообщений в реальном времени через WebSocket.
- Отображение ошибок в toast-уведомлениях.

При работе с API используйте только тестовые данные.

## Технологии

- TypeScript
- Vite
- Handlebars
- XHR + Promise для HTTP-запросов
- WebSocket для сообщений чата
- PostCSS
- ESLint
- Stylelint
- Vitest
- jsdom
- Husky
- EditorConfig

## Установка

Требуется Node.js `>=22`.

```bash
npm install
```

## Запуск проекта

```bash
npm run dev
```

## Сборка проекта

```bash
npm run build
```

## Проверка качества кода

```bash
npm run lint
```

Команда запускает проверку типов TypeScript, ESLint и Stylelint.

## Тестирование

```bash
npm run test:run
```

Тесты написаны на Vitest и хранятся рядом с тестируемыми модулями:

- роутер: `src/router/Route.test.ts`, `src/router/Router.test.ts`;
- базовый компонент: `src/framework/Block.test.ts`;
- UI-компоненты: `src/ui/ButtonUI/index.test.ts`, `src/ui/InputUI/index.test.ts`;
- HTTP-модуль: `src/framework/HTTPTransport.test.ts`.

Для запуска тестов в watch-режиме:

```bash
npm test
```

## Pre-commit

Перед коммитом Husky запускает:

```bash
npm run lint
npm run test:run
```

## Ссылка на развернутый проект

[Netlify](https://messenger-project.netlify.app/)
