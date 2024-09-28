import React from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn, logOut } from '../redux/actions';

class UpperLine extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            cartNum: 0,
            unreadMsg: 0
        };
        this.handleClickLogOut = this.handleClickLogOut.bind(this);
    }

    abortController = new AbortController();
	componentDidMount() {
		fetch('/api/sessionroutes', {signal: this.abortController.signal})
			.then(res => res.json())
            .then(res => {if(res.userId !== '0') {
                            this.props.logIn(res.loggedInUser, res.userId);
                            let cart = JSON.parse(window.localStorage.getItem(res.userId));
                            if(cart) {
                                //this.setState({cartNum: cart.length})
                                (cart.length) && fetch('/api/cartListings', {
                                    signal: this.abortController.signal,
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                    },
                                    body: JSON.stringify(cart)
                                }).then(res => res.json())
                                    .then(res => {this.setState({cartNum: res.length}, () => {(res.length !== cart.length) && this.deleteFromStorage(res)})})
                                    .catch(e => console.error("Critical failure: " + e.message));
                            }
                            fetch('/api/fetchallunread',{
                                signal: this.abortController.signal,
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                }
                            })
                            .then(res => res.json())
                            .then(res => this.setState({unreadMsg: res}))
                            .catch(e => console.error("Critical failure: " + e.message));
                        }
            })
            .catch(e => console.error("Critical failure: " + e.message));
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    removeFromCart = (res, items) => {
        let cart = JSON.parse(window.localStorage.getItem(res.userId));
        for (let i = 0; i < cart.length; i++) {
            let d = 0;
            for (let j = 0; j < items.length; j++) {
                if (cart[i] === items[j].ad_id.toString()) d = 1;
            }
            if (d === 0) {
                cart.splice(cart.indexOf(cart[i]), 1);
                window.localStorage.setItem(res.userId, JSON.stringify(cart));
            }
        }
    }

    deleteFromStorage = (items) => {
        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => {this.removeFromCart(res, items);})
        .catch(e => console.error("Critical failure: " + e.message));
    }

    handleClickLogOut() {
        window.location.href = '/';
        fetch('/api/loginroutes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                type: "logout"
            })
        }).then(res => res.json())
            .then(res => this.props.logIn(res.loggedInUser, res.userId))
            .then(() => this.goHome())
            .catch(e => console.error("Critical failure: " + e.message));
    }

    goHome = () => {
        window.location.href = '/';
    }

    render() {
        
        let cartNum = this.state.cartNum;
        this.props.updated && (cartNum += this.props.updated);
        let unreadMsg = this.state.unreadMsg;

        const linkStyle = {
            textDecoration: 'none',
            color: 'black'
        }

        const userBtnStyle = {
            color: 'white',
            textShadow: '1px 1px black',
            backgroundColor: 'rgb(255, 255, 255, 0)',
            padding: 0,
            border: 'none'
        }

        const logoutStyle = {
            color: 'white',
            textShadow: '1px 1px black',
            backgroundColor: 'rgb(255, 255, 255, 0)',
            paddinRight: 10,
            border: 'none',
            textDecoration: 'underline',
            cursor: 'pointer'
        }

        return(
            <div className="Upper-line">
                {this.props.loggedInUser === 'guest' ? <button className = 'btn'>
                    <NavLink  exact to="/login_page" className="first" style={linkStyle} activeStyle={{fontWeight: "bold"}}>PRIJAVA</NavLink></button> :
                <>
                    <button style = {userBtnStyle}>Živjo {this.props.loggedInUser}! </button>
                    <button
                        style = {logoutStyle}
                        onClick={this.handleClickLogOut}> (odjava)
                    </button>
                    <NavLink
                        exact to="/user_listings"
                        className={['btn', 'first'].join(' ')}
                        style={linkStyle}
                        activeStyle={{fontWeight: "bold"}}>MOJA STRAN
                    </NavLink>
                    <NavLink 
                        exact to="/chatpage"
                        className={['btn', 'first'].join(' ')}
                        style={linkStyle}
                        activeStyle={{fontWeight: "bold"}}>{!unreadMsg ? 'SPOROČILA' : 'SPOROČILA (' + unreadMsg + ')'}
                    </NavLink>
                    <NavLink
                        exact to="/shoppingcart"
                        className={['btn', 'first'].join(' ')}
                        style={linkStyle}
                        activeStyle={{fontWeight: "bold"}}>{!cartNum ? 'KOŠARICA' : 'KOŠARICA (' + cartNum + ')'}
                    </NavLink>
                </>}
            </div>
        )

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

export default connect(mapStateToProps, mapDispatchToProps) (UpperLine);