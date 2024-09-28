import React from 'react';
import {NavLink} from 'react-router-dom';
import '../../App.css';
import * as Constants from '../../constants';


const CartListingSeller = (props) => {

    const des = props.description;

    const removeFromCart = () => {
        let cart = JSON.parse(window.localStorage.getItem(props.loggedInUserId));
        if (cart !== null) {
            cart.splice(cart.indexOf(des.ad_id.toString()), 1);
            window.localStorage.setItem(props.loggedInUserId, JSON.stringify(cart));
        }
        cart = JSON.parse(window.localStorage.getItem(props.loggedInUserId));
        props.update(-1);
        props.callBackParent();
    }

    if(des) {

        let category;
        let subcategory;
        let subcategorySlo;
        switch(des.category) {
            case 1:
                category = 'women';
                subcategory = Constants.women[des.subcategory].value;
                subcategorySlo = Constants.women[des.subcategory].label;
                break;
            case 2:
                category = 'men';
                subcategory = Constants.men[des.subcategory].value;
                subcategorySlo = Constants.women[des.subcategory].label;
                break;
            case 3:
                category = 'kids';
                subcategory = Constants.kids[des.subcategory].value;
                subcategorySlo = Constants.women[des.subcategory].label;
                break;
            default:
                category = '';
                subcategory = '';
                subcategorySlo = '';
        }
        
        return (
            <div style = {{backgroundColor: 'rgb(255,255,255,0.7)', padding: '30px', margin: '0 auto'}}>
                <NavLink exact to = {'/listings/' + category + '/' + subcategory + '/item?' + des.ad_id}>
                    <img src={'/api' + des.photo1_url.substring(1)}
                        alt = {des.photo1_url + '_photo'}
                        height = '300'
                        style = {{border: '2px solid white'}}/>   
                </NavLink>
                <div className="description">
                    <p style = {{fontWeight: 'bold'}}>{subcategorySlo}</p>
                    <p>Velikost: {Constants.clothsize[des.size].label}</p>
                    <p>ID oglasa: {des.ad_id}</p>
                    <p>Cena: {des.price} €</p>
                    <p>Prodajalec: {des.username}</p>
                    <div style={{textAlign: 'right'}}><button className = 'btnx' onClick = {removeFromCart}>X ODSTRANI</button></div>
                    
                </div>
            </div>
        )
        } else return <div><h2>{this.props.description.price} €</h2></div>

}

export default CartListingSeller;