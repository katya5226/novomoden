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


class Sold extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            userId: '0',
            confirmSent: 0,
            orders: [],
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

        fetch('/api/usersold', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(orders => this.setState({orders}))
        .catch(e => console.error("Critical failure: " + e.message));   
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    confirmGoodsSent = (id) => {
        this.callBackEnd('/orderstatus', id, 1);
        this.fetchOrders();
    }

    cancelConfirm = () => {
        this.setState({confirmSent: 0});
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
        fetch('/api/usersold', {
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
        this.setState({confirmSent: 0});
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

        return(
            <div className = 'orderListWrapper'>
            <br/>
            <br/>
            {ordersPortion.map((order) =>
                <li key={order.order_id} style={{ listStyleType: "none" }}>
                    Številka naročila: <span style={{fontWeight: 'bold'}}> {order.order_id} </span>
                    Datum naročila:  <span style={{fontWeight: 'bold'}}>{this.formatDate(order.date_modified)} </span>
                    Cena:  <span style={{fontWeight: 'bold'}}>{order.price} € </span>
                    Poštnina:  <span style={{fontWeight: 'bold'}}>{order.postage} € </span>
                    Kupec: <span style={{fontWeight: 'bold'}}>{order.buyer} </span>
                    Izdelki: {order.ad_ids.split(',').map(id => <NavLink to={"/item?" + id} key = {id} className = 'btn_nopad'>{id}</NavLink>)}
                    <br/>
                    {order.status === 0 && <button className = {['btn_nopad', 'btn_marg', 'btn_yellow'].join(" ")} onClick = {() => this.setState({confirmSent: order.order_id})}>POTRDI POŠILJANJE</button>}
                    {order.status === 1 && <button className = {['btn_nopad', 'btn_marg', 'btn_lightyellow', 'btn_nocursor'].join(" ")}>ČAKA POTRDITEV KUPCA</button>}
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
            return (<div><h2 style = {{color: 'white'}}>NI PRODANIH IZDELKOV.</h2></div>)
        } else {
            if(!this.state.confirmSent)
                return (
                    <div className = 'userContainer'>
                        {this.mapOrders()}
                    </div>
                )
            else if(this.state.confirmSent)
                return(
                    <div className = 'userContainer'>
                        {this.mapOrders()}
                        <Popup open = {true}
                            position = 'center center'
                            onClose={this.closeModal}>
                            <div style = {{display: 'inline-flex', justifyContent: 'space-around'}}>
                                {this.state.confirmSent ? <p style= {{margin: 'auto 10px'}}>Potrjujem, da sem odposlal/a izdelke.</p> : null}
                                {this.state.confirmSent ? <button className = 'btnb' onClick ={() => this.confirmGoodsSent(this.state.confirmSent)}>DA</button> : null}
                                <button className = 'btnb' onClick = {this.cancelConfirm}>NE</button>
                            </div>
                        </Popup>
                    </div>
                )
        }
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


export default connect(mapStateToProps) (Sold);

