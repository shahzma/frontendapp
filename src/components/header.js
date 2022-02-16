import React from 'react';
import img1 from '../images/Redseer_red.jpeg';

const Header = () => {
  return (
    <div style={{backgroundColor:'Red'}}>
        <img src = {img1} style={{height:'80px', paddingLeft:'10vw'}}  alt=' Redseer logo'/>
    </div>
  )
}

export default Header