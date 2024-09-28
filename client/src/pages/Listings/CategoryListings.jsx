import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Constants from '../../constants';


const CategoryListings = (props) => {

    const imgStyle = {
        width: "100%",
        border: '2px solid white'
    }

    const wrapper = {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridGap: "100px 100px",
        //border: "1px solid black",
        maxWidth: "100%",
        margin: "50px 50px"
    }

    const priceTagStyle = {
        width:"50px",
        position:"relative",
        zIndex:"10",
        backgroundColor:"rgb(255,255,255,0.5)",
        padding:"2x",
        paddingRight:"5px",
        marginTop:-28,
        textAlign:"right",
        fontWeight:"bold"
    }



    return (
        <div style={{maxWidth: '100%', justifyContent: 'center', minHeight:'80vh'}}>
            <div style={wrapper}>
                {props.ads.map((ad) => {
                    let category = Constants.categoryNames[ad.category]
                    let subcategory;
                    switch(category) {
                        case 'women':
                            subcategory = Constants.women[ad.subcategory].value;
                            break;
                        case 'men':
                            subcategory = Constants.men[ad.subcategory].value;
                            break;
                        case 'kids':
                            subcategory = Constants.kids[ad.subcategory].value;
                            break;
                        default:
                            subcategory = 0;
                    }
                    return (
                        <li key={ad.ad_id} style={{ listStyleType: "none" }}><NavLink exact to =
                        {'/listings/' + category + '/' + subcategory + '/item?' + ad.ad_id}>
                            <img src={'/api/' + ad.photo1_url} alt = {ad.photo1_url + '_photo'} style={imgStyle}/>
                        </NavLink><p style={priceTagStyle}>{ad.price} €</p></li>)
                    }
                )}
            </div>
        </div>
    )
}

export default CategoryListings;