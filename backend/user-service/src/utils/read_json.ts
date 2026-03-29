import fs from 'fs';
import path from 'path';

type Point = {
  name: string;
  lat: number;
  lon: number;
  category: string;
};

type DataItem = {
  id: string;
  points: Point[];
};

export function getPointsFromFile(
  id: string,
  filePath: string,
): Point[] | null {
  try {
    const raw = fs.readFileSync(path.resolve(filePath), 'utf-8');
    const data: DataItem[] = JSON.parse(raw);
    const item = data.find((d) => d.id === id);
    return item ? item.points : null;
  } catch (err) {
    console.error('Lỗi đọc file:', err);
    return null;
  }
}

export function readDataFile(filePath: string): DataItem[] {
  try {
    const raw = fs.readFileSync(path.resolve(filePath), 'utf-8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error('File không đúng định dạng');
    return data as DataItem[];
  } catch (err) {
    console.error('Lỗi đọc file JSON:', err);
    return [];
  }
}
