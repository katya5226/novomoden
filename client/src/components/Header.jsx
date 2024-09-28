import React from 'react';
import Logo from '../novomoden.png';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Header = () => {

    return (
        <header className='App-header'>
            <NavLink exact to = '/'>
                <img src={Logo} alt='logo' width='300px'/>
            </NavLink>
        </header>
    )
}

export default Header;