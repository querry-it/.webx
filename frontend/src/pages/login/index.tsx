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
        <div className="relative h-screen flex items-center justify-center p-4 bg-gray-200">
            <div className="w-[400px] bg-white rounded-[12px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
                <div className="flex justify-center items-center w-full h-[80px] bg-blue-400 ">
                    <h3 className="text-[20px] text-white font-bold ">Log in to WebMap</h3>
                </div>
                <div className="flex flex-col items-center justify-center my-10 px-20">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-12">
                            <div className="flex items-center relative border  border-transparent rounded-[5px] h-[55px] hover:cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                                <i className="fa-solid fa-user absolute top-1/2 -translate-y-1/2 text-[20px] ml-[2px]  text-gray-500"></i>
                                <input
                                    type="text"
                                    className="ml-[44px] h-full outline-none border-none text-[16px] pr-[30px]"
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
                        <div >
                            <div className="flex items-center relative border  border-transparent rounded-[5px] h-[55px] hover:cursor-pointer shadow-[0_0_0_rgba(0,0,0,0.1)]">
                                <i className="fa-solid fa-lock absolute top-1/2 -translate-y-1/2 text-[20px] ml-[2px]  text-gray-500"></i>
                                <input
                                    type={active ? "text" : "password"}
                                    className="ml-[44px] h-full outline-none border-none text-[16px]"
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
                                    className=""
                                    onClick={() => setActive((prev) => !prev)}
                                >
                                    {active ? (
                                        <i className="fas fa-eye-slash absolute top-1/2 -translate-y-1/2 text-[14px] ml-[2px] text-gray-500 bg-transparent border-none p-0 outline-none"></i>
                                    ) : (
                                        <i className="fas fa-eye absolute top-1/2 -translate-y-1/2 text-[14px] ml-[2px] text-gray-500 bg-transparent border-none p-0 outline-none"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center h-[50px] bg-green-400 hover:bg-green-500 active:bg-green-500 rounded-[12px] mt-10 hover:cursor-pointer">
                            <button type="submit" className=" text-[20px] text-white font-semibold ">
                                Log in
                            </button>
                        </div>
                        <div className="flex flex-row gap-3 justify-center items-center pt-10">
                            <div className="">
                                <button
                                    onClick={handleForgot}
                                    className="text-[14px] text-blue-600 hover:underline" 
                                >
                                    Quên mật khẩu?
                                </button>
                            </div>
                            <div className="">
                                <p className="">
                                    {" "}
                                    <button
                                        onClick={handleRegister}
                                        className="text-[14px] text-blue-600 hover:underline"
                                    >
                                        Tạo tài khoản
                                    </button>
                                </p>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <div className="absolute mt-[540px] shadow-[0_0_0_rgba(0,0,0,0.1)]">
                <p className="text-red-600">{error !== "" ? error : ""}</p>
            </div>
        </div>
    );
}
