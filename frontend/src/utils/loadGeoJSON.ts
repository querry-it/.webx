export async function loadGeoJSON(): Promise<GeoJSON.FeatureCollection> {
    const response = await fetch("/HaNoiGeoMap.json", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(
            `Failed to load GeoJSON: ${response.status} ${response.statusText}`
        );
    }

    const data = await response.json();

    // Validate cơ bản
    if (data.type !== "FeatureCollection" || !Array.isArray(data.features)) {
        throw new Error("Invalid GeoJSON format");
    }

    return data as GeoJSON.FeatureCollection;
}
