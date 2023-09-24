import StarsDisplay from "./StarsDisplay";
import NumbersDisplay from "./NumbersDisplay";
import PlayAgain from "./PlayAgain";
import useGameState from "../hooks/useGameState";
import utils from "../math-utils";

const Game = ({ startNewGame }) => {
  // const [stars, setStars] = useState(utils.random(1, 9));
  // const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  // const [candidateNums, setCandidateNums] = useState([]);
  // const [secondsLeft, setSecondsLeft] = useState(10);

  // useEffect(() => {
  //   if (secondsLeft > 0 && availableNums.length > 0) {
  //     const timerId = setTimeout(() => {
  //       setSecondsLeft((previousSecondsLeft) => previousSecondsLeft - 1);
  //     }, 1000);

  //     return () => clearTimeout(timerId);
  //   }
  // }, [secondsLeft, availableNums]);

  const { stars, availableNums, candidateNums, secondsLeft, setGameState } =
    useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const gameStatus =
    availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  const numberStatus = (num) => {
    if (!availableNums.includes(num)) {
      return "used";
    }
    if (candidateNums.includes(num)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }

    return "available";
  };

  const onNumberClick = (num, currentStatus) => {
    if (gameStatus !== "active" || currentStatus == "used") {
      return;
    }

    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(num)
        : candidateNums.filter((cn) => cn !== num);

    // if (utils.sum(newCandidateNums) !== stars) {
    //   setCandidateNums(newCandidateNums);
    // } else {
    //   const newAvailableNums = availableNums.filter(
    //     (n) => !newCandidateNums.includes(n)
    //   );

    //   setStars(utils.randomSumIn(newAvailableNums, 9));
    //   setAvailableNums(newAvailableNums);
    //   setCandidateNums([]);
    // }

    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <PlayAgain onClick={startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay stars={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <NumbersDisplay
              key={number}
              number={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default Game;
