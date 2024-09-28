import React from 'react';
import '../../App.css';
import UpperLine from '../../components/UpperLine';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';



const Cookies = () => {

    return (
        <div className="App">
        <UpperLine/>
        <Header/>
        <NavBar/>
        <BreadCrumbs pathname = {"/cookies"}/>
        <div style = {{backgroundColor: 'rgb(255,255,255,0.7)'}}>
        <br/>
            <h2>PIŠKOTKI</h2>
            <p>Ta spletna stran uporablja le piškotke, ki so nujno potrebni za delovanje strani.</p>
            <br/>
        </div>
        <AdSpace/>
        <Bottom/>
      </div>
    );

}

export default Cookies;