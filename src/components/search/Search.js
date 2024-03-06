import React from "react";
import './search.css'

const Search = ({ handleInputChange, handleFilterButtonClick, handleClearSearch, activeField, showFilter, setCurrentPage }) => {
    const handleFilterSearch = (e) => {
        e.preventDefault(); 
        handleFilterButtonClick(e); 
    }

    return(
        <div>
            <div className="search_block">
                <h2 onClick={handleFilterSearch} className="search_button">Поиск</h2>
                <form className="search_form flex">
                    <div>
                        <input 
                          type="text" 
                          name="universal" 
                          placeholder="Поиск (товар, цена, бренд)" 
                          required
                          onChange={handleInputChange}
                        />
                    </div>
                    {showFilter && (
                        <button onClick={handleClearSearch}>Очистить результат</button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Search;