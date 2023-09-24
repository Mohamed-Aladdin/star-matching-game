// import utils from "../math-utils";

const NumbersDisplay = ({ number, status, onClick }) => {
  return (
    <button
      className="number"
      style={{ backgroundColor: colors[status] }}
      onClick={() => onClick(number, status)}
    >
      {number}
    </button>
  );
};

// Color Theme
const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

export default NumbersDisplay;
