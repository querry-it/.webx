import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { validationReset } from '../../utils/validation_reset';
import InputField from '../../components/InputField';
import FormLayout from '../../components/FormLayout';
import SubmitButton from '../../components/SubmitButton';
import SwitchLink from '../../components/SwitchLink';
import PasswordToggle from '../../components/PasswordToggle';
import axios from 'axios';
import { domain } from '../../utils/domain';

interface User {
  password: string;
  confirmPassword: string;
}

interface Active {
  password: boolean;
  confirmPassword: boolean;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [textLogin, setTextLogin] = useState<string | undefined>('Xác nhận');
  const [user, setUser] = useState<User>({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [active_pass, setActivePass] = useState<boolean>(false);
  const [active_conf, setActiveConf] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<Active>({
    password: false,
    confirmPassword: false,
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTextLogin(undefined);
    const checkReset = validationReset(user.password, user.confirmPassword);

    if (checkReset === '') {
      try {
        const response = await axios.post(`${domain}/auth/reset-password`, {
          userid: state.userId,
          password: user.password,
        });

        setError(response.data.message);
        navigate('/');
      } catch (error: any) {
        setError(error.response?.data?.message || 'Lỗi mất kết nối  server...');
        setUser((prev) => ({ ...prev, confirmPassword: '' }));
        confirmPasswordRef.current?.focus();
      }
    } else {
      setError(checkReset);
      if (!user.password) passwordRef.current?.focus();
      else if (user['password'].trim() === '') {
        setUser((prev) => ({
          ...prev,
          confirmPassword: '',
        }));
        passwordRef.current?.focus();
      } else confirmPasswordRef.current?.focus();
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
    <FormLayout title="Đổi mật khẩu" onSubmit={handleSubmit} error={error}>
      <InputField
        ref={passwordRef}
        iconClass="fa-solid fa-lock"
        label="Nhập mật khẩu"
        placeholder="Nhập mật khẩu..."
        type={active_pass ? 'text' : 'password'}
        value={user.password}
        active={activeUser.password}
        onFocus={() => setActiveUser((p) => ({ ...p, password: true }))}
        onBlur={() => setActiveUser((p) => ({ ...p, password: false }))}
        onChange={(v) => setUser((p) => ({ ...p, password: v }))}
        rightElement={
          <PasswordToggle
            active={active_pass}
            onClick={() => setActivePass((p) => !p)}
          />
        }
      />

      <InputField
        ref={confirmPasswordRef}
        iconClass="fa-solid fa-lock"
        label="Nhập xác nhận mật khẩu"
        placeholder="Nhập xác nhận mật khẩu..."
        type={active_conf ? 'text' : 'password'}
        value={user.confirmPassword}
        active={activeUser.confirmPassword}
        onFocus={() => setActiveUser((p) => ({ ...p, confirmPassword: true }))}
        onBlur={() => setActiveUser((p) => ({ ...p, confirmPassword: false }))}
        onChange={(v) => setUser((p) => ({ ...p, confirmPassword: v }))}
        rightElement={
          <PasswordToggle
            active={active_conf}
            onClick={() => setActiveConf((p) => !p)}
          />
        }
      />

      <SubmitButton text={textLogin} btnRef={btnRef} />

      <SwitchLink text="Đã có tài khoản." actionText="Quay lại" to="/" />
    </FormLayout>
  );
}
