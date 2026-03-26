import { domain } from './domain';

export const fetchReviews = async (userId: string) => {
  const res = await fetch(`${domain}/locations/reviews/${userId}`, {
    method: 'GET',
  });

  if (!res.ok) throw new Error('Failed to fetch reviews');

  return res.json();
};
