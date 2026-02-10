import classNames from "classnames/bind";
import styles from "./roadmap.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useEditor } from "../../../../../../state/useEditor";
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
    EllipsisVertical,
    Clock,
    Icon,
} from "lucide-react";

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
    const [places, setPlaces] = useState<Place[]>([
        { id: 1, value: "" },
        { id: 2, value: "" },
    ])

    const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

    const handleChange = (id: number, newValue: string) => {
        setPlaces(prev =>
            prev.map(place =>
                place.id === id
                    ? { ...place, value: newValue }
                    : place
            )
        );
    };

    const locations = [
        {
            id: 1,
            name: "UBND Phường Đại Mỗ",
            address: "Đường Đại Mỗ, Đại Mỗ, Nam Từ Liêm, Hà Nội",
            status: "Đang mở cửa",
            open: true,
            openTime: "07:30",
        },
        {
            id: 2,
            name: "UBND Phường Mỹ Đình 1",
            address: "Số 2 Nguyễn Hoàng, Mỹ Đình, Nam Từ Liêm, Hà Nội",
            status: "Đã đóng cửa",
            open: false,
            openTime: "08:00",
        },
        {
            id: 3,
            name: "UBND Phường Trung Hòa",
            address: "Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội",
            status: "Đang mở cửa",
            open: true,
            openTime: "07:00",
        },
        {
            id: 4,
            name: "UBND Phường Dịch Vọng",
            address: "Xuân Thủy, Dịch Vọng, Cầu Giấy, Hà Nội",
            status: "Đang mở cửa",
            open: true,
            openTime: "07:30",
        },
        {
            id: 5,
            name: "UBND Phường Nghĩa Tân",
            address: "Hoàng Quốc Việt, Nghĩa Tân, Cầu Giấy, Hà Nội",
            status: "Đã đóng cửa",
            open: false,
            openTime: "08:00",
        },
        {
            id: 6,
            name: "UBND Phường Mễ Trì",
            address: "Mễ Trì Thượng, Nam Từ Liêm, Hà Nội",
            status: "Đang mở cửa",
            open: true,
            openTime: "07:30",
        },
        {
            id: 7,
            name: "UBND Phường Phú Đô",
            address: "Phú Đô, Nam Từ Liêm, Hà Nội",
            status: "Đang mở cửa",
            open: true,
            openTime: "07:00",
        },
        {
            id: 8,
            name: "UBND Phường Cầu Diễn",
            address: "Cầu Diễn, Bắc Từ Liêm, Hà Nội",
            status: "Đã đóng cửa",
            open: false,
            openTime: "08:00",
        },
    ];


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

            <div className="w-full mt-2 h-[112px] relative shadow-[0_2px_4px_-1px_rgba(0,0,0,0.4)]">
                <div className="flex flex-col justify-center gap-2 h-[110px]">
                    {places.map((place, index) => (
                        <div key={place.id} className="flex items-center relative"
                        >
                            <div className="h-10 w-[56px] flex items-center justify-center gap-1">
                                {index === places.length - 1 ?
                                    (<MapPin size={IconRef.current.x} strokeWidth={IconRef.current.y} color="#dc2626"></MapPin>) :
                                    (<Circle size={IconRef.current.x} strokeWidth={IconRef.current.y}></Circle>)
                                }
                            </div>
                            {index !== places.length - 1 ? (<div className="absolute top-9 left-[19px]">
                                <EllipsisVertical size={18} strokeWidth={1}></EllipsisVertical>
                            </div>) : ""}

                            <div
                                onFocus={() => setFocus(place.id)}
                                onBlur={() => setFocus(null)}
                                className={`w-[250px] h-[40px] flex justify-center items-center px-2 rounded-[8px] box-border ${focus !== place.id ? "border border-gray-300" : "border-2 border-teal-600"}`}>
                                <input
                                    ref={(el) => (inputRefs.current[place.id] = el)}
                                    value={place.value}
                                    onChange={(e) => handleChange(place.id, e.target.value)}
                                    className="flex-1 border-none outline-none text-[14px]"
                                    type="text"
                                    placeholder={index === 0 ? "Chọn điểm bắt đầu hoặc nhấp vào bản đồ " : index === places.length - 1
                                        ? "Chọn điểm đến hoặc nhấp vào bản đồ" : ""}
                                />

                                {focus === place.id &&
                                    (<div className="w-[36px] h-[36px] rounded-[50%] hover:bg-gray-100 flex justify-center items-center">
                                        <Search
                                            className="text-teal-600"
                                            size={IconRef.current.x}
                                            strokeWidth={IconRef.current.y}
                                        ></Search>
                                    </div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cx("mt-2 max-h-[74%] overflow-y-auto", "hideScrollBar")}>
                {locations.map((place, index) => (
                    <div
                        key={index}
                        className="flex p-2 hover:bg-gray-200 cursor-pointer"
                    >
                        {/* Icon */}
                        <div className="w-[60px] flex justify-center pt-2 shrink-0">
                            <div className="w-9 h-9 rounded-full bg-gray-100 flex justify-center items-center">
                                <Clock size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col min-w-0">
                            <div className="text-[14px] font-medium truncate">
                                {place.name}
                            </div>

                            <div className="text-[14px] text-gray-600 truncate">
                                {place.address}
                            </div>

                            <div className="flex items-center gap-1 text-[14px]">
                                <span
                                    className={place.open ? "text-green-600" : "text-red-600"}
                                >
                                    {place.status}
                                </span>
                                <span className="text-gray-600">
                                    · Mở cửa lúc {place.openTime}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
