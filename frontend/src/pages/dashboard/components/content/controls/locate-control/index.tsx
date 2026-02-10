import L from "leaflet";
import { createRoot } from "react-dom/client";
import { Locate } from "lucide-react";

export default function LocationControl(map) {
    let root = null;
    const control = L.control({ position: "bottomright" });
    const onLocationError = () => {
        alert("Không thể xác định vị trí của bạn!");
    };

    control.onAdd = () => {
        const div = L.DomUtil.create("div", "leaflet-bar leaflet-control");
        const btn = L.DomUtil.create(
            "button",
            "p-[4px] bg-white rounded-md cursor-pointer hover:bg-gray-100 flex items-center justify-center",
            div,
        );
        root = createRoot(btn);
        root.render(<Locate size={20} strokeWidth={1.6} />);
        btn.onclick = () => map.locate({ setView: true, maxZoom: 16 });
        L.DomEvent.disableClickPropagation(btn);
        map.on("locationerror", onLocationError);
        return div;
    };

    control.onRemove = () => {
        map.off("locationerror", onLocationError);
        root?.unmount();
    };

    control.addTo(map);
    return () => control.remove();
}
