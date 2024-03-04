import React from "react";

const Pagination = ({ handlePrevPage, handleNextPage, currentPage, showFilter, transformFilter, productItems, itemsPerPage }) => {
    return (
        <div className="pagination flex">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>назад</button>
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil((showFilter ? transformFilter.length : productItems.length) / itemsPerPage)}>вперёд</button>
        </div>
    );
}

export default Pagination;