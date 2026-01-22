export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white font-serif">
      
      <h1
          className="
            text-[80px] 
            text-[#efefef]
            drop-shadow-[4px_4px_10px_rgba(226,221,221,0.7)]
          "
        >
          404 NOT FOUND
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
      > 
      </div>

      <h3 className="text-[28px] text-[rgb(188,192,188)]">
        Look like you're lost
      </h3>
    </div>
  );
}
