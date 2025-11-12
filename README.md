# Card Game Angular Frontend

Мультиплеерная карточная игра на Angular с системой голосования.

## Технологии
- Angular 16+
- TypeScript
- RxJS
- Docker
- Nginx

## Запуск локально

### Требования
- Node.js 18+
- npm 8+

### Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить development server
npm start
```

Приложение будет доступно на `http://localhost:4200`

## Запуск в Docker

```bash
# Собрать образ
docker build -t cardgame-frontend .

# Запустить контейнер
docker run -p 80:80 cardgame-frontend
```

Приложение будет доступно на `http://localhost`

## Структура проекта

- `src/app/models/` - интерфейсы и типы
- `src/app/services/` - сервисы для работы с API и состоянием
- `src/app/components/` - компоненты приложения

## Переменные окружения

Измените `API_URL` в `game.service.ts` на адрес вашего бэкенда:

```typescript
private apiUrl = 'http://localhost:8080/api/game';
```

## Лицензия
MIT
