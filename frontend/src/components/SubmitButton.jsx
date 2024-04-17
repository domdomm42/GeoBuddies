import PropTypes from "prop-types";

export default function SubmitButton({ width = "25vw", opacity = "1" }) {
  return (
    <div className="submitButton">
      <button style={{ width, opacity, height: "3vh" }}>Guess</button>
    </div>
  );
}

SubmitButton.propTypes = {
  width: PropTypes.string,
  opacity: PropTypes.string,
};
