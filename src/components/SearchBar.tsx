import { SearchBarStyles } from "./serverStyles"

interface SearchBarProps {
    counter:number | undefined
}

function SearchBar( {counter} : SearchBarProps) {
  return (
    <div style={SearchBarStyles}>
        <div>{counter}</div>
      
    </div>
  )
}

export default SearchBar
