import React from 'react';
import { ReCaptcha } from 'react-recaptcha-google'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveAtt } from '../../redux/actions';
import Popup from 'reactjs-popup';
import '../../App.css';

class ItemDescription extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            addingResult: '',
            msgRequest: false,
            buttonDisabled: true
        };
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentDidMount() {

        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit";
        script.async = true;
        document.body.appendChild(script);

        if (this.captchaDemo) {
            console.log("started, just a second...")
            this.captchaDemo.reset();
        }
      }

    //TREBA JE UREDITI BRISANJE IZ LOCAL STOREGA; POTEM KO SE NAROČI IN/ALI PO POTEKU DOLOČENEGA ČASA
    addToCart = () => {
        if(this.props.loggedInUserId !== 0) {
            //this.props.addToCart(this.props.adId);
            let cart = JSON.parse(window.localStorage.getItem(this.props.loggedInUserId));
            if (cart !== null) {
                if(cart.includes(this.props.adId)) {
                    this.setState({addingResult: 'IZDELEK JE ŽE V KOŠARICI!'});
                }else {
                    cart.push(this.props.adId);
                    window.localStorage.setItem(this.props.loggedInUserId, JSON.stringify(cart));
                    this.setState({addingResult: 'IZDELEK DODAN V KOŠARICO!'});
                }
            } else {
                let initialCart = [];
                initialCart.push(this.props.adId);
                window.localStorage.setItem(this.props.loggedInUserId, JSON.stringify(initialCart));
                this.setState({addingResult: 'IZDELEK DODAN V KOŠARICO!'});
            }
            this.props.itemAdded(1);
        }else{this.setState({addingResult: 'ZA DODAJANJE V KOŠARICO SE PRIJAVITE.'});}
    }

    removeFromCart = () => {
        let cart = JSON.parse(window.localStorage.getItem(this.props.loggedInUserId));
        if (cart !== null) {
            cart.splice(cart.indexOf(this.props.adId), 1);
            window.localStorage.setItem(this.props.loggedInUserId, JSON.stringify(cart));
        }
        //console.log('INDEX IN CART: ' + cart.indexOf(this.props.adId))
    }

    showCart = () => {
        window.localStorage.clear();
        console.log(JSON.parse(window.localStorage.getItem(this.props.loggedInUserId)));
    }

    handleMsgRequest = () => {
        this.setState({msgRequest: true});
    }

    handleConfirm = () => {

    }

    onLoadRecaptcha() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
    }
    verifyCallback(recaptchaToken) {
      if(recaptchaToken) {
        this.setState({buttonDisabled: false});
      }
    }

    proceedToMsg = () => {
        console.log("SUBMITTED!");
        this.setState({msgRequest: false});
    }

    descriptDiv = () => {
        const selection = this.props.selection;
        let subcategory = '';
        const categ = selection.category.value;

        switch(categ) {
            case 'women':
                subcategory = selection.women.label;
                break;
            case 'men':
                subcategory = selection.men.label;
                break;
            case 'kids':
                subcategory = selection.kids.label;
                break;
            default:
                subcategory = '';
                break;
        }

        const btnContStyle = {
            backgroundColor: 'rgb(255,255,255,0)',
            border: 'none',
            margin: 0,
            padding: 0,
            fontSize: 'small',
            textDecoration: 'underline',
            color: 'grey',
            cursor: 'pointer'
        }

        return (
            <div>
                <h3>{subcategory}</h3>
                {categ !== 'kids' && <p><b>Velikost: </b>{selection.clothsize.label}</p>}
                <p><b>Material: </b>{selection.material.label}</p>
                <p><b>Stanje: </b>{selection.condition.label}</p>
                <p><b>Znamka: </b>{selection.brand.value}</p>
                <p><b>Opis: </b>{selection.descrtext.value}</p>
                <br/>
                <p><b>Cena: </b>{selection.price.value} €</p>
                {(this.props.status === 'active' && this.props.loggedInUserId !== '0') && <button className = 'btnb' onClick = {this.addToCart}>DODAJ V KOŠARICO</button>}
                <p style = {{fontWeight: 'bold'}}>{this.state.addingResult}</p>
                <br/>
                <p>Prodajalec: {this.props.seller} </p>
                <NavLink className='btnu' exact to={'/sellerlistings?' + this.props.sellerId}>Vsi oglasi tega prodajalca</NavLink>
                {(this.props.loggedInUserId !== '0' && this.props.loggedInUserId !== this.props.sellerId) && <p style = {{fontSize: 10}}>
                <button style = {btnContStyle} onClick = {this.handleMsgRequest}>Kontaktiraj prodajalca</button></p>}
            </div>
        )
    }

    render() {
        if(!this.state.msgRequest) {
            return(
                <div className="description">
                    {this.descriptDiv()}
                    {/* <button onClick={this.showCart}>CLEAR AND SHOW CART</button> */}
                </div>
            )
        }
        else return (
            <div className="description">
                <Popup open = {true}
                    position = 'center center'
                    onClose={this.closeModal}>
                    <div style = {{display: 'flex', justifyContent: 'center', height: '90px', lineHeight: '90px'}}>
                        <ReCaptcha
                            ref={(el) => {this.captchaDemo = el;}}
                            size="normal"
                            data-theme="dark"            
                            render="explicit"
                            sitekey="6Lf43ugZAAAAAN5duvLk0-87qD0uCU5gLCkwtnr5"
                            onloadCallback={this.onLoadRecaptcha}
                            verifyCallback={this.verifyCallback}
                        />
                        {this.state.buttonDisabled && <span style = {{paddingLeft: '20px'}}>NADALJUJ</span>}
                        {!this.state.buttonDisabled && <NavLink style = {{paddingLeft: '20px'}} onClick ={this.proceedToMsg} exact to = {'/chatpage/conversation?' + this.props.sellerId}>NADALJUJ</NavLink>}
                    </div>
                </Popup>
                {this.descriptDiv()}
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

const mapDispatchToProps = {
    saveAtt: saveAtt,
}

export default connect(mapStateToProps, mapDispatchToProps) (ItemDescription);