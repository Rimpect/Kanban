# Kanban

Пет-проект — канбан-доска (Trello-lite). Fullstack на TypeScript, монорепозиторий.

## Стек технологий

### Монорепозиторий
- **pnpm workspaces** — пакеты `client`, `server`, `packages/shared`
- Общие контракты данных в **`@kanban/shared`** (Zod-схемы + выведенные типы), используются и фронтом, и беком

### Фронтенд (`client` → `@kanban/client`)
- **React 19 + TypeScript**
- **Rsbuild** (на Rspack) — сборщик; **Rstest** — тесты
- **FSD** (Feature-Sliced Design) — архитектура слоёв
- **SCSS-модули** + дизайн-токены (CSS-переменные, своя дизайн-система)
- **TanStack Query** — серверный стейт, кэш
- **clsx** — склейка классов
- **@dnd-kit** — drag-and-drop (планируется)

### Бэкенд (`server` → `@kanban/server`)
- **Hono** (+ `@hono/node-server`) — веб-фреймворк
- **Hono RPC** — сквозная типобезопасность фронт бек (вместо tRPC)
- **Prisma 7** — ORM; **SQLite** через driver-адаптер `@prisma/adapter-better-sqlite3`
- **Zod** + **@hono/zod-validator** — валидация на границе API

### Инструменты
- **Biome** — единый линтер + форматтер на всю репу
- **TypeScript**, **tsx** (dev-запуск сервера)

## Структура
```
client/            # фронт (React + Rsbuild, FSD)
server/            # бэк (Hono + Prisma)
packages/shared/   # общие Zod-контракты и типы
```

## Запуск
```bash
pnpm install                          # из корня

pnpm --filter @kanban/server dev      # API на http://localhost:3000
pnpm --filter @kanban/client dev      # фронт на http://localhost:3001
```

## Прочее
- Линт/формат всей репы: `pnpm lint` / `pnpm lint:fix`
- Миграции БД: `pnpm --filter @kanban/server prisma migrate dev`
