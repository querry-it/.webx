import { useEffect, useState, useRef, type FormEvent } from 'react';
import { validationForgot } from '../../utils/validation_forgot';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../../components/InputField';
import FormLayout from '../../components/FormLayout';
import SubmitButton from '../../components/SubmitButton';
import SwitchLink from '../../components/SwitchLink';
import { domain } from '../../utils/domain';

interface User {
  code: string;
  username: string;
}

interface Active {
  code: boolean;
  username: boolean;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [textLogin, setTextLogin] = useState<string | undefined>('Xác nhận');
  const [user, setUser] = useState<User>({
    code: '',
    username: '',
  });
  const [error, setError] = useState<string>('');
  const [activeUser, setActiveUser] = useState<Active>({
    code: false,
    username: false,
  });

  const codeRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchForgot = async () => {
      try {
        await axios.post(
          `${domain}/auth/clear-forgot`,
          {},
          { withCredentials: true },
        );
      } catch {
        setError('Lỗi mất kết nối server');
      }
    };
    fetchForgot();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTextLogin(undefined);
    const checkForgot = validationForgot(user.code, user.username);

    if (checkForgot === '') {
      try {
        const response = await axios.post(`${domain}/auth/forgot-password`, {
          ...user,
        });
        try {
          await axios.post(`${domain}/auth/request-reset`);
          navigate('/reset-password', {
            state: { userId: response.data.data.userid },
          });
        } catch {
          setError('Lỗi server mất kết nối...');
        }
      } catch (error: any) {
        setError(error.response?.data?.message || 'Lỗi server mất kết nối...');
        setUser((prev) => ({ ...prev, password: '' }));
        usernameRef.current?.focus();
      }
    } else {
      setError(checkForgot);
      if (!user.code) codeRef.current?.focus();
      else if (user['code'].trim() === '') {
        setUser((prev) => ({
          ...prev,
          username: '',
        }));
        codeRef.current?.focus();
      } else usernameRef.current?.focus();
    }
    setTextLogin('Xác nhận');
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
    <FormLayout title="Quên mật khẩu" onSubmit={handleSubmit} error={error}>
      <InputField
        ref={codeRef}
        iconClass="fa-solid fa-key"
        label="Nhập mã xác nhận"
        placeholder="Nhập mã xác nhận..."
        type="text"
        value={user.code}
        active={activeUser.code}
        onFocus={() => setActiveUser((p) => ({ ...p, code: true }))}
        onBlur={() => setActiveUser((p) => ({ ...p, code: false }))}
        onChange={(v) => setUser((p) => ({ ...p, code: v }))}
      />

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

      <SubmitButton text={textLogin} btnRef={btnRef} />

      <SwitchLink text="Bạn đã có tài khoản?." actionText="Quay lại" to="/" />
    </FormLayout>
  );
}
