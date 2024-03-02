import React from "react";

const Pagination = ({showFilter, offset, handlePageClick}) => {
    return(
        <>
            { !showFilter? (
                <div className="pagination flex">
                    <button className={offset === 0? 'backward_0' : ''} onClick={(e) => handlePageClick(e, 'backward')}>назад</button>
                    <button onClick={(e) => handlePageClick(e, 'forward')}>вперёд</button>
                </div> 
                ) : (
                <div className="filter_button pagination flex">
                    <button >наз</button>
                    <button >впер</button>
                </div> 
                )
            }
        </>
    )
}

export default Pagination;