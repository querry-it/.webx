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
import { useEditor } from "../../../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function RoadMapComponent() {
    const { state, dispatch } = useEditor();
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const setState = (option: string, key: string, value: boolean) => {
        dispatch({
            type: option,
            payload: { [key]: value },
        });
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
        </div>
    );
}
