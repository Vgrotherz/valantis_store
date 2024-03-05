import React from "react";

const Pagination = ({ handlePrevPage, handleNextPage, currentPage, showFilter, transformFilter, productItems, itemsPerPage, isLoading, setCurrentPage }) => {

    const totalPages = Math.ceil((showFilter ? transformFilter.length : productItems.length) / itemsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? "active" : ""}>
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
        }
    };

    return (
       <>
       {isLoading? (null) : (
                <div className="pagination flex ">
                    <button className="pagination_button" onClick={handlePrevPage} disabled={currentPage === 1}>&laquo;</button>
                    <div className="page_numbers">
                        {renderPageNumbers()}
                    </div>
                    <button className="pagination_button" onClick={handleNextPage} disabled={currentPage === Math.ceil((showFilter ? transformFilter.length : productItems.length) / itemsPerPage)}>&raquo;</button>
                </div>
                )}
       </>
    )
}

export default Pagination;