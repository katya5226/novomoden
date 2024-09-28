import React, {Component} from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Birthday from './Birthday';
import Countries from './Countries';

class SignUpForm extends Component {

    constructor(props) {
		super(props);
		this.state = {
            visible: false,
            style: {color: 'gray'}
		};
    }

    visibilityChange = () => {
        this.setState({visible: !this.state.visible})
    }

    render() {

        const style={
            textAlign: "center",
            margin: "30px",
            paddingLeft: "20vw",
            paddingRight: "20vw"
        }

        const iconStyle = {
            margin: 'auto -50px',
            paddingTop: '8px',
            border: 'none',
            backgroundColor: 'rgb(255, 255, 255, 0)',
            verticalAlign: 'middle'
        }

        const warnStyle = {
            border: '1px solid red'
        }

        return(
            <div style={style}>
                <form onSubmit={this.props.handleClickSignUp}>
                    <input
                        type="text"
                        name="firstName"
                        value={this.props.firstName}
                        placeholder="Ime"
                        onChange={this.props.handleChange}
                        maxLength="30"
                        style={(!this.props.firstName && this.props.saveAttempt===true)  ? warnStyle : null}>
                    </input>
                    <br/>
                    <input
                        type="text"
                        name="lastName"
                        value={this.props.lastName}
                        placeholder="Priimek"
                        onChange={this.props.handleChange}
                        maxLength="30"
                        style={(!this.props.lastName && this.props.saveAttempt===true)  ? warnStyle : null}>
                    </input>
                    <br/>
                    <input
                        type="text"
                        name="street"
                        value={this.props.street}
                        placeholder="Ulica in hišna številka"
                        onChange={this.props.handleChange}
                        maxLength="30"
                        style={(!this.props.street && this.props.saveAttempt===true)  ? warnStyle : null}>
                    </input>
                    <br/>
                    <input
                        type="text"
                        name="postNumber"
                        value={this.props.postNumber}
                        placeholder="Poštna številka"
                        onChange={this.props.handleChange}
                        maxLength="10"
                        style={(!this.props.postNumber && this.props.saveAttempt===true)  ? warnStyle : null}>
                    </input>
                    <br/>
                    <input
                        type="text"
                        name="town"
                        value={this.props.town}
                        placeholder="Kraj"
                        onChange={this.props.handleChange}
                        maxLength="30"
                        style={(!this.props.town && this.props.saveAttempt===true)  ? warnStyle : null}>
                    </input>
                    <br/>
                    <input
                        type="text"
                        name="region"
                        value={this.props.region}
                        placeholder="Regija"
                        onChange={this.props.handleChange}
                        maxLength="30"
                        style={(!this.props.region && this.props.saveAttempt===true)  ? warnStyle : null}>
                    </input>
                    <br/>
                    <Countries
                        country={this.props.country}
                        nationality={this.props.nationality}
                        onChange={this.props.handleChange}
                        saveAttempt={this.props.saveAttempt}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={this.props.phoneNumber}
                        placeholder="Številka mobilnega telefona"
                        onChange={this.props.handleChange}
                        maxLength="20"
                        style={(!this.props.phoneNumber && this.props.saveAttempt===true)  ? warnStyle : null}>
                    </input>
                    <br/>
                    <input
                        type="email"
                        name="email"
                        value={this.props.email}
                        placeholder="E-naslov"
                        onChange={this.props.handleChange}
                        maxLength="30"
                        style={(!this.props.email && this.props.saveAttempt===true)  ? warnStyle : null}>
                    </input>

                    <Birthday
                        day={this.props.day}
                        month={this.props.month}
                        year={this.props.year}
                        onChange={this.props.handleChange}
                        saveAttempt={this.props.saveAttempt}
                    />

                    <br/>
                    <div style = {{display: 'inline-flex', width: '100%'}}>
                    <input
                        type={this.state.visible ? 'text' : 'password'}
                        name="password"
                        value={this.props.password}
                        placeholder="Geslo"
                        onChange={this.props.handleChange}
                        style={(!this.props.password && this.props.saveAttempt===true)  ? warnStyle : null}>
                    </input>
                    {this.state.visible ? <button type = 'button' style = {iconStyle} onClick = {this.visibilityChange}>
                                                <FaEyeSlash size = '2em'/>
                                            </button> :
                                            <button type = 'button' style = {iconStyle} onClick = {this.visibilityChange}>
                                                <FaEye size = '2em'/>
                                            </button>}
                    </div>
                    
                    <br/>
                    <br/>
                    <p><b>ČE SE ŽELITE REGISTRIRATI TUDI KOT PRODAJALEC, IZPOLNITE ŠE NASLEDNJE PODATKE:</b></p>
                    <input
                        type="text"
                        name="iban"
                        value={this.props.iban}
                        placeholder="IBAN"
                        onChange={this.props.handleChange}
                        maxLength="30">
                    </input>
                    <br/>
                    <input
                        type="text"
                        name="bic"
                        value={this.props.bic}
                        placeholder="BIC banke"
                        onChange={this.props.handleChange}
                        maxLength="10">
                    </input>
                    <br/>

                    <br/>
                    <button type = 'submit' className = 'btnb' id = 'signup'>ZAKLJUČI REGISTRACIJO</button>
                </form>
                <p>{this.props.birthday}</p>
            </div>
        );
    }

}

export default SignUpForm;

// eslint-disable-next-line 
{/*
<NumberFormat
value={this.props.postNumber}
placeholder='Poštna številka'
format='####'
allowNegative={false}
isNumericString={true}
onValueChange={this.props.changePostNumber}/>
<br/>
    
    
<NumberFormat
value={this.props.phoneNumber}
placeholder='Številka mobilnega telefona'
format='+386 (0)## ### ###'
allowEmptyFormatting={false}
allowNegative={false}
isNumericString={true}
onValueChange={this.props.changePhoneNumber}
onClick={()=> this.setState({style: {color: 'black'}})}
style = {this.state.style}/> */}