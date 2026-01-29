// import classNames from "classnames/bind";
// import styles from "../introducerX.module.css";
// import { useState } from "react";

// const cx = classNames.bind(styles);

// export default function PlaceTab({ place }) {
//     const [active, setActive] = useState(true);

//     return (
//         <div className={cx("tab__wrapper")}>
//             <button className={cx("btn__items", { active })}>
//                 <div className={cx("btn__animate")}>
//                     <div className={cx("content")}>Tổng quan</div>
//                     <div className={cx("indicator")}></div>
//                 </div>
//             </button>

//             <button className={cx("btn__items", { active })}>
//                 <div className={cx("btn__animate")}>
//                     <div className={cx("content")}>Bài đánh giá</div>
//                     <div className={cx("indicator")}></div>
//                 </div>
//             </button>

//             <button className={cx("btn__items", { active })}>
//                 <div className={cx("btn__animate")}>
//                     <div className={cx("content")}>Giới thiệu</div>
//                     <div className={cx("indicator")}></div>
//                 </div>
//             </button>
//         </div>
//     );
// }


import classNames from "classnames/bind";
import styles from "../introducerX.module.css";
import { useState } from "react";

const cx = classNames.bind(styles);

export default function PlaceTab({ place }) {


    return (
        <div className={cx("tab__wrapper")}>

            <button
                className={cx("btn__items")}

            >
                <div className={cx("btn__animate")}>
                    <span className={cx("content")}>
                        Tổng quan
                    </span>
                </div>
            </button>

            <button className={cx("btn__items")} >
                <div className={cx("btn__animate")}>
                    <span className={cx("content")}>
                        Bài đánh giá
                    </span>
                </div>
            </button>

            <button className={cx("btn__items")}>
                <div className={cx("btn__animate")}>
                    <span className={cx("content")}>
                        Giới thiệu
                    </span>
                </div>
            </button>
        </div>
    );
}
