import axios from 'axios';

export async function refreshToken() {
  const res = await axios.post(
    'http://localhost:5000/auth/refresh',
    {},
    { withCredentials: true },
  );

  return res.data.data;
}
