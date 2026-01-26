// import classNames from "classnames/bind";
// import styles from "./roadmap.module.css";
// import { useEffect, useRef, useState } from "react";
// import {
//     Bike,
//     Bus,
//     Car,
//     Footprints,
//     Plane,
//     SquareArrowOutUpRight,
//     X,
//     Search,
//     MapPin,
//     Circle,
//     PlusCircle,
//     ArrowUpDown,
//     EllipsisVertical,
//     GripVertical,
// } from "lucide-react";

// const cx = classNames.bind(styles);

// interface Focus {
//     location: boolean;
//     destination: boolean;
// }

// export default function RoadMapComponent() {
//     const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
//     const [focus, setFocus] = useState<Focus>({
//         location: false,
//         destination: false,
//     });
//     const [hover, setHover] = useState<boolean>(false);
//     const [from, setFrom] = useState("");
//     const [to, setTo] = useState("");

//     const handleSwap = () => {
//         setFrom(to);
//         setTo(from);
//     };

//     return (
//         <div className={cx("roadmap")}>
//             <div className={cx("out")}>
//                 <SquareArrowOutUpRight
//                     size={IconRef.current.x}
//                     strokeWidth={IconRef.current.y}
//                 />
//                 <Car size={IconRef.current.x} strokeWidth={IconRef.current.y} />
//                 <Bus size={IconRef.current.x} strokeWidth={IconRef.current.y} />
//                 <Footprints
//                     size={IconRef.current.x}
//                     strokeWidth={IconRef.current.y}
//                 />
//                 <Bike
//                     size={IconRef.current.x}
//                     strokeWidth={IconRef.current.y}
//                 />
//                 <Plane
//                     size={IconRef.current.x}
//                     strokeWidth={IconRef.current.y}
//                 />
//                 <X size={IconRef.current.x} strokeWidth={IconRef.current.y} />
//             </div>

//             <div className="w-full mt-2 min-h-[160px] relative shadow-[0_2px_4px_-1px_rgba(0,0,0,0.4)]">
//                 <div className="flex flex-col justify-center gap-2 h-[96px]">
//                     <div className="flex items-center relative">
//                         <div className="h-10 w-[56px] flex items-center justify-center gap-1 pr-3">
//                             <GripVertical size={14} strokeWidth={3}></GripVertical>
//                             <Circle size={12} strokeWidth={3}></Circle>
//                         </div>
//                         <div className="absolute top-9 left-[22px]">
//                             <EllipsisVertical size={18} strokeWidth={1}></EllipsisVertical>
//                         </div>

//                         <div
//                             onFocus={(prev) => setFocus({
//                                 ...prev,
//                                 location: true,
//                             })}
//                             onBlur={(prev) => setFocus({
//                                 ...prev,
//                                 location: false,
//                             })}
//                             className={`w-[258px] h-[40px] flex justify-center items-center px-2 rounded-[8px] box-border ${!focus.location ? "border border-gray-600" : "border-2 border-teal-600"}`}>
//                             <input
//                                 value={from}
//                                 onChange={(e) => setFrom(e.target.value)}
//                                 className="flex-1 border-none outline-none text-[14px]"
//                                 type="text" placeholder="Chọn điểm bắt đầu hoặc nhấp vào bản đồ" />

//                             {focus.location &&
//                                 (<div className="w-[36px] h-[36px] rounded-[50%] hover:bg-gray-100 flex justify-center items-center">
//                                     <Search
//                                         className="text-teal-600"
//                                         size={IconRef.current.x}
//                                         strokeWidth={IconRef.current.y}
//                                     ></Search>
//                                 </div>)}
//                         </div>
//                     </div>

//                     <div className="flex items-center ">
//                         <div className="h-10 w-[56px] flex items-center justify-center gap-1 pr-3">
//                             <GripVertical size={14} strokeWidth={3}></GripVertical>
//                             <MapPin size={14} strokeWidth={3} color="#dc2626"></MapPin>
//                         </div>
//                         <div
//                             onFocus={(prev) => setFocus({
//                                 ...prev,
//                                 destination: true,
//                             })}
//                             onBlur={(prev) => setFocus({
//                                 ...prev,
//                                 destination: false,
//                             })}
//                             className={`w-[258px] h-[40px] flex justify-center items-center px-2 rounded-[8px] box-border ${!focus.destination ? "border border-gray-600" : "border-2 border-teal-600"}`}>
//                             <input
//                                 value={to}
//                                 onChange={(e) => setTo(e.target.value)}
//                                 className="flex-1 border-none outline-none text-[14px]"
//                                 type="text" placeholder="Chọn điểm đến..." />

//                             {focus.destination &&
//                                 (<div className="w-[36px] h-[36px] rounded-[50%] hover:bg-gray-100 flex justify-center items-center">
//                                     <Search
//                                         className="text-teal-600"
//                                         size={IconRef.current.x}
//                                         strokeWidth={IconRef.current.y}
//                                     ></Search>
//                                 </div>)}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="w-[56px] h-[56px] absolute top-5 left-[312px] py-3 flex justify-center items-center">
//                     <button
//                         className="w-[36px] h-[36px] rounded-[50%] flex justify-center items-center hover:bg-gray-200"
//                         onClick={handleSwap}
//                     >
//                         <ArrowUpDown size={18} strokeWidth={3}></ArrowUpDown>
//                     </button>
//                 </div>

//                 <button
//                     onClick={addPlace}
//                     onMouseEnter={() => setHover(true)}
//                     onMouseLeave={() => setHover(false)}
//                     className="w-full h-[40px] mt-1 flex justify-start items-center">
//                     <div className={`h-8 w-8 flex justify-center items-center rounded-[50%] ml-[14px] mr-2 ${hover ? "bg-gray-200" : ""}`}>
//                         <PlusCircle size={20}></PlusCircle>
//                     </div>
//                     <div className={`h-full w-[70%] flex items-center rounded-[8px] pl-2 ${hover ? "bg-gray-200" : ""}`}>
//                         <span className="text-[14px] text-gray-600 font-semibold">Thêm điểm đến</span>
//                     </div>
//                 </button>

//             </div>
//         </div>
//     );
// }










import classNames from "classnames/bind";
import styles from "./roadmap.module.css";
import { useEffect, useRef, useState } from "react";
import {
    Bike,
    Bus,
    Car,
    Footprints,
    Plane,
    SquareArrowOutUpRight,
    X,
    Search,
    MapPin,
    Circle,
    PlusCircle,
    ArrowUpDown,
    EllipsisVertical,
    GripVertical,
} from "lucide-react";
import { useEditor } from "../../../../../../state/useEditor";

const cx = classNames.bind(styles);
interface Place {
    id: number;
    value: string;
}

export default function RoadMapComponent() {
    const { state, dispatch } = useEditor();
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const setState = (option: string, key: string, value: boolean) => {
        dispatch({
            type: option,
            payload: { [key]: value },
        });
    };


    const [focus, setFocus] = useState<number | null>(null);
    const [hoverPlaceId, setHoverPlaceID] = useState<boolean>(false);
    const [hoverAddBtn, setHoverAddBtn] = useState<boolean>(false);
    const [places, setPlaces] = useState<Place[]>([
        { id: Date.now(), value: "" },
        { id: Date.now() + 1, value: "" },
    ])

    const addPlace = () => {
        setPlaces(prev => [
            ...prev,
            { id: Date.now(), value: "" },
        ]);
    };

    const handleSwap = () => {
        if (places.length !== 2) return;
        setPlaces(([a, b]) => [b, a]);
    };

    const handleChange = (id: number, newValue: string) => {
        setPlaces(prev =>
            prev.map(place =>
                place.id === id
                    ? { ...place, value: newValue }
                    : place
            )
        );
    };



    return (
        <div className={cx("roadmap")}>
            <div className={cx("out")}>
                <SquareArrowOutUpRight
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
                <Car size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                <Bus size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                <Footprints
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
                <Bike
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
                <Plane
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
                <X
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                    onClick={() => setState("SET_NAVBAR_X", "activeX", null)}
                />
            </div>

            <div className="w-full mt-2 min-h-[160px] relative shadow-[0_2px_4px_-1px_rgba(0,0,0,0.4)]">
                <div className="flex flex-col justify-center gap-2 min-h-[96px] max-h-[450px] overflow-y-auto">
                    {places.map((place, index) => (
                        <div key={place.id} className="flex items-center relative"
                            onMouseEnter={() => setHoverPlaceID(place.id)}
                            onMouseLeave={() => setHoverPlaceID(null)}
                        >
                            <div className="h-10 w-[56px] flex items-center justify-center gap-1">
                                <div className="w-[20px] flex justify-end">
                                    {hoverPlaceId === place.id && (<GripVertical size={14} strokeWidth={3}></GripVertical>)}
                                </div>
                                <div className="w-[38px]">
                                    {index === places.length - 1 ?
                                        (<MapPin size={14} strokeWidth={3} color="#dc2626"></MapPin>) :
                                        (<Circle size={12} strokeWidth={3}></Circle>)
                                    }
                                </div>
                            </div>
                            {index !== places.length - 1 ? (<div className="absolute top-9 left-[19px]">
                                <EllipsisVertical size={18} strokeWidth={1}></EllipsisVertical>
                            </div>) : ""}

                            <div
                                onFocus={() => setFocus(place.id)}
                                onBlur={() => setFocus(null)}
                                className={`w-[258px] h-[40px] flex justify-center items-center px-2 rounded-[8px] box-border ${focus !== place.id ? "border border-gray-600" : "border-2 border-teal-600"}`}>
                                <input
                                    value={place.value}
                                    onChange={(e) => handleChange(place.id, e.target.value)}
                                    className="flex-1 border-none outline-none text-[14px]"
                                    type="text"
                                    placeholder={index === 0 ? "Chọn điểm bắt đầu hoặc nhấp vào bản đồ " : "Chọn điểm đến hoặc nhấp vào bản đồ "} />

                                {focus === place.id &&
                                    (<div className="w-[36px] h-[36px] rounded-[50%] hover:bg-gray-100 flex justify-center items-center">
                                        <Search
                                            className="text-teal-600"
                                            size={IconRef.current.x}
                                            strokeWidth={IconRef.current.y}
                                        ></Search>
                                    </div>)}
                            </div>
                            <div className="">
                            <X ></X>
                        </div>
                        </div>
                    ))}
                </div>
                
                {places.length === 2 && (<div className="w-[56px] h-[56px] absolute top-5 left-[312px] py-3 flex justify-center items-center">
                    <button
                        className="w-[36px] h-[36px] rounded-[50%] flex justify-center items-center hover:bg-gray-200"
                        onClick={handleSwap}
                    >
                        <ArrowUpDown size={18} strokeWidth={3}></ArrowUpDown>
                    </button>
                </div>)}

                <button
                    onClick={addPlace}
                    onMouseEnter={() => setHoverAddBtn(true)}
                    onMouseLeave={() => setHoverAddBtn(false)}
                    className="w-full h-[40px] my-2 flex justify-start items-center">
                    <div className={`h-8 w-8 flex justify-center items-center rounded-[50%] ml-[14px] mr-2 ${hoverAddBtn ? "bg-gray-200" : ""}`}>
                        <PlusCircle size={20}></PlusCircle>
                    </div>
                    <div className={`h-full w-[70%] flex items-center rounded-[8px] pl-2 ${hoverAddBtn ? "bg-gray-200" : ""}`}>
                        <span className="text-[14px] text-gray-600 font-semibold">Thêm điểm đến</span>
                    </div>
                </button>

            </div>
        </div>
    );
}
