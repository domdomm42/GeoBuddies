import { Map, Panorama } from "@vis.gl/react-google-maps";

const svSvc = new Panorama();

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const panoramaOptions = {
  position: { lat: 34.0522, lng: -118.2437 }, // Example: Coordinates for Los Angeles, CA
  pov: { heading: 165, pitch: 10 }, // Point of view: heading (angle), pitch (up/down)
  zoom: 1,
  motionTracking: true,
  motionTrackingControl: true,
};

function StreetViewMap() {
  return svSvc;
}

export default StreetViewMap;
