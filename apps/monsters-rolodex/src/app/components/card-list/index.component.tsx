import { Component, ReactNode } from 'react';
import type { User } from '../../app.types';

interface CardListProps {
  monsters: User[];
}

class CardList extends Component<CardListProps> {
  render(): ReactNode {
    console.log('render from CardList');
    const { monsters } = this.props;
    return (
      <div>
        {monsters.map((monster) => (
          <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>
        ))}
      </div>
    );
  }
}

export default CardList;