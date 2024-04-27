import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function AboutOverlay() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="aboutButton">
        About
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                About GeoBuddies
              </ModalHeader>
              <ModalBody>
                <p>This is a personal project.</p>
                <p>
                  All credits goes to GeoGuessr which is where I got the idea to
                  create this app.
                </p>
                <p>
                  <b>Why did I decide to make a GeoGuessr clone?</b>
                </p>
                While doing a catchup call with my high school friends who are
                in different cities/countries, we&apos;ve decided to mess around
                and test our geo skills in GeoGuessr. I&apos;ve unfortunately
                hit a level(level 2 in my case) that does not allow me to play
                GeoGuessr for free anymore.
                <p>
                  Being the broke comp-sci student I was, I&apos;ve decided to
                  make my own GeoGuessr called GeoBuddies. It is currently still
                  in production and I still have ideas I want to implement
                  including nostalgic easter eggs that will make us reminisce.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
