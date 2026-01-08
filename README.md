# About Project

This Repository is for learning 'React 18 for Beginners' course by Mosh Hamedani with self-implemented backend and Github

- React Frontend from Course
  - React + Vite (TypeScript)
- Backend to Secure API
  - Node.js + Express + TypeScript
- GitHub Documentation

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

## Note for Developer

- Accordions are not smooth because App re-render everything check-box change
