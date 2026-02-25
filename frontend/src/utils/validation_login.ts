export const validationLogin = (username: string, password: string): string => {
  const usernameRegex = /^[a-zA-Z0-9._-]{8,20}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;

  if (!username.trim() || !password.trim())
    return 'Vui lòng nhập đầy đủ thông tin';
  if (!usernameRegex.test(username) || !passwordRegex.test(password))
    return 'Tài khoản hoặc mật khẩu không chính xác';
  return 'true';
};
