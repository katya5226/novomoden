import React from 'react';
import '../../App.css';
import * as Constants from '../../constants';


const OrderListing = (props) => {

    const findSubcategory = (category, index) => {
        let sc;
        switch(category) {
            case 'women':
                sc = Constants.women[index];
                break;
            case 'men':
                sc = Constants.men[index];
                break;
            case 'kids':
                sc = Constants.kids[index];
                break;
            default:
                sc = null;
        }
        return sc.label;
    }

    const des = props.description;

    if(des) {
        let subcategory = findSubcategory(Constants.category[des.category].value, des.subcategory);
        return (
            <div style = {{padding: '30px', borderBottom: '2px dotted black', margin:'0 auto'}}>
                <img src={'/api' + des.photo1_url.substring(1)} alt = {des.photo1_url + '_photo'} height = '200'/>   
                <div className="description">
                    <p style = {{fontWeight: 'bold'}}>{subcategory}</p>
                    {des.category !== 3 && <p>Velikost: {Constants.clothsize[des.size].label}</p>}
                    <p>ID oglasa: {des.ad_id}</p>
                </div>
            </div>
        )
        } else return <div><h2>{this.props.description.price} €</h2></div>

}

export default OrderListing;