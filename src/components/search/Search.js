import React from "react";

import './search.css'

const Search = ({ handleFilterButtonClick, handleClearSearch, setActiveField, showFilter,  setFilterValue, setCurrentPage}) => {

    const handleFilterSearch = (e) => {
        e.preventDefault(); 
        setCurrentPage(1);
        handleFilterButtonClick(e); 
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        let processedValue;
    
        if (/^\d+$/.test(value)) {
            processedValue = parseInt(value); // конвертация в число
        } else {
            processedValue = value; 
        }
    
        let params = '';
        if (/^[А-Яа-яЁё]+$/.test(value)) {
            params = 'product';
        } else if (/^\d+$/.test(value)) {
            params = 'price';
        } else if (/^[A-Za-z]+$/.test(value)) {
            params = 'brand';
        }
    
        setFilterValue({ params, value: processedValue });
        setActiveField(params);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            setCurrentPage(1);
            handleFilterButtonClick(e);
        }
    };   

    return(
        <div className="search_line">
            <div className="search_block">
                <div className="search_input">
                    <h2 onClick={handleFilterSearch} className="search_button button-6" >Поиск</h2>
                    {/* <SearchBtn /> */}
                    <form >
                        <div>
                            <input className="search_form"
                            type="text" 
                            name="universal" 
                            placeholder="Поиск (товар, цена, бренд)" 
                            required
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            ></input>
                        </div>
                        {showFilter && (
                            <button className="clear_btn" onClick={handleClearSearch}>x</button>
                        )}
                    </form>
                </div>
                
            </div>
            <div className="search_words">
                <h3><span>Кольца</span></h3>
                <h3>Серьги</h3>
                <h3>Цепи</h3>
                <h3>Колье</h3>
                <h3>Кулоны</h3>
                <h3>Браслеты</h3>
                <h3>Подвески</h3>
                <h3>Комплекты украшений</h3>
            </div>
        </div>
    )
}

export default Search;