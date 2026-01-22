import classNames from "classnames/bind";
import styles from "./roadmap.module.css";
import { useRef } from "react";
import {
    Bike,
    Bus,
    Car,
    Footprints,
    Plane,
    SquareArrowOutUpRight,
    X,
} from "lucide-react";

const cx = classNames.bind(styles);

export default function RoadMapComponent() {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
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
        </div>
    );
}
