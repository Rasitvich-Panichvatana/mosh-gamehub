import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors());

// connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// API endpoint
app.get("/api/games", async (_req, res) => {
  try {
    // 1️⃣ Try to fetch data from external API
    const response = await axios.get(process.env.API_URL!);
    const games = response.data;

    // 2️⃣ Save to PostgreSQL (cache)
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // optional: clear old data
      await client.query("DELETE FROM games");

      for (const g of games) {
        await client.query(
          `INSERT INTO games (game_id, title, genre, platform, thumbnail, updated_at)
           VALUES ($1, $2, $3, $4, $5, NOW())
           ON CONFLICT (game_id) DO UPDATE
           SET title = EXCLUDED.title,
               genre = EXCLUDED.genre,
               platform = EXCLUDED.platform,
               thumbnail = EXCLUDED.thumbnail,
               updated_at = NOW()`,
          [g.id, g.title, g.genre, g.platform, g.thumbnail]
        );
      }

      await client.query("COMMIT");
      client.release();
    } catch (err) {
      await client.query("ROLLBACK");
      client.release();
      console.error("Database update failed:", err);
    }

    // 3️⃣ Return fresh API data
    return res.json(games);
  } catch (apiError) {
    console.error("API request failed, using cached data:", apiError.message);

    // 4️⃣ Load cached data if API fails
    try {
      const { rows } = await pool.query(
        "SELECT * FROM games ORDER BY updated_at DESC"
      );
      if (rows.length > 0) {
        return res.json(rows);
      } else {
        return res.status(500).json({ error: "No cached data available" });
      }
    } catch (dbError) {
      console.error("Database read failed:", dbError);
      return res.status(500).json({ error: "Database error" });
    }
  }
});

// Server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
