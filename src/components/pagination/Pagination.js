import React from "react";

import './pagination.css';

const Pagination = ({ handlePrevPage, handleNextPage, currentPage, showFilter, transformFilter, productItems, itemsPerPage, isLoading, setCurrentPage, setFirstPage }) => {

    const totalPages = Math.ceil((showFilter ? transformFilter.length : productItems.length) / itemsPerPage);
    // const [firstPage, setFirstPage] = useState(1);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        let visiblePages = [];

        if (totalPages <= 6) {
            visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1);
        } else {
            if (currentPage <= 3) {
                visiblePages = [1, 2, 3, 4, "...", totalPages];
            } else if (currentPage >= totalPages - 2) {
                visiblePages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                visiblePages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
            }
        }

        visiblePages.forEach((pageNumber, index) => {
            pageNumbers.push(
                <button key={index} onClick={() => handlePageChange(pageNumber)} className={currentPage === pageNumber ? "activePage" : ""}>
                    {pageNumber}
                </button>
            );
        });

        return pageNumbers;
    };

    
    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            if (pageNumber === "...") {
                if (currentPage < totalPages - 3) {
                    setFirstPage(currentPage + 1);
                } else {
                    setFirstPage(totalPages - 3);
                }
            } else {
                setFirstPage(1);
                setCurrentPage(pageNumber);
            }
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