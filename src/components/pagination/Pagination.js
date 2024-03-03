import React from "react";

const Pagination = ({ handlePrevPage, handleNextPage, isFirstPage, isLastPage }) => {
    return (
        <div className="pagination flex">
            <button onClick={handlePrevPage} disabled={isFirstPage}>назад</button>
            <button onClick={handleNextPage} disabled={isLastPage}>вперёд</button>
        </div>
    );
}

export default Pagination;