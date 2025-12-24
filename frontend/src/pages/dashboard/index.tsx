import { useEditor } from "../../state/useEditor";
import Loading from "../loading";
import Container from "./components/container";
import DropDown from "./components/drop-down";
import ProfileModal from "./components/profile-modal";
import SetupModal from "./components/setup-modal";
import LogoutModal from "./components/logout-modal";

export default function Dashboard() {
    const { state, dispatch } = useEditor();

    const setState = (option: string, key: string, value: boolean) => {
        dispatch({
            type: option,
            payload: { [key]: value },
        });
    };

    return (
        <>
            {state.util.loading ? (
                <Loading />
            ) : (
                <Container
                    actions={{
                        logout: () => {
                            setState(
                                "SET_DROPDOWN",
                                "logout",
                                !state.dropdown["logout"]
                            ),
                                console.log("True");
                        },
                    }}
                />
            )}
            {state.dropdown.logout && (
                <DropDown
                    actions={{
                        profile: () => {
                            setState("SET_MODAL", "profile", true),
                                setState("SET_DROPDOWN", "logout", false);
                        },
                        update: () => console.log("Nâng cấp gói"),
                        person: () => {
                            setState("SET_MODAL", "person", true),
                                setState("SET_DROPDOWN", "logout", false);
                        },
                        setup: () => {
                            setState("SET_MODAL", "setup", true),
                                setState("SET_DROPDOWN", "logout", false);
                        },
                        help: () => console.log("Trợ giúp"),
                        logout: () => {
                            setState("SET_MODAL", "logout", true),
                                setState("SET_DROPDOWN", "logout", false);
                        },
                    }}
                    onClose={() => {
                        setState(
                            "SET_DROPDOWN",
                            "logout",
                            !state.dropdown["logout"]
                        );
                        console.log("False");
                    }}
                />
            )}
            {state.modal.profile && (
                <ProfileModal
                    onClose={() => {
                        setState("SET_MODAL", "profile", false);
                    }}
                    onClick={(e) => e.stopPropagation()}
                />
            )}
            {state.modal.person && (
                <SetupModal
                    onClose={() => setState("SET_MODAL", "person", false)}
                    onClick={(e) => e.stopPropagation()}
                    value={3}
                />
            )}
            {state.modal.setup && (
                <SetupModal
                    onClose={() => setState("SET_MODAL", "setup", false)}
                    onClick={(e) => e.stopPropagation()}
                    value={1}
                />
            )}
            {state.modal.logout && (
                <LogoutModal
                    onClose={() => {
                        setState("SET_MODAL", "logout", false);
                    }}
                    onClick={(e) => e.stopPropagation()}
                />
            )}
        </>
    );
}
