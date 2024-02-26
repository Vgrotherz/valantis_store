import React, { useEffect, useState} from "react";
import { getDataFromApi } from "../valantisApp/valantisApp";

import './body.css'

const Body = () => {
  const [productIds, setProductIds] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [productFields, setProductFields] = useState([]);
  const [filteredIds, setFilteredIds] = useState([]);
  const [ transformFilter, setTranscribe ] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const ids = await getDataFromApi('get_ids', { offset: 0, limit: 4 });
              setProductIds(ids);
              console.log('лог ids',ids)

              const fields = await getDataFromApi('get_fields');
              setProductFields(fields);
              console.log('fields log', fields)

              const filteredIds = await getDataFromApi('filter', { 'price': 3000.0 });
              setFilteredIds(filteredIds);
              console.log('filteredIds', filteredIds)

              const items = await getDataFromApi('get_items', { ids });
              setProductItems(items);
              console.log('items log',items)

            //   const transformFilter = await getDataFromApi('get_items', {filteredIds})
            //   setTranscribe(transformFilter);
            //   console.log('transform filter', transformFilter);


          } catch (error) {
              console.error("Error fetching data:", error);
          }
      }

      fetchData();
  }, []);

  return (
      <div>
        <h2>Product Fields</h2>
        <div>
            {productFields.map((field, index) => (
                <div key={index}>
                    {/* {field !== null? (
                    <p key={index}>{field}</p>
                    ) : null} */}
                    <input key={index} placeholder={field}></input>
                </div>
            ))}
            <button>Filter</button>
        </div>

        <h2>Filtered IDs</h2>
        <ul>
            {filteredIds.map(id => (
                <li key={id}>{id}</li>
            ))}
        </ul>     

        {/* <h2>Product IDs</h2>
        <ul>
            {productIds.map(id => (
                <li key={id}>{id}</li>
            ))}
        </ul> */}

        <h2>Product Items</h2>
        <div>
            {productItems.map((item, id) => (
                <div key={id} className="product_block">
                    {item.brand !== null? (
                        <p> Brand - {item.brand}</p>
                    ) : null } 
                    <p>Product - {item.product}</p>
                    <p>Price - {item.price}</p> 
                    <p>Item ID - {item.id}</p>
                </div>
            ))}
        </div>
      </div>
  );
}

export default Body;


