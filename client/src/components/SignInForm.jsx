import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class SignInForm extends Component {

    render() {
        return(
            <div style = {{maxWidth: '300px', margin: '0 auto'}}>
                <form onSubmit={this.props.handleClickLogIn}>
                    <input
                        type="text"
                        name="loginEmail"
                        value={this.props.loginEmail}
                        placeholder="E-naslov"
                        onChange={this.props.handleChange}>
                    </input>
                    <br/>
                    <input
                        type="password"
                        name="loginPassword"
                        value={this.props.loginPassword}
                        placeholder="Geslo"
                        onChange={this.props.handleChange}>
                    </input>
                    <br/>
                    <button type = 'submit' className="btnb" id="login">PRIJAVI SE</button>
                    <br/>
                </form>
                <NavLink to = '/forgotpassword' style = {{fontWeight: 'bold', color: 'white'}}>Pozabljeno geslo</NavLink>
            </div>
        );
    }

}

export default SignInForm;