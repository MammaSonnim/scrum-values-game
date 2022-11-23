Frontend for online version of [Scrum Values Game](https://www.agileverse.ru/scrumvaluesgame/ru) by [Agile Verse](https://www.agileverse.ru/).

## Setup

```bash
npm i
npm start
```

https://localhost:3000

## Backend

1. https://github.com/MammaSonnim/svg-backend SVG Backend
   Download and run `svg-backend` following instructions inside repo.
   All endpoints starting with `/api` are proxied to localhost with backend.

2. https://social-network.samuraijs.com/docs Vendor for auth (I plan to get rid of it, TODO SVG-36).
   Credentials for testing are posted there https://social-network.samuraijs.com/article/faq_po_api.
   If you don't have credentials and something doesn't work, remove `withAuth` wrapper (it wraps some pages in domains' index-files).

## Deploy

TBD

## Documentation (product and tech)

https://miro.com/app/board/o9J_ksGbQ74=/

## Tasks

https://trello.com/b/FM0y0JIy/scrum-values-game
