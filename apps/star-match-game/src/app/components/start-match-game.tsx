import { useEffect, useState } from 'react';
import StarsDisplay from './stars-display';
import PlayNumber from './play-number';
import PlayAgain from './play-again';
import { range, random, sum, randomSumIn } from '../utils/index';

// Custom Hook
const useGameState = () => {
  const [starts, setStarts] = useState(random(1, 9));
  const [availableNums, setAvailableNums] = useState(range(1, 9));
  const [candidateNums, setCandidateNums] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidateNums: number[]) => {
    if (sum(newCandidateNums) !== starts) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(n => !newCandidateNums.includes(n));
      setStarts(randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  const resetGame = () => {
    setStarts(random(1, 9));
    setAvailableNums(range(1, 9));
    setCandidateNums([]);
    setSecondsLeft(10);
  };

  return { starts, availableNums, candidateNums, secondsLeft, setGameState, resetGame };
};  

export default function StarMatchGame() {
  const {
    starts,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
    resetGame
  } = useGameState();

  const candidatesAreWrong = () => {
    return sum(candidateNums) > starts;
  };

  const gameStatus = availableNums.length === 0
      ? 'won'
      : secondsLeft === 0 ? 'lost' : 'active';

  const numberStatus = (number: number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong() ? 'wrong' : 'candidate';
    }
    return 'available';
  };

  const onNumberClick = (number: number, currentStatus: string) => {
    if (gameStatus !== 'active' || currentStatus === 'used') {
      return;
    }
    const newCandidateNums = currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter(cn => cn !== number);
    setGameState(newCandidateNums);
  };

  return (
    <div className="start-match-game game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain gameStatus={gameStatus} onClick={resetGame} />
          ) : (
            <StarsDisplay count={starts} />
          )}
        </div>
        <div className="right">
          {range(1, 9).map(number =>
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onNumberClick={onNumberClick}
            />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
}