import React, { createContext, useState, useEffect, useContext } from "react";

const GoogleMapsContext = createContext({ isLoaded: false, loadError: null });

export const useGoogleMaps = () => useContext(GoogleMapsContext);

export const GoogleMapsProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const scriptId = "google-maps-script";

    window.handleGoogleMapsLoad = () => {
      setIsLoaded(true);
      setLoadError(null);
    };

    if (document.getElementById(scriptId) || window.google) {
      if (window.google) {
        window.handleGoogleMapsLoad();
      }
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }&callback=handleGoogleMapsLoad`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onerror = () => {
      setLoadError("Failed to load the Google Maps script.");
      delete window.handleGoogleMapsLoad;
    };

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
      delete window.handleGoogleMapsLoad;
    };
  }, []);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
