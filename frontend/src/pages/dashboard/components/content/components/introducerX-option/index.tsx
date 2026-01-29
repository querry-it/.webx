import classNames from "classnames/bind";
import styles from "./introducerX.module.css";
import PlaceHero from "./components/PlaceHero";
import PlaceTab from "./components/PlaceTab";
import PlaceAction from "./components/PlaceAction";
import PlaceIntroducer from "./components/PlaceIntroducer";

const cx = classNames.bind(styles);


type Place = {
  id: number;
  name: string;
  address: string;
  desc: string;
  img: string;

  rating: number;
  reviews: number;
  type: string;
  open: string;
  ticket?: string;

  highlights: string[];
  bestTime: string;
  locationDetail: string;
  gallery: string[];
  reviewsSample: string[];

};



const PLACES: Place[] = [
  {
    id: 1,
    name: "Lăng Chủ tịch Hồ Chí Minh",
    address: "Ba Đình, Hà Nội",
    type: "Di tích lịch sử",
    rating: 4.5,
    reviews: 19872,
    open: "07:30 – 17:00",
    ticket: "Miễn phí",
    desc: "Di tích lịch sử quan trọng của Việt Nam.",
    img: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer6eyEgRG3Tx70IlZGe_aeLj0gquNRECqQzPs5mvputDbV7_01duzpKXX-z-ix3N1HWacrxSv-FHycvmwK_6S_NfA7w6Wdd7cYe2P6pVaB3SkJN1i3wyk9ebWQNpsJgC5oOIEsw=w408-h544-k-no",

    highlights: [
      "Di tích lịch sử quốc gia đặc biệt",
      "Không gian trang nghiêm",
      "Biểu tượng thủ đô Hà Nội"
    ],

    locationDetail: "Nằm tại trung tâm quận Ba Đình, gần Quảng trường Ba Đình.",

    bestTime: "Buổi sáng sớm hoặc chiều mát",

    gallery: [
      "/places/lang-bac.jpg",
      "/places/lang-bac.jpg",
      "/places/lang-bac.jpg"
    ],

    reviewsSample: [
      "Rất ý nghĩa về lịch sử",
      "Không gian yên tĩnh và trang nghiêm",
      "Nên đi buổi sáng"
    ]
  },
]

export default function IntroducerXComponent() {
    return <div className={cx("location__prev")}>
        <PlaceHero place={PLACES[0]}/>
        <PlaceTab  place={PLACES[0]}/>
        <PlaceAction />
        <PlaceIntroducer />
        
    </div>;
}








