import React from 'react';
import '../../App.css';
import UpperLine from '../../components/UpperLine';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';



const Privacy = () => {

    return (
        <div className="App">
        <UpperLine/>
        <Header/>
        <NavBar/>
        <BreadCrumbs pathname = {"/privacy"}/>
        <div style = {{backgroundColor: 'rgb(255,255,255,0.7)', width:'60vw', textAlign:'left', display: 'inline-block', padding:'50px'}}>
        <br/>
            <h2>POLITIKA ZASEBNOSTI</h2>
            <h3>Pravica do zasebnosti</h3>
            <p>Z vašimi osebnimi podatki ravnamo pazljivo in skladno z v Republiki Sloveniji veljavnimi predpisi.
                Dostop do osebnih podatkov je dovoljen le pooblaščenim zaposlenim in pogodbenim obdelovalcem, 
                v obsegu in z namenom, ki je nujno potreben za nemoteno delovanje spletne strani.</p>
            <h3>Pooblaščena oseba za varstvo osebnih podatkov</h3>
            <p>Če imate kakršna koli vprašanja v zvezi z našo politiko varovanja osebnih podatkov 
                ali načinom obravnave vaših osebnih podatkov, se lahko brez zadržkov obrnete na našo 
                pooblaščeno osebo za varstvo osebnih podatkov v družbi IMP Tehnologija vode d.o.o. preko 
                elektronskega naslova info@impvoda.com. </p>
            <h3>Nameni obdelave osebnih podatkov in pravni temelji</h3>
            <p>Minimalist osebne podatke strank obdeluje kot posrednik pri prodaji izdelkov na spletni 
                strani, predvsem za namene nakazil in pri reklamacijskih zahtevkih strank. 
                Pri plačilu preko spleta Minimalist zagotavlja vse potrebne tehnološke in organizacijske 
                rešitve za popolno varnost nakupa. Prenos osebnih podatkov podanih ob registraciji v spletno 
                mesto Minimalist in transakcijskih podatkov povezanih z nakupom na spletni strani se izvaja 
                v varnem načinu s pomočjo protokola SSL (SecureSocketsLayer). 
                Varnost osebnih podatkov ob nakupu je zagotovljena tudi z upoštevanjem veljavnih zakonskih 
                obveznosti in priporočil slovenske ter mednarodne zveze potrošnikov. </p>
            <h3>Piškotki</h3>
            <p>Minimalist zbira osebne podatke tudi ob obisku spletne strani, prek piškotkov, 
                za namene zagotavljanja boljše funkcionalnosti in uporabniške izkušnje, varnosti ter nemotenega 
                delovanja spletne strani.
                Trenutno minimalist uporablja le obvezne piškotke, ki so ključni in brez njih spletna stran 
                ne bi delovala, kot bi morala. Nastavijo se, ko posameznik odda obrazec, se prijavi ali opravi 
                kakršnokoli interakcijo s spletno stranjo preko klikanja na enostavne povezave.</p>
            <h3>Obdelovalci osebnih podatkov</h3>
            <p>Poleg Minimalista osebne podatke v njegovem imenu in za njegov račun obdelujejo tudi 
                pogodbeni partnerji, trenutno Mangopay, ki skrbi za transakcije med uporabniki spletne strani.</p>
            <h3>Pravice posameznikov</h3>
            <p>S pisno zahtevo, poslano na naslov: IMP Tehnologija vode d.o.o., Goričica pri Ihanu 15, 1230 Domžale, s pripisom »za GDPR«, 
                ali na elektronski naslov info@impvoda.com lahko posameznik zahteva dostop, dopolnitev, popravek, 
                blokiranje oz. omejitev obdelave, izbris osebnih podatkov ali lahko ugovarja obdelavi podatkov, 
                ki se obdelujejo v zvezi z njim ter zahteva prenos podatkov.
                Posameznik lahko dane privolitve v obdelavo osebnih kadarkoli trajno ali začasno, 
                v celoti ali delno prekliče s pisno zahtevo, poslano na naslov: IMP Tehnologija vode d.o.o., Goričica pri Ihanu 15, 1230 Domžale, 
                s pripisom »za GDPR«, ali na elektronski naslov info@impvoda.com. 
                Preklic privolitve ne vpliva na zakonitost obdelave, ki se je na podlagi privolitve izvajala do njenega preklica.
                Posameznik ima pravico vložiti pritožbo pri Informacijskem pooblaščencu RS, če meni, da se njegovi osebni podatki 
                shranjujejo ali kako drugače obdelujejo v nasprotju z veljavnimi predpisi, ki urejajo varstvo osebnih podatkov. </p>
            <h3>Roki hrambe osebnih podatkov</h3>
            <p>Minimalist bo obdeloval osebne podatke v obsegu, ki je potreben za uresničevanje namenov obdelave in dokler 
                bo to potrebno za dosego zasledovanega cilja, v primeru pridobljenih osebnih podatkov na podlagi 
                privolitev, pa do preklica, razen v primerih, ko je rok hrambe osebnih podatkov določen z zakonom. 
                V slednjih primerih Minimalist podatke hrani v skladu z zakonsko obveznostjo.</p>
            <br/>
        </div>
        <AdSpace/>
        <Bottom/>
      </div>
    );

}

export default Privacy;