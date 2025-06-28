import { memo } from "react";

type SearchProps = {
  searchStr: string;
  setSearchStr: React.Dispatch<React.SetStateAction<string>>;
};

const Search = memo(function Search({ searchStr, setSearchStr }: SearchProps) {
  return (
    <input
      value={searchStr}
      onChange={(e) => setSearchStr(e.target.value)}
      type="text"
      autoComplete="false"
    ></input>
  );
});

export default Search;
