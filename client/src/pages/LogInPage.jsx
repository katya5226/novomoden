import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { logIn, logOut } from '../redux/actions';
import '../App.css';
import SignInForm from '../components/SignInForm';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import AdSpace from '../components/AdSpace';
import UpperLine from '../components/UpperLine';
import Bottom from '../components/Bottom';
import BreadCrumbs from '../components/BreadCrumbs';

class LogInPage extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            //loggedInUser: 'guest',
			//loggedInUserId: '',
			loginEmail: '',
			loginPassword: '',
			logInText: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClickLogIn = this.handleClickLogIn.bind(this);
    }
    
    abortController = new AbortController();
	componentDidMount() {
		fetch('/api/sessionroutes', {
            signal: this.abortController.signal})
			.then(res => res.json())
            .then(res => this.props.logIn(res.loggedInUser, res.userId));
    }

    componentWillUnmount() {
        this.abortController.abort();
    }
    
	handleClickLogIn = (e) => {
        e.preventDefault();
		if(this.state.loginEmail !== '' &&
		this.state.loginPassword !== '') {
			fetch('/api/loginroutes', {
                signal: this.abortController.signal,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					enjoyer: {
						email: this.state.loginEmail,
						password: this.state.loginPassword
                    },
                    type: "login"
				})
            }).then(res => res.json())
                .then(result => {
                    if(result.success === "login sucessfull") {
                        //this.setState({loggedInUser: result.loggedInUser, loggedInUserId: result.uid, logInText:result.success})
                        this.setState({logInText: result.success},() => this.props.logIn(result.loggedInUser, result.uid));
                        this.props.history.push("/");
                    } else {
                        this.setState({logInText:result.success})
                    }
                })

        }else {console.log("LOGIN FAILED"); this.setState({logInText: 'Napaka pri vnosu'})}
        this.setState({
            logInText:'',
            loginEmail:'',
			loginPassword:'',
        })
    }
    
    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
    }

    render() {

        const style = {
            textAlign: "center",
            marginTop: "10vh",
            paddingLeft: "30vw",
            paddingRight: "30vw"
        }

        const confirmed = window.location.href.includes('?confirmed')

        return (
            <div className="App">
                <UpperLine/>
                <Header/>
                <NavBar/>
                <BreadCrumbs pathname = {this.props.location.pathname}/>
                <div style={style}>
                {confirmed && <p style = {{color: 'white'}}><b>USPEŠNO STE POTRDILI SVOJ E-NASLOV! PRIJAVITE SE Z UPORABNIŠKIM IMENOM IN GESLOM.</b></p>}
                <SignInForm
                    loginEmail={this.state.loginEmail}
                    loginPassword={this.state.loginPassword}
                    handleChange={this.handleChange}
                    handleClickLogIn={this.handleClickLogIn}/>
                <p style = {{color: 'red', textShadow: '1px 1px black'}}>{this.state.logInText}</p>
                {this.state.logInText === 'Unconfirmed' &&
                    <div style = {{color: 'white'}}>
                        <p>Vaš poštni naslov še ni potrjen. Preverite svoj poštni nabiralnik, vključno z vsiljeno pošto.</p>
                        <p>Če niste dobili e-pošte ali pa je povezava potekla, kliknite <NavLink to = '/requestconfirmemail'>tukaj</NavLink>.</p>
                    </div>}
                <br/>
                <p style = {{color: 'white', textShadow: '1px 1px black'}}>Še nimaš uporabniškega računa?</p>
                <NavLink to="/signUp_page" className="btnb" activeStyle={{fontWeight: "bold"}}>REGISTRIRAJ SE</NavLink>
                </div>
                <AdSpace/>
                <Bottom/>
            </div>
        );

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

export default connect(mapStateToProps, mapDispatchToProps) (LogInPage);