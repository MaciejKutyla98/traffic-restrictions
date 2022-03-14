import React, { useRef, useEffect, useState } from 'react';
import * as mapboxgl from 'mapbox-gl';

function App() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibWFjaWVqbzExNyIsImEiOiJjbDBwZHlrOGMxeGk0M2N1bzU5Z2V1Yjh3In0.5K0DGY1wdACaDKut7kM2Zw';

    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(19.11);
    const [lat, setLat] = useState(52.21);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default App;
