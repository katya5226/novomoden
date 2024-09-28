import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import UpperLine from '../components/UpperLine';
import Bottom from '../components/Bottom';
import BreadCrumbs from '../components/BreadCrumbs';
import ClipLoader from 'react-spinners/ClipLoader';
import '../App.css';

class RequestConfirmEmail extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            userId: 0,
            email: '',
            success: false,
            loading: false,
            resultText: ''
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

    sendRequest = (e) => {
        e.preventDefault();

        this.setState({loading: true});

        fetch('/api/resendconfirmemail', {
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
            .then(res => {if(res.success)
                            this.setState({resultText: "Poslali smo vam novo povezavo. Preverite svoj e-poštni nabiralnik, vključno z vsiljeno pošto.", loading: false})
                            else this.setState({resultText: "E-naslov ne obstaja, ali pa je že potrjen.", loading: false})});

    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
    }

    render() {
        
        if(parseInt(this.state.userId) !== 0) {
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
                <form onSubmit={this.sendRequest} style = {{textAlign: 'center', marginTop: '100px'}}>
                    <input  type = 'email'
                            name = 'email'
                            value = {this.state.email}
                            placeholder = 'Vpiši svoj e-naslov ...'
                            style = {{width: '300px', marginRight: '10px'}}
                            onChange = {this.handleChange}/>
                    <button type = 'submit' className = 'btn'>POŠLJI MI NOVO E-SPOROČILO</button>
                </form>
                <div style = {{textAlign: 'center'}}>
                    <ClipLoader
                        size={50}
                        color={'white'}
                        loading={this.state.loading}
                    />
                </div>
                <p style = {{backgroundColor: 'white', textAlign: 'center', lineHeight: '50px', marginBottom: '300px'}}>{this.state.resultText}</p>
                <Bottom/>
            </div>
        )
    }

}

export default RequestConfirmEmail;