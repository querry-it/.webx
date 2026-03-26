import { Api } from '../utils/api';
import { accessToken } from '../utils/accessToken';
import { UserHook } from '../hook/user';

export const useFetchHistory = () => {
  const { getAccessToken, setAccessToken } = accessToken();
  const { setUserId, getUserId } = UserHook();

  const fetchHistory = async (setRecentSearches: Function) => {
    const userId = getUserId();
    if (!userId) return;

    try {
      const data = await Api<{
        success: boolean;
        data: { id: String; location_id: string; query: string }[];
      }>(
        {
          method: 'GET',
          url: `/locations/history/all/${userId}`,
        },
        {
          token: getAccessToken(),
          setToken: setAccessToken,
          setUserId,
        },
      );

      if (data.success && data.data) {
        const currentLocation = {
          id: '0',
          name: 'Vị trí của bạn',
          locationId: '8f6c9d74-3e2a-4c0c-8b13-92e0e7b6f4c1',
          address: 'Không xác định',
          status: null,
          open: true,
          openTime: null,
          lat: null,
          lon: null,
        };

        setRecentSearches([
          currentLocation,
          ...data.data.map((item) => ({
            id: item.id,
            name: item.query,
            locationId: item.location_id,
            address: item.address,
            status: 'Đang mở cửa',
            open: true,
            openTime: '07:30',
            lat: item.lat,
            lon: item.lon,
          })),
        ]);
      }
    } catch (error) {
      console.error('Lỗi lấy lịch sử:', error);
    }
  };

  return { fetchHistory };
};
