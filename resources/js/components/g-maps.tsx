import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function GMaps({position}: {position?: { lat: number; lng: number; alt?: string }}) {
    return (
        <APIProvider apiKey={key}>
            <Map defaultCenter={position} defaultZoom={15} mapId="KOSEV_MAP_ID">
                <AdvancedMarker position={position} />
            </Map>
        </APIProvider>
    );
}
