import React from "react";

import './loading.css'

const Results = ({showFilter, transformFilter, productItems, isLoading}) => {

    let counter = 1
    return(
      <>
        {isLoading? (
          <div className="loading margin_1rem">
              {/* экран загрузки */}
              <div class="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
              </div>
          </div>
        ) : (
          <>
              {showFilter? (
                transformFilter.map((item, id) => (
                  <div key={id} className="product_block">
                    <p className="product_name">Товар - {item.product}</p>
                    <div className="product_specs">
                    {item.brand !== null ? <p> Брэнд - {item.brand}</p> : null}
                      <p>Цена - {item.price}руб.</p>
                      <p>ID товара - {item.id}</p>
                      <p>Товар № {counter++}</p>
                    </div>
                  </div>
                ))
              
            ) : (
              
                productItems.map((item, id) => (
                  <div key={id} className="product_block">
                    <p className="product_name">Товар - {item.product}</p>
                    <div className="product_specs">
                      {item.brand !== null ? <p> Брэнд- {item.brand}</p> : null}
                      <p>Цена - {item.price}руб.</p>
                      <p>ID товара - {item.id}</p>
                      <p>Товар № {counter++}</p>
                    </div>
                  </div>
                ))
                        
            )}
          </>)
        }
      </>
    )
}

export default Results;