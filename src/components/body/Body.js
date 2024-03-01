import React, { useEffect, useState} from "react";
import { getDataFromApi } from "../valantisApp/valantisApp";
import Search from "../search/Search";

import './body.css'

const Body = () => {
  const [ productItems, setProductItems ] = useState([]);
  const [ transformFilter, setTransformFilter ] = useState([]);
  const [ activeField, setActiveField ] = useState('');
  const [ filterValue, setFilterValue ] = useState({ field: '', value: ''});
  const [ showFilter, setShowFilter ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const ids = await getDataFromApi('get_ids', { offset: 0 , limit: 100 }); // получение id по заданному количеству - limit и смещения относительно начала списка - offset, везде только положительные числа;
            const uniqueIds = [...new Set(ids)];
            const items = await getDataFromApi('get_items', { ids: uniqueIds }); // расшифровка id полученного из const ids 

            // создает новый мап сохраняет туда только первый ID  
            const uniqueItemsMap = new Map();
            items.forEach(item => {
              if (!uniqueItemsMap.has(item.id)) {
                uniqueItemsMap.set(item.id, item);
              }
            });

            const uniqueItems = Array.from(uniqueItemsMap.values());

            setProductItems(uniqueItems);
            console.log('items log',uniqueItems) // uniqueItems меняется на items и тогда виден лог без изменений со всеми дублями
            console.log('лог ids',uniqueIds) // тут на ids
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
        setShowFilter(true); // true не даёт переключать "результат" на "каталог" при повторном нажатии на кнопку фильтра
        console.log('filtered items', filteredItems);
      } else {
        
        console.log("Please provide a filter value."); // здеcь нужно очищение результата
      }
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  };

  const handleClearSearch = () => {
    setTransformFilter([]);
    setShowFilter(false); // переключение "результат" на "каталог" при нажатии на "очистить результат"
    // setIsSearchResults(false);
    setFilterValue({ field: "", value: "" }); // очистка input значений при нажатии на "очистить результат"
    setActiveField("");
    document.getElementsByName("product")[0].value = "";
    document.getElementsByName("price")[0].value = "";
    document.getElementsByName("brand")[0].value = "";
  };

  let counter = 1
  return (
      <div>
        <Search
          handleInputChange={handleInputChange} 
          handleFilterButtonClick={handleFilterButtonClick} 
          activeField={activeField}
          handleClearSearch={handleClearSearch}
          showFilter={showFilter}
        />
        <div className="main">
          <span className="flex">
            <h1>{!showFilter? 'Весь каталог' : 'Товары по запросу'  }</h1>
            <h3>Количество :</h3>
          </span>
          <div className="result">
            {showFilter? (
              
                transformFilter.map((item, id) => (
                  <div key={id} className="product_block">
                    {item.brand !== null ? <p>Brand - {item.brand}</p> : null}
                    <p>Product - {item.product}</p>
                    <p>Price - {item.price}</p>
                    <p>Item ID - {item.id}</p>
                    <p>Товар {counter++}</p>
                  </div>
                ))
              
            ) : (
              
                productItems.map((item, id) => (
                  <div key={id} className="product_block">
                    {item.brand !== null ? <p> Brand - {item.brand}</p> : null}
                    <p>Product - {item.product}</p>
                    <p>Price - {item.price}</p>
                    <p>Item ID - {item.id}</p>
                    <p>Товар {counter++}</p>
                  </div>
                ))
                       
            )}   
          </div>
        </div>
      </div>
  );
}

export default Body;


