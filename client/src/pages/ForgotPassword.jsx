import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import UpperLine from '../components/UpperLine';
import Bottom from '../components/Bottom';
import BreadCrumbs from '../components/BreadCrumbs';
import ClipLoader from 'react-spinners/ClipLoader';
import '../App.css';

class ForgotPassword extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            userId: 0,
            email: '',
            success: '',
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    abortController = new AbortController();

    componentDidMount() {
        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => {this.setState({userId: res.userId})})
        .catch(e => console.error("Critical failure: " + e.message));
    }

    sendRequestForReset = (e) => {
        e.preventDefault();

        this.setState({loading: true});

        fetch('/api/forgotpassword', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email
            })
        }).then(res => res.json())
            .then(res => this.setState({success: res.success, loading: false}));

    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
    }

    //<button type = 'submit' style = {{paddingLeft: '200px'}}>RESET PASSWORD</button>

    render() {

        if(this.state.userId !== 0) {
            return (
                <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                    <br/><br/><br/>
                    <h2>STE ŽE PRIJAVLJENI</h2>
                    <NavLink to = '/'>DOMOV</NavLink>
                    <br/><br/><br/>
                </div>
            )
        }

        else return(
            <div className = 'app'>
                <UpperLine/>
                <Header/>
                <BreadCrumbs pathname = {this.props.location.pathname}/>
                <br/><br/>
                <form onSubmit={this.sendRequestForReset} style = {{textAlign: 'center', marginTop: '100px'}}>
                    <input  type = 'email'
                            name = 'email'
                            value = {this.state.email}
                            placeholder = 'Vpiši svoj e-naslov ...'
                            style = {{width: '300px', marginRight: '10px'}}
                            onChange = {this.handleChange}/>
                    <button type = 'submit' className = 'btn'>POŠLJI ZAHTEVO ZA SPREMEMBO GESLA</button>
                </form>
                <div style = {{textAlign: 'center'}}>
                    <ClipLoader
                        size={50}
                        color={'white'}
                        loading={this.state.loading}
                    />
                </div>
                <p style = {{backgroundColor: 'white', textAlign: 'center', lineHeight: '50px', marginBottom: '300px'}}>{this.state.success}</p>
                <Bottom/>
            </div>
        )
    }

}

export default ForgotPassword;