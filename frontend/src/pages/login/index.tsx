import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormLayout from '../../components/FormLayout';
import InputField from '../../components/InputField';
import ForgotPassword from '../../components/ForgotPassword';
import { getAccessToken, setAccessToken } from '../../utils/accessToken';
import { validationLogin } from '../../utils/validation_login';
import SubmitButton from '../../components/SubmitButton';
import SwitchLink from '../../components/SwitchLink';
import PasswordToggle from '../../components/PasswordToggle';
interface User {
  username: string;
  password: string;
}

interface Active {
  username: boolean;
  password: boolean;
}

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    username: '',
    password: '',
  });
  const [activeUser, setActiveUser] = useState<Active>({
    username: false,
    password: false,
  });
  const [active, setActive] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Refresh token khi vào trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          const [loginRes] = await Promise.all([
            axios.post(
              'http://localhost:5000/auth/refresh',
              {},
              { withCredentials: true },
            ),
            axios.post(
              'http://localhost:5000/auth/clear-login',
              {},
              { withCredentials: true },
            ),
          ]);

          if (loginRes.status === 200) {
            setAccessToken(loginRes.data.accessToken);
            navigate('/home');
          }
        } else {
          await axios.post(
            'http://localhost:5000/auth/clear-login',
            {},
            { withCredentials: true },
          );
        }
      } catch (error: any) {
        console.warn('Client refresh failed');
        if (!error.response) {
          console.warn('Network error!');
        }
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkLogin = validationLogin(user.username, user.password);

    if (checkLogin === '') {
      try {
        const response = await axios.post(
          'http://localhost:5000/auth/login',
          { ...user },
          { withCredentials: true },
        );
        setAccessToken(response.data.accessToken);
        navigate('/home');
      } catch (error: any) {
        setError(error.response?.data?.message || 'Lỗi mất kết nối server...');
        setUser((prev) => ({ ...prev, password: '' }));
        passRef.current?.focus();
      }
    } else {
      setError(checkLogin);
      if (!user.username) userRef.current?.focus();
      else if (user['username'].trim() === '') {
        setUser((prev) => ({
          ...prev,
          password: '',
        }));
        userRef.current?.focus();
      } else passRef.current?.focus();
    }
  };

  const handleForgot = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/auth/request-forgot',
        {},
        { withCredentials: true },
      );
      navigate('/forgot-password');
    } catch {
      setError('Lỗi mất kết nối server...');
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/auth/request-register',
        {},
        { withCredentials: true },
      );
      navigate('/register');
    } catch {
      setError('Lỗi mất kết nối server...');
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        btnRef.current?.click();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <FormLayout title="Đăng nhập" onSubmit={handleSubmit} error={error}>
      <InputField
        ref={userRef}
        iconClass="fa-solid fa-user"
        label="Nhập tài khoản"
        placeholder="Nhập tài khoản..."
        type="text"
        value={user.username}
        active={activeUser.username}
        onFocus={() => setActiveUser((p) => ({ ...p, username: true }))}
        onBlur={() => setActiveUser((p) => ({ ...p, username: false }))}
        onChange={(v) => setUser((p) => ({ ...p, username: v }))}
      />

      <InputField
        ref={passRef}
        iconClass="fa-solid fa-lock"
        label="Nhập mật khẩu"
        placeholder="Nhập mật khẩu..."
        type={active ? 'text' : 'password'}
        value={user.password}
        active={activeUser.password}
        onFocus={() => setActiveUser((p) => ({ ...p, password: true }))}
        onBlur={() => setActiveUser((p) => ({ ...p, password: false }))}
        onChange={(v) => setUser((p) => ({ ...p, password: v }))}
        rightElement={
          <PasswordToggle
            active={active}
            onClick={() => setActive((p) => !p)}
          />
        }
      />

      <div className="flex justify-end -mt-9">
        <ForgotPassword onClick={handleForgot} />
      </div>

      <SubmitButton text="Đăng nhập" btnRef={btnRef} />

      <SwitchLink
        text="Bạn đã có tài khoản?."
        actionText="Tạo tài khoản"
        onClick={handleRegister}
      />
    </FormLayout>
  );
}
