import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import SignUpForm from '../components/SignUpForm';
import Header from '../components/Header';
import UpperLine from '../components/UpperLine';
import BreadCrumbs from '../components/BreadCrumbs';
import NavBar from '../components/NavBar';
import Bottom from '../components/Bottom';
import AdSpace from '../components/AdSpace';
import '../App.css';

class SignUpPage extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            loggedInUserId: 0,
			firstName: '',
            lastName: '',
            street: '',
            postNumber: '',
            town: '',
            region: '',
            country: '',
            day: 0,
            month: 0,
            year: 0,
            nationality: '',
            phoneNumber: '',
			email: '',
            password: '',
            iban: '',
            bic: '',
            signUpText: '',
            warning: '',
            loading: false,
            saveAttempt: false,
            registrationSuccess: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClickSignUp = this.handleClickSignUp.bind(this);
    }

    abortController = new AbortController();

    componentDidMount() {
        this.setState({loggedInUserId: this.props.loggedInUserId});
        console.log(this.state.loggedInUserId);
    }
    
    handleClickSignUp = (e) => {
        e.preventDefault();

        // if(this.state.firstName !== '' &&
        // this.state.lastName !== '' &&
        // this.state.street !== '' &&
        // this.state.postNumber !== '' &&
        // this.state.town !== '' &&
        // this.state.region !== '' &&
        // this.state.country !== '' &&
        // this.state.day !== 0 &&
        // this.state.month !== 0 &&
        // this.state.year !== 0 &&
        // this.state.nationality !== '' &&
        // this.state.phoneNumber !== '' &&
        // this.state.email !== '' &&
        // this.state.password !== '' &&
        // this.state.warning === '')

        function toTimestamp(year,month,day){
            var datum = new Date(Date.UTC(year,month-1,day, 1, 0, 0)); //later change this for different timezones
            return datum.getTime()/1000;
        }

        this.setState({loading: true, saveAttempt: true});
		if(this.state.firstName !== '' &&
            this.state.lastName !== '' &&
            this.state.street !== '' &&
            this.state.postNumber !== '' &&
            this.state.town !== '' &&
            this.state.region !== '' &&
            this.state.country !== '' &&
            this.state.day !== 0 &&
            this.state.month !== 0 &&
            this.state.year !== 0 &&
            this.state.nationality !== '' &&
            this.state.phoneNumber !== '' &&
			this.state.email !== '' &&
            this.state.password !== '' &&
            this.state.warning === '') {

				fetch('/api/signuproutes', {
                    signal: this.abortController.signal,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify({
						enjoyer: {
							firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            street: this.state.street,
                            postNumber: this.state.postNumber,
                            town: this.state.town,
                            region: this.state.region,
                            country: this.state.country,
                            birthday: toTimestamp(this.state.year, this.state.month, this.state.day),
                            nationality: this.state.nationality,
                            phoneNumber: this.state.phoneNumber,
							email: this.state.email,
                            password: this.state.password,
                            iban: this.state.iban,
                            bic: this.state.bic
						}
					})
				}).then(res => res.json())
					.then(result => this.setState({signUpText: result.signUpSuccess.text, registrationSuccess: result.signUpSuccess.code, loading: false}));
        }else {this.setState((state) => ({...state, signUpText: 'Napaka pri vnosu, preverite podatke!', loading: false}))}
        
    }
 
    componentWillUnmount() {
        this.abortController.abort();
    }
    

    checkPassStrength(pass) {
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
        return mediumRegex.test(pass);
    }


    handleChange(event) {

        if(event.target.name === 'password') {
            if(!this.checkPassStrength(event.target.value)){
                this.setState({
                    warning: 'Geslo mora biti dolgo vsaj 8 znakov in mora vsebovati vsaj dva od naslednjih znakov: mala črka, velika črka, številka.'
                });
            } else {
                this.setState({warning: ''});
            }
        }
        this.setState({
            [event.target.name]: event.target.value
        })

    }
    changePhoneNumber = (values) => {
        const {value} = values;
        this.setState({phoneNumber: value});
    }
    
    changePostNumber = (values) => {
        const {value} = values;
        this.setState({postNumber: value});
    }

    changeBirthday = (values) => {
        const {value} = values;
        this.setState({birthday: value});
    }

    //Registracija uspešna! Preveri svoj poštni nabiralnik.

    render() {

        let loggedInId = Number(this.state.loggedInUserId);

        if(loggedInId) {
            return <div>
                        <br/>
                        <p style = {{color: 'white'}}>{loggedInId}</p>
                        <p style = {{backgroundColor: 'white'}}>STE ŽE PRIJAVLJENI V SISTEM!</p>
                        <br/>
                        <NavLink exact to='/' style = {{color: 'white'}}>DOMOV</NavLink>
                    </div>
        }
        else if(this.state.registrationSuccess) {
            return <div style={{textAlign:'center'}}>
                        <br/>
                        <h2 style = {{backgroundColor: 'white'}}>REGISTRACIJA USPEŠNA! PREVERITE SVOJ POŠTNI NABIRALNIK.</h2>
                        <br/>
                    </div>
        }
        else return (
            <>
                <UpperLine/>
                <Header/>
                <NavBar/>
                <BreadCrumbs pathname = {this.props.location.pathname}/>
                <div className='SignUp'>
                    <h1>DOBRODOŠLI!</h1>
                    <h2>Nekaj napotkov:</h2>
                    <p>"Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                        sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <SignUpForm
                        saveAttempt={this.state.saveAttempt}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        street={this.state.street}
                        postNumber={this.state.postNumber}
                        town={this.state.town}
                        region={this.state.region}
                        country={this.state.country}
                        nationality={this.state.nationality}
                        day={this.state.day}
                        month={this.state.month}
                        year={this.state.year}
                        phoneNumber={this.state.phoneNumber}
                        password={this.state.password}
                        iban={this.state.iban}
                        bic={this.state.bic}
                        handleChange={this.handleChange}
                        changePhoneNumber={this.changePhoneNumber}
                        changePostNumber={this.changePostNumber}
                        changeBirthday={this.changeBirthday}
                        handleClickSignUp={this.handleClickSignUp}/>

                    <div style = {{backgroundColor: 'rgb(255, 255, 255, 0.8)'}}>
                        <p style = {{color: 'red', lineHeight: '40px'}}>{this.state.warning}</p>
                        <p style = {{color: 'black', lineHeight: '40px'}}>{this.state.signUpText}</p>
                    </div>
                    {this.state.signUpText.code === 1 && <div>
                        <p>Niste prejeli e-sporočila? <NavLink to = '/requestconfirmemail'>Ponovno pošlji</NavLink> </p>
                    </div>}
                    <ClipLoader
                        size={50}
                        color={'white'}
                        loading={this.state.loading}
                    />
                </div>
                <AdSpace/>
                <Bottom/>
            </>

        );

    }
}

const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser,
      loggedInUserId: state.loggedInUserId
    };
  };

export default connect(mapStateToProps) (SignUpPage);