import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn, logOut } from '../../redux/actions';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';


class PaymentStatus extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            success: false,
            eventId: ''
        };
    }

    abortController = new AbortController();
    timer = null;

    componentDidMount() {
        this.timer = setTimeout(() => this.checkPayment(), 100);
        //this.interval = setInterval(() => {this.checkPayment();}, 3000);
    }

    checkPayment = () => {
        function subStrAfterChars(str, char) {
            return str.substring(str.indexOf(char) + 1);
        }
        const eventId = subStrAfterChars(window.location.href, '=');
        fetch('/api/paymentstatus', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                eventId: eventId
            })
        }).then(res => res.json())
        .then(res =>{if (res.success) {this.setState({success: true, eventId: res.orderId})}})
        .catch(e => console.error("Critical failure: " + e.message));
    }

    //{if (res.success) {this.setState({success: true, eventId: eventId})}}

    componentWillUnmount() {
        this.abortController.abort();
        clearTimeout(this.timer);
        //clearInterval(this.interval);
    }

    switchRender = () => {

        if (this.state.success) {
            return <div style = {{backgroundColor: 'rgb(255,255,255,0.7)', margin:'0 auto'}}>
                        <br/>
                        <h1>PLAČILO JE SPREJETO! NAROČILO ZAKLJUČENO! ŠTEVILKA NAROČILA: {this.state.eventId}</h1>
                        <NavLink exact to = '/' className = 'btnb'>DOMOV</NavLink>
                        <br/>
                    </div>
        } else {
            return <div style = {{backgroundColor: 'rgb(255,255,255,0.7)', margin:'0 auto'}}>
                        <br/>
                        <h1>OJEJ, NEKAJ JE ŠLO NAROBE, PLAČILO NI USPELO.</h1>
                        <NavLink exact to = '/' className = 'btnb'>DOMOV</NavLink>
                        <br/>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps) (PaymentStatus);
