import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import uploadRoutes from './routes/upload.routes';
import router from './routes/review.routes';
import locationRouter from './routes/location.routes';
import { parse } from 'node-html-parser';

const app: Application = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
);

app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/reviews', router);
app.use('/locations', locationRouter);
app.use('/uploads', express.static('uploads'));

app.get('/', (req: Request, res: Response) => {
  res.send(`Service is running port : ${5000}`);
});

app.get('/proxy/fetch-article', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();
      return res.json(data);
    }

    const html = await response.text();
    const root = parse(html);

    root
      .querySelectorAll('script, style, nav, header, footer, aside')
      .forEach((el) => el.remove());

    const paragraphs = root.querySelectorAll('p');
    const extract =
      paragraphs.map((p) => p.text.trim()).find((text) => text.length > 50) ||
      null;

    return res.json({ extract });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch', detail: err.message });
  }
});

export default app;
