
import classNames from "classnames/bind";
import styles from "./ExternalArticleCard.module.css";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function shortSummary(text, maxLength = 220) {
    if (!text) return "";
    if (text.length <= maxLength) return text;

    const cut = text.slice(0, maxLength);
    const lastDot = cut.lastIndexOf(".");

    return lastDot > 100
        ? cut.slice(0, lastDot + 1)
        : cut.trim() + "…";
}

export default function ExternalArticleCard({ place }) {
    const [summaries, setSummaries] = useState({});

    useEffect(() => {
        if (!place?.externalArticles) return;

        place.externalArticles.forEach((article) => {
            if (!article.api) return;

            fetch(article.api)
                .then((res) => res.json())
                .then((data) => {
                    setSummaries((prev) => ({
                        ...prev,
                        [article.id]: data.extract
                    }));
                })
                .catch(console.error);
        });
    }, [place]);

    if (!place?.externalArticles?.length) return null;

    return (
        <div className={cx("card__wrapper")}>
            <div className={cx("card__title")}>
                <span>Các kết quả trên web</span>
            </div>

            <div className={cx("card__list")}>
                {place.externalArticles.map((article) => (
                    <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cx("card__item")}
                    >
                        {/* Header */}
                        <div className={cx("item__header")}>
                            <span className={cx("item__source")}>
                                {article.source}
                                {article.lang && ` · ${article.lang.toUpperCase()}`}
                            </span>

                            <span className={cx("item__title")}>
                                {article.title}
                            </span>

                            <ExternalLink size={14} />
                        </div>

                        {summaries[article.id] && (
                            <div className={cx("item__divider")} />
                        )}

                        {summaries[article.id] && (
                            <p className={cx("item__summary")}>
                                {shortSummary(summaries[article.id])}
                            </p>
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}
