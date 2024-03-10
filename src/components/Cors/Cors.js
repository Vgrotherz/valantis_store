import React from "react"; 
import "./Cors.css"; 
 
const Cors = () => { 
    const handleCorsClick = () => { 
      window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank', 'width=600,height=200'); 
    }; 
   
    return ( 
        <div> 
            <button className="corsBtn" onClick={handleCorsClick}> 
                Нажми на меня
                <br></br>
                Да! это необходимо! 
            </button> 
      </div> 
    ); 
  }; 
 
 
export default Cors;