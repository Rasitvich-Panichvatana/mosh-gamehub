# About Project

Game Discovery Website

![Website Image](README-assets/GameHub.png)
![Pagination Image](README-assets/Page.jpeg)

- Discover list of 422 free games
- User can Filter, sort, search games through the website

[Full Video](https://github.com/user-attachments/assets/d85af011-eae0-4e5b-8859-27139972ce6a)


- Responsive and Smooth UI

![Pagination Video](README-assets/Pagination.gif)
[Pagination Video](https://github.com/user-attachments/assets/42780419-953d-4cba-aa0d-2d1f1715c9c0)


## Tools

- Frontend
  - React + Vite (TypeScript)
- Backend
  - Node.js + Express + TypeScript
- DataBase
  - PostgreSQL

## Version

- Vite : 4.1.0
- TypeScript : 4.9.3
- React : 18.2.0
- Chakra-UI : 2.10.9
- Axios : 1.13.2

# How To Start Project

1. Create .env file in server folder (use .env.example as reference)
   - Recomended PORT=3000
   - API_URL=https://www.freetogame.com/api/games
   - DATABASE_URL = Your PostgreSQL ( Can be Local-Host )
   - For more API information https://www.freetogame.com/api-doc
2. Run Backend (Port 3000)
   - cd server
   - npm run dev
   - link: http://localhost:3000/api/games
3. Run Forntend (Port 5173)
   - cd game-hub
   - npm install (only for first time to install vite locally)
   - npm run dev
   - link: http://localhost:5173/
4. Update Database through Backend api/update-games (button update will come soon)

## Note for Developer

- Fixed
