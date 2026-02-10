import { createHashRouter } from 'react-router-dom';
import publicRoutes from './routes/public';

export const router = createHashRouter(publicRoutes, {
  basename: '/.webx',
});
