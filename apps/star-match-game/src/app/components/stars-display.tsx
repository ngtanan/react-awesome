import { range } from '../utils/index';

interface StarsDisplayProps {
  count: number;
}

export default function StarsDisplay(props: StarsDisplayProps) {
  return (
    <>
      {range(1, props.count).map(starId => <div key={starId} className="star" />)}
    </>
  );
}