import axios from 'axios';
import { domain } from './domain';

export async function refreshToken() {
  const res = await axios.post(
    `${domain}/auth/refresh`,
    {},
    { withCredentials: true },
  );

  return res.data.data;
}
