// interface ForgotPasswordProps {
//     onClick: (e : React.FormEvent<HTMLFormElement>) => void;
// }

// function ForgotPassword({ onClick }: ForgotPasswordProps) {
//     return (
//         <div className="flex justify-end mt-2.5">
//             <button
//                 onClick={onClick}
//                 type="button"
//                 className="text-[12px] text-blue-600 font-semibold"
//                 tabIndex={-1}
//             >
//                 Quên mật khẩu?
//             </button>
//         </div>
//     );
// }

// export default ForgotPassword;

interface ForgotPasswordProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ForgotPassword({ onClick }: ForgotPasswordProps) {
    return (
        <button
            type="button"  // cực kỳ quan trọng
            onClick={onClick}
            className="text-[12px] text-blue-600 font-semibold"
            tabIndex={-1}
        >
            Quên mật khẩu?
        </button>
    );
}

export default ForgotPassword;
