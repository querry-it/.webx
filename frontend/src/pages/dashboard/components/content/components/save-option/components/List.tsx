export default function List() {
    const handleAdd = () => {
        
    }
    return (
        <div className="flex-1 overflow-y-auto">
            {Array.from({ length: 11 }).map((_, index) => (
                <div
                    key={index}
                    className="flex justify-center items-center w-full h-[64px] hover:bg-gray-200"
                >
                    <button className="w-[340px] h-full py-3 pr-1 pl-6">
                        <div className="flex items-center">
                            <div className="mr-4">
                                <i className="fa-solid fa-bars text-[14px]" />
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="text-[16px]">
                                    Danh sách không có tiêu đề
                                </div>
                                <div className="text-[14px] text-gray-500">
                                    Riêng tư· 0 địa điểm
                                </div>
                            </div>
                        </div>
                    </button>
                    <div className="flex-1 flex items-center">
                        <div className="w-12 h-12 relative">
                            <button className="w-7 h-7 absolute right-9 bottom-[11px] rounded-full active:bg-gray-300">
                                <i className="fa-solid fa-ellipsis-vertical text-[14px]" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}