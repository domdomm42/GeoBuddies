import StreetViewMap from "../components/StreetViewMap";
import UserMap from "../components/UserMap";
import "./GamePage.css";

export default function GamePage() {
  return (
    <div className="game-container">
      <StreetViewMap />

      <div className="user-selection">
        <UserMap />
      </div>
    </div>
  );
}
