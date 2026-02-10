// export default function NotFound() {
//     return (
//         <div className="w-screen h-screen flex flex-col items-center justify-center bg-white font-san-serif font-bold">
//             <h1
//                 className="
//             text-[80px] 
//             text-[#DEDEDE]
//             drop-shadow-[0_6px_2px_rgba(0,0,0,0.35)]
//           "
//             >
//                 <span>4</span>
//                 <span>0</span>
//                 <span>4</span>
//                 <span></span>
//                 <span>N</span>
//                 <span>O</span>
//                 <span>T</span>
//                 <span></span>
//                 <span>F</span>
//                 <span>O</span>
//                 <span>U</span>
//                 <span>N</span>
//                 <span>D</span>
//             </h1>
//             <div
//                 className="
//           w-full h-[400px]
//           flex items-center justify-center
//           bg-no-repeat bg-center
//         "
//                 style={{
//                     backgroundImage:
//                         "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
//                 }}
//             ></div>

//             <h3 className="text-[28px] text-[#EFEFEF]">
//                 Look like you're lost
//             </h3>
//         </div>
//     );
// }

import "./notfound_module.css"
// export default function NotFound() {
//     const text = "404 NOT FOUND";

//     return (
//         <div className="w-screen h-screen flex flex-col items-center justify-center bg-white font-sans font-bold">
//             <h1 className="text-[80px] text-[#DEDEDE] drop-shadow-[0_6px_2px_rgba(0,0,0,0.35)]">
//                 {text.split("").map((char, index) => (
//                     <span
//                         key={index}
//                         className="inline-block jump"
//                         style={{
//                             animationDelay: `${index * 0.1}s`,
//                         }}
//                     >
//                         {char === " " ? "\u00A0" : char}
//                     </span>
//                 ))}
//             </h1>

//             <div
//                 className="w-full h-[400px] flex items-center justify-center bg-no-repeat bg-center"
//                 style={{
//                     backgroundImage:
//                         "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
//                 }}
//             ></div>

//             <h3 className="text-[28px] text-[#EFEFEF]">
//                 Look like you're lost
//             </h3>
//         </div>
//     );
// }


import { useEffect, useState } from "react";

export default function NotFound() {
    const text = "404 NOT FOUND";
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % text.length);
        }, 800); // > animation time

        return () => clearTimeout(timer);
    }, [activeIndex]);

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-white font-sans font-bold">
            <h1 className="text-[80px] text-[#DEDEDE] drop-shadow-[0_6px_2px_rgba(0,0,0,0.35)]">
                {text.split("").map((char, index) => (
                    <span
                        key={index}
                        className={`inline-block ${
                            index === activeIndex ? "jump" : ""
                        }`}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </h1>

            <div
                className="w-full h-[400px] flex items-center justify-center bg-no-repeat bg-center"
                style={{
                    backgroundImage:
                        "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
                }}
            ></div>

            <h3 className="text-[28px] text-[#EFEFEF]">
                Look like you're lost
            </h3>
        </div>
    );
}
