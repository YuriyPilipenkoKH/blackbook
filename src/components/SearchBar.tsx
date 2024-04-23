import { SearchBarStyles,  counterSt } from "./serverStyles"
import { RiFindReplaceLine } from "react-icons/ri";
import { RiSettingsLine } from "react-icons/ri";
import { FlatBtn } from "./Button/Button";
import SearchingForm from "./Forms/SearchingForm";

interface SearchBarProps {
    counter:number | undefined
}

function SearchBar( {counter} : SearchBarProps) {
  return (
    <div style={SearchBarStyles} >
        <div style={counterSt}>{counter}</div>
        <div >
            <SearchingForm/>
        </div>
        <div>
            <FlatBtn className="bg-orange-400">
                <RiSettingsLine />
            </FlatBtn>
        </div>
      
    </div>
  )
}

export default SearchBar
