import React, { useEffect, useState} from "react";
import { getDataFromApi } from "../valantisApp/valantisApp";
import Search from "../search/Search";
import Results from "../results/Results";

import backgroundBanner from '../../media/banner.jpg'

import './body.css'

const Body = ({ currentPage, setCurrentPage }) => {
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
            const ids = await getDataFromApi('get_ids', { offset }); // получение id по заданному количеству - limit и смещения относительно начала списка - offset, везде только положительные числа;
            const uniqueIds = [...new Set(ids)];
            
            const items = await getDataFromApi('get_items', { ids: uniqueIds });// расшифровка id полученного из const ids 

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
            // console.log('лог ids',uniqueIds) // тут на ids
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

  // console.log('filter value log', filterValue.value );
  // console.log('filter params value', filterValue.params);

  const handleFilterButtonClick = async (e) => {
    setIsLoading(true)
    setOffset(0);
    e.preventDefault();

    if (!filterValue.params || !filterValue.value) {
      console.log("Please enter a value for filtering.");
      setIsLoading(false);
      return;
    }

    try {
      if (filterValue.params && filterValue.value) {
        const filterObj = { [filterValue.params]: filterValue.params === "product" ? filterValue.value.toLowerCase() : filterValue.value }; 
        const filteredIds = await getDataFromApi('filter', filterObj); // фильтр по заданным параметрам "brand" "price" "product" 
        // console.log('filtered Ids', filteredIds)
        const filteredItems = await getDataFromApi('get_items', { ids: filteredIds }); // расшифровка id полученного после фильтрации в filteredIds

        const uniqueFilteredItemsMap = new Map();
        filteredItems.forEach(item => {
          if (!uniqueFilteredItemsMap.has(item.id)) {
            uniqueFilteredItemsMap.set(item.id, item);
          }
        });

        const uniqueFilteredItems = Array.from(uniqueFilteredItemsMap.values());

        setTransformFilter(uniqueFilteredItems);
        setShowFilter(true); // true не даёт переключать "результат" на "каталог" при повторном нажатии на кнопку фильтра
        setIsLoading(false)
        console.log('filtered items', uniqueFilteredItems);
      } else {
        
        console.log("Please provide a filter value.");
      }
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  };

  const handleClearSearch = () => {
    setIsLoading(true)
    setCurrentPage(1);
    setTransformFilter([]);
    setShowFilter(false); // переключение "результат" на "каталог" при нажатии на "очистить результат"
    setFilterValue({ params: "", value: "" }); // очистка input значений при нажатии на "очистить результат"
    setActiveField("");
    document.getElementsByName("universal")[0].value = "";
    setIsLoading(false)

  };

  return (
      <div>
        <Search
          handleFilterButtonClick={handleFilterButtonClick} 
          activeField={activeField}
          setActiveField={setActiveField}
          handleClearSearch={handleClearSearch}
          showFilter={showFilter}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <div className="main flex">
          <div className="background_banner">
            {showFilter && (
              <button className="button-80" onClick={handleClearSearch}>Сбросить результат</button>
            )}
            <img src={backgroundBanner} alt="background banner"></img>
          </div>
          <span className="main_span flex ">
            <h1>{!showFilter? 'Весь каталог' : 'Товары по запросу'}</h1>
            {!isLoading? (<h3>Найдено {!showFilter ? productItems.length : transformFilter.length} товара(-ов) {
              showFilter && filterValue.params === "product" ? (`по запросу "${filterValue.value}"`) : 
              showFilter && filterValue.params === "price"? (`по заданной цене - "${filterValue.value}"`) : 
              showFilter && filterValue.params === "brand"? (`по заданному бренду - "${filterValue.value}"`) : (null)}
            </h3>) : null}            
          </span>
          <div className="flex">
            <Results productItems={productItems} transformFilter={transformFilter} showFilter={showFilter} isLoading={isLoading} offset={offset} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
  );
}

export default Body;


