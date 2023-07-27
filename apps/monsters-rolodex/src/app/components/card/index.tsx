import type { User } from '../../app.types';
import './index.scss';

interface CardProps {
  monster: User;
}

const Card = (props: CardProps) => {
  const { id, name, email } = props.monster;
  return (
    <div className='card-container'>
      <img alt={`monster ${name}`} src={`https://robohash.org/${id}?set=set2&size=180x180`} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

export default Card;