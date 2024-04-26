import { useEffect, useState } from "react";
import StreetViewMap from "../components/StreetViewMap";
import UserMap from "../components/UserMap";
import "./GamePage.css";
import { useGoogleMaps } from "../components/GoogleMapsProvider";
export default function GamePage() {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded } = useGoogleMaps(); // Use the isLoaded from your GoogleMapsProvider

  // Upon initial load
  useEffect(() => {
    const getRandomLocation = async () => {
      try {
        const res = await fetch("http://localhost:3000/location");

        // if success in getting location
        if (res.ok) {
          const data = await res.json();
          setCoordinates({
            lat: data.coordinates[1],
            lng: data.coordinates[0],
          });
          setIsLoading(false);
        }
        // if failure in getting location
        else {
          console.error("Error fetching location details");
        }
      } catch (error) {
        console.log("Error is", error);
      }
    };
    getRandomLocation();
  }, []);

  return (
    <div className="game-container">
      {isLoading || !isLoaded || coordinates.lat === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <StreetViewMap long={coordinates.lng} lat={coordinates.lat} />
          <div className="user-selection">
            <UserMap />
          </div>
        </>
      )}
    </div>
  );
}
