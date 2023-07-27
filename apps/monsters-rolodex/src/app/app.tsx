import { Component, ReactNode } from 'react';
import SearchBox from './components/search-box/index.component';
import CardList from './components/card-list/index.component';
import type { AppState, AppProps } from './app.types';
import './app.module.scss';

class App extends Component<any, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  componentDidMount(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((monsters) =>
        this.setState(() => ({ monsters }))
      );
  }

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchField: event.target.value });
  };
 
  render(): ReactNode {
    console.log('render from App');
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className='App'>
        <SearchBox
          className='monsters-search-box'
          placeholder='Search monsters'
          onChangeHandler={this.onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
