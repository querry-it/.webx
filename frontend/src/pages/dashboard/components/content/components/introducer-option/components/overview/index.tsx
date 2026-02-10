import classNames from "classnames/bind";
import styles from "./overview.module.css";
import PlaceHero from "./components/PlaceHero/index.tsx";
import PlaceAction from "./components/PlaceAction/index.tsx";
import PlaceIntroducer from "./components/PlaceIntroducer/index.tsx";
import PlaceInformation from "./components/PlaceInformation/index.tsx";
import PlaceGallery from "./components/PlaceGallery/index.tsx";
import ExteralArticleCard from "./components/ExternalArticleCard/index.tsx";


const cx = classNames.bind(styles);

export default function Overview({ selectedPlace }) {

    return (
        <div className={cx("location__content")}>
            <PlaceHero place={selectedPlace} className={cx("place__hero")} />
            <PlaceAction className={cx("place__action")} />
            <PlaceIntroducer place={selectedPlace} className={cx("place__introducer")} />
            <PlaceInformation place={selectedPlace} className={cx("place__information")} />
            <PlaceGallery place={selectedPlace} className={cx("place__gallery")} />
            <ExteralArticleCard place={selectedPlace} className={cx("card")}/>
        </div>
    );
}


