import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn, logOut } from '../../redux/actions';
import OrderListing from './OrderListing';
import FinishOrderData from './FinishOrderData';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import ClipLoader from 'react-spinners/ClipLoader';


class OrderPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            orderStatus: '',
            adIds: [],
            order: [],
            fetching: true,
            canceled: false,
            finished: false,
            error: false,
            loading: false,
            userId: '0',
            redirectUrl: ''
        };
    }

    abortController = new AbortController();

    componentDidMount() {
        fetch('/api/sessionorder', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                type: 2,
            })
        }).then(res => res.json())
            .then(res => { const adIds = JSON.parse(res); this.setState({adIds});
                (adIds.length) && fetch('/api/cartListings', {
                                    signal: this.abortController.signal,
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                    },
                                    body: JSON.stringify(adIds)
                                }).then(res => res.json())
                                    .then(res => {this.setState({order: res})})
                                    //.then(res => console.log(res))
                                    .catch(e => console.error("Critical failure: " + e.message));})
            .catch(e => console.error("Critical failure: " + e.message));

        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => this.setState({userId: res.userId}))
        .catch(e => console.error("Critical failure: " + e.message));
    }

    cancelOrder = () => {
        fetch('/api/sessionorder', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                type: 1,
                ids: []
            })
        }).then(() => this.setState({canceled: true}))
        .catch(e => console.error("Critical failure: " + e.message));
    }

    removeFromCart = () => {
        let cart = JSON.parse(window.localStorage.getItem(this.props.loggedInUserId));
        const adIds = this.state.adIds;
        adIds.forEach(adId => {
            cart.splice(cart.indexOf(adId.toString()), 1);
        })
        window.localStorage.setItem(this.props.loggedInUserId, JSON.stringify(cart));
    }

    finishOrder = () => {
        this.setState({loading: true});
        const price = this.priceSum(this.state.order, this.state.order.length);
        const postage = this.postageSum(this.state.order, this.state.order.length);
        fetch('/api/placeorder', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    ids: this.state.adIds,
                    price: price,
                    postage: postage,
                    seller_id: this.state.order[0].user_id,
                    seller: this.state.order[0].username,
                    status: -1
                }

            })
        }).then(res => res.json())
        .then(res => this.setState({redirectUrl: res.redirectUrl}))
        .catch(e => console.error("Critical failure: " + e.message));
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    handleOrder = () => {
        this.setState({orderStatus: 'ORDERED!'});
    }

    priceSum = (order, n) => {
        let price = 0;
        for (let i = 0; i < n; i++) {
            price += order[i].price;
        }
        return price;
    }
    postageSum = (order, n) => {
        let weight = 0;
        let postage = 0;
        for (let i = 0; i < n; i++) {
            weight += order[i].weight;
        }
        postage = weight < 100 ? 2 : 3;
        return postage;
    }

    goToPage = (redUrl) => {
        window.location.href = redUrl;
    }

    switchRender = () => {

        const order = this.state.order;
        const n = order.length;
        const price = this.priceSum(order, n);
        const postage = this.postageSum(order, n);

        if(this.state.redirectUrl !== '') {
            this.goToPage(this.state.redirectUrl);
        }
        else if (this.state.userId === '0') {
            return <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                <br/><br/><br/>
                <h2>PROSIMO PRIJAVITE SE V SISTEM!</h2>
                <br/><br/><br/>
            </div>
        }
        else if (!n) {
            return <div style = {{backgroundColor: 'rgb(255,255,255,0.7)', margin:'0 auto'}}>
                        <br/>
                        <h1>O NE! NEKAJ JE ŠLO NAROBE.</h1>
                        <NavLink exact to = '/shoppingcart' className = 'btnb'>NAZAJ NA KOŠARICO</NavLink>
                        <br/>
                    </div>
        }
        else if (n && !this.state.canceled && !this.state.finished) {
            return <div style = {{padding: '30px', margin: '0 auto'}}>
                    <div style = {{backgroundColor: 'rgb(255,255,255,0.7)', margin:'0 auto'}}>
                        <div style={{textAlign: 'left', paddingLeft: '50px', fontSize: 'Large'}}>
                            <br/>
                            <p><b>ODDAJ NAROČILO</b></p>
                        </div>
                        <br/>
                        <div style = {{float: 'left', paddingRight: '100px', minHeight: '70vh'}}>
                            {this.state.order.map(item => <OrderListing key ={item.ad_id} description = {item}/>)}
                        </div>
                        <div style = {{textAlign: 'left'}}>
                            <FinishOrderData/>
                            <br/>
                            <p>Cena: {price} €</p>
                            <p>Cena poštnine: {postage} €</p>
                            <p style = {{fontWeight: 'bold'}}>Skupaj: {price + postage} €</p>
                            <button className = 'btnb' onClick = {this.finishOrder}>ZAKLJUČI NAROČILO</button>
                            <button className = 'btnb' onClick = {this.cancelOrder}>PREKLIČI NAROČILO</button>
                            <br/>
                            <ClipLoader
                                size={50}
                                color={"#123abc"}
                                loading={this.state.loading}
                            />
                            <br/>
                            <p>{this.state.orderStatus}</p>
                        </div>
                        <br/>
                        <div style = {{clear: 'both'}}>

                        </div>
                        <br/>
                    </div>
                </div>
        } else if (this.state.canceled && !this.state.finished) {
            return <div style = {{backgroundColor: 'rgb(255,255,255,0.7)', margin:'0 auto'}}>
                        <br/>
                        <h1>NAROČILO PREKLICANO!</h1>
                        <NavLink exact to = '/shoppingcart' className = 'btnb'>NAZAJ NA KOŠARICO</NavLink>
                        <br/>
                    </div>
        } else if (this.state.finished && !this.state.canceled) {
            return <div style = {{backgroundColor: 'rgb(255,255,255,0.7)', margin:'0 auto'}}>
                        <br/>
                        {!this.state.error && <h1>NAROČILO ZAKLJUČENO!</h1>}
                        {this.state.error && <h1>NAPAKA! EDEN ALI VEČ IZDELKOV ŽAL NI VEČ NA VOLJO!</h1>}
                        <NavLink exact to = '/' className = 'btnb'>DOMOV</NavLink>
                        <br/>
                    </div>
        } else {
            return <div><br/><br/></div>
        }

    }

    render() {
        return <div className="App">
                    <UpperLine/>
                    <Header/>
                    <NavBar/>
                    <BreadCrumbs pathname = {this.props.location.pathname}/>
                    {this.switchRender()}
                    <AdSpace/>
                    <Bottom/>
                </div>
  
    }
    
}

const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser,
      loggedInUserId: state.loggedInUserId
    };
  };
  
  const mapDispatchToProps = {
    logIn: logIn,
    logOut: logOut
  };

export default connect(mapStateToProps, mapDispatchToProps) (OrderPage);
