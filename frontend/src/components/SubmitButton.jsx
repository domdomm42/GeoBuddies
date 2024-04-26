import PropTypes from "prop-types";
import AnswerOverlay from "./AnswerOverlay";
import { useState } from "react";

export default function SubmitButton({ width = "25vw", opacity = 1 }) {
  const [showAns, setShowAns] = useState(false);
  const ans = () => {
    setShowAns(true);
  };

  return (
    <>
      <div className="submitButton">
        <button style={{ width, opacity, height: "3vh" }} onClick={ans}>
          Guess
        </button>
      </div>
      {showAns && <AnswerOverlay openOverlay={true} />}
    </>
  );
}

SubmitButton.propTypes = {
  width: PropTypes.string,
  opacity: PropTypes.string,
};
