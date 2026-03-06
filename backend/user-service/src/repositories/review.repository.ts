// review.repository.ts
import pool from '../config/db';

export class ReviewRepository {
  static async createDraft(userId: string, locationId: string) {
    const result = await pool.query(
      `INSERT INTO reviews (id, user_id, location_id, rating, content, status)
       VALUES (gen_random_uuid(), $1, $2, 0, '', 'draft')
       RETURNING id, user_id, location_id, status, created_at`,
      [userId, locationId],
    );
    return result.rows[0];
  }

  static async create(
    userId: string,
    locationId: string,
    rating: number,
    content: string,
  ) {
    const result = await pool.query(
      `INSERT INTO reviews (id, user_id, location_id, rating, content)
       VALUES (gen_random_uuid(), $1, $2, $3, $4)
       RETURNING id, user_id, location_id, rating, content, created_at`,
      [userId, locationId, rating, content],
    );
    return result.rows[0];
  }

  static async saveImage(reviewId: string, url: string, sortOrder: number) {
    await pool.query(
      `INSERT INTO review_images (id, review_id, url, sort_order)
       VALUES (gen_random_uuid(), $1, $2, $3)`,
      [reviewId, url, sortOrder],
    );
  }
  static async updateLocationRating(locationId: string) {
    // Cập nhật rating_stars
    await pool.query(
      `
    INSERT INTO rating_stars (id, location_id, star, count)
    SELECT gen_random_uuid(), location_id, rating, COUNT(*)
    FROM reviews
    WHERE location_id = $1 AND status = 'published'
    GROUP BY location_id, rating
    ON CONFLICT (location_id, star)
    DO UPDATE SET count = EXCLUDED.count
  `,
      [locationId],
    );

    // Cập nhật rating_avg và rating_count trong locations
    await pool.query(
      `
    UPDATE locations SET
      rating_avg   = (SELECT ROUND(AVG(rating)::numeric, 1) FROM reviews WHERE location_id = $1 AND status = 'published'),
      rating_count = (SELECT COUNT(*) FROM reviews WHERE location_id = $1 AND status = 'published')
    WHERE id = $1
  `,
      [locationId],
    );
  }
}
