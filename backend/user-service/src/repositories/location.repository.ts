import pool from '../config/db';

export class LocationRepository {
  static async searchLocation(keyword: string) {
    const result = await pool.query(
      `SELECT name, id
       FROM locations
       WHERE unaccent(lower(name)) LIKE unaccent(lower($1))`,
      [`${keyword}%`],
    );
    return result.rows;
  }
  static async getHistoryByUser(userId: string) {
    const { rows } = await pool.query(
      `
      SELECT location_id, query FROM search_history
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 5
      `,
      [userId],
    );
    return rows;
  }
  static async countHistoryByUser(userId: string) {
    const { rows } = await pool.query(
      `
    SELECT COUNT(*)::int AS count
    FROM search_history
    WHERE user_id = $1
    `,
      [userId],
    );

    return rows[0].count;
  }
  static async createHistory(
    userId: string,
    query: string,
    locationId: string,
  ): Promise<void> {
    await pool.query(
      `
    INSERT INTO search_history (user_id, query, location_id)
    VALUES ($1, $2, $3)
    `,
      [userId, query, locationId],
    );
  }
  static async deleteHistoryById(id: string): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM search_history WHERE id = $1`,
      [id],
    );

    return result.rowCount > 0;
  }
  static async getInformationLocationByLocationId(Id: string) {
    const { rows } = await pool.query(`SELECT * FROM locations WHERE id = $1`, [
      Id,
    ]);

    return rows[0] || null;
  }
  static async getOpeningHourByLocationId(locationId: string) {
    const { rows } = await pool.query(
      `SELECT * FROM opening_hours WHERE location_id = $1`,
      [locationId],
    );

    return rows;
  }
  static async getArticlesByLocationId(locationId: string) {
    const { rows } = await pool.query(
      `SELECT * FROM articles WHERE location_id = $1`,
      [locationId],
    );

    return rows;
  }
  static async getLocationRating(locationId: string) {
    const { rows } = await pool.query<{
      rating_avg: string;
      rating_count: string;
    }>(`SELECT rating_avg, rating_count FROM locations WHERE id = $1`, [
      locationId,
    ]);
    return rows[0] ?? null;
  }

  static async getRatingStars(locationId: string) {
    const { rows } = await pool.query<{ star: number; count: string }>(
      `SELECT star, count FROM rating_stars WHERE location_id = $1 ORDER BY star DESC`,
      [locationId],
    );
    return rows;
  }

  static async getReviews(locationId: string) {
    const { rows } = await pool.query<{
      id: string;
      user_id: string;
      rating: number;
      content: string;
      status: string;
      created_at: Date;
    }>(
      `SELECT * FROM reviews WHERE location_id = $1 AND status = 'published' ORDER BY created_at DESC`,
      [locationId],
    );
    return rows;
  }

  static async getReviewImages(reviewId: string) {
    const { rows } = await pool.query<{
      id: string;
      review_id: string;
      url: string;
    }>(`SELECT * FROM review_images WHERE review_id = $1`, [reviewId]);
    return rows;
  }

  static async getLikeCount(reviewId: string) {
    const { rows } = await pool.query<{ count: string }>(
      `SELECT COUNT(*) AS count FROM review_likes WHERE review_id = $1`,
      [reviewId],
    );
    return parseInt(rows[0].count, 10);
  }

  static async isLikedByUser(reviewId: string, userId: string | null) {
    if (!userId) return false;
    const { rows } = await pool.query<{ liked: boolean }>(
      `SELECT EXISTS (
        SELECT 1 FROM review_likes WHERE review_id = $1 AND user_id = $2
      ) AS liked`,
      [reviewId, userId],
    );
    return rows[0].liked;
  }

  static async getUserById(userId: string) {
    const { rows } = await pool.query<{ fullname: string; avatar_url: string }>(
      `SELECT fullname, avatar_url FROM users WHERE id = $1`,
      [userId],
    );
    return rows[0] ?? null;
  }
}
