import React from 'react';
import UpperLine from '../../components/UpperLine';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import '../../App.css';



const Advertising = () => {

    return (
        <div className='App'>
        <UpperLine/>
        <Header/>
        <NavBar/>
        <BreadCrumbs pathname = {"/advertising"}/>
        <div style = {{backgroundColor: 'rgb(255,255,255,0.7)'}}>
        <br/>
            <h2>OGLAŠEVANJE</h2>
            <p>Trenutno oglaševanje na tej spletni strani ni možno, je pa v načrtu za kasneje.</p>
            <br/>
        </div>
        <AdSpace/>
        <Bottom/>
      </div>
    );

}

export default Advertising;