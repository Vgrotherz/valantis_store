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
                        <input type="text" name="product" placeholder="Товар" required
                        onChange={handleInputChange}
                        disabled={activeField && activeField !== 'product'}
                        />
                        <input type="text" name='price' placeholder="Цена" required
                        onChange={handleInputChange}
                        disabled={activeField && activeField !== 'price'}
                        />
                        <input type="text" name="brand" placeholder="Бренд" required
                        onChange={handleInputChange}
                        disabled={activeField && activeField !== 'brand'}
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