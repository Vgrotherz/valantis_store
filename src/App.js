import React from 'react'
import Body from "./components/body/Body";
import Header from './components/header/Header';

import './App.css'
import './reset.css';

const App = () => {

  return (
    <div className='app'>
      <Header />
      <Body />
    </div>
  )
}

export default App;