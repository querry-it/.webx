// import classNames from "classnames/bind";
// import styles from "./logoutmodal.module.css";
import { useEditor } from "../../../../state/useEditor";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { offset, useFloating } from "@floating-ui/react";

// const cx = classNames.bind(styles);

export default function LogoutModal() {
    const { dispatch } = useEditor();
    const navigate = useNavigate();

    // const { refs, floatingStyles } = useFloating({
    //     placement: "bottom",
    //     middleware: [offset(0)], 
    // });

    const setState = (
        option: string,
        key: string,
        value: boolean | string | number
    ) => {
        dispatch({ type: option, payload: { [key]: value } });
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:5000/auth/logout",
                {},
                { withCredentials: true }
            );
            navigate("/");
            window.location.reload();
        } catch (error: any) {
            alert("Lỗi đăng xuất không thành công...");
        }
    };

    return (
        <>
            <div
                // ref={refs.setReference}
                onClick={() => setState("SET_MODAL", "logout", false)}
                className="fixed inset-0 bg-black/10 flex justify-center items-center z-[401]" 
            >
                <div
                    // ref={refs.setFloating}
                    // style={floatingStyles}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-[400px] h-[368px] rounded-lg overflow-hidden relative bottom-5 shadow-[0_1px_2px_#d3d3d3] border border-[var(--color-line-modal) p-10 z-[401]" 
                >
                    <div className="w-[320px] h-[286px]"> 
                        <div className="h-[64px] flex flex-col justify-evenly"> 
                            <span className="block text-2xl font-medium text-center">Bạn có chắc muốn</span>
                            <span className="block text-2xl font-medium text-center">đăng xuất không?</span>
                        </div>
                        <div className="mt-4 mb-6 h-[84px] flex flex-col justify-evenly"> 
                            <span className="block text-[17px] font-medium text-center color-[#5D5D5D]">Đăng xuất khỏi tài khoản</span>
                            <span className="block text-[17px] font-medium text-center color-[#5D5D5D]">112233445566@ichigo.mzn trên</span>
                            <span className="block text-[17px] font-medium text-center color-[#5D5D5D]">ChatIchigoMazone?</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="h-[44px] mb-3 w-full bg-black border border-[var(--color-line-modal)] rounded-[20px] text-white font-semibold"
                        >
                            Đăng xuất
                        </button>
                        <button
                            onClick={() =>
                                setState("SET_MODAL", "logout", false)
                            }
                            className="h-[44px] bg-transparent rounded-[20px] border border-[var(--color-line-modal)] shadow-[0_1px_1px_var(--color-line-modal)] w-full font-semibold"  
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
