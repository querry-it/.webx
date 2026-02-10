interface PasswordToggleProps {
    active: boolean;
    onClick: () => void;
}

function PasswordToggle({ active, onClick }: PasswordToggleProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            onMouseDown={(e) => e.preventDefault()}
        >
            <i
                className={`
                    ${active ? "fas fa-eye-slash" : "fas fa-eye"}
                    absolute top-1/2 -translate-y-2 -translate-x-7
                    text-[14px] mr-[5px] text-gray-500
                `}
            />
        </button>
    );
}

export default PasswordToggle;
