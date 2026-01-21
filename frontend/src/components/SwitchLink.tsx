import { Link } from "react-router-dom";

function SwitchLink({ text, actionText, to, onClick }: SwitchLinkProps) {
    return (
        <div className="flex justify-center items-center text-blue-600 text-[14px] mt-3 font-semibold">
            <p>
                {text}{" "}
                {to ? (
                    <Link
                        to={to}
                    >
                        {actionText}
                    </Link>
                ) : (
                    <button
                        type="button"
                        onClick={onClick}
                    >
                        {actionText}
                    </button>
                )}
            </p>
        </div>
    );
}

export default SwitchLink;
