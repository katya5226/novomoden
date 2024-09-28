import React from 'react';
import SumForSeller from './SumForSeller';
import CartListingSeller from './CartListingSeller';

const CartGroup = (props) => {

    const items = props.items;
    let n = items.length;
    let arr = [];

    let sum = {
        weight: 0,
        price: 0
    }

    const ids = items.map((item) => item.ad_id);

    for (let i = 0; i < n; i++) {
        arr.push(<CartListingSeller
                    key = {i}
                    description = {items[i]}
                    loggedInUserId = {props.loggedInUserId}
                    callBackParent = {props.callBackParent}
                    update = {props.update}/>);
        
        sum.weight += items[i].weight;
        sum.price += items[i].price;
    }
    arr.push(<SumForSeller
                key = {sum.weight}
                sum = {sum}
                ids = {ids}/>);

    return arr;

}

export default CartGroup;