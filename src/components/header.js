import React from 'react';
import img1 from '../images/Redseer_red.jpeg';

const Header = () => {
  return (
    <div style={{backgroundColor:'White'}}>
        <img src = {img1} style={{height:'50px', paddingLeft:'2vw', paddingTop:'5px', paddingBottom:'5px'}}  alt=' Redseer logo'/>
    </div>
  )
}

export default Header