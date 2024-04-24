import { useState } from "react";
import { useGoogleMaps } from "./GoogleMapsProvider";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import SubmitButton from "./SubmitButton";

function UserMap() {
  const { isLoaded } = useGoogleMaps();
  const [marker, setMarker] = useState({ lat: 22.54992, lng: 0 });
  const [mapSize, setMapSize] = useState({ height: "25vh", width: "25vw" });
  const [mapOpacity, setMapOpacity] = useState("0.5");

  const handleMouseOver = () => {
    setMapSize({ height: "40vh", width: "40vw" });
    setMapOpacity("1");
  };

  const handleMouseOut = () => {
    setMapSize({ height: "25vh", width: "25vw" });
    setMapOpacity("0.5");
  };

  const handleFocus = () => {
    handleMouseOver(); 
  };

  const handleBlur = () => {
    handleMouseOut(); 

  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div
      className="userMap"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex="0"
    >
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{
            width: mapSize.width,
            height: mapSize.height,
            opacity: mapOpacity,
          }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling="greedy"
          disableDefaultUI={true}
          onClick={(e) =>
            setMarker({ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng })
          }
        >
          <Marker position={marker} />
        </Map>
      </APIProvider>
      <SubmitButton width={mapSize.width} opacity={mapOpacity} />
    </div>
  );
}

export default UserMap;
