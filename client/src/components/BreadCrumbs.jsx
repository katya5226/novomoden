import React from 'react'
import { NavLink } from "react-router-dom"
import * as Constants from '../constants';
import '../App.css';


const makeSlovene = (word) => {

    let sWord = '';
    
    for(let i=0; i < Constants.breadCrumbsConsts.length; i++) {
        (word === Constants.breadCrumbsConsts[i].value) && (sWord = Constants.breadCrumbsConsts[i].label);
        if (word.includes('conversation?')) sWord = 'pogovor';
        if (word.includes('all?')) sWord = 'vse';
    }

    return sWord;
}


const BreadCrumbs = (props) => {

    let linksplit = props.pathname.substr(1).split('/');

    let links = new Array(linksplit.length).fill('');

    for (let i = 0; i < linksplit.length; i++) {
        for (let j = 0; j <= i; j++) {
            links[i] += '/' + linksplit[j]
        }
    }

    let n = links.length;

    return <div style = {{textAlign: 'left', padding: '20px', color: 'white', textShadow: '1px 1px black'}}>
            <NavLink to = '/' style = {{color: 'white', textShadow: '1px 1px black', textDecoration: 'none'}}>domov</NavLink>
            {links.map((link, index) => {
                    if (index !== n-1) {return (
                    <NavLink key = {index} to = {link} style = {{color: 'white', textShadow: '1px 1px black', textDecoration: 'none'}}> > {makeSlovene(linksplit[index])}</NavLink>
                    )} else return null
            })}
            > {makeSlovene(linksplit[n-1])}
    </div>
}

export default BreadCrumbs