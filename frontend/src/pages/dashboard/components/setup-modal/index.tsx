import classNames from "classnames/bind";
import styles from "./setupmodal.module.css";
import { useRef, useState, useEffect } from "react";
import SetupShared from "../setup-shared";
import SetupNotification from "../setup-notification";
import SetupApplication from "../setup-application";
import SetupData from "../setup-data";
import SetupControl from "../setup-control";
import SetupSecurity from "../setup-security";
import SetupAccount from "../setup-account";
import SetupPerson from "../setup-person";
import SetupInterface from "../setup-interface";

const cx = classNames.bind(styles);

export default function SetupModal({ onClose, onClick, value }) {
    const [index, setIndex] = useState<number>(value);
    const [onButton, setButton] = useState<boolean>(false);
    const [onButton1, setButton1] = useState<boolean>(false);
    const [onButton2, setButton2] = useState<boolean>(false);
    const [onButton3, setButton3] = useState<boolean>(false);
    const [input1, setInput1] = useState<string>("");
    const [input2, setInput2] = useState<string>("");
    const [input3, setInput3] = useState<string>("");
    const [input4, setInput4] = useState<string>("");

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (name === "input_1") setInput1(value);
        if (name === "input_2") setInput2(value);
        if (name === "input_3") setInput3(value);
        if (name === "input_4") setInput4(value);
    };

    useEffect(() => {
        if (
            input1.trim() !== "" ||
            input2.trim() !== "" ||
            input3.trim() !== "" ||
            input4.trim() !== ""
        ) {
            setButton3(true);
        } else {
            setButton3(false);
        }
    }, [input1, input2, input3, input4]);

    return (
        <>
            <div onClick={onClose} className={cx("modal-overlay")}>
                <div onClick={onClick} className={cx("modal-container")}>
                    <div className={cx("table__left")}>
                        <SetupInterface onClose={onClose} index={index} setIndexx={(x) => setIndex(x)}/>
                    </div>
                    <div className={cx("table__right")}>
                        {index === 1 && (
                            <SetupShared
                                onButton={onButton}
                                setButtonx={() => setButton(!onButton)}
                            />
                        )}
                        {index === 2 && <SetupNotification />}
                        {index === 3 && (
                            <SetupPerson
                                input1={input1}
                                input2={input2}
                                input3={input3}
                                input4={input4}
                                handleInput={handleInput}
                                clear={() => {
                                    setInput1("");
                                    setInput2("");
                                    setInput3("");
                                    setInput4("");
                                }}
                                onButton2={onButton2}
                                button2={() => setButton2((prev) => !prev)}
                                onButton3={onButton3}
                            />
                        )}
                        {index === 4 && <SetupApplication />}
                        {index === 5 && <SetupData />}
                        {index === 6 && (
                            <SetupSecurity
                                onButton1={onButton1}
                                callBack1={() => setButton1(!onButton1)}
                            />
                        )}
                        {index === 7 && <SetupControl />}
                        {index === 8 && <SetupAccount />}
                    </div>
                </div>
            </div>
        </>
    );
}
