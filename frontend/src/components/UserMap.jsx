import { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import SubmitButton from "./SubmitButton";

export default function UserMap() {
  let [marker, setMarker] = useState({ lat: 22.54992, lng: 0 });
  let [mapSize, setMapSize] = useState({ height: "25vh", width: "25vw" });
  let [mapOpacity, setMapOpacity] = useState(0.5);

  const onMapClick = (e) => {
    console.log(e);
    setMarker({
      lat: e.detail.latLng.lat,
      lng: e.detail.latLng.lng,
    });
    console.log(marker);
  };

  const onMapHover = () => {
    setMapSize({
      height: "40vh",
      width: "40vw",
    });

    setMapOpacity(1);
  };

  const onMapLeave = () => {
    setMapSize({
      height: "25vh",
      width: "25vw",
    });

    setMapOpacity(0.5);
  };

  return (
    <div className="userMap" onMouseOver={onMapHover} onMouseOut={onMapLeave}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{
            width: mapSize.width,
            height: mapSize.height,
            opacity: mapOpacity,
          }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          onClick={onMapClick}
        >
          <Marker
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          />
        </Map>
      </APIProvider>
      <SubmitButton width={mapSize.width} opacity={mapOpacity} />
    </div>
  );
}
