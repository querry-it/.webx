import hl from "../../../../../../../assets/hl.jpg";

export default function PlaceList() {
    const handleScroll = (e) => {
        const maxHeight = 80; // px

        e.target.style.height = "auto";

        if (e.target.scrollHeight <= maxHeight) {
            e.target.style.height = e.target.scrollHeight + "px";
            e.target.style.overflowY = "hidden";
        } else {
            e.target.style.height = maxHeight + "px";
            e.target.style.overflowY = "auto";
        }
    }
    return (
        <div className="w-[372px] h-full relative top-[72px]">
            <div className="h-[76px] w-full flex">
                <div className="h-full w-[332px] flex pb-2 pl-2 ">
                    <div className="flex flex-col h-full w-full justify-center">
                        <input className="w-[310px] h-[48px] pl-2 text-[20px] placeholder:text-black
                            rounded-[8px] border-none outline-none 
                            hover:bg-gray-200 focus:bg-gray-100"
                            type="text"
                            placeholder="Danh sách không có tiêu đề"
                        />
                        {false && (<div className="h-[48px] flex items-center pl-2">
                            <span className="text-[20px]">Danh sách không có tiêu đề</span>
                        </div>)}
                        <div className="h-5 w-full flex items-center pl-2 text-gray-600">
                            <i className="fa-solid fa-lock text-[13px]"></i>
                            <span className="text-[14px]">Riêng tư·0 địa điểm</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-center">
                    <div className="w-12 h-12 ">
                        <button className="w-12 h- bottom-[11px]  ">
                            <i className="fa-solid fa-ellipsis-vertical text-[18px]" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-[8px]">
                <textarea
                    rows={1}
                    className="w-full h-full rounded-[8px] pt-[6px] pb-[4px] px-[6px] 
                                    resize-none overflow-hidden bg-transparent
                                    outline-none hover:bg-gray-100 focus:bg-gray-100 text-[14px]
                                    placeholder:text-gray-600"
                    placeholder="Thêm nội dung mô tả danh sách"
                    onInput={handleScroll}
                >
                </textarea>
            </div>

            <div className="h-[64px] flex justify-center mt-1">
                <div className="h-[48px] py-1">
                    <button className="h-full w-[150px] flex justify-center items-center gap-2 bg-teal-200 rounded-[20px] 
                                       hover:bg-teal-300 active:bg-teal-400 active:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.4)]">
                        <i className="fa-solid fa-plus text-[12px]"></i>
                        <span className="text-[14px] font-medium">Thêm địa điểm</span>
                    </button>
                </div>
            </div>

            <div className="h-[56px] px-[12px] border-[1px] border-gray-1000">
                <div className="h-full flex justify-center items-center">
                    <div className="flex h-9 bg-gray-200 rounded-[20px]" >
                        <div className="h-9 w-9 flex items-center">
                            <i className="fa-solid fa-magnifying-glass text-[16px] mx-2"></i>
                        </div>
                        <input type="text"
                            placeholder="Tìm kiếm địa điểm cần thêm"
                            className="border-none outline-none bg-gray-200 w-[210px] text-[16px] 
                                        placeholder:text-gray-600 placeholder:font-medium"
                        />
                        <div className="h-9 w-9 flex items-center justify-end">
                            <i className="fa-solid fa-x text-[16px] mx-2"></i>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button className="ml-2 h-[48px] w-[48px] cursor-pointer">
                            <span className="text-teal-600 font-medium">Xong</span>
                        </button>
                    </div>
                </div>
            </div>


            <div className="h-6 mt-2"></div>
            <div className="h-[52px] flex justify-center items-center">
                <h2 className="font-medium">Danh sách trống</h2>
            </div>

            <div className="mt-2">
                <div className="h-fit p-2">
                    <div className="flex flex-col bg-gray-200 rounded-[18px]">
                        <div className="flex relative p-2">
                            <button className="flex items-center">
                                <div className="h-[60px] w-[60px] rounded-[8px] overflow-hidden mr-2">
                                    <img className="h-full w-full object-cover" src={hl} alt="anh co do hoa lu" />
                                </div>
                                <div className="flex flex-col items-start h-[64px]">
                                    <div className="text-[16px] font-semibold">Phố cổ Hoa Lư</div>
                                    <span className="flex h-fit gap-1 text-[14px] text-gray-600 leading-[14px]">
                                        <span>4,6</span>
                                        <i className="fa-solid fa-star text-[12px] mt-[3px] text-yellow-500"></i>
                                        <span className="">(6.681)</span>
                                    </span>
                                    <div className="h-[12px]">
                                        <span className="text-[14px] text-gray-600"> Điểm thu hút khách du lịch</span>
                                    </div>
                                </div>
                            </button>
                            <div className="absolute top-9 right-2">
                                <button className="h-[48px] w-[92px] flex items-center">
                                    <div className="h-[30px] w-full my-2 px-3 rounded-[32px] flex items-center gap-1 text-teal-600">
                                        <i className="fa-solid fa-plus text-[12px]"></i>
                                        <span className="text-[14px]">Ghi chú</span>
                                    </div>
                                </button>
                            </div>

                        </div>
                        <div className="absolute  h-[26px] w-[26px] bg-white rounded-full overflow-hidden shadow-[0_2px_4px_-1px_rgba(0,0,0,0.4)]">
                            <button className="h-full w-full items-center justify-centerncursor-pointer">
                                <i className="fa-solid fa-xmark text-[14px]"></i>
                            </button>
                        </div>
                        <div className="mt-1 px-1 pb-1">
                            <textarea
                                rows={1}
                                className="w-full h-[32px] rounded-[8px] pt-[6px] pb-[4px] px-[6px] 
                                    resize-none  bg-transparent overflow-hidden
                                    outline-none hover:bg-gray-100 focus:bg-gray-100 text-[14px]
                                    placeholder:text-gray-600"
                                placeholder="Thêm ghi chú"
                                onInput={handleScroll}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}