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
  static async getAllLocations() {
    return LocationRepository.getAllLocations();
  }
  static async getLocationsByCategory(category: string) {
    return LocationRepository.getLocationByCategory(category);
  }
  static async getAllHistory(userId: string) {
    const histories = await LocationRepository.getAllHistoryByUser(userId);
    if (!histories?.length) return [];

    // Lấy danh sách location_id duy nhất
    const locationIds = [...new Set(histories.map((h) => h.location_id))];

    // Query address & lat/lon 1 lần
    const [locations, latLonData] = await Promise.all([
      LocationRepository.getAddressesByLocationIds(locationIds),
      LocationRepository.getLatLonByLocationIds(locationIds),
    ]);

    // Tạo map address theo id
    const addressMap = new Map(locations.map((loc) => [loc.id, loc.address]));

    // Tạo map lat/lon theo id
    const latLonMap = new Map(
      latLonData.map((loc) => [loc.id, { lat: loc.lat, lon: loc.lon }]),
    );

    // Trả về kết quả đầy đủ
    return histories.map((h) => ({
      ...h,
      address: addressMap.get(h.location_id) ?? null,
      lat: latLonMap.get(h.location_id)?.lat ?? null,
      lon: latLonMap.get(h.location_id)?.lon ?? null,
    }));
  }
  static async getLocationByKeyword(keyword: string) {
    return LocationRepository.getLocationByKeyword(keyword);
  }
  // service
  static async getReviewsByUserId(userId: string) {
    const reviews = await LocationRepository.getReviewsByUserId(userId);
    if (!reviews?.length) return [];

    const locationIds = [...new Set(reviews.map((r) => r.location_id))];

    const [locations, latLonData, images, reviewImages] = await Promise.all([
      LocationRepository.getAddressesByLocationIds(locationIds),
      LocationRepository.getLatLonByLocationIds(locationIds),
      Promise.all(
        locationIds.map((id) => LocationRepository.getImageByLocationId(id)),
      ),
      Promise.all(reviews.map((r) => LocationRepository.getReviewImages(r.id))),
    ]);

    return reviews.map((r, i) => {
      const location = locations.find((l) => l.id === r.location_id);
      const latLon = latLonData.find((l) => l.id === r.location_id);
      const imageIndex = locationIds.indexOf(r.location_id);
      const avatar = images[imageIndex]?.[0]?.image ?? null;

      return {
        id: r.id,
        location: {
          name: location?.name ?? null,
          address: location?.address ?? null,
          avatar,
        },
        rating: r.rating,
        content: r.content,
        images: reviewImages[i].map((img) => img.url),
        createdAt: r.created_at,
        likes: Number(r.likes) ?? 0,
        liked: r.liked ?? false,
      };
    });
  }
}
