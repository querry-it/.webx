import classNames from "classnames/bind";
import styles from "./introducerX.module.css";
import Overview from "./components/overview";
import Feedback from "./components/feedback";
import { useEditor } from "../../../../../../state/useEditor";
import { ArrowLeft, X } from "lucide-react";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);

const place = [
    {
        id: 1,
        name: "Lăng Chủ tịch Hồ Chí Minh",
        address: "1 Hùng Vương, Điện Biên, Ba Đình, Hà Nội, Việt Nam",
        type: "Di tích lịch sử",
        rating: 4.5,
        reviews: 19872,
        open: [
            { day: "Thứ 2", time: "Đóng cửa" },
            { day: "Thứ 3", time: "07:30 - 10:30" },
            { day: "Thứ 4", time: "07:30 - 10:30" },
            { day: "Thứ 5", time: "07:30 - 10:30" },
            { day: "Thứ 6", time: "Đóng cửa" },
            { day: "Thứ 7", time: "07:30 - 11:00" },
            { day: "Chủ nhật", time: "07:30 - 11:00" }
        ],


        ratingStar: {
            5: 12917,
            4: 4372,
            3: 1590,
            2: 596,
            1: 397
        },
        desc: `
                Thi hài của Chủ tịch Hồ Chí Minh, lãnh tụ nước Việt Nam, được đặt tại lăng mộ 
                và khu di tích lịch sử này.Di tích lịch sử quan trọng của Việt Nam.`,
        img: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer6eyEgRG3Tx70IlZGe_aeLj0gquNRECqQzPs5mvputDbV7_01duzpKXX-z-ix3N1HWacrxSv-FHycvmwK_6S_NfA7w6Wdd7cYe2P6pVaB3SkJN1i3wyk9ebWQNpsJgC5oOIEsw=w408-h544-k-no",


        gallery: [
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerx0nziz0IBXcPGc2wXZYc0U2MGAxfFjTFrDOTk51MpJo3836BwDDjQSMlWNcx8Gb36BHWNAedRMBQ9OjqVUj6HVSQgXP0bipFEKcvJ5KAcEqDo1eBXekJR91iexu69KEf8TZdw=w203-h270-k-no",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwep7LOP9L8Bs18Z87cJ6k4x_syz_exvxfph_8gbzMAfWd6ovsFY1vXGCcq7jcc6wiGjJzqobCw95y69Vqn2_Rr-FvNJLbddK6mnCm8diush5WB-BXguG7Lht2fAXkQGMoWMe-nrOBxwBaRrm=s563-k-no",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwept0fabouImcvvhZbvLjFkiHB0T3lat0RQE03WAJvxe0ELrKzQLQS7QdVoo8NmYH3kil7M9WwNyUPXevpzKar1_Jwr8f0C-90VpefZkvWG_Te4nxnSdDO_9TyrmaAhRpcvl89gZBB38fxrN=s563-k-no"
        ],

        externalArticles: [
            {
                id: "wiki_vi",
                source: "Wikipedia",
                lang: "vi",
                title: "Lăng Chủ tịch Hồ Chí Minh – Wikipedia (VI)",
                url: "https://vi.wikipedia.org/wiki/L%C4%83ng_Ch%E1%BB%A7_t%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh",
                api: "https://vi.wikipedia.org/api/rest_v1/page/summary/Lăng_Chủ_tịch_Hồ_Chí_Minh"
            },
            {
                id: "wiki_en",
                source: "Wikipedia",
                lang: "en",
                title: "Ho Chi Minh Mausoleum – Wikipedia (EN)",
                url: "https://en.wikipedia.org/wiki/Ho_Chi_Minh_Mausoleum",
                api: "https://en.wikipedia.org/api/rest_v1/page/summary/Ho_Chi_Minh_Mausoleum"
            },
            {
                id: "britannica",
                source: "Britannica",
                lang: "en",
                title: "Ho Chi Minh Mausoleum – Britannica",
                url: "https://www.britannica.com/place/Ho-Chi-Minh-Mausoleum",
                api: null
            }
        ],

    },

    {
        id: 2,
        name: "Văn Miếu – Quốc Tử Giám",
        address: "58 Quốc Tử Giám, Đống Đa, Hà Nội, Việt Nam",
        type: "Di tích lịch sử – văn hóa",
        rating: 4.6,
        reviews: 15420,
        open: [
            { day: "Thứ Hai", time: "Đóng cửa" },
            { day: "Thứ Ba", time: "07:30 - 10:30" },
            { day: "Thứ Tư", time: "07:30 - 10:30" },
            { day: "Thứ Năm", time: "07:30 - 10:30" },
            { day: "Thứ Sáu", time: "Đóng cửa" },
            { day: "Thứ Bảy", time: "07:30 - 11:00" },
            { day: "Chủ Nhật", time: "07:30 - 11:00" }
        ],

        ratingStar: {
            5: 10023,
            4: 3654,
            3: 1109,
            2: 402,
            1: 232
        },
        desc: "Trường đại học đầu tiên của Việt Nam, biểu tượng truyền thống hiếu học.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1So_txeUO7whAB-cwPEdqPNktmVB4mB6Kxw&s",
        highlights: [
            "Di sản văn hóa quốc gia",
            "Kiến trúc cổ kính",
            "Địa điểm tham quan – học tập",
        ],

        gallery: [
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerx0nziz0IBXcPGc2wXZYc0U2MGAxfFjTFrDOTk51MpJo3836BwDDjQSMlWNcx8Gb36BHWNAedRMBQ9OjqVUj6HVSQgXP0bipFEKcvJ5KAcEqDo1eBXekJR91iexu69KEf8TZdw=w203-h270-k-no",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwep7LOP9L8Bs18Z87cJ6k4x_syz_exvxfph_8gbzMAfWd6ovsFY1vXGCcq7jcc6wiGjJzqobCw95y69Vqn2_Rr-FvNJLbddK6mnCm8diush5WB-BXguG7Lht2fAXkQGMoWMe-nrOBxwBaRrm=s563-k-no",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwept0fabouImcvvhZbvLjFkiHB0T3lat0RQE03WAJvxe0ELrKzQLQS7QdVoo8NmYH3kil7M9WwNyUPXevpzKar1_Jwr8f0C-90VpefZkvWG_Te4nxnSdDO_9TyrmaAhRpcvl89gZBB38fxrN=s563-k-no"
        ],

        externalArticles: [
            {
                id: "wiki_vi",
                source: "Wikipedia",
                lang: "vi",
                title: "Văn Miếu – Quốc Tử Giám – Wikipedia (VI)",
                url: "https://vi.wikipedia.org/wiki/V%C4%83n_Mi%E1%BA%BFu_%E2%80%93_Qu%E1%BB%91c_T%E1%BB%AD_Gi%C3%A1m",
                api: "https://vi.wikipedia.org/api/rest_v1/page/summary/Văn_Miếu_–_Quốc_Tử_Giám"
            },
            {
                id: "wiki_en",
                source: "Wikipedia",
                lang: "en",
                title: "Temple of Literature – Wikipedia (EN)",
                url: "https://en.wikipedia.org/wiki/Temple_of_Literature,_Hanoi",
                api: "https://en.wikipedia.org/api/rest_v1/page/summary/Temple_of_Literature,_Hanoi"
            },
            {
                id: "unesco",
                source: "UNESCO",
                lang: "en",
                title: "Temple of Literature – Hanoi (UNESCO)",
                url: "https://whc.unesco.org/en/tentativelists/6177/",
                api: null
            }
        ]

    },
];

const feedbacks = [
    {
        id: 1,
        user: {
            name: "Nguyễn Minh Tuấn",
            avatar: "https://i.pravatar.cc/100?img=11"
        },
        rating: 5,
        content: `
                Không gian ở đây rất trang nghiêm và yên tĩnh.
                Mọi khu vực đều được giữ gìn sạch sẽ, gọn gàng.
                Nhân viên hướng dẫn nhiệt tình, giải thích rõ ràng từng chi tiết lịch sử.
                Mình cảm thấy rất tự hào khi được đến tham quan nơi này.
                Đây là địa điểm mà mỗi người Việt Nam nên ghé thăm ít nhất một lần.
                `,
        images: [
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerx0nziz0IBXcPGc2wXZYc0U2MGAxfFjTFrDOTk51MpJo3836BwDDjQSMlWNcx8Gb36BHWNAedRMBQ9OjqVUj6HVSQgXP0bipFEKcvJ5KAcEqDo1eBXekJR91iexu69KEf8TZdw=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwep7LOP9L8Bs18Z87cJ6k4x_syz_exvxfph_8gbzMAfWd6ovsFY1vXGCcq7jcc6wiGjJzqobCw95y69Vqn2_Rr-FvNJLbddK6mnCm8diush5WB-BXguG7Lht2fAXkQGMoWMe-nrOBxwBaRrm=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwept0fabouImcvvhZbvLjFkiHB0T3lat0RQE03WAJvxe0ELrKzQLQS7QdVoo8NmYH3kil7M9WwNyUPXevpzKar1_Jwr8f0C-90VpefZkvWG_Te4nxnSdDO_9TyrmaAhRpcvl89gZBB38fxrN=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer6eyEgRG3Tx70IlZGe_aeLj0gquNRECqQzPs5mvputDbV7_01duzpKXX-z-ix3N1HWacrxSv-FHycvmwK_6S_NfA7w6Wdd7cYe2P6pVaB3SkJN1i3wyk9ebWQNpsJgC5oOIEsw=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoZn-OajcEYopzjo7qoD1326w0-z3NRaiag-W0bggFtIMsJz1DXFGCOhvhm2fdodZtDvdBnhQWFtxseNLpAreIMTTdTLNTyioWJS_VoGUlvveLyqM9Diwj-cKsHmG5UDEKVEOFcsjTcbABu=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAweootfSRmSXOEjE9bHrSHUdKgrGOfE_YPbotzt794vGt9l-WIHbLlaE9N5oBlXg0qLfJ0KNn0duhwub6KZouoiNvdP9D_wtFYEjo9_tsczb2_IzXp2-2IKWwlYkmUJKmImpuI0y6lw2k2b0=w400"
        ],
        createdAt: "2026-02-01",
        likes: 10,
        liked: false,
    },

    {
        id: 2,
        user: {
            name: "Lê Thị Hồng",
            avatar: "https://i.pravatar.cc/100?img=32"
        },
        rating: 4,
        content: `
                Không gian ở đây rất trang nghiêm và yên tĩnh.
                Mọi khu vực đều được giữ gìn sạch sẽ, gọn gàng.
                Nhân viên hướng dẫn nhiệt tình, giải thích rõ ràng từng chi tiết lịch sử.
                Mình cảm thấy rất tự hào khi được đến tham quan nơi này.
                Đây là địa điểm mà mỗi người Việt Nam nên ghé thăm ít nhất một lần.
                `,
        images: [
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwep7LOP9L8Bs18Z87cJ6k4x_syz_exvxfph_8gbzMAfWd6ovsFY1vXGCcq7jcc6wiGjJzqobCw95y69Vqn2_Rr-FvNJLbddK6mnCm8diush5WB-BXguG7Lht2fAXkQGMoWMe-nrOBxwBaRrm=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerx0nziz0IBXcPGc2wXZYc0U2MGAxfFjTFrDOTk51MpJo3836BwDDjQSMlWNcx8Gb36BHWNAedRMBQ9OjqVUj6HVSQgXP0bipFEKcvJ5KAcEqDo1eBXekJR91iexu69KEf8TZdw=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwept0fabouImcvvhZbvLjFkiHB0T3lat0RQE03WAJvxe0ELrKzQLQS7QdVoo8NmYH3kil7M9WwNyUPXevpzKar1_Jwr8f0C-90VpefZkvWG_Te4nxnSdDO_9TyrmaAhRpcvl89gZBB38fxrN=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer6eyEgRG3Tx70IlZGe_aeLj0gquNRECqQzPs5mvputDbV7_01duzpKXX-z-ix3N1HWacrxSv-FHycvmwK_6S_NfA7w6Wdd7cYe2P6pVaB3SkJN1i3wyk9ebWQNpsJgC5oOIEsw=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoZn-OajcEYopzjo7qoD1326w0-z3NRaiag-W0bggFtIMsJz1DXFGCOhvhm2fdodZtDvdBnhQWFtxseNLpAreIMTTdTLNTyioWJS_VoGUlvveLyqM9Diwj-cKsHmG5UDEKVEOFcsjTcbABu=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAweootfSRmSXOEjE9bHrSHUdKgrGOfE_YPbotzt794vGt9l-WIHbLlaE9N5oBlXg0qLfJ0KNn0duhwub6KZouoiNvdP9D_wtFYEjo9_tsczb2_IzXp2-2IKWwlYkmUJKmImpuI0y6lw2k2b0=w400"
        ],
        createdAt: "2024-12-02",
        likes: 121,
        liked: false
    },

    {
        id: 3,
        user: {
            name: "Phạm Quốc Anh",
            avatar: "https://i.pravatar.cc/100?img=45"
        },
        rating: 5,
        content: `
                Không gian ở đây rất trang nghiêm và yên tĩnh.
                Mọi khu vực đều được giữ gìn sạch sẽ, gọn gàng.
                Nhân viên hướng dẫn nhiệt tình, giải thích rõ ràng từng chi tiết lịch sử.
                Mình cảm thấy rất tự hào khi được đến tham quan nơi này.
                Đây là địa điểm mà mỗi người Việt Nam nên ghé thăm ít nhất một lần.
                `,
        images: [
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer6eyEgRG3Tx70IlZGe_aeLj0gquNRECqQzPs5mvputDbV7_01duzpKXX-z-ix3N1HWacrxSv-FHycvmwK_6S_NfA7w6Wdd7cYe2P6pVaB3SkJN1i3wyk9ebWQNpsJgC5oOIEsw=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerx0nziz0IBXcPGc2wXZYc0U2MGAxfFjTFrDOTk51MpJo3836BwDDjQSMlWNcx8Gb36BHWNAedRMBQ9OjqVUj6HVSQgXP0bipFEKcvJ5KAcEqDo1eBXekJR91iexu69KEf8TZdw=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwep7LOP9L8Bs18Z87cJ6k4x_syz_exvxfph_8gbzMAfWd6ovsFY1vXGCcq7jcc6wiGjJzqobCw95y69Vqn2_Rr-FvNJLbddK6mnCm8diush5WB-BXguG7Lht2fAXkQGMoWMe-nrOBxwBaRrm=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAwept0fabouImcvvhZbvLjFkiHB0T3lat0RQE03WAJvxe0ELrKzQLQS7QdVoo8NmYH3kil7M9WwNyUPXevpzKar1_Jwr8f0C-90VpefZkvWG_Te4nxnSdDO_9TyrmaAhRpcvl89gZBB38fxrN=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoZn-OajcEYopzjo7qoD1326w0-z3NRaiag-W0bggFtIMsJz1DXFGCOhvhm2fdodZtDvdBnhQWFtxseNLpAreIMTTdTLNTyioWJS_VoGUlvveLyqM9Diwj-cKsHmG5UDEKVEOFcsjTcbABu=w400",
            "https://lh3.googleusercontent.com/gps-cs-s/AHVAweootfSRmSXOEjE9bHrSHUdKgrGOfE_YPbotzt794vGt9l-WIHbLlaE9N5oBlXg0qLfJ0KNn0duhwub6KZouoiNvdP9D_wtFYEjo9_tsczb2_IzXp2-2IKWwlYkmUJKmImpuI0y6lw2k2b0=w400"
        ],
        createdAt: "2024-12-15",
        likes: 11,
        liked: false
    }
];

function Xy() {
    const [selectedPlace, setSelectedPlace] = useState(place[1]);
    return (
        <div className={cx("location__prev")}>
            <Overview selectedPlace={selectedPlace} />
        </div>
    );
}

function Y() {
    const Icon = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const { state, dispatch } = useEditor();
    const setState = (option: string, key: string, value: boolean) => {
        dispatch({
            type: option,
            payload: { [key]: value },
        });
    };
    const [selectedPlace, setSelectedPlace] = useState(place[1]);

    return (
        <><Feedback place={selectedPlace} feedbacks={feedbacks} /></>
    );
}

export default function IntroducerXComponent() {
    const { state, dispatch } = useEditor();
    const Icon = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const setState = (option: string, key: string, value: boolean) => {
        dispatch({
            type: option,
            payload: { [key]: value },
        });
    };
    return <>{state.navbar_x.Xreview === "overview" ? <Xy /> : <Y />}</>;
}
