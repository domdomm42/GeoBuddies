import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function StreetViewMap({ long, lat }) {
  const panoRef = useRef(null);

  useEffect(() => {
    const initialize = () => {
      if (
        !window.google ||
        !window.google.maps ||
        !window.google.maps.StreetViewPanorama
      ) {
        console.error("Google Maps JavaScript API not loaded.");
        return;
      }

      console.log(long);
      const location = { long, lat };

      new window.google.maps.StreetViewPanorama(panoRef.current, {
        disableDefaultUI: true,
        position: location,
        pov: {
          heading: 34,
          pitch: 10,
        },
        visible: true,
      });
    };

    const loadGoogleMapScript = () => {
      if (window.google) {
        console.log("Google Maps already loaded, initializing...");
        initialize();
      } else {
        console.log("Loading Google Maps script...");
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }&callback=initialize`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    };

    window.initialize = initialize;

    loadGoogleMapScript();
  }, [long, lat]);

  return (
    <div>
      <div
        ref={panoRef}
        id="pano"
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    </div>
  );
}

StreetViewMap.propTypes = {
  long: PropTypes.number,
  lat: PropTypes.number,
};
