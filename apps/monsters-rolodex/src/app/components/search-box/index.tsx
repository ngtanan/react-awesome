import './index.scss';

interface SearchBoxProps {
  className: string;
  placeholder: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = (props: SearchBoxProps) => {
  const { className, placeholder, onChangeHandler } = props;
    return (
      <input
        className={`search-box ${className}`}
        type='search'
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    );
}

export default SearchBox