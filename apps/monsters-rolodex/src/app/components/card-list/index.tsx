import Card from '../card/index';
import type { User } from '../../app.types';
import './index.scss';

interface CardListProps {
  monsters: User[];
}

const CardList = (props: CardListProps) => {
  const { monsters } = props;
  return (
    <div className='card-list'>
      {monsters.map((monster) => (
        <Card key={monster.id} monster={monster}/>
      ))}
    </div>
  );
}

export default CardList;