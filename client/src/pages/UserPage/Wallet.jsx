import React from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import UserSideBar from './UserSideBar';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import AdSpace from '../../components/AdSpace';
import '../../App.css';


class Wallet extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            userId: '0',
            walletInfo: null,
            success: null,
            requestWithdraw: false
        };
    }

    abortController = new AbortController();
	componentDidMount() {
        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => this.setState({userId: res.userId}))
        .catch(e => console.error("Critical failure: " + e.message));

        this.callUserWallet(0);

    }

    callUserWallet = (amount) => {
        fetch('/api/userwallet', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                amount: amount
            })
        })
        .then(res => res.json())
        .then(res => {if(!amount) {this.setState({walletInfo: res});} else this.setState({success: res.success, requestWithdraw: false})})
        .catch(e => console.error("Critical failure: " + e.message));   
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    onWithdrawButtonClick = () => {
        this.setState({requestWithdraw: true});
    }

    cancelWithdraw = () => {
        this.setState({requestWithdraw: false});
    }

    closeModal = () => {
        this.setState( {success: null, requestWithdraw: false})
    }

    switchRender = () => {

        let walletInfo = this.state.walletInfo;

        if(this.state.userId === '0') {
            return (
                <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                    <br/><br/><br/>
                    <h2>PROSIMO PRIJAVITE SE V SISTEM!</h2>
                    <br/><br/><br/>
                </div>
            )
        } else if(!this.state.walletInfo) return <div></div>

        else if(this.state.requestWithdraw) {
            return (
                <div className = 'userContainer'>
                <div className = 'profile'>
                    <h2>MOJA DENARNICA</h2>
                    <p><b>Stanje:</b> {walletInfo.wallet.Balance.Amount/100 + ' ' + walletInfo.wallet.Balance.Currency}</p>
                    <p><b>Na voljo za prenos:</b> {walletInfo.availableBalance} EUR</p>
                    {walletInfo.availableBalance >= 10 && <button className = 'btn' onClick = {this.onWithdrawButtonClick}>PRENESI NA SVOJ BANČNI RAČUN</button>}
                </div>
                <Popup open = {true}
                position = 'center center'
                onClose={this.closeModal}>
                    <div style = {{display: 'inline-flex', justifyContent: 'space-around'}}>
                        <p style= {{margin: 'auto 10px'}}>Potrditev prenosa {this.state.walletInfo.availableBalance} EUR iz e-denarnice na bančni račun?</p>
                        <button className = 'btnb' onClick ={() => this.callUserWallet(this.state.walletInfo.availableBalance)}>DA</button>
                        <button className = 'btnb' onClick = {this.cancelWithdraw}>NE</button>
                    </div>
                </Popup>
                </div>

            )

        }

        else if(this.state.success) {
            let scs = this.state.success;
            return (
                <div className = 'userContainer'>
                <div className = 'profile'>
                    <h2>MOJA DENARNICA</h2>
                    <p><b>Stanje:</b> {walletInfo.wallet.Balance.Amount/100 + ' ' + walletInfo.wallet.Balance.Currency}</p>
                    <p><b>Na voljo za prenos:</b> {walletInfo.availableBalance} EUR</p>
                    {walletInfo.availableBalance >= 10 && <button className = 'btn' onClick = {this.onWithdrawButtonClick}>PRENESI NA SVOJ BANČNI RAČUN</button>}
                </div>
                <Popup open = {true}
                position = 'center center'
                onClose={this.closeModal}>
                    <div style = {{display: 'inline-flex', justifyContent: 'space-around'}}>
                        {scs === 'NOBANK' && <p style= {{margin: 'auto 10px'}}>Za prenos dodajte svoj bančni račun. To storite v nastavitvah profila.</p>}
                    </div>
                </Popup>
                </div>

            )

        }
        
        else {
            return (
                <div className = 'userContainer'>
                    <div className = 'profile'>
                        <h2>MOJA DENARNICA</h2>
                        <p><b>Stanje:</b> {walletInfo.wallet.Balance.Amount/100 + ' ' + walletInfo.wallet.Balance.Currency}</p>
                        <p><b>Na voljo za prenos:</b> {walletInfo.availableBalance} EUR</p>
                        {walletInfo.availableBalance >= 10 && <button className = 'btn' onClick = {this.onWithdrawButtonClick}>PRENESI NA SVOJ BANČNI RAČUN</button>}
                    </div>
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


export default connect(mapStateToProps) (Wallet);