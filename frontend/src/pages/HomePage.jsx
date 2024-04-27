import "./HomePage.css";
import { Link } from "react-router-dom";
import AboutOverlay from "../components/AboutOverlay";
import { Button } from "@nextui-org/react";
export default function HomePage() {
  return (
    <div className="homepage">
      <div className="playSidebar">
        <Link to={"/game"}>
          <Button className="playButton">Play</Button>
        </Link>
        {/* <div className="aboutButton">About</div> */}
        <AboutOverlay className="aboutButton" />
      </div>

      <div className="animation">
        <img
          className="earthGif"
          src="../../earth-spin.gif"
          alt="Spinning earth gif"
        />
      </div>
    </div>
  );
}
