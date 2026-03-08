import { LocationRepository } from '../repositories/location.repository';

export class LocationService {
  static async searchLocation(keyword: string) {
    if (!keyword?.trim()) return [];
    return LocationRepository.searchLocation(keyword.trim());
  }
  static async getHistory(userId: string) {
    const total = await LocationRepository.countHistoryByUser(userId);

    if (total === 0) {
      throw new Error('Không có lịch sử.');
    }

    const histories = await LocationRepository.getHistoryByUser(userId);

    return {
      total,
      count: histories.length,
      histories,
    };
  }
  static async createHistory(
    userId: string,
    query: string,
    locationId: string,
  ) {
    if (!userId || !query || !locationId) {
      throw new Error('Thiếu dữ liệu bắt buộc.');
    }

    await LocationRepository.deleteHistoryByLocationId(userId, locationId);
    await LocationRepository.createHistory(userId, query.trim(), locationId);

    return {
      message: 'Tạo lịch sử thành công.',
    };
  }
  static async deleteHistory(id: string) {
    if (!id) {
      throw new Error('Thiếu id.');
    }

    const deleted = await LocationRepository.deleteHistoryById(id);

    if (!deleted) {
      throw new Error('Không tìm thấy lịch sử để xoá.');
    }

    return {
      message: 'Xoá lịch sử thành công.',
    };
  }
  static async getLocation(locationId: string) {
    const infor =
      await LocationRepository.getInformationLocationByLocationId(locationId);

    if (!infor) {
      throw new Error('Địa điểm không tồn tại.');
    }

    const time_open =
      await LocationRepository.getOpeningHourByLocationId(locationId);

    const articles =
      await LocationRepository.getArticlesByLocationId(locationId);

    return {
      id: infor.location_id,
      name: infor.name,
      address: infor.address,
      desc: infor.description,
      img: infor.image,
      rating: infor.rating_avg,
      reviews: infor.rating_count,
      type: infor.category,
      lat: infor.lat,
      lon: infor.lon,

      open: time_open.map((item: any) => ({
        day: item.day_of_week,
        time: `${item.open_time} - ${item.close_time}`,
      })),

      externalArticles: articles.map((item: any) => ({
        id: item.id,
        lang: item.lang,
        source: item.source,
        title: item.title,
        url: item.url,
        api: item.url,
      })),
    };
  }
  static async getFeedbacks(locationId: string, userId: string | null) {
    const [location, stars, reviews] = await Promise.all([
      LocationRepository.getLocationRating(locationId),
      LocationRepository.getRatingStars(locationId),
      LocationRepository.getReviews(locationId),
    ]);

    if (!location) return null;

    const ratingStar = stars.reduce<Record<number, number>>((acc, row) => {
      acc[row.star] = parseInt(row.count, 10);
      return acc;
    }, {});

    const summary = {
      rating: parseFloat(location.rating_avg),
      reviews: parseInt(location.rating_count, 10),
      ratingStar,
    };

    const list = await Promise.all(
      reviews.map(async (review) => {
        const [user, images, likes, liked] = await Promise.all([
          LocationRepository.getUserById(review.user_id),
          LocationRepository.getReviewImages(review.id),
          LocationRepository.getLikeCount(review.id),
          LocationRepository.isLikedByUser(review.id, userId),
        ]);

        return {
          id: review.id,
          user: {
            name: user?.fullname ?? 'Ẩn danh',
            avatar: user?.avatar_url ?? null,
          },
          rating: review.rating,
          content: review.content,
          images: images.map((img) => img.url),
          createdAt: review.created_at,
          likes,
          liked,
        };
      }),
    );

    return { summary, list };
  }
}
