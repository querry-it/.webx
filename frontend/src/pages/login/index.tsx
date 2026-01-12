import { useState, useRef, type FormEvent, useEffect } from "react";
import { validationLogin } from "../../utils/validation_login";
import { getAccessToken, setAccessToken } from "../../utils/accessToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        username: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);
    const userRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [activeUser, setActiveUser] = useState<Active>({
        username: false,
        password: false,
    });
    const btnRef = useRef<HTMLButtonElement>(null);

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

                    if (loginRes.status === 200) {
                        setAccessToken(loginRes.data.accessToken);
                        navigate("/home");
                    }
                } else {
                    await axios.post(
                        "http://localhost:5000/auth/clear-login",
                        {},
                        { withCredentials: true }
                    );
                }
            } catch (error: any) {
                console.warn("Client refresh failed");
                if (!error.response) {
                    console.warn("Network error!");
                }
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
            if (Object.values(user).every((v) => v === "")) {
                userRef.current?.focus();
            }
            else if (user["username"].trim() === "") {
                setUser((prev) => ({
                    ...prev,
                    password: "",
                }));
                userRef.current?.focus();
            }
            else {
                setUser((prev) => ({
                    ...prev,
                    password: "",
                }));
                passRef.current?.focus();
            }
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

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault();
                btnRef.current?.click();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <div className="h-screen flex items-center justify-center bg-[#f0f4f9]">
            <div className="w-[450px] bg-white rounded-[12px] overflow-hidden]">
                <div className="flex justify-center items-center w-full h-[80px]">
                    <h3 className="text-[20px] text-blue-500 font-bold bg-gradient-to-tr from-blue-500 to-pink-500 bg-clip-text text-transparent">
                        Đăng nhập vào Chrome
                    </h3>
                </div>
                <div className="flex flex-col items-center justify-center my-10 px-20">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-12">
                            <div
                                className={`flex items-center relative ${!activeUser.username
                                    ? "border border-[#747775]"
                                    : "border-2 border-blue-600"
                                    } rounded-[5px] h-[45px]`}
                            >
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
                                    type="text"
                                    ref={userRef}
                                    className="mx-[44px] w-full h-full outline-none border-none border-none
                    outline-none
                     text-[16px] focus:ml-[18px]"
                                    placeholder={
                                        activeUser.username
                                            ? ""
                                            : "Nhập tài khoản..."
                                    }
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
                        <div>
                            <div
                                className={`flex items-center relative ${!activeUser.password
                                    ? "border border-[#747775]"
                                    : "border-2 border-blue-600"
                                    } rounded-[5px] h-[45px]`}
                            >
                                {!activeUser.password && (
                                    <i className="fa-solid fa-lock absolute top-1/2 -translate-y-1/2 text-[20px] ml-[5px] text-gray-500"></i>
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
                                    type={active ? "text" : "password"}
                                    className="mx-[44px] w-full h-full outline-none border-none border-none
                    outline-none
                    ring-0
                    focus:ring-0
                    focus:outline-none text-[16px] focus:ml-[18px]"
                                    placeholder={
                                        activeUser.password
                                            ? ""
                                            : "Nhập mật khẩu..."
                                    }
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
                                    className=""
                                    type="button"
                                    onClick={() => setActive((prev) => !prev)}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    {active ? (
                                        <i className="fas fa-eye-slash absolute top-1/2 -translate-y-2 -translate-x-7 text-[14px] mr-[5px] text-gray-500  p-0"></i>
                                    ) : (
                                        <i className="fas fa-eye absolute top-1/2 -translate-y-2 -translate-x-7 text-[14px] mr-[5px] text-gray-500 bg-transparent border-none p-0 outline-none"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end mt-2.5">
                            <button
                                onClick={handleForgot}
                                className="text-[12px] text-blue-600 font-semibold"
                                tabIndex={-1}
                            >
                                Quên mật khẩu?
                            </button>
                        </div>
                        <div className="w-full flex items-center justify-center h-[45px] bg-[#0b57d0] hover:bg-[#0b57b0] active:bg-[#0b57ff] rounded-[5px] mt-10 hover:cursor-pointer ">
                            <button
                                type="submit"
                                ref={btnRef}
                                className="text-[15px] text-white font-500 "
                            >
                                Đăng nhập
                            </button>
                        </div>

                        <div className="flex justify-center items-center text-blue-600 text-[14px] mt-3 font-semibold">
                            <p className="">
                                Chưa có tài khoản?.{" "}
                                <button onClick={handleRegister}>
                                    Tạo tài khoản
                                </button>
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
