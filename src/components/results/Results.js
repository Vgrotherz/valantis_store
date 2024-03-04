import React, { useState, useEffect } from "react";
import Loading from "./Loading";
// import Pagination from '../pagination/Pagination'

import './loading.css'
import './results.css'

const Results = ({ showFilter, transformFilter, productItems, isLoading }) => {
    const itemsPerPage = 50;
    
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ displayedItems, setDisplayedItems ] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const itemsToDisplay = showFilter ? transformFilter : productItems;
        const paginatedItems = itemsToDisplay.slice(startIndex, endIndex);

        setDisplayedItems(paginatedItems);
    }, [showFilter, transformFilter, productItems, currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil((showFilter ? transformFilter.length : productItems.length) / itemsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="result">
                { Array.from({ length: 18 }).map((_, index) => <Loading key={index} className='result' />)}
                </div>
                
            ) : (
                <>
                    <div className="pagination_prev">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>назад</button>
                    </div>
                    <div className="result">
                    {displayedItems.map((item, id) => (
                        <div key={id} className="product_block">
                            <p className="product_name">{item.product}</p>
                            <div className="product_specs">
                                {item.brand !== null ? <p> Бренд- {item.brand}</p> : null}
                                <p>Цена - {item.price}руб.</p>
                                <p>ID товара - {item.id}</p>
                                <p>Товар № {(currentPage - 1) * itemsPerPage + id + 1}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="pagination_next">
                        <button onClick={handleNextPage} disabled={currentPage === Math.ceil((showFilter ? transformFilter.length : productItems.length) / itemsPerPage)}>вперёд</button>
                    </div>
                </>
            )}
            {/* <div className="pagination flex">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>назад</button>
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil((showFilter ? transformFilter.length : productItems.length) / itemsPerPage)}>вперёд</button>
            </div> */}
        </>
    );
}

export default Results;