export const validationProfile = (info: object): string => {
  const nameRegex = /^[A-Za-zÀ-ỹ]{2,16}(?: [A-Za-zÀ-ỹ]+)*$/;
  const userRegex = /^[a-zA-Z0-9._-]{8,20}$/;

  if (!info.name.trim() || !info.code.trim()) {
    return 'Vui lòng nhập đầy đủ các thông tin';
  }
  if (!nameRegex.test(info.name)) {
    return 'Tên hiển thị không đúng định dạng';
  }
  if (!userRegex.test(info.code)) {
    return 'Tài khoản không đúng định dạng';
  }
  return '';
};
