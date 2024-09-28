import React from 'react';
import { connect } from 'react-redux';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import UserSideBar from './UserSideBar';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import AdSpace from '../../components/AdSpace';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import '../../App.css';


class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            userId: '0',
            profileInfo: null,
            password: '',
            warning: '',
            success: '',
            editInfo: false,
            editPass: false,
            visible: false
        };
    }

    abortController = new AbortController();
	componentDidMount() {

        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => {this.setState({userId: res.userId}); if(res.userId !== '0') this.getProfileInfo();})
        .catch(e => console.error("Critical failure: " + e.message));

    }

    getProfileInfo = () => {
        fetch('/api/profileroutes', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                requestType: 1
            })
        })
        .then(res => res.json())
        .then(res => this.setState({profileInfo: res[0]}))
        .catch(e => console.error("Critical failure: " + e.message));   
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    onEditButtonClick = () => {
        this.setState({edit: true})
    }
    changePhoneNumber = (values) => {
        const {value} = values;
        var profileInfo = {...this.state.profileInfo}
        profileInfo.phone_number = value;
        this.setState({profileInfo});
    }
    changeAddress = (e) => { 
        var profileInfo = {...this.state.profileInfo}
        const { name, value } = e.target;
        profileInfo[name] = value;
        this.setState({profileInfo});
    }

    updateInfo = (e) =>{

        e.preventDefault();
        console.log(this.state.profileInfo);

        fetch('/api/profileroutes', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                requestType: 2,
                profileInfo: this.state.profileInfo
            })
        })
        .then(res => res.json())
        .then(() => this.setState({editInfo: false}))
        .catch(e => console.error("Critical failure: " + e.message));
    }


    checkPassStrength(pass) {
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
        return mediumRegex.test(pass);
    }

    changePassword = (e) => { 
        if(!this.checkPassStrength(e.target.value)){
            this.setState({
                warning: 'Geslo mora biti dolgo vsaj 8 znakov in mora vsebovati vsaj dva od naslednjih znakov: mala črka, velika črka, številka.'
            });
        } else {
            this.setState({warning: ''});
        }
        this.setState({password: e.target.value});
    }

    updatePassword = (e) => {
        e.preventDefault();
        
        if(this.state.password !== '' && this.state.warning === '') {
            fetch('/api/profileroutes', {
                signal: this.abortController.signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    requestType: 3,
                    password: this.state.password
                })
            })
            .then(res => res.json())
            .then(res => {if(res.success) this.setState({success: 'Uspešno ste spremenili geslo.', editPass: false})})
            .catch(e => console.error("Critical failure: " + e.message));
        }
    }
    //{if(res[0].success) this.setState({success: 'Uspešno ste spremenili geslo.'}, () => console.log(this.state.success))}

    visibilityChange = () => {
        this.setState({visible: !this.state.visible})
    }

    onEditButtonClick = (e) => {
        if(e.target.id === 'info') {
            this.setState({editInfo: true});
        }
        if(e.target.id === 'pass') {
            this.setState({editPass: true});
        }
        if(e.target.id === 'cancel') {
            this.setState({editInfo: false, editPass: false});
        }
    }

    //{!this.state.editInfo && <p><b>IBAN: </b> {this.state.profileInfo.iban}</p>}

    switchRender = () => {
        const iconStyle = {
            margin: 'auto -50px',
            paddingTop: '0px',
            border: 'none',
            backgroundColor: 'rgb(255, 255, 255, 0)',
            verticalAlign: 'middle'
        }
        if(this.state.userId === '0') {
            return (
                <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                    <br/><br/><br/>
                    <h2>PROSIMO PRIJAVITE SE V SISTEM!</h2>
                    <br/><br/><br/>
                </div>
            )
        }
        else if(!this.state.profileInfo) {
            return (<div></div>)
        } else {
            return (
                <div className = 'userContainer'>
                    <div className = 'profile'>
                        <br/>
                        <p><b>IME: </b>{this.state.profileInfo.first_name}</p>
                        <p><b>PRIIMEK: </b>{this.state.profileInfo.last_name}</p>
                        {!this.state.editInfo && <p><b>NASLOV ZA POŠILJANJE: </b> {this.state.profileInfo.street_ship + ', ' + this.state.profileInfo.post_number_ship + ' ' + this.state.profileInfo.town_ship}</p>}
                        {this.state.editInfo && <div><form onSubmit = {this.updateInfo}>
                                                        <b>NASLOV ZA POŠILJANJE: </b>
                                                        <input type='text' id='street' name='street_ship' placeholder='Ulica in hišna številka' value={this.state.profileInfo.street_ship} style = {{width: '200px'}} maxLength="30" onChange={this.changeAddress}/>
                                                        <input type='text' id='postnumber' name='post_number_ship' placeholder='Poštna št.' value={this.state.profileInfo.post_number_ship} style = {{width: '150px'}} maxLength="10" onChange={this.changeAddress}/>
                                                        <input type='text' id='town' name='town_ship' placeholder='Kraj' value={this.state.profileInfo.town_ship} style = {{width: '150px'}} maxLength="30" onChange={this.changeAddress}/>
                                                        <br/>
                                                        <b>TELEFON: </b>
                                                        <input type='text' id='phonenumber' name='phone_number' value={this.state.profileInfo.phone_number} style = {{width: '200px'}} maxLength="20" onChange={this.changeAddress}/>
                                                        <br/>
                                                        <b>IBAN: </b>
                                                        <input type='text' id='iban' name='iban' value={this.state.profileInfo.iban} style = {{width: '200px'}} maxLength="30" onChange={this.changeAddress}/>
                                                        <br/>
                                                        <b>BIC banke: </b>
                                                        <input type='text' id='bic' name='bic' value={this.state.profileInfo.bic} style = {{width: '200px'}} maxLength="10" onChange={this.changeAddress}/>
                                                        <br/>
                                                        <button className = 'btnb' type = 'submit'>SHRANI</button>
                                                        <button className = 'btnb' style = {{marginLeft: '5px'}} onClick = {this.onEditButtonClick}>PREKLIČI</button>
                                                        </form></div>}

                        {!this.state.editInfo && <p><b>TELEFON: </b>{this.state.profileInfo.phone_number}</p>}
                        {!this.state.editInfo && <p><b>IBAN: </b> {this.state.profileInfo.iban}</p>}
                        {!this.state.editInfo && <p><b>BIC banke: </b> {this.state.profileInfo.bic}</p>}

                        {this.state.editPass &&<form onSubmit = {this.updatePassword}>
                            SPREMENI GESLO: <input type={this.state.visible ? 'text' : 'password'} id='pass' name='pass' value={this.state.password} style = {{width: '200px'}} onChange={this.changePassword}/>
                            {this.state.visible ? <button type = 'button' style = {iconStyle} onClick = {this.visibilityChange}>
                                                        <FaEyeSlash size = '2em'/>
                                                    </button> :
                                                    <button type = 'button' style = {iconStyle} onClick = {this.visibilityChange}>
                                                        <FaEye size = '2em'/>
                                                    </button>}
                            <button className = 'btnb' style = {{marginLeft: '70px'}} type = 'submit'>SHRANI</button>
                            <button className = 'btnb' style = {{marginLeft: '5px'}} onClick = {this.onEditButtonClick}>PREKLIČI</button>
                        </form>}
                        <p style = {{color: 'red', lineHeight: '40px'}}>{this.state.warning}</p>
                        <p style = {{lineHeight: '40px'}}>{this.state.success}</p>
                        <div style = {{textAlign: 'right'}}><button id = 'info' className = 'btnu' onClick = {this.onEditButtonClick}>UREDI PODATKE </button>
                        <button id = 'pass' className = 'btnu' onClick = {this.onEditButtonClick}> SPREMENI GESLO</button></div>
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


export default connect(mapStateToProps) (Profile);