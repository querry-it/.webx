export default function NotFound() {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-white font-san-serif font-bold">
            <h1
                className="
            text-[80px] 
            text-[#DEDEDE]
            drop-shadow-[0_6px_2px_rgba(0,0,0,0.35)]
          "
            >
                <span>4</span>
                <span>0</span>
                <span>4</span>
                <span></span>
                <span>N</span>
                <span>O</span>
                <span>T</span>
                <span></span>
                <span>F</span>
                <span>O</span>
                <span>U</span>
                <span>N</span>
                <span>D</span>
            </h1>
            <div
                className="
          w-full h-[400px]
          flex items-center justify-center
          bg-no-repeat bg-center
        "
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
