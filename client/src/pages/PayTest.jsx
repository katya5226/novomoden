import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn, logOut } from '../redux/actions'
import UpperLine from '../components/UpperLine';
import NavBar from '../components/NavBar';
import AdSpace from '../components/AdSpace';
import Header from '../components/Header';
import Bottom from '../components/Bottom';
import BreadCrumbs from '../components/BreadCrumbs';
import '../App.css';




class PayTest extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            buyer: 0,
            seller: 0,
            redirectUrl: ''
		};
    }

    abortController = new AbortController();

    componentWillUnmount() {
        this.abortController.abort();
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleClickPay = (e) =>{
        e.preventDefault();

        fetch('/api/testpay', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                buyer: this.state.buyer,
                seller: this.state.seller
            })
        })
        .then(res => res.json())
        .then(res => this.setState({redirectUrl: res.redirectUrl}))
        .catch(e => console.error("Critical failure: " + e.message));

    }

    goToPage = (redUrl) => {
        window.location.href = redUrl;
    }

    render() {

        return (
            <div className="App">
                <UpperLine/>
                <Header/>
                <NavBar/>
                <BreadCrumbs pathname = {this.props.location.pathname}/>
                
                <div style = {{maxWidth: '200px', margin: '0 Auto'}}>
                <form onSubmit={this.handleClickPay}>
                    <input
                        type="number"
                        name="buyer"
                        value={this.state.buyer}
                        placeholder="ID PLAČNIKA"
                        onChange={this.handleChange}
                        maxLength="30">
                    </input>
                    <input
                        type="number"
                        name="seller"
                        value={this.state.seller}
                        placeholder="ID PREJEMNIKA"
                        onChange={this.handleChange}
                        maxLength="30">
                    </input>
                    <button type = 'submit' className = 'btnb' id = 'pay'>PLAČAJ</button>
                </form>
                </div>

                {this.state.redirectUrl !== '' && this.goToPage(this.state.redirectUrl)}

                <AdSpace/>
                <Bottom/>
            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser,
      loggedInUserId: state.loggedInUserId,
    };
  };
  
  const mapDispatchToProps = {
    logIn: logIn,
    logOut: logOut
  };

export default connect(mapStateToProps, mapDispatchToProps) (PayTest);