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
    console.log(d);
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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Distance is off by {distanceFromLocation} meters
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => window.location.reload()}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
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
