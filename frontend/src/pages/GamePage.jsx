import { useEffect, useState } from "react";
import StreetViewMap from "../components/StreetViewMap";
import UserMap from "../components/UserMap";
import "./GamePage.css";
import { useGoogleMaps } from "../components/GoogleMapsProvider";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
export default function GamePage() {
  // streetview coordinates
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded } = useGoogleMaps();

  // Upon initial load
  useEffect(() => {
    const getRandomLocation = async () => {
      try {
        const res = await fetch('/api/location', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (res.ok) {
          const data = await res.json();
          setCoordinates({
            lat: data.coordinates[1],
            lng: data.coordinates[0],
          });
          setIsLoading(false);
        } else {
          console.error("Error fetching location details");
        }
      } catch (err) {
        console.log("Error is", err);
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
          <Link to={"/"}>
            <Button className="backButton">Leave</Button>
          </Link>
          <StreetViewMap long={coordinates.lng} lat={coordinates.lat} />
          <div className="user-selection">
            <UserMap streetViewCoordinates={coordinates} />
          </div>
        </>
      )}
    </div>
  );
}
