import { useEditor } from "../../state/useEditor";
import Loading from "../loading";
import Container from "./components/container";
import DropDown from "./components/drop-down";
import ProfileModal from "./components/profile-modal";
import SetupModal from "./components/setup-modal";
import LogoutModal from "./components/logout-modal";
import { useEffect } from "react";

export default function Dashboard() {
    const { state, dispatch } = useEditor();

    useEffect(() => {
        dispatch({ type: "SET_UTIL", payload: { loading: true } });

        const timer = setTimeout(() => {
            dispatch({ type: "SET_UTIL", payload: { loading: false } });
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {state.util.loading ? <Loading /> : <Container />}
            {state.dropdown.logout && <DropDown />}
            {state.modal.profile && <ProfileModal />}
            {state.modal.person && <SetupModal />}
            {state.modal.setup && <SetupModal />}
            {state.modal.logout && <LogoutModal />}
        </>
    );
}
