import React from 'react';
import { NavLink } from 'react-router-dom';
import UpperLine from '../../components/UpperLine';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';


const Posting = () => {

    return (
        <div className="App">
        <UpperLine/>
        <Header/>
        <NavBar/>
        <BreadCrumbs pathname = {"/posting"}/>
        <div style = {{backgroundColor: 'rgb(255,255,255,0.7)'}}>
            <br/>
            <h2>POŠILJANJE IZDELKOV</h2>
            <p>Po prejetju naročila izdelke čimprej zapakirajte in odpošljite prek Pošte Slovenije priporočeno ali z navadnim paketom.</p>
            <p>Naslov za pošiljanje boste prejeli v e-sporočilu, ko boste prejeli naročilo.</p>
            <p>Stroškov pakiranja in poštnine ne morete določiti sami, pač pa se izračunajo glede na težo izdelkov, ki jo vpišete, 
                tako da vam kupec dodatno plača strošek pošiljanja.</p>
            <br/>
            <p>Imate dodatna vprašanja? <NavLink to="/contentsupport">Pišite nam</NavLink></p>
            <br/>
        </div>
        <AdSpace/>
        <Bottom/>
      </div>
    );

}

export default Posting;