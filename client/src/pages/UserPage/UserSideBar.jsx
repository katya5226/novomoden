import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.css';

class UserSideBar extends React.Component {

    handleClick = (event) => this.props.callBack(event.target.id);

    render() {

        return(
            <div className='sidenav'>
                <NavLink id='listings' exact to = {'/user_listings'} className='nonActive' activeStyle = {{color: 'white'}}>MOJI OGLASI</NavLink>
                <NavLink id='pastorders' exact to = {'/user_pastorders'} className='nonActive' activeStyle = {{color: 'white'}}>MOJA NAROČILA</NavLink>
                <NavLink id='sold' exact to = {'/user_sold'} className='nonActive' activeStyle = {{color: 'white'}}>PRODANO</NavLink>
                <NavLink id='wallet' exact to = {'/user_wallet'} className='nonActive' activeStyle = {{color: 'white'}}>MOJA DENARNICA</NavLink>
                <NavLink id='profile' exact to = {'/user_profile'} className='nonActive' activeStyle = {{color: 'white'}}>PROFIL</NavLink>
            </div>
        )
        //<button id="shranjeno" onClick={this.handleClick} className={this.props.saved}>SHRANJENO</button>

    }

}


export default UserSideBar;