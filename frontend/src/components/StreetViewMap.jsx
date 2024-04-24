import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
// import ReactStreetview from "react-streetview";

export default function StreetViewMap({
  long = 117.9127731,
  lat = -35.0304413,
}) {
  const panoRef = useRef(null);
  const scriptLoaded = useRef(false);

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
      new window.google.maps.StreetViewPanorama(panoRef.current, {
        disableDefaultUI: true,
        position: { lat: lat, lng: long },
        pov: {
          heading: 34,
          pitch: 10,
        },
        visible: true,
      });
    };
    window.initialize = initialize;
    const loadGoogleMapScript = () => {
      if (window.google && window.google.maps) {
        console.log("Google Maps already loaded, initializing...");
        initialize();
      } else if (
        !scriptLoaded.current &&
        !document.querySelector('script[src*="googleapis"]')
      ) {
        console.log("Loading Google Maps script...");
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }&callback=initialize`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        scriptLoaded.current = true;
      } else {
        console.log("Google Maps script is already loading or loaded...");
      }
    };
    loadGoogleMapScript();
    return () => {
      window.initialize = null;
    };
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

  // render();

  // see https://developers.google.com/maps/documentation/javascript
  // const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
  // const streetViewPanoramaOptions = {
  //   position: { lat: lat, lng: long },
  //   pov: { heading: 100, pitch: 0 },
  //   zoom: 1,
  // };

  // return (
  //   <div
  //     style={{
  //       width: "800px",
  //       height: "450px",
  //       backgroundColor: "#eeeeee",
  //     }}
  //   >
  //     <ReactStreetview
  //       apiKey={googleMapsApiKey}
  //       streetViewPanoramaOptions={streetViewPanoramaOptions}
  //     />
  //   </div>
  // );
}

StreetViewMap.propTypes = {
  long: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
};
