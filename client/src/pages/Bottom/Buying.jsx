import React from 'react';
import { NavLink } from 'react-router-dom';
import UpperLine from '../../components/UpperLine';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';

const listStyle = {
    listStylePosition: "inside",
    lineHeight: "30px"
}

const Buying = () => {

    return (
        <div className="App">
        <UpperLine/>
        <Header/>
        <NavBar/>
        <BreadCrumbs pathname = {"/buying"}/>
        <div style = {{backgroundColor: 'rgb(255,255,255,0.7)'}}>
            <br/>
            <h2>NAKUPOVANJE NA SPLETNI STRANI</h2>
            <p>Nakupovanje na spletni strani je enostavno. Potrebovali boste le kreditno kartico. Sledite naslednjim korakom:</p>
            <ol style = {listStyle}>
                <li>Če še nimate uporabniškega računa, se najprej registrirajte.</li>
                <li>Prijavite se v sistem.</li>
                <li>Poiščite izdelke, ki vam ustrezajo in jih dodajte v košarico.</li>
                <li>Sledite postopku naročila in zaključite naročilo s plačilom s kreditno kartico.</li>
                <li>Po prejemu izdelkov v uporabniških straneh pod zavihkom "moja naročila" potrdite prejem, če je bilo z naročilom vse v redu.
                    V nasprotnem primeru kontaktirajte prodajalca oziroma podajte reklamacijo, če s prodajalcem ne prideta do sporazumne rešitve.</li>
            </ol>
            <br/>
            <p>Imate dodatna vprašanja? <NavLink to="/contentsupport">Pišite nam</NavLink></p>
            <br/>
        </div>
        <AdSpace/>
        <Bottom/>
      </div>
    );

}

export default Buying;