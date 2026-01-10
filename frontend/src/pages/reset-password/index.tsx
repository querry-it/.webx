import { useEffect, useState, type FormEvent } from "react";
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
    const [activePassword, setActivePassword] = useState<Active>({
        password: false,
        confirmPassword: false,
    })

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

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#f0f4f9]">
            <div className="w-[450px] bg-white rounded-[12px] overflow-hidden]">
                <div className="flex justify-center items-center w-full h-[80px]">
                    <h3 className="text-[20px] text-blue-500 font-bold bg-gradient-to-tr from-blue-500 to-pink-500 bg-clip-text text-transparent">Đổi mật khẩu</h3>
                </div>
                <div className="flex flex-col items-center justify-center my-10 px-20">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-12">                          
                            <div className={`flex items-center relative ${!activePassword.password ? "border border-[#747775]" : "border-2 border-blue-600"} h-[45px] rounded-[5px] hover:cursor-pointer`}>
                                {!activePassword.password && <i className="fa-solid fa-lock-open absolute top-1/2 -translate-y-1/2 text-[20px] ml-[5px] text-gray-500"></i>}
                                {activePassword.password && <p className="whitespace-nowrap asbsolute -top-[11px] left-[12px] bg-white px-2 text-blue-600">Nhập mật khẩu</p>}
                                <input
                                    onFocus={() => setActivePassword((prev) => ({
                                        ...prev,
                                        password: true,
                                    }))} 
                                    className="ml-[40px] h-full text-[16px] pr-[30px] focus:ml-[18px]"
                                    type={active_pass ? "text" : "password"}
                                    placeholder= {activePassword.password ? "" : "Nhập mật khẩu..."}
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
                                        setActivePass((prev) => !prev)
                                    }
                                >
                                    {active_pass ? (
                                        <i className="fas fa-eye-slash absolute top-1/2 -translate-y-1/2 text-[14px] mr-[5px] text-gray-500 bg-transparent border-none p-0 outline-none"></i>
                                    ) : (
                                        <i className="fas fa-eye absolute top-1/2 -translate-y-1/2 text-[14px] mr-[5px] text-gray-500 bg-transparent border-none p-0 outline-none"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="form__pass">
                            <div className={`flex items-center relative ${!activePassword.password ? "" : "Nhập xác nhận mật khẩu"}`}>
                                <i className="fa-solid fa-lock"></i>
                                <input
                                    className="pass__input"
                                    type={active_conf ? "text" : "password"}
                                    placeholder={activePassword.confirmPassword ? "" : "Nhập xác nhận mật khẩu..."}
                                    value={user.confirmPassword}
                                    onChange={(e) =>
                                        setUser((prev) => ({
                                            ...prev,
                                            confirmPassword: e.target.value,
                                        }))
                                    }
                                />
                                <button
                                    className=""
                                    type="button"
                                    onClick={() =>
                                        setActiveConf((prev) => !prev)
                                    }
                                >
                                    {active_conf ? (
                                        <i className="fas fa-eye-slash"></i>
                                    ) : (
                                        <i className="fas fa-eye"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="form__submitt">
                            <button className="submit__buttond">
                                Xác nhận
                            </button>
                        </div>
                        <div className="form__back">
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
            <div className="forgot__error">
                <p className="error__line">{error !== "" ? error : ""}</p>
            </div>
        </div>
    );
}
