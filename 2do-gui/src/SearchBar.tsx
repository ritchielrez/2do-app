export default function Searchbar() {
    const SearchBarStyle = {
        border: 'medium solid',
        borderRadius: '0.5em',
        padding: '0.5em',
        fontFamily: 'Excalifont',
        fontSize: '1.5em',
    };

    return (
        <input style={SearchBarStyle} type="text" size={36}/>
    );
}