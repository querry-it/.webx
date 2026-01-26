import classNames from "classnames/bind";
import styles from "./roadmap.module.css";
import React, { useEffect, useRef, useState } from "react";
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
import { useFetcher } from "react-router-dom";

const cx = classNames.bind(styles);
interface Place {
    id: number;
    value: string;
}

export default function RoadMapComponent() {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
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
                <X size={IconRef.current.x} strokeWidth={IconRef.current.y} />
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
                                className={`w-[250px] h-[40px] flex justify-center items-center px-2 rounded-[8px] box-border ${focus !== place.id ? "border border-gray-600" : "border-2 border-teal-600"}`}>
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

            <div className="mt-2">
                <div className="flex bg-gray-500">
                    <div className="w-[20%] flex justify-center items-center">
                        <div className="w-9 h-9 rounded-[50%] bg-gray-200 flex justify-center items-center">
                            <Clock size={IconRef.current.x} strokeWidth={IconRef.current.y}></Clock>
                        </div>
                    </div>
                    <div className="">
                        <div>UBND Phường Đại Mỗ</div>
                        <span>Đường Đại Mỗ, Đại Mỗ, Nam Từ Liêm, Hà Nội</span>
                        <span>Đang mở cửa</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
