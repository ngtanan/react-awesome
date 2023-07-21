// Color Theme
interface Colors {
  [key: string]: string;
}

const colors: Colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue'
}; 

interface PlayNumberProps {
  number: number;
  status: string;
  onNumberClick: (number: number, currentStatus: string) => void;
}

export default function PlayNumber(props: PlayNumberProps) {
  return (
    <button
      className="number"
      style={{ backgroundColor: colors[props.status] }}
      onClick={() => props.onNumberClick(props.number, props.status)}
    >
      {props.number}
    </button>
  );
}
