import React from "react";

const Search = ({ handleInputChange, handleFilterButtonClick, activeField }) => {
    return(
        <div>
            <div className="search_block">
                <h2>Product Fields</h2>
                <form>
                    <div>
                        <input
                        type="text"
                        name="product"
                        placeholder="Товар"
                        onChange={handleInputChange}
                        disabled={activeField && activeField !== 'product'}
                        />
                        <input
                        type="text"
                        name='price'
                        placeholder="Цена"
                        onChange={handleInputChange}
                        disabled={activeField && activeField !== 'price'}
                        />
                        <input
                        type="text"
                        name="brand"
                        placeholder="Брэнд"
                        onChange={handleInputChange}
                        disabled={activeField && activeField !== 'brand'}
                        />
                    </div>
                    <button onClick={handleFilterButtonClick}>Filter</button>
                </form>
            </div>
        </div>
    )
}

export default Search;