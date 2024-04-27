import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

export default function AnswerOverlay({
  userPinnedCoordinates,
  streetViewCoordinates,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [distanceFromLocation, setDistanceFromLocation] = useState(0);

  // stops event propagation
  const handleMouse = (e) => {
    e.stopPropagation();
  };

  // Haversine formula,
  const findAnswerDistance = (userPinnedCoordinates, streetViewCoordinates) => {
    const R = 6371e3; // Earth's radius in meters
    const rad = Math.PI / 180; // conversion factor from degrees to radians
    const deltaLat =
      (streetViewCoordinates.streetViewCoordinates.lat -
        userPinnedCoordinates.lat) *
      rad;
    const deltaLon =
      (streetViewCoordinates.streetViewCoordinates.lng -
        userPinnedCoordinates.lng) *
      rad;
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(userPinnedCoordinates.lat * rad) *
        Math.cos(streetViewCoordinates.streetViewCoordinates.lat * rad) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in meters
    setDistanceFromLocation(Math.round(d));
  };

  return (
    <div
      className="answerOverlay"
      onMouseOver={handleMouse}
      onMouseOut={handleMouse}
      // onFocus={handleMouse}
      // onBlur={handleMouse}
    >
      <Button
        onPress={() => {
          onOpen();
          findAnswerDistance(userPinnedCoordinates, streetViewCoordinates);
        }}
        color="success"
        fullWidth={true}
        className="text-white"
      >
        Guess
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
      >
        <ModalContent className="flex flex-col align-middle justify-center">
          {
            <>
              <ModalHeader>
                Distance is off by {distanceFromLocation} meters
              </ModalHeader>
              <ModalBody>
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                  <Map
                    style={{
                      width: "100%",
                      height: "30vh",
                      opacity: 1,
                    }}
                    defaultCenter={streetViewCoordinates.streetViewCoordinates}
                    defaultZoom={3}
                    gestureHandling="greedy"
                    disableDefaultUI={true}
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                  >
                    <AdvancedMarker position={userPinnedCoordinates} />
                    <AdvancedMarker
                      position={streetViewCoordinates.streetViewCoordinates}
                    >
                      <Pin
                        background="#45d483"
                        borderColor="green"
                        glyph={"🏁"}
                      ></Pin>
                    </AdvancedMarker>
                  </Map>
                </APIProvider>
              </ModalBody>

              <ModalFooter>
                <Button
                  className="text-white"
                  color="success"
                  onPress={() => window.location.reload()}
                >
                  Next Map
                </Button>
              </ModalFooter>
            </>
          }
        </ModalContent>
      </Modal>
    </div>
  );
}

AnswerOverlay.propTypes = {
  userPinnedCoordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  streetViewCoordinates: PropTypes.shape({
    streetViewCoordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
