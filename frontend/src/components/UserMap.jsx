import { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function UserMap() {
  let [marker, setMarker] = useState({ lat: 22.54992, lng: 0 });
  let [mapSize, setMapSize] = useState({ height: "30vh", width: "30vw" });

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
      height: "50vh",
      width: "50vw",
    });
  };

  const onMapLeave = () => {
    setMapSize({
      height: "30vh",
      width: "30vw",
    });
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{
          width: mapSize.width,
          height: mapSize.height,
          position: "absolute",
          right: "0",
          bottom: "0",
        }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={onMapClick}
        onMouseover={onMapHover}
        onMouseout={onMapLeave}
      >
        <Marker
          position={{
            lat: marker.lat,
            lng: marker.lng,
          }}
        />
      </Map>
    </APIProvider>
  );
}
