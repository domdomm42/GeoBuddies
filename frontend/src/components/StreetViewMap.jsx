import { useEffect, useRef } from "react";

export default function StreetViewMap() {
  const panoRef = useRef(null);

  useEffect(() => {
    const initialize = () => {
      const fenway = { lng: 151.2073975, lat: -33.8567543 };

      new window.google.maps.StreetViewPanorama(panoRef.current, {
        disableDefaultUI: true,
        position: fenway,
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
  }, []);

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
