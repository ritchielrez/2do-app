type SearchProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search(props: SearchProps) {
  return (
    <div id="search">
      <input
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        type="text"
      ></input>
    </div>
  );
}
