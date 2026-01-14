// interface InputFieldProps {
//     name: string;
//     label: string;
//     placeholder: string;
//     iconClass?: string;
//     value: string;
//     type?: React.HTMLInputTypeAttribute;
//     active: boolean;
//     onFocus: () => void;
//     onBlur: () => void;
//     onChange: (value: string) => void;
//     rightElement?: React.ReactNode;
// }

// export function InputField({
//     label,
//     placeholder,
//     iconClass,
//     value,
//     type,
//     active,
//     onFocus,
//     onBlur,
//     onChange,
//     rightElement,
// }: InputFieldProps) {
//     return (
//         <div
//             className={`flex items-center relative 
//         ${!active ? "border border-[#747775]" : "border-2 border-blue-600"}
//         rounded-[5px] h-[45px]`}
//         >
//             {!active && iconClass && (
//                 <i className={`${iconClass} absolute top-1/2 -translate-y-1/2 text-[20px] ml-[5px] text-gray-500`}></i>
//             )}

//             {(active || value) && (
//                 <p className="whitespace-nowrap absolute -top-[11px] left-[12px] bg-white px-2 text-blue-600">
//                     {label}
//                 </p>
//             )}

//             <input
//                 type = {type || "text"}
//                 className="flex-1 h-[45px] pl-10 pr-10 outline-none border-none text-[16px] focus:ml-[18px]"
//                 placeholder={active ? "" : placeholder}
//                 value={value}
//                 onFocus={onFocus}
//                 onBlur={onBlur}
//                 onChange={e => onChange(e.target.value)}
//             />

//             {rightElement} 
//         </div>
//     );
// }

import React, { forwardRef } from "react";
interface InputFieldProps {
    name?: string;
    label: string;
    placeholder: string;
    iconClass?: string;
    value: string;
    type?: React.HTMLInputTypeAttribute;
    active: boolean;
    onFocus: () => void;
    onBlur: () => void;
    onChange: (value: string) => void;
    rightElement?: React.ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
    label,
    placeholder,
    iconClass,
    value,
    type,
    active,
    onFocus,
    onBlur,
    onChange,
    rightElement,
}, ref) => {
    return (
        <div className="mb-10">
            <div className={`flex items-center relative 
                            ${!active ? "border border-[#747775]" : "border-2 border-blue-600"}
                            rounded-[5px] h-[45px]`}
            >
                {!active && iconClass && (
                    <i className={`${iconClass} absolute top-1/2 -translate-y-1/2 ml-[5px] text-gray-500 text-[20px]`}></i>
                )}

                {(active || value) && (
                    <p className="absolute -top-[11px] left-[12px] bg-white px-2 text-blue-600 whitespace-nowrap">
                        {label}
                    </p>
                )}

                <input
                    ref={ref}
                    type={type || "text"}
                    className="mx-[44px] w-full h-full outline-none border-none text-[16px] focus:ml-[18px]"
                    placeholder={active ? "" : placeholder}
                    value={value}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={e => onChange(e.target.value)}
                />

                {rightElement}

            </div>
        </div>
    );
});


export default InputField;