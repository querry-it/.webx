import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { domain } from './domain';

let refreshing: Promise<string> | null = null;

type ApiOptions = {
  token: string | null;
  setToken: (t: string | null) => void;
  setUserId: (id: string | null) => void;
};

export async function Api<T = any>(
  config: AxiosRequestConfig,
  opt: ApiOptions,
): Promise<T> {
  try {
    return await request<T>(config, opt.token);
  } catch (err) {
    const error = err as AxiosError;

    if (error.response?.status !== 401) {
      throw error;
    }

    if (!refreshing) {
      refreshing = axios
        .post('${domain}/auth/refresh', {}, { withCredentials: true })
        .then((res) => {
          const newToken = res.data.data.accessToken;
          const userId = res.data.data.userId;

          opt.setToken(newToken);
          opt.setUserId(userId);

          return newToken;
        })
        .catch((refreshErr) => {
          opt.setToken(null);
          opt.setUserId(null);
          window.location.href = '/';
          throw refreshErr;
        })
        .finally(() => {
          refreshing = null;
        });
    }

    const newToken = await refreshing;
    return request<T>(config, newToken);
  }
}

async function request<T>(
  config: AxiosRequestConfig,
  token: string | null,
): Promise<T> {
  const res = await axios({
    baseURL: domain,
    ...config,
    headers: {
      ...(config.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  });

  return res.data as T;
}
