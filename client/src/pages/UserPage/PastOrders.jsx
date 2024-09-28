import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import UserSideBar from './UserSideBar';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import AdSpace from '../../components/AdSpace';
import '../../App.css';


class PastOrders extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            userId: '0',
            orders: [],
            confirmReceived: 0,
            openDispute: 0,
            perPage: 10,
            numPages: 1,
            page: 1
        };
    }

    abortController = new AbortController();
	componentDidMount() {
        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => this.setState({userId: res.userId}))
        .catch(e => console.error("Critical failure: " + e.message));

        this.callBackEnd('/userorders', 0, 0);
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    confirmGoodsReceived = (id) => {
        //const orders = this.state.orders.map((order) => {if(order.order_id === id) order.status = 2})
        this.callBackEnd('/orderstatus', id, 2);
        window.location.href = '/user_pastorders';
        //let orders = this.state.orders.map(order => {if(order.order_id === id) order.status=2})
        //console.log(this.state.orders[0].order_id)
        //const orders = this.state.orders.map((order) => {if(order.order_id === id) order.status = 2})
        //this.setState(state => {const orders = state.orders.map(order => {if(order.order_id === id) order.status=2}); return({...state, orders})});
    }

    callBackEnd = (backendPath, id, newStatus) => {
        fetch(backendPath, {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                orderId: id,
                newStatus: newStatus
            })
        })
        .then(this.setState({confirmReceived: 0, openDispute: 0}, () => {this.fetchOrders();}))
        .catch(e => console.error("Critical failure: " + e.message));
    }

    fetchOrders = () => {
        fetch('/api/userorders', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(orders => this.setState({orders: orders, numPages: Math.floor(orders.length/this.state.perPage + 0.99)}))
        .catch(e => console.error("Critical failure: " + e.message));
        this.setState({confirmReceived: 0, openDispute: 0});
    }

    openDispute = (id) => {
        // this.callBackEnd('/orderstatus', id, 3);
        // this.callBackEnd('/userorders', 0, 0);
        window.location.href = '/contentsupport?3';
    }

    cancelConfirm = () => {
        this.setState({confirmReceived: 0, openDispute: 0});
    }

    formatDate = (date) => {
        var d = new Date(date*1000),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('-');
    }

    paginationButtonClick = (e) => {
        let newpage = 1;
        switch(e.target.id) {
            case 'first':
                this.setState({page: 1});
                break;
            case 'previous':
                this.state.page > 1 ? newpage = this.state.page-1 : newpage = 1;
                this.setState({page: newpage});
                break;
            case 'next':
                this.state.page < this.state.numPages ? newpage = this.state.page+1 : newpage = this.state.numPages;
                this.setState({page: newpage});
                break;
            case 'last':
                this.setState({page: this.state.numPages});
                break;
            default:
                return null;
        }
    }

    mapOrders = () => {

        let numOrders = this.state.orders.length;
        let n = this.state.perPage;
        let p = this.state.page - 1;
        let till;
        p*n + n < numOrders ? till = (p+1)*n : till = numOrders;
        let ordersPortion = this.state.orders.slice(p*n, till);

        return (
            <div className = 'orderListWrapper'>                    
            {ordersPortion.map((order) =>
                <li key={order.order_id} style={{ listStyleType: "none" }}>
                    Številka naročila: <span style={{fontWeight: 'bold'}}> {order.order_id} </span>
                    Datum naročila:  <span style={{fontWeight: 'bold'}}>{this.formatDate(order.date_modified)} </span>
                    Cena:  <span style={{fontWeight: 'bold'}}>{order.price} € </span>
                    Poštnina:  <span style={{fontWeight: 'bold'}}>{order.postage} € </span>
                    Prodajalec: <span style={{fontWeight: 'bold'}}>{order.seller} </span>
                    Izdelki: {order.ad_ids.split(',').map(id => <NavLink to={"/item?" + id} key = {id} className = 'btn_nopad'>{id}</NavLink>)}
                    {order.status === 1 && <p><b>Naročilo je odposlano.</b></p>}
                    <br/>
                    {order.status === 1 && <button className = {['btn_nopad', 'btn_marg', 'btn_blue'].join(" ")} onClick = {() => this.setState({confirmReceived: order.order_id})}>POTRDI PREJEM</button>}
                    {(order.status === 0 || order.status === 1) && <NavLink className = {['btn_nopad', 'btn_marg', 'btn_lightyellow'].join(" ")} to = {'/chatpage/conversation?' + order.seller_id}>KONTAKTIRAJ PRODAJALCA</NavLink>}
                    {((order.status === 0 || order.status === 1) && order.dispute === 0) && <button className = {['btn_nopad', 'btn_marg', 'btn_yellow'].join(" ")} onClick = {() => this.setState({openDispute: order.order_id})}>ODPRI PRITOŽBO</button>}
                    {order.dispute === 1 && <button className = {['btn_nopad', 'btn_marg', 'btn_red', 'btn_nocursor'].join(" ")}>ODPRTA PRITOŽBA</button>}
                    {order.status === 2 && <button className = {['btn_nopad', 'btn_marg', 'btn_green', 'btn_nocursor'].join(" ")}>ZAKLJUČENO</button>}
                    {order.status === 4 && <button className = {['btn_nopad', 'btn_marg', 'btn_red', 'btn_nocursor'].join(" ")}>PREKLICANO</button>}
                </li>
            )}
                <div>
                    <button id='first' className='btn_nopad' onClick={this.paginationButtonClick}>PRVA</button>
                    <button id='previous' className='btn_nopad' onClick={this.paginationButtonClick}>&#60;&#60;</button>
                    <button id='current' className='btn_nopad'>{this.state.page}/{this.state.numPages}</button>
                    <button id='next' className='btn_nopad' onClick={this.paginationButtonClick}>&#62;&#62;</button>
                    <button id='last' className='btn_nopad' onClick={this.paginationButtonClick}>ZADNJA</button>
                </div>
            </div>
        )
    }

    switchRender = () => {
        if(this.state.userId === '0') {
            return (
                <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                    <br/><br/><br/>
                    <h2>PROSIMO PRIJAVITE SE V SISTEM!</h2>
                    <br/><br/><br/>
                </div>
            )
        }
        else if(!this.state.orders.length) {
            return (<div><h2 style = {{color: 'white'}}>NIČESAR ŠE NISTE NAROČILI.</h2></div>)
        } else if(this.state.confirmReceived || this.state.openDispute) {
            return (
                <div className = 'userContainer'>
                    <br/>
                    <br/>
                    {this.mapOrders()}
                    <Popup open = {true}
                        position = 'center center'
                        onClose={this.closeModal}>
                        <div style = {{display: 'inline-flex', justifyContent: 'space-around'}}>
                            {this.state.confirmReceived ? <p style= {{margin: 'auto 10px'}}>S potrditvijo bo naročilo zaključeno in pritožba ne bo več možna. Ali ste prepričani, da želite potrditi prejem izdelkov?</p> : null}
                            {this.state.confirmReceived ? <button className = 'btnb' onClick ={() => this.confirmGoodsReceived(this.state.confirmReceived)}>DA</button> : null}
                            {this.state.openDispute ? <p style= {{margin: 'auto 10px'}}>Pritožbo podajte le, če ste že kontaktirali prodajalca in niste prišli do sporazumne rešitve. Želite nadaljevati?</p> : null}
                            {this.state.openDispute ? <button className = 'btnb' onClick ={() => this.openDispute(this.state.openDispute)}>DA</button> : null}
                            <button className = 'btnb' onClick = {this.cancelConfirm}>NE</button>
                        </div>
                    </Popup>
                </div>
            )
        }
        else return(
            <div className = 'userContainer'>
            <br/>
            <br/>
            {this.mapOrders()}
        </div>
        )
    }

    render() {
        return (
            <div className="App">
            <UpperLine/>
            <Header/>
            <NavBar/>
            <BreadCrumbs pathname = {this.props.location.pathname}/>
            <UserSideBar/>
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
      loggedInUserId: state.loggedInUserId
    };
  };


export default connect(mapStateToProps) (PastOrders);

