import { Outlet } from "react-router-dom";
import { EditorProvider } from "./state/editor.context";
import "./App.css";

function App() {
    return (
        <EditorProvider>
            <div>
                <Outlet />
            </div>
        </EditorProvider>
    );
}
export default App;
