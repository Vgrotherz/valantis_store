import React, { useState} from 'react'
import Header from './components/header/Header';
import Body from "./components/body/Body";
import Footer from "./components/footer/Footer"

import './App.css'
import './reset.css';

const App = () => {
  const [ currentPage, setCurrentPage ] = useState(1);


  // console.log('page is', currentPage )
  return (
    <div className='app'>
      <Header />
      <Body currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Footer />
    </div>
  )
}

export default App;