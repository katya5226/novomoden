import React from 'react';
import '../../App.css';
import UpperLine from '../../components/UpperLine';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';



const IDcard = () => {

    return (
        <div className="App">
        <UpperLine/>
        <Header/>
        <NavBar/>
        <BreadCrumbs pathname = {"/idcard"}/>
        <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
            <p>MINIMALIST d.o.o.</p>
            <p>SVETA TROJICA 5, ORMOŽ</p>
        </div>
        <AdSpace/>
        <Bottom/>
      </div>
    );

}

export default IDcard;

