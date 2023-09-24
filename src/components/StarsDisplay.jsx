import utils from "../math-utils";

const StarsDisplay = ({ stars }) => {
  return (
    <>
      {utils.range(1, stars).map((starId) => (
        <div key={starId} className="star" />
      ))}
    </>
  );
};

export default StarsDisplay;
