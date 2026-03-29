// utils/loadEditorData.ts
export function loadEditorDataWithDefault() {
  // Helper load từ localStorage, nếu chưa có thì trả về false
  const load = (key: string, defaultKeys: string[] | number[]) => {
    try {
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
      // Nếu chưa có, tạo object tất cả key = false
      const obj: Record<string, boolean> = {};
      defaultKeys.forEach((k) => {
        obj[k] = false;
      });
      return obj;
    } catch (err) {
      console.warn(`Cannot parse localStorage key ${key}`, err);
      return {};
    }
  };

  return {
    class: load('checkedClass', ['1', '2', '3', '4', '5']),
    marker: load(
      'checkedMarker',
      Array.from({ length: 12 }, (_, i) => String(i + 1)),
    ),
    travel: load('checkedTravel', [
      '6f2c1a9d-4c11-4f2b-9c10-111111111111',
      '7a3d2b8e-5d22-4c3b-8d21-222222222222',
      '8b4e3c9f-6e33-4d4c-9e32-333333333333',
      '9c5f4d0a-7f44-4e5d-8f43-444444444444',
      'ad6e5f1b-8055-4f6e-9f54-555555555555',
      'be7f601c-9166-4a7f-8b65-666666666666',
      'cf80112d-a277-4b8a-9c76-777777777777',
      'd081223e-b388-4c9b-8d87-888888888888',
      'e192334f-c499-4dac-9d98-999999999999',
      'f2a3445f-d5aa-4ebc-8e0a-aaaaaaaaaaaa',
    ]),
  };
}
