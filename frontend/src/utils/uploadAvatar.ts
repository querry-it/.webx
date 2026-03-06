import { Api } from './api';

const CHUNK_SIZE = 2 * 1024 * 1024;

export async function uploadAvatar(
  file: File,
  opt: {
    token: string | null;
    setToken: (t: string | null) => void;
    setUserId: (id: string | null) => void;
  },
) {
  const total = Math.ceil(file.size / CHUNK_SIZE);

  for (let i = 0; i < total; i++) {
    const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);

    const result = await Api(
      {
        method: 'POST',
        url: '/upload/avatar',
        headers: {
          'x-file-name': file.name,
          'x-chunk-index': String(i),
          'x-total-chunks': String(total),
          'Content-Type': 'application/octet-stream',
        },
        data: chunk,
      },
      opt,
    );

    if (result.data?.done) {
      return result.data.url;
    }
  }
}
