import { Component, ReactNode } from 'react';
import './index.styles.scss';

interface SearchBoxProps {
  className: string;
  placeholder: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class SearchBox extends Component<SearchBoxProps> {
  render(): ReactNode {
    const { className, placeholder, onChangeHandler } = this.props;
      return (
        <input
        className={`search-box ${className}`}
        type='search'
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
      )
  }
}

export default SearchBox