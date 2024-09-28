import React from 'react';
import { connect } from 'react-redux';
import '../../App.css';


class FinishOrderData extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            userId: '0',
            profileInfo: null,
            shippingAddress: null,
            editInfo: false,
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
        .then(res => this.setState({profileInfo: res[0],
            shippingAddress: {
                firstName: res[0].first_name,
                lastName: res[0].last_name,
                street: res[0].street_ship,
                postNumber: res[0].post_number_ship,
                town: res[0].town_ship
            }
        }))
        .catch(e => console.error("Critical failure: " + e.message));   
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    changeAddress = (e) => { 
        var shippingAddress = {...this.state.shippingAddress}
        const { name, value } = e.target;
        shippingAddress[name] = value;
        this.setState({shippingAddress});
    }

    onEditButtonClick = (e) => {
        if(e.target.id === 'info') {
            this.setState({editInfo: true});
        }
        if(e.target.id === 'cancel') {
            this.setState({editInfo: false});
        }
    }

    updateInfo = (e) => {
        e.preventDefault();
        this.props.callbackParent(this.state.shippingAddress);
        this.setState({editInfo: false});
    }

    switchRender = () => {
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
                    <div className = 'finishorderdata'>
                        <br/>
                        <b>DOSTAVA: </b><br/>
                        <p>Pošta Slovenije, navadna pošiljka</p>
                        {!this.state.editInfo && <p><b>DOSTAVA NA NASLOV:</b>
                                                    <br/>
                                                    <br/>
                                                    {this.state.shippingAddress.firstName + ' ' + this.state.shippingAddress.lastName}
                                                    <br/>
                                                    {this.state.shippingAddress.street + ', ' + this.state.shippingAddress.postNumber + ' ' + this.state.shippingAddress.town}
                                                    <br/>
                                                    <br/>
                                                    {/* <button id = 'info' className = 'btnu' onClick = {this.onEditButtonClick}>DOSTAVA NA DRUG NASLOV</button> */}
                                                    </p>}
                        {/* {this.state.editInfo && <div><form onSubmit = {this.updateInfo}>
                                                        <b>NASLOV ZA DOSTAVO NAROČILA: </b><br/>
                                                        <input type='text' id='firstName' name='firstName' placeholder='Ime' value={this.state.shippingAddress.firstName} style = {{width: '200px'}} maxLength="30" onChange={this.changeAddress}/>
                                                        <input type='text' id='lastName' name='lastName' placeholder='Priimek' value={this.state.shippingAddress.lastName} style = {{width: '200px'}} maxLength="30" onChange={this.changeAddress}/>
                                                        <input type='text' id='street' name='street' placeholder='Ulica in hišna številka' value={this.state.shippingAddress.street} style = {{width: '200px'}} maxLength="30" onChange={this.changeAddress}/>
                                                        <input type='text' id='postnumber' name='postNumber' placeholder='Poštna številka' value={this.state.shippingAddress.postNumber} style = {{width: '100px'}} maxLength="10" onChange={this.changeAddress}/>
                                                        <input type='text' id='town' name='town' placeholder='Kraj' value={this.state.shippingAddress.town} style = {{width: '150px'}} maxLength="30" onChange={this.changeAddress}/>
                                                        <br/>
                                                        <button className = 'btnb' type = 'submit'>SHRANI</button>
                                                        <button className = 'btnb' style = {{marginLeft: '5px'}} onClick = {this.onEditButtonClick}>PREKLIČI</button>
                                                        </form></div>} */}
                        <br/>
                        <b>NAČIN PLAČILA: </b><br/>
                        <p>Plačilna kartica (VISA, MASTERCARD)</p>

                    </div>
            )
        }
    }

    render() {
        return this.switchRender();
    }

}

const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser,
      loggedInUserId: state.loggedInUserId
    };
  };


export default connect(mapStateToProps) (FinishOrderData);