import React from "react";
import Loading from "./Loading";

import './loading.css'

const Results = ({showFilter, transformFilter, productItems, isLoading}) => {
    

    let counter = 1

    let itemsToDisplay = showFilter ? transformFilter : productItems;


    return(
      <>
            {isLoading ? (
            
                    Array.from({ length: 15 }).map((_, index) => <Loading key={index} />)
                
            ) : (
                <>
                    {itemsToDisplay.map((item, id) => (
                        <div key={id} className="product_block">
                            <p className="product_name">Товар - {item.product}</p>
                            <div className="product_specs">
                                {item.brand !== null ? <p> Брэнд- {item.brand}</p> : null}
                                <p>Цена - {item.price}руб.</p>
                                <p>ID товара - {item.id}</p>
                                <p>Товар № {counter++}</p>
                            </div>
                        </div>
                    ))}
                    
                </>
            )}
        </>
    )
}

export default Results;