import { v4 as uuidv4 } from 'uuid';
import { domain } from './domain';

export const fetchKeyword = async (
  keyword: string,
  setRecentSearches: (v: any[]) => void,
) => {
  if (!keyword.trim()) {
    setRecentSearches([]);
    return;
  }

  try {
    const response = await fetch(`${domain}/locations/search/${keyword}`);

    if (!response.ok) {
      throw new Error('Network error');
    }

    const data = await response.json();

    setRecentSearches(
      data.data.map((item) => ({
        id: uuidv4(),
        name: item.name,
        locationId: item.id,
        address: item.address,
        status: 'Đang mở cửa',
        open: true,
        openTime: '07:30',
        lat: item.lat,
        lon: item.lon,
      })),
    );
  } catch (error) {
    console.error('Error fetching keyword:', error);
    setRecentSearches([]);
  }
};
