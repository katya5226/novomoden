import React from 'react';
//import '../../App.css';
import UpperLine from '../../components/UpperLine';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';



const Protection = () => {

    return (
        <div className="App">
        <UpperLine/>
        <Header/>
        <NavBar/>
        <BreadCrumbs pathname = {"/protection"}/>
        <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
            <p>INFORMACIJE</p>
            <p>V ZVEZI Z ZAŠČITO</p>
        </div>
        <AdSpace/>
        <Bottom/>
      </div>
    );

}

export default Protection;