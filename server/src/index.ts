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

// Get data from Database (PostgreSQL)
app.get("/api/games", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM games ORDER BY updated_at DESC"
    );
    return res.json(rows);
  } catch (err) {
    console.error("Database read failed:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

// Update data from External API
app.get("/api/update-games", async (_req, res) => {
  try {
    const response = await axios.get(process.env.API_URL!);
    const games = response.data;

    const client = await pool.connect();
    try {
      //initiates a transaction block ( Commit / Rollback )
      await client.query("BEGIN");

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

      // Commit change
      await client.query("COMMIT");
      client.release();

      return res.json({ message: "Games updated successfully" });
    } catch (err) {
      // Undo if error
      await client.query("ROLLBACK");
      client.release();
      console.error("Database update failed:", err);
      return res.status(500).json({ error: "Database update failed" });
    }
  } catch (apiError) {
    console.error("API request failed:", (apiError as Error).message);
    return res.status(500).json({ error: "API fetch failed" });
  }
});

// Server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
