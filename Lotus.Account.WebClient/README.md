# Модуль клиентского Web-приложения учетной записи пользователя

Описание директорий.

## Блок директорий которые *не зависят от бизнес логики* и могут спокойно перемещаться в другие проекты:

### core

Директория, где располагается максимально общий код, с общей функциональностью не привязанный ни к какой предметной области.

Зависимости от других директорий: нет

### shared

Директория, где располагается также общий код, но сгруппированный по отдельным функциональным направлениям.

Зависимости от других директорий: `core`, также есть зависмости от `MUI`

### ui

Директория, где располагаются компоненты интерфейса

Зависимости от других директорий: `core`, `shared` также есть зависмости от `MUI`


## Блок директорий которые *зависят от бизнес логики*:

### modules

Основная директория которая определяет функциональные возможности приложения(фичи). 

Каждая фича(директория) может содержать:
  - domain - предметную логику
  - store - глобальное состояние
  - ui - интерфейс и компоненты

### app

Директория, которая содержит «глобальные данные» по отношению к бизнес логике приложения

Содержит:
  - routes - маршруты приложения
  - store - реализацию глобальное состояние приложения

Зависимости от других директорий: `core`, `shared`, `ui`, `modules` также есть зависмости от `MUI`