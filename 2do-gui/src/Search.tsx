export default function Search() {
    const SearchBarStyle = {
        border: 'medium solid',
        borderRadius: '0.5em',
        padding: '0.5em',
        fontFamily: 'Excalifont',
        fontSize: '1.5em',
    };

    return (
        <div id="search">
            <input type="text" size={24}/>
            <button></button>
        </div>
    );
}
