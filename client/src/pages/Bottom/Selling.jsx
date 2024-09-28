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

const Selling = () => {

    return (
        <div className="App">
        <UpperLine/>
        <Header/>
        <NavBar/>
        <BreadCrumbs pathname = {"/selling"}/>
        <div style = {{backgroundColor: 'rgb(255,255,255,0.7)'}}>
        <br/>
            <h2>PRODAJA NA SPLETNI STRANI</h2>
            <p>Za objavo in prodajo izdelkov boste potrebovali uporabniški račun.
                Zagotoviti boste morali pravilne podatke o vašem bančnem računu, na katerega si boste lahko nakazali denar od prodaje izdelkov.
                Za objavo in prodajo sledite naslednjim korakom:</p>
            <ol style = {listStyle}>
                <li>Če še nimate uporabniškega računa, se najprej registrirajte. Vpišite pravilne podatke o bančnem računu.</li>
                <li>Prijavite se v sistem.</li>
                <li>V uporabniških straneh pod zavihkom "moji oglasi" objavite oglas.</li>
                <li>Ko boste prejeli naročilo, bo to vidno v vaših uporabniških straneh, dobili pa boste tudi obvestilo po e-pošti.</li>
                <li>Zapakirajte in pošljite izdelke na naslov, ki ga dobite prek e-pošte, ter v uporabniških straneh pri naročilu označite, da ste izdelke odposlali.</li>
                <li>Počakajte na potrditev kupca.</li>
                <li>Denar od prodaje se zbira v vaši e-denarnici. V uporabniških straneh pod zavihkom "moja denarnica" si lahko nakažete denar na svoj bančni račun.
                    Nakažete si lahko le denar od naročil, za katere je bil potrjen prejem. Minimalni znesek nakazila je 10 €.</li>
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

export default Selling;