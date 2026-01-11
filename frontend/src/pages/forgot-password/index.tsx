import { useEffect, useState, type FormEvent } from "react";
import { validationForgot } from "../../utils/validation_forgot";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    const [user, setUser] = useState<User>({
        code: "",
        username: "",
    });
    const [error, setError] = useState<string>("");
    const [activeUser, setActiveUser] = useState<Active>({
        code: false,
        username: false,
    })

    useEffect(() => {
        const fetchForgot = async () => {
            try {
                await axios.post(
                    "http://localhost:5000/auth/clear-forgot",
                    {},
                    { withCredentials: true }
                );
            } catch {
                setError("Lỗi mất kết nối server");
            }
        };
        fetchForgot();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const checkForgot = validationForgot(user.code, user.username);

        if (checkForgot === "") {
            try {
                const response = await axios.post(
                    "http://localhost:5000/auth/forgot-password",
                    { ...user }
                );
                try {
                    await axios.post(
                        "http://localhost:5000/auth/request-reset",
                        {},
                        { withCredentials: true }
                    );
                    navigate("/reset-password", {
                        state: { userId: response.data.userid },
                    });
                } catch {
                    setError("Lỗi server mất kết nối...");
                }
            } catch (error: any) {
                setError(
                    error.response?.data?.message || "Lỗi server mất kết nối..."
                );
            }
        } else {
            setError(checkForgot);
            setUser((prev) => ({ ...prev, username: "" }));
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#f0f4f9]">
            <div className="w-[450px] bg-white rounded-[12px] overflow-hidden]">
                <div className="flex justify-center items-center w-full h-[80px]">
                    <h3 className="text-[20px] text-blue-500 font-bold bg-gradient-to-tr from-blue-500 to-pink-500 bg-clip-text text-transparent">
                        Quên mật khẩu
                    </h3>
                </div>
                <div className="flex flex-col items-center justify-center my-10 px-20">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-12">
                            <div className={`flex items-center relative 
                                ${!activeUser.code
                                    ? "border border-[#747775]"
                                    : "border-2 border-blue-600"
                                } rounded-[5px] h-[45px]`}
                            >
                                {!activeUser.code && (<i className="fa-solid fa-key absolute top-1/2 -translate-y-1/2 text-[20px] ml-[5px] text-gray-500"></i>)}
                                {activeUser.code && (<p className="whitespace-nowrap absolute -top-[11px] left-[12px] bg-white px-2 text-blue-600">Nhập mã xác nhận</p>)}
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
                                    className="mx-[40px] w-full h-full text-[16px] focus:ml-[18px]"
                                    type="text"
                                    placeholder={activeUser.code ? "" : "Nhập mã xác nhận..."}
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
                        <div>
                            <div className={`flex items-center relative 
                                ${!activeUser.username
                                    ? "border border-[#747775]"
                                    : "border-2 border-blue-600"
                                } rounded-[5px] h-[45px]`}>
                                {!activeUser.username && (<i className="fa-solid fa-user absolute top-1/2 -translate-y-1/2 text-[20px] ml-[5px] text-gray-500"></i>)}
                                {activeUser.username && (<p className="whitespace-nowrap absolute -top-[11px] left-[12px] bg-white px-2 text-blue-600">Nhập tài khoản</p>)}
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
                        <div className="w-full flex items-center justify-center h-[45px] bg-[#0b57d0] hover:bg-[#0b57b0] active:bg-[#0b57ff] rounded-[5px] mt-10 hover:cursor-pointer ">
                            <button className="text-[15px] text-white font-500">
                                Xác nhận
                            </button>
                        </div>
                        <div className="flex justify-center items-center text-blue-600 text-[14px] mt-3 font-semibold">
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
            <div className="absolute mt-[450px]">
                <p className="text-[#747775] text-[15px] font-semibold">
                    {error !== "" ? error : ""}
                </p>
            </div>
        </div>
    );
}
