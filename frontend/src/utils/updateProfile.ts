import { Api } from './api';

export async function updateProfile(
  fullname: string,
  username: string,
  token: string | null,
  setToken: (t: string | null) => void,
  setUserId: (id: string | null) => void,
) {
  return await Api(
    {
      method: 'PATCH',
      url: '/auth/profile',
      data: { fullname, username },
    },
    { token, setToken, setUserId },
  );
}
