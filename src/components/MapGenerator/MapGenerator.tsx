import React, {useRef, useEffect, useState, SetStateAction, MutableRefObject} from 'react';
import * as mapboxgl from 'mapbox-gl';
import { geojson } from "../FetchData/FetchData";

export const MapGenerator = () => {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibWFjaWVqbzExNyIsImEiOiJjbDBwZHlrOGMxeGk0M2N1bzU5Z2V1Yjh3In0.5K0DGY1wdACaDKut7kM2Zw';

    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState<number>(19.11);
    const [lat, setLat] = useState<number>(52.21);
    const [zoom, setZoom] = useState<number>(6);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(Number(map.current!.getCenter().lng.toFixed(4)));
            setLat(Number(map.current!.getCenter().lat.toFixed(4)));
            setZoom(Number(map.current!.getZoom().toFixed(2)));
        });
    });

    useEffect(() => {
        if (map.current) {
            for (const feature of geojson.features) {
                // create a HTML element for each feature
                const el = document.createElement('div');
                el.className = 'marker';
                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el)
                    .setLngLat(feature.geometry.coordinates as [number,number])
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(
                                `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                            )
                    )
                    .addTo(map.current!);
            }
        }
    }, [geojson]);

    return (
        <div>
            <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div>
    <div ref={mapContainer} className="map-container" />
        </div>
);
}