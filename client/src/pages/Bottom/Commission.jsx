import React from 'react';
//import '../../App.css';
import UpperLine from '../../components/UpperLine';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';



const Commission = () => {

    return (
        <div className="App">
        <UpperLine/>
        <Header/>
        <NavBar/>
        <BreadCrumbs pathname = {"/commission"}/>
        <div style = {{backgroundColor: 'rgb(255,255,255,0.7)'}}>
            <br/>
            <h2>PROVIZIJA</h2>
            <p>Provizijo od prodaje plača prodajalec, in sicer v znesku 0.5 € + 5 % od zneska naročila.</p>
            <p>To pomeni, da bo priliv v e-denarnico prodajalca zmanjšan za znesek provizije.</p>
            <br/>
        </div>
        <AdSpace/>
        <Bottom/>
      </div>
    );

}

export default Commission;