import React, { useEffect, useState} from "react";
import { getDataFromApi } from "../valantisApp/valantisApp";
import Search from "../search/Search";

import './body.css'

const Body = () => {
  const [ productItems, setProductItems ] = useState([]);
  const [ transformFilter, setTransformFilter ] = useState([]);
  const [ activeField, setActiveField ] = useState('');
  const [ filterValue, setFilterValue ] = useState({ field: '', value: ''});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'price' ? parseFloat(value) : value; // контроль того что приходит в <input> число или строка и конвертация этого в string или number
    setFilterValue({ field: name, value: parsedValue });
    setActiveField(value? name : '' )
  };

  const handleFilterButtonClick = async (e) => {
    e.preventDefault();
    try {
      if (filterValue.field && filterValue.value) {
        const filterObj = { [filterValue.field]: filterValue.value }; 
        const filteredIds = await getDataFromApi('filter', filterObj); // фильтр по заданным параметрам "brand" "price" "product" 
        const filteredItems = await getDataFromApi('get_items', { ids: filteredIds }); // расшифровка id полученного после фильтрации в filteredIds
        setTransformFilter(filteredItems);
        console.log('filtered items', filteredItems);
      } else {
        
        console.log("Please provide a filter value."); // здеcь нужно очищение результата
      }
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  };

  useEffect(() => {
      const fetchData = async () => {
          try {
              const ids = await getDataFromApi('get_ids', { offset: 0, limit: 4 }); // получение id по заданному количеству - limit и смещения относительно начала списка - offset, везде только положительные числа;
              const items = await getDataFromApi('get_items', { ids }); // расшифровка id полученного из const ids 
              setProductItems(items);
              console.log('items log',items)
              console.log('лог ids',ids)
          } catch (error) {
              console.error("Error fetching data:", error);
              if(error.response && error.response.status === 500) {
                console.log("Retrying fetch after 3 seconds...");
                setTimeout(fetchData, 3000); // повторить fetchData после 3 сек
              }
          }
      }

      fetchData();
  }, []);

  return (
      <div>
        <Search
          handleInputChange={handleInputChange} 
          handleFilterButtonClick={handleFilterButtonClick} 
          activeField={activeField}
        />
        <div>
            <h2>Filtered IDs</h2>
            
            {transformFilter.map((item, id) => (
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
        <div>
            <h2>Product Items</h2>
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


