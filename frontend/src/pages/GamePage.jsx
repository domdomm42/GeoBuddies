import { useEffect, useState } from "react";
import StreetViewMap from "../components/StreetViewMap";
import UserMap from "../components/UserMap";
import "./GamePage.css";

export default function GamePage() {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  useEffect(() => {
    const getRandomLocation = async () => {
      try {
        const res = await fetch("http://localhost:3000/location", {});
        if (res.ok) {
          const data = await res.json();
          console.log("HI", data.coordinates[0]);
          setCoordinates({
            lat: data.coordinates[1],
            lng: data.coordinates[0],
          });
          console.log(coordinates.lat);
        } else {
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
      <StreetViewMap long={coordinates.lng} lat={coordinates.lat} />

      <div className="user-selection">
        <UserMap />
      </div>
    </div>
  );
}
