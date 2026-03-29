interface ForgotPasswordProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ForgotPassword({ onClick }: ForgotPasswordProps) {
    return (
        <button
            type="button"  
            onClick={onClick}
            className="text-[12px] text-blue-600 font-semibold"
            tabIndex={-1}
        >
            Quên mật khẩu?
        </button>
    );
}

export default ForgotPassword;
