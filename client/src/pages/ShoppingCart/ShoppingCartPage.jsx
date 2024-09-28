import React from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Bottom from '../../components/Bottom';
import AdSpace from '../../components/AdSpace';
import CartGroup from './CartGroup';
import BreadCrumbs from '../../components/BreadCrumbs';


class ShoppingCartPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            userId: '0',
            cart: [],
            sortedCart: [],
            updated: 0
        };

    }
    abortController = new AbortController();

    //zaenkrat ta komponenta ne potrebuje connecta na redux ker sem morala klicati userja iz baze:

    getCart = () => {
        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => { this.setState({userId: res.userId});
            let cart = JSON.parse(window.localStorage.getItem(res.userId));
            if(cart) {
                (cart.length) && fetch('/api/cartListings', {
                    signal: this.abortController.signal,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(cart)
                }).then(res => res.json())
                    .then(res => {this.setState({sortedCart: res}, () => {(res.length !== cart.length) && this.deleteFromStorage(res)})})
                    .catch(e => console.error("Critical failure: " + e.message));

                (!cart.length) && this.setState({sortedCart: []});
            }
        })
        .catch(e => console.error("Critical failure: " + e.message));
    }

    componentDidMount() {
        this.getCart();
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    reMount = () => {
        this.getCart();
    }

    deleteFromStorage = (items) => {
        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => {this.removeFromCart(res, items);})
        .catch(e => console.error("Critical failure: " + e.message));
    }

    removeFromCart = (res, items) => {
        let cart = JSON.parse(window.localStorage.getItem(res.userId));
        for (let i = 0; i < cart.length; i++) {
            let d = 0;
            for (let j = 0; j < items.length; j++) {
                if (cart[i] === items[j].ad_id.toString()) d = 1;
            }
            if (d === 0) {
                cart.splice(cart.indexOf(cart[i]), 1);
                window.localStorage.setItem(res.userId, JSON.stringify(cart));
            }
        }
    }

    listCart = () => {
        const sCart = this.state.sortedCart;
        let componentArray = [];
        let sellerArray = [];
        let listingArray = [];

        if (sCart.length > 0) {
            let seller;

            let i = 0; let j = 0;
            while (i < sCart.length) {
                seller = sCart[i].username;
                while (j < sCart.length && sCart[j].username === seller) {
                    listingArray.push(sCart[j]);
                    j++;
                }
                sellerArray.push(listingArray);
                componentArray.push(<CartGroup
                                        key={j}
                                        items = {listingArray}
                                        loggedInUserId = {this.props.loggedInUserId}
                                        callBackParent = {this.reMount}
                                        update = {this.update}/>);
                listingArray = [];
                i = j;
            }
        }   
        return componentArray;
    }

    update = () => {
        this.setState({updated: this.state.updated - 1});
    }

    showCart = () => {
        console.log(JSON.parse(window.localStorage.getItem(21)));
        console.log(this.state.sortedCart);
        console.log(this.state.cart);
    }

    switchRender = () => {
        let len = this.state.sortedCart.length;
        if (this.state.userId === '0') {
            return <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                <br/><br/><br/>
                <h2>PROSIMO PRIJAVITE SE V SISTEM!</h2>
                <br/><br/><br/>
            </div>
        } else {
            return (
                len ? <div style = {{padding: '30px'}}> {this.listCart()} </div> :
                <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                    <br/><br/><br/>
                    <h2>KOŠARICA JE PRAZNA!</h2>
                    <br/><br/><br/>
                </div>
            )
        }
    }

    render() {

        return (
            <div className="App">
                <UpperLine updated = {this.state.updated}/>
                <Header/>
                <NavBar/>
                <BreadCrumbs pathname = {this.props.location.pathname}/>
                {this.switchRender()}
                <AdSpace/>
                <Bottom/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser,
      loggedInUserId: state.loggedInUserId,
    };
};

export default connect(mapStateToProps) (ShoppingCartPage);
