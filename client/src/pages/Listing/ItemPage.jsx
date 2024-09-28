import React from 'react';
import UpperLine from '../../components/UpperLine';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import Item from './Item';
import '../../App.css';


class ItemPage extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            cartUpdated: 0
        };
    }

    itemAdded = (value) => {
        this.setState({cartUpdated: value})
        console.log('updated cart!');
    }

    render() {

        function subStrAfterChars(str, char) {
            return str.substring(str.indexOf(char) + 1);
        }
        const adId = subStrAfterChars(window.location.href, '?');

        return (
            <div className="App">
                <UpperLine updated = {this.state.cartUpdated}/>
                <Header/>
                <NavBar/>
                <BreadCrumbs pathname = {this.props.location.pathname}/>
                <Item adId = {adId} itemAdded = {this.itemAdded}/>
                <AdSpace/>
                <Bottom/>
            </div>
        );

    }

}

export default ItemPage;
