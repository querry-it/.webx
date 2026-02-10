import type React from "react";

interface FormLayoutProps {
    title: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    children: React.ReactNode;
    error?: string | React.ReactNode;
}

function FormLayout({ title, onSubmit, children, error }: FormLayoutProps) {
    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 to-pink-500">
            <div className="w-[450px] bg-white rounded-[12px] overflow-hidden">
                <div className="flex justify-center items-center w-full h-[80px]">
                    <h3 className="text-[20px] text-blue-500 font-bold bg-gradient-to-tr from-blue-500 to-pink-500 bg-clip-text text-transparent">
                        {title}
                    </h3>
                </div>
                <div className="flex flex-col items-center justify-center my-10 px-20">
                    <form onSubmit={onSubmit} className="w-full">
                        {children}
                    </form>
                </div>
            </div>
            <div className="absolute mt-[520px]">
                <p className="text-red-600 text-[15px] font-semibold">
                    {error}
                </p>
            </div>
        </div>
    );
}

export default FormLayout;