import React from "react";

const Pagination = ({ handlePrevPage, handleNextPage, currentPage, showFilter, transformFilter, productItems, itemsPerPage, isLoading }) => {
    return (
       <>
       {isLoading? (null) : (
                <div className="pagination flex ">
                    <button className="pagination_button" onClick={handlePrevPage} disabled={currentPage === 1}>&laquo;</button>
                    <div className="page_numbers"></div>
                    <button className="pagination_button" onClick={handleNextPage} disabled={currentPage === Math.ceil((showFilter ? transformFilter.length : productItems.length) / itemsPerPage)}>&raquo;</button>
                </div>
                )}
       </>
    )
}

export default Pagination;