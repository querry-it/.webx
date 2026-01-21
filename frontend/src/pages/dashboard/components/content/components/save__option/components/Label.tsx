export default function Label() {
    return (
        <div className="flex-1 overflow-y-auto">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex justify-center items-center w-full h-[64px] hover:bg-gray-200">
                    <button className="w-[340px] h-full py-3 pr-1 pl-6">
                        <div className="flex items-center">
                            <i className="fa-solid fa-tag mr-4 text-[14px]" />
                            <div className="flex flex-col text-left">
                                <div className="text-[16px]">Nhà hàng yêu thích</div>
                                <div className="text-[14px] text-gray-500">
                                    3 địa điểm
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
}