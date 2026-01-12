import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { validationReset } from "../../utils/validation_reset";
import axios from "axios";

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
    const [username, setUserName] = useState<string>("");
    const [user, setUser] = useState<User>({
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string>("");
    const [active_pass, setActivePass] = useState<boolean>(false);
    const [active_conf, setActiveConf] = useState<boolean>(false);
    const [activeUser, setActiveUser] = useState<Active>({
        password: false,
        confirmPassword: false,
    })
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const fetchReset = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:5000/auth/user-id",
                    {
                        userid: state.userId,
                    }
                );
                setUserName(response.data.username);
            } catch (error: any) {
                setError(
                    error.response?.data?.message || "Lỗi mất kết nối server..."
                );
            }
        };
        fetchReset();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const checkReset = validationReset(user.password, user.confirmPassword);

        if (checkReset === "") {
            try {
                const response = await axios.post(
                    "http://localhost:5000/auth/reset-password",
                    {
                        username: username,
                        password: user.password,
                    }
                );

                setError(response.data.success);
                navigate("/");
            } catch (error: any) {
                setError(
                    error.response?.data?.message ||
                    "Lỗi mất kết nối  server..."
                );

            }
        } else {
            setError(checkReset);
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
        <div className="h-screen flex flex-col items-center justify-center bg-[#f0f4f9]">
            <div className="w-[450px] bg-white rounded-[12px] overflow-hidden]">
                <div className="flex justify-center items-center w-full h-[80px]">
                    <h3 className="text-[20px] text-blue-500 font-bold bg-gradient-to-tr from-blue-500 to-pink-500 bg-clip-text text-transparent">Đổi mật khẩu</h3>
                </div>
                <div className="flex flex-col items-center justify-center my-10 px-20">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-12">
                            <div className={`flex items-center relative ${!activeUser.password ? "border border-[#747775]" : "border-2 border-blue-600"} h-[45px] rounded-[5px]`}>
                                {!activeUser.password && <i className="fa-solid fa-lock-open absolute top-1/2 -translate-y-1/2 text-[20px] ml-[5px] text-gray-500"></i>}
                                {activeUser.password && <p className="whitespace-nowrap absolute -top-[11px] left-[12px] bg-white px-2 text-blue-600">Nhập mật khẩu</p>}
                                <input
                                    onFocus={() => setActiveUser((prev) => ({
                                        ...prev,
                                        password: true,
                                    }))}
                                    onBlur={() => setActiveUser((prev) => ({
                                        ...prev,
                                        password: false,
                                    }))}
                                    className="ml-[40px] h-full text-[16px] border border-none outline-none pr-[30px]"
                                    type={active_pass ? "text" : "password"}
                                    ref = {passwordRef}
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
                                    className=""
                                    type="button"
                                    onClick={() =>
                                        setActivePass((prev) => !prev)}
                                >
                                    {active_pass ? (
                                        <i className="fas fa-eye-slash absolute top-1/2 -translate-y-1/2  -translate-x-2 text-[14px] right-[5px] text-gray-500"></i>
                                    ) : (
                                        <i className="fas fa-eye absolute top-1/2 -translate-y-1/2 -translate-x-2 text-[14px] right-[5px] text-gray-500"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className={`flex items-center relative ${!activeUser.confirmPassword ? "border border-[#747775]" : "border-2 border-blue-600"} h-[45px] rounded-[5px]`}>
                                {!activeUser.confirmPassword && <i className="fa-solid fa-lock absolute top-1/2 -translate-y-1/2 text-[20px] ml-[5px] text-gray-500"></i>}
                                {activeUser.confirmPassword && <p className="whitespace-nowrap absolute -top-[11px] left-[12px] bg-white px-2 text-blue-600">Nhập xác nhận mật khẩu</p>}
                                <input
                                    onFocus={() => setActiveUser((prev) => ({
                                        ...prev,
                                        confirmPassword: true,
                                    }))}
                                    onBlur={() => setActiveUser((prev) => ({
                                        ...prev,
                                        confirmPassword: false,
                                    }))}
                                    className="ml-[40px] h-full text-[16px] border border-none outline-none pr-[30px]"
                                    type={active_conf ? "text" : "password"}
                                    ref = {confirmPasswordRef}
                                    placeholder={activeUser.confirmPassword ? "" : "Nhập xác nhận mật khẩu..."}
                                    value={user.confirmPassword}
                                    onChange={(e) =>
                                        setUser((prev) => ({
                                            ...prev,
                                            confirmPassword: e.target.value,
                                        }))
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveConf((prev) => !prev)
                                    }
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    {active_conf ? (
                                        <i className="fas fa-eye-slash absolute top-1/2 -translate-y-1/2 -translate-x-2 text-[14px] text-gray-500 right-[5px]"></i>
                                    ) : (
                                        <i className="fas fa-eye absolute top-1/2 -translate-y-1/2  -translate-x-2 text-[14px] text-gray-500 right-[5px]"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center h-[45px] bg-[#0b57d0] hover:bg-[#0b57b0] active:bg-[#0b57ff] rounded-[5px] mt-10 hover:cursor-pointer">
                            <button className="text-[15px] text-white font-500 " ref = {btnRef}>
                                Xác nhận
                            </button>
                        </div>
                        <div className="flex justify-center items-center text-blue-600 text-[14px] mt-3 font-semibold">
                            <p>
                                Đã có tài khoản{" "}
                                <Link className="link__back" to="/">
                                    Quay lại
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="absolute mt-[450px]">
                <p className="text-[#747775] text-[15px] font-semibold">{error !== "" ? error : ""}</p>
            </div>
        </div>
    );
}
