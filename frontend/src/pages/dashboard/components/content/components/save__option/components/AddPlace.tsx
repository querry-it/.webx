export default function AddPlace() {
    return (
        <div className="absolute top-[10px] w-[348px] bg-white rounded-[15px] shadow-[2px_2px_3px_3px_rgba(0,0,0,0.15)]">
            <div className="mt-3 mb-4 mx-3">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-house text-[18px] text-gray-600"></i>
                    <h1 className="text-[16px] font-extralight flex-1">
                        Chỉnh sửa địa chỉ nhà riêng
                    </h1>
                    <button className="text-[14px] font-medium text-teal-600 cursor-pointer">
                        LƯU
                    </button>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <button className="text-[14px] font-medium text-teal-600 cursor-pointer">
                        HỦY
                    </button>
                </div>

                <div className="mt-[20px]">
                    <input type="text"
                        className="w-full h-8 px-2 border border-gray-300 outline-none
                                    focus:border-teal-700
                                    transition"
                    />
                </div>
            </div>

            <div className="py-4 flex flex-col gap-2">
                <div className="flex flex-col pr-[11px] my-2">
                    <div className="flex cursor-pointer">
                        <div className="w-[60px] flex justify-center items-center shrink-0">
                            <i className="fa-regular fa-clock text-[18px]"></i>
                        </div>
                        <span className="flex text-[14px] min-w-0 flex-1">
                            <span className="shrink-0 mr-1">Phố cổ Hoa Lư</span>
                            <span className="truncate text-gray-600">Tràng An 2, Tân Thành, Ninh Bình, Việt Nam</span>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col pr-[11px] my-2">
                    <div className="flex cursor-pointer">
                        <div className="w-[60px] flex justify-center items-center shrink-0">
                            <i className="fa-regular fa-clock text-[18px]"></i>
                        </div>
                        <span className="flex text-[14px] min-w-0 flex-1">
                            <span className="shrink-0 mr-1">Phố cổ Hoa Lư</span>
                            <span className="truncate text-gray-600">Tràng An 2, Tân Thành, Ninh Bình, Việt Nam</span>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col pr-[11px] my-2">
                    <div className="flex cursor-pointer">
                        <div className="w-[60px] flex justify-center items-center shrink-0">
                            <i className="fa-regular fa-clock text-[18px]"></i>
                        </div>
                        <span className="flex text-[14px] min-w-0 flex-1">
                            <span className="shrink-0 mr-1">Phố cổ Hoa Lư</span>
                            <span className="truncate text-gray-600">Tràng An 2, Tân Thành, Ninh Bình, Việt Nam</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}