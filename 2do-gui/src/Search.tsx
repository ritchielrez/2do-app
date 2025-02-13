function SearchBar() {
    return (
        <input id="search-bar" type="textbox"></input>
    );
}

function SearchBtn() {
    return (
        <button id="search-btn">Search</button>
    );
}

export default function Search() {
    return (
        <div id="search">
            <SearchBar></SearchBar>
            <SearchBtn></SearchBtn>
        </div>
    );
}
