import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Pagination from '../pagination/Pagination'

import './loading.css'
import './results.css'

const Results = ({ showFilter, transformFilter, productItems, isLoading, currentPage, setCurrentPage }) => {
    const itemsPerPage = 50;
    
    const [ displayedItems, setDisplayedItems ] = useState([]);
    const [firstPage, setFirstPage] = useState(1);

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

    const totalPages2 = Math.ceil((showFilter ? transformFilter.length : productItems.length) / itemsPerPage)
    // console.log('total pages', totalPages2)

    // console.log('current page',currentPage);

    return (
        <>
            {isLoading ? (
                <div className="result loading_array ">
                { Array.from({ length: 18 }).map((_, index) => <Loading key={index} className='result' />)}
                </div>
                
            ) : (
                <div className="search_n_result">  
                    <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} transformFilter={transformFilter} productItems={productItems} showFilter={showFilter} setCurrentPage={setCurrentPage} currentPage={currentPage} itemsPerPage={itemsPerPage} firstPage={firstPage} setFirstPage={setFirstPage}/>
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
                    {totalPages2 >= 2? (
                        <div className="low_pagination">
                            <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} transformFilter={transformFilter} productItems={productItems} showFilter={showFilter} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} firstPage={firstPage} setFirstPage={setFirstPage} />
                        </div>) : ( null)
                    }
                </div>
            )}            
        </>
    );
}

export default Results;