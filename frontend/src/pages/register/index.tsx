//
import { useState, useEffect, type FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { validationRegister } from "../../utils/validation_register";
import "./style.css";

interface User {
    code: string;
    username: string;
    password: string;
    confirm: string;
}

export default function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        code: "",
        username: "",
        password: "",
        confirm: "",
    });

    const [error, setError] = useState<string>("");
    const [activePassword, setActivePassword] = useState<boolean>(false);
    const [activeConfirmPassword, setActiveConfirmPassword] =
        useState<boolean>(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const checkRegister = validationRegister(user);

        if (checkRegister === "") {
            try {
                const response = await axios.post(
                    "http://localhost:5000/auth/register",
                    { ...user }
                );
                setError(response.data.success);
            } catch (error: any) {
                setError(
                    error.response?.data?.message ||
                        "Lỗi mất kết nối  server..."
                );
            }
        } else {
            setError(checkRegister);
        }
    };

    return (
        <div className="register__container">
            <div className="register__box">
                <div className="box__title">
                    <h3>Tạo tài khoảnn</h3>
                </div>
                <div className="box__form">
                    <form onSubmit={handleSubmit}>
                        <div className="form__user">
                            <label className="label__form">Mã giới thiệu</label>
                            <div className="code__content">
                                <i className="fa-solid fa-key"></i>
                                <input
                                    className="input__form"
                                    type="text"
                                    placeholder="Nhập mã giới thiệu..."
                                    value={user.code}
                                    onChange={(e) =>
                                        setUser((prev) => ({
                                            ...prev,
                                            code: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="form__user">
                            <label className="label__form">Tài khoản</label>
                            <div className="user__content">
                                <i className="fa-solid fa-user"></i>
                                <input
                                    className="input__form"
                                    type="text"
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
                            <label className="label__form">Mật khẩu</label>
                            <div className="pass__content">
                                <i className="fa-solid fa-lock-open"></i>
                                <input
                                    className="input__form"
                                    type={activePassword ? "text" : "password"}
                                    placeholder="Nhập mật khẩu..."
                                    value={user.password}
                                    onChange={(e) =>
                                        setUser((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                />
                                <button
                                    className=""
                                    type="button"
                                    onClick={() =>
                                        setActivePassword((prev) => !prev)
                                    }
                                >
                                    {activePassword ? (
                                        <i className="fas fa-eye-slash"></i>
                                    ) : (
                                        <i className="fas fa-eye"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="form__confirm">
                            <label className="label__form">
                                Xác nhận mật khẩu
                            </label>
                            <div className="confirm__content">
                                <i className="fa-solid fa-lock"></i>
                                <input
                                    className="input__form"
                                    type={
                                        activeConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Nhập lại mật khẩu..."
                                    value={user.confirm}
                                    onChange={(e) =>
                                        setUser((prev) => ({
                                            ...prev,
                                            confirm: e.target.value,
                                        }))
                                    }
                                />
                                <button
                                    className=""
                                    type="button"
                                    onClick={() =>
                                        setActiveConfirmPassword(
                                            (prev) => !prev
                                        )
                                    }
                                >
                                    {activeConfirmPassword ? (
                                        <i className="fas fa-eye-slash"></i>
                                    ) : (
                                        <i className="fas fa-eye"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="form__button">
                            <button className="submit__button">Xác nhận</button>
                        </div>
                        <div className="form__back">
                            <p>
                                Đã có tài khoản?.{" "}
                                <Link className="link__back" to="/">
                                    Quay lại
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="error__box">
                <p>{error === "" ? "" : error}</p>
            </div>
        </div>
    );
}
