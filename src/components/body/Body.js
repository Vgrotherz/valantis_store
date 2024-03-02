import React, { useEffect, useState} from "react";
import { getDataFromApi } from "../valantisApp/valantisApp";
import Search from "../search/Search";
import Pagination from "../pagination/Pagination";
import Results from "../results/Results";

import './body.css'

const Body = () => {
  const [ productItems, setProductItems ] = useState([]); // основной товар
  const [ transformFilter, setTransformFilter ] = useState([]); // отфильтрованый товар
  const [ activeField, setActiveField ] = useState(''); 
  const [ filterValue, setFilterValue ] = useState({ params: '', value: ''});
  const [ showFilter, setShowFilter ] = useState(false); // 
  const [ offset, setOffset ] = useState(0); // стейт смещения 
  const [ isLoading, setIsLoading ] = useState(false) // стейт лоадера во время загрузки товара

  useEffect(() => {
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const ids = await getDataFromApi('get_ids', { offset, limit: 50 }); // получение id по заданному количеству - limit и смещения относительно начала списка - offset, везде только положительные числа;
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
            setIsLoading(false)
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
  }, [offset]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'price' ? parseFloat(value) : value; // контроль того что приходит в <input> число или строка и конвертация этого в string или number
    setFilterValue({ params: name, value: parsedValue });
    setActiveField(value? name : '' )
  };

  const handleFilterButtonClick = async (e) => {
    setIsLoading(true)
    setOffset(0);
    setProductItems([]);
    e.preventDefault();
    try {
      if (filterValue.params && filterValue.value) {
        const filterObj = { [filterValue.params]: filterValue.value }; 
        const filteredIds = await getDataFromApi('filter', filterObj); // фильтр по заданным параметрам "brand" "price" "product" 
        console.log('filtered Ids', filteredIds)
        const filteredItems = await getDataFromApi('get_items', { ids: filteredIds }); // расшифровка id полученного после фильтрации в filteredIds
        setTransformFilter(filteredItems);
        setShowFilter(true); // true не даёт переключать "результат" на "каталог" при повторном нажатии на кнопку фильтра
        setIsLoading(false)
        console.log('filtered items', filteredItems);
      } else {
        
        console.log("Please provide a filter value."); // здеcь нужно очищение результата
      }
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  };

  // щелканье страниц
  const handlePageClick = async (e, direction) => {
    e.preventDefault();
    const newOffset = direction === 'forward' ? offset + 50 : Math.max(0, offset - 50);
    setOffset(newOffset);
    console.log('offset is ', newOffset)
  };
  
  const handleClearSearch = () => {
    setIsLoading(true)
    setOffset(0);
    setTransformFilter([]);
    setShowFilter(false); // переключение "результат" на "каталог" при нажатии на "очистить результат"
    // setIsSearchResults(false);
    setFilterValue({ params: "", value: "" }); // очистка input значений при нажатии на "очистить результат"
    setActiveField("");
    document.getElementsByName("product")[0].value = "";
    document.getElementsByName("price")[0].value = "";
    document.getElementsByName("brand")[0].value = "";
    setIsLoading(false)

  };

  
  return (
      <div>
        <Search
          handleInputChange={handleInputChange} 
          handleFilterButtonClick={handleFilterButtonClick} 
          activeField={activeField}
          handleClearSearch={handleClearSearch}
          showFilter={showFilter}
        />
        <div className="main flex">
           <Pagination handlePageClick={handlePageClick} offset={offset} showFilter={showFilter}/>
          <span className="main_span flex">
            <h1>{!showFilter? 'Весь каталог' : 'Товары по запросу'  }</h1>
            { offset > 0? (
            <div className="margin_1rem">
              <button className="home_button" onClick={() => setOffset(0)}>В начало</button>
            </div>
            ) : (null)}
          </span>
          <div className="result">
            <Results productItems={productItems} transformFilter={transformFilter} showFilter={showFilter} isLoading={isLoading}/>
          </div>
        </div>
      </div>
  );
}

export default Body;


