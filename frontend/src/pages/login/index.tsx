import { useState, useRef, type FormEvent, useEffect } from "react";
import { validationLogin } from "../../utils/validation_login";
import { getAccessToken, setAccessToken } from "../../utils/accessToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
    username: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);
    const passRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getAccessToken();

                if (token) {
                    const [loginRes] = await Promise.all([
                        axios.post(
                            "http://localhost:5000/auth/refresh",
                            {},
                            { withCredentials: true }
                        ),
                        axios.post(
                            "http://localhost:5000/auth/clear-login",
                            {},
                            { withCredentials: true }
                        ),
                    ]);

                    setAccessToken(loginRes.data.accessToken);
                    navigate("/home");
                } else {
                    await axios.post(
                        "http://localhost:5000/auth/clear-login",
                        {},
                        { withCredentials: true }
                    );
                }
            } catch (error: any) {
                setError(
                    error.response?.data?.message || "Lỗi mất kết nối server..."
                );
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const checkLogin = validationLogin(user.username, user.password);

        if (checkLogin === "") {
            try {
                const response = await axios.post(
                    "http://localhost:5000/auth/login",
                    {
                        ...user,
                    },
                    {
                        withCredentials: true,
                    }
                );
                setAccessToken(response.data.accessToken);
                navigate("/home");
            } catch (error: any) {
                setError(
                    error.response?.data?.message || "Lỗi mất kết nối server..."
                );
                setUser((prev) => ({
                    ...prev,
                    password: "",
                }));
                passRef.current?.focus();
            }
        } else {
            setError(checkLogin);
            setUser((prev) => ({
                ...prev,
                password: "",
            }));
            passRef.current?.focus();
        }
    };

    const handleForgot = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post(
                "http://localhost:5000/auth/request-forgot",
                {},
                { withCredentials: true }
            );
            navigate("/forgot-password");
        } catch {
            setError("Lỗi mất kết nối server...");
        }
    };

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post(
                "http://localhost:5000/auth/request-register",
                {},
                { withCredentials: true }
            );
            navigate("/register");
        } catch {
            setError("Lỗi mất kết nối server...");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100" >
            <div className="w-[400px] h-[350px] bg-white rounded-[12px] overflow-hidden">
                <div className="flex justify-center items-center w-full h-[68px] bg-blue-400 ">
                    <h3 className="text-[20px] text-white">Đăng nhập</h3>
                </div>
                <div className="flex flex-col items-center justify-center h-[200px] my-10">
                    <form onSubmit={handleSubmit}>
                        <div className="gap-10">
                            <div className="flex items-center relative border rounded-[5px] h-[44px] hover:cursor-pointer focus-within:border-blue-500 transtition-colors">
                                <i className="fa-solid fa-user absolute top-1/2 -translate-y-1/2 text-[20px] text-gray-600"></i>
                                <input
                                    type="text"
                                    className="w-[90%] ml-12 h-full outline-none border-none text-[16px] "
                                    placeholder="Nhập tài khoản..."
                                    value={user.username}
                                    onChange={(e) =>
                                        setUser((prev) => ({
                                            ...prev,
                                            username: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="form__pass">
                            <div className="pass__content">
                                <i className="fa-solid fa-lock"></i>
                                <input
                                    type={active ? "text" : "password"}
                                    className="pass__input"
                                    placeholder="Nhập mật khẩu..."
                                    ref={passRef}
                                    value={user.password}
                                    onChange={(e) =>
                                        setUser((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                />
                                <button
                                    type="button"
                                    className="pass__button"
                                    onClick={() => setActive((prev) => !prev)}
                                >
                                    {active ? (
                                        <i className="fas fa-eye-slash"></i>
                                    ) : (
                                        <i className="fas fa-eye"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="form__forgot">
                            <button
                                onClick={handleForgot}
                                className="forgot__button"
                            >
                                Quên mật khẩu
                            </button>
                        </div>
                        <div className="form__submit">
                            <button type="submit" className="submit__button">
                                Đăng nhập.
                            </button>
                        </div>
                        <div className="form__register">
                            <p className="register__content">
                                Chưa có tài khoản.{" "}
                                <button
                                    onClick={handleRegister}
                                    className="forgot__button"
                                >
                                    Create Account
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="login__error">
                <p className="error_line">{error !== "" ? error : ""}</p>
            </div>
        </div>
    );
}
