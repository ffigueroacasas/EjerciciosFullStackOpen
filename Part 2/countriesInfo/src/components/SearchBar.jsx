export const SearchBar = ({search, handleTyping}) => {
  return (
    <div>
      <h2>Find: Countries: </h2>
      <input type="text"  onChange={handleTyping}/>
    </div>
  )
}