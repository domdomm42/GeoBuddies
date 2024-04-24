import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useGoogleMaps } from "./GoogleMapsProvider";

export default function StreetViewMap({ long, lat }) {
  const { isLoaded } = useGoogleMaps();
  const panoRef = useRef(null);

  useEffect(() => {
    if (
      isLoaded &&
      window.google &&
      window.google.maps &&
      window.google.maps.StreetViewPanorama
    ) {
      new window.google.maps.StreetViewPanorama(panoRef.current, {
        position: { lat, lng: long },
        pov: { heading: 34, pitch: 10 },
        visible: true,
      });
    }
  }, [isLoaded, long, lat]);

  return <div ref={panoRef} style={{ width: "100vw", height: "100vh" }} />;
}

StreetViewMap.propTypes = {
  long: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
};
