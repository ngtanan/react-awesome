interface PlayAgainProps {
  gameStatus: string;
  onClick: () => void;
}

export default function PlayAgain(props: PlayAgainProps) {
  return (
    <div className="game-done">
      <div
        className="message"
        style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
      >
        {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
      </div>
      <button onClick={props.onClick}>Play Again</button>
    </div>
  );
}