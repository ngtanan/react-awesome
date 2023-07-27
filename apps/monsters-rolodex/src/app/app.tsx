import { useState, useEffect } from 'react';
import SearchBox from './components/search-box/index';
import CardList from './components/card-list/index';
import type { User } from './app.types';
import './app.module.scss';

const App = () => {
  const [monsters, setMonsters] = useState<User[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  const [searchField, setSearchField] = useState('');

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchField(event.target.value);
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    setFilteredMonsters(monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    ));
  }, [searchField, monsters]);

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox
        className='monsters-search-box'
        placeholder='Search monsters'
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

// class App extends Component<any, AppState> {
//   constructor(props: AppProps) {
//     super(props);
//     this.state = {
//       monsters: [],
//       searchField: '',
//     };
//   }

//   componentDidMount(): void {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((monsters) =>
//         this.setState(() => ({ monsters }))
//       );
//   }

//   onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     this.setState({ searchField: event.target.value });
//   };
 
//   render(): ReactNode {
//     console.log('render from App');
//     const { monsters, searchField } = this.state;
//     const filteredMonsters = monsters.filter((monster) =>
//       monster.name.toLowerCase().includes(searchField.toLowerCase())
//     );

//     return (
//       <div className='App'>
//         <h1 className='app-title'>Monsters Rolodex</h1>

//         <SearchBox
//           className='monsters-search-box'
//           placeholder='Search monsters'
//           onChangeHandler={this.onSearchChange}
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
