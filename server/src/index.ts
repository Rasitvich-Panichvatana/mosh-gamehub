import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

// Load data from .env
dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors());

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Get data from Database (PostgreSQL)
app.get("/api/games", async (req, res) => {
  try {
    const { genre, platform, search, page } = req.query;

    const PAGE_SIZE = 15;
    const currentPage = parseInt(page as string) || 1;
    const offset = (currentPage - 1) * PAGE_SIZE;

    let query = "SELECT * FROM games";
    const params: any[] = [];
    const conditions: string[] = [];

    // Build filter conditions
    if (genre) {
      const genres = Array.isArray(genre) ? genre : [genre];

      const likeClauses = genres.map((p) => {
        params.push(`%${p}%`);
        return `genre ILIKE $${params.length}`;
      });

      conditions.push(`(${likeClauses.join(" OR ")})`);
    }

    // ILIKE = not case sensitive matching eg. PC = pc = Pc
    // %PC% = find anything with PC inside
    if (platform) {
      // Make platform Array incase of string eg. /api/games?platform=PC => platform === "PC"
      const platforms = Array.isArray(platform) ? platform : [platform];

      const likeClauses = platforms.map((p) => {
        params.push(`%${p}%`);
        return `platform ILIKE $${params.length}`;
      });

      conditions.push(`(${likeClauses.join(" AND ")})`);
    }

    // Trim search
    if (typeof search === "string" && search.trim() !== "") {
      params.push(`%${search.trim()}%`);
      conditions.push(
        // return result of search tilte or genre
        `(title ILIKE $${params.length} OR genre ILIKE $${params.length})`
      );
    }

    // Apply WHERE if filters exist
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // Add ordering, pagination
    query += " ORDER BY title ASC";
    params.push(PAGE_SIZE, offset);
    query += ` LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const { rows } = await pool.query(query, params);

    // Count total results for frontend pagination UI
    let totalQuery = "SELECT COUNT(*) FROM games";
    if (conditions.length > 0) {
      totalQuery += " WHERE " + conditions.join(" AND ");
    }
    const { rows: countRows } = await pool.query(
      totalQuery,
      params.slice(0, -2)
    );
    const total = parseInt(countRows[0].count, 10);

    return res.json({
      page: currentPage,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
      results: rows,
    });
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

      for (const game of games) {
        await client.query(
          `INSERT INTO games (game_id, title, genre, platform, thumbnail, updated_at)
           VALUES ($1, $2, $3, $4, $5, NOW())
           ON CONFLICT (game_id) DO UPDATE
           SET title = EXCLUDED.title,
               genre = EXCLUDED.genre,
               platform = EXCLUDED.platform,
               thumbnail = EXCLUDED.thumbnail,
               updated_at = NOW()`,
          [game.id, game.title, game.genre, game.platform, game.thumbnail]
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
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
