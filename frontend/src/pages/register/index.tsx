
import { useState, useEffect, type FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { validationRegister } from "../../utils/validation_register";
interface User {
    code: string;
    username: string;
    password: string;
    confirm: string;
}

interface Active {
    code: boolean;
    username: boolean;
    password: boolean;
    confirm: boolean;
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
    const [activeUser, setActiveUser] = useState<Active>({
        code: false,
        username: false,
        password: false,
        confirm: false,
    })

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
        <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 to-pink-500">
            <div className="w-[450px] bg-white rounded-[12px] overflow-hidden]">
                <div className="flex justify-center items-center w-full h-[80px]">
                    <h3 className="text-[20px] text-blue-500 font-bold bg-gradient-to-tr from-blue-500 to-pink-500 bg-clip-text text-transparent">Tạo tài khoản</h3>
                </div>
                <div className="flex flex-col items-center justify-center my-10 px-20">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-8">
                            <div className={`flex items-center relative ${!activeUser.code
                                ? "border border-[#747775]"
                                : "border-2 border-blue-600"
                                } rounded-[5px] h-[45px]`}>
                                {!activeUser.code && (
                                    <i className="fa-solid fa-key absolute top-1/2 -translate-y-1/2 text-[20px] ml-[5px] text-gray-500"></i>
                                )}
                                {activeUser.code && (
                                    <p className="whitespace-nowrap absolute -top-[11px] left-[12px] bg-white px-2 text-blue-600">Nhập mã giới thiệu</p>
                                )}
                                <input
                                    onFocus={() =>
                                        setActiveUser((prev) => ({
                                            ...prev,
                                            code: true,
                                        }))
                                    }
                                    onBlur={() =>
                                        setActiveUser((prev) => ({
                                            ...prev,
                                            code: false,
                                        }))
                                    }
                                    className="mx-[40px] w-full h-full  border border-none outline-none text-[16px] focus:ml-[18px]"
                                    type="text"
                                    placeholder={activeUser.code ? "" : "Nhập mã giới thiệu..."}
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
                        <div className="mb-8">
                            <div className={`flex items-center relative ${!activeUser.username
                                ? "border border-[#747775]"
                                : "border-2 border-blue-600"
                                } rounded-[5px] h-[45px]`}>
                                {!activeUser.username && (
                                    <i className="fa-solid fa-user absolute top-1/2 -translate-y-1/2 text-[20px] ml-[5px] text-gray-500"></i>
                                )}
                                {activeUser.username && (
                                    <p className="whitespace-nowrap absolute -top-[11px] left-[12px] bg-white px-2 text-blue-600">
                                        Nhập tài khoản
                                    </p>
                                )}
                                <input
                                    onFocus={() =>
                                        setActiveUser((prev) => ({
                                            ...prev,
                                            username: true,
                                        }))
                                    }
                                    onBlur={() =>
                                        setActiveUser((prev) => ({
                                            ...prev,
                                            username: false,
                                        }))
                                    }
                                    className="mx-[44px] w-full h-full outline-none border-none text-[16px] focus:ml-[18px]"
                                    type="text"
                                    placeholder={activeUser.username ? "" : "Nhập tài khoản..."}
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
                        <div className="mb-8">
                            <div className={`flex items-center relative ${!activeUser.password
                                ? "border border-[#747775]"
                                : "border-2 border-blue-600"
                                } rounded-[5px] h-[45px]`}>
                                {!activeUser.password && (
                                    <i className="fa-solid fa-lock-open absolute top-1/2 -translate-y-1/2 text-[20px] ml-[5px] text-gray-500"></i>
                                )}
                                {activeUser.password && (
                                    <p className="whitespace-nowrap absolute -top-[11px] left-[12px] bg-white px-2 text-blue-600">
                                        Nhập mật khẩu
                                    </p>
                                )}
                                <input
                                    onFocus={() =>
                                        setActiveUser((prev) => ({
                                            ...prev,
                                            password: true,
                                        }))
                                    }
                                    onBlur={() =>
                                        setActiveUser((prev) => ({
                                            ...prev,
                                            password: false,
                                        }))
                                    }
                                    className="mx-[44px] w-full h-full outline-none border-none text-[16px] focus:ml-[18px]"
                                    type={activePassword ? "text" : "password"}
                                    placeholder={activeUser.password ? "" : "Nhập mật khẩu..."}
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
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px] text-gray-500"
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
                        <div>
                            <div className={`flex items-center relative 
                                ${!activeUser.confirm
                                    ? "border border-[#747775]"
                                    : "border-2 border-blue-600"
                                } rounded-[5px] h-[45px]`}
                            >
                                {!activeUser.confirm && (
                                    <i className="fa-solid fa-lock absolute top-1/2 -translate-y-1/2 text-[20px] ml-[5px] text-gray-500 "></i>
                                )}
                                {activeUser.confirm && (
                                    <p className="whitespace-nowrap absolute -top-[11px] left-[12px] bg-white px-2 text-blue-600">
                                        Nhập lại mật khẩu
                                    </p>
                                )}
                                <input
                                    onFocus={() =>
                                        setActiveUser((prev) => ({
                                            ...prev,
                                            confirm: true,
                                        }))
                                    }
                                    onBlur={() =>
                                        setActiveUser((prev) => ({
                                            ...prev,
                                            confirm: false,
                                        }))
                                    }
                                    type={
                                        activeConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="mx-[44px] w-full h-full outline-none border-none text-[16px] focus:ml-[18px]"
                                    placeholder={
                                        activeUser.confirm
                                            ? ""
                                            : "Nhập lại mật khẩu..."
                                    }
                                    value={user.confirm}
                                    onChange={(e) =>
                                        setUser((prev) => ({
                                            ...prev,
                                            confirm: e.target.value,
                                        }))
                                    }
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px]"
                                    onClick={() =>
                                        setActiveConfirmPassword(
                                            (prev) => !prev
                                        )
                                    }
                                >
                                    {activeConfirmPassword ? (
                                        <i className="fas fa-eye-slash text-gray-500"></i>
                                    ) : (
                                        <i className="fas fa-eye text-gray-500"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center mt-10">
                            <p className="text-[#747775] text-[15px] font-semibold">{error === "" ? "" : error}</p>
                        </div>
                        <div className="w-full flex items-center justify-center h-[45px] bg-[#0b57d0] hover:bg-[#0b57b0] active:bg-[#0b57ff] rounded-[5px] mt-2 hover:cursor-pointer">
                            <button className="text-[15px] text-white font-500">Xác nhận</button>
                        </div>
                        <div className="flex justify-center items-center text-blue-600 text-[14px] mt-2 font-semibold">
                            <p>
                                Đã có tài khoản chưa?.{" "}
                                <Link to="/">
                                    Quay lại đăng nhập
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}
