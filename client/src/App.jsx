import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserListings from './pages/UserPage/UserListings';
import PastOrders from './pages/UserPage/PastOrders';
import Sold from './pages/UserPage/Sold';
import Wallet from './pages/UserPage/Wallet';
import Profile from './pages/UserPage/Profile';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import UploadPage from './pages/Publish/UploadPage';
import EditPage from './pages/Publish/EditPage';
import ItemPage from './pages/Listing/ItemPage';
import ShoppingCartPage from './pages/ShoppingCart/ShoppingCartPage';
import OrderPage from './pages/ShoppingCart/OrderPage';
import PaymentStatus from './pages/ShoppingCart/PaymentStatus';
import ListingsPage from './pages/Listings/ListingsPage';
import ChatPage from './pages/Chat/ChatPage';
import Conversation from './pages/Chat/Conversation';
import AllMessages from './pages/Chat/AllMessages';
import ForgotPassword from './pages/ForgotPassword';
import RequestConfirmEmail from './pages/RequestConfirmEmail';
import ContentSupport from './pages/Support/ContentSupport';
import TechnicalSupport from './pages/Support/TechnicalSupport';
import IDcard from './pages/Bottom/IDcard';
import Advertising from './pages/Bottom/Advertising';
import Cookies from './pages/Bottom/Cookies';
import Privacy from './pages/Bottom/Privacy';
import Buying from './pages/Bottom/Buying';
import Selling from './pages/Bottom/Selling';
import Posting from './pages/Bottom/Posting';
import Protection from './pages/Bottom/Protection';
import Commission from './pages/Bottom/Commission';
import SearchResults from './pages/Listings/SearchResults';
import SellerListings from './pages/Listings/SellerListings';
import * as Constants from './constants';



class App extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            loggedInUserId: 0,
            loggedInUser: 'guest'
		};
    }

    makeWomanPaths = () => {
        return Constants.women.map((category) => <Route exact path={'/listings/women/' + category.value} component={() => <ListingsPage
            category = 'women'
            subcategory = {category.value}/>} key = {category.value}/>)        
    }

    makeManPaths = () => {
        return Constants.men.map((category) => <Route exact path={'/listings/men/' + category.value} component={() => <ListingsPage
            category = 'men'
            subcategory = {category.value}/>} key = {category.value}/>)    
    }
    makeKidPaths = () => {
        return Constants.kids.map((category) => <Route exact path={'/listings/kids/' + category.value} component={() => <ListingsPage
            category = 'kids'
            subcategory = {category.value}/>} key = {category.value}/>)
    }

    makeWomanItemPaths = () => {
        return Constants.women.map((category) => <Route exact path={'/listings/women/' + category.value + '/item'} component={ItemPage} key = {category.value}/>)        
    }
    makeManItemPaths = () => {
        return Constants.men.map((category) => <Route exact path={'/listings/men/' + category.value + '/item'} component={ItemPage} key = {category.value}/>)        
    }
    makeKidItemPaths = () => {
        return Constants.kids.map((category) => <Route exact path={'/listings/kids/' + category.value + '/item'} component={ItemPage} key = {category.value}/>)        
    }
    
    render() {

        return <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/user_listings" component={UserListings} />
            <Route exact path="/user_pastorders" component={PastOrders} />
            <Route exact path="/user_sold" component={Sold} />
            <Route exact path="/user_wallet" component={Wallet} />
            <Route exact path="/user_profile" component={Profile} />
            <Route exact path="/signUp_page" component={SignUpPage} />
            <Route exact path="/logIn_page" component={LogInPage} />
            <Route exact path="/upload" component={UploadPage} />
            <Route exact path="/edit" component={EditPage} />
            <Route exact path="/listings?1" component={() => <ListingsPage
                                                                category = '0'
                                                                subcategory = '0'/>} />
                <Route exact path="/listings/women" component={() => <ListingsPage
                                                                        category = 'women'
                                                                        subcategory = '0'/>} />
                <Route exact path="/listings/men" component={() => <ListingsPage
                                                                        category = 'men'
                                                                        subcategory = '0'/>} />
                <Route exact path="/listings/kids" component={() => <ListingsPage
                                                                        category = 'kids'
                                                                        subcategory = '0'/>} />
                {this.makeWomanPaths()}
                {this.makeManPaths()}
                {this.makeKidPaths()}
                {this.makeWomanItemPaths()}
                {this.makeManItemPaths()}
                {this.makeKidItemPaths()}
            <Route exact path="/item" component={ItemPage} />
            <Route exact path="/sellerlistings" component={SellerListings} />
            <Route exact path="/shoppingcart" component={ShoppingCartPage} />
            <Route exact path="/shoppingcart/placeorder" component={OrderPage} />
            <Route exact path="/chatpage" component={ChatPage} />
            <Route exact path="/chatpage/conversation" component={Conversation} />
            <Route exact path="/chatpage/conversation/all" component={AllMessages} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/requestconfirmemail" component={RequestConfirmEmail} />
            <Route exact path="/contentsupport" component={ContentSupport} />
            <Route exact path="/technicalsupport" component={TechnicalSupport} />
            <Route exact path="/idcard" component={IDcard} />
            <Route exact path="/advertising" component={Advertising} />
            <Route exact path="/cookies" component={Cookies} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/buying" component={Buying} />
            <Route exact path="/selling" component={Selling} />
            <Route exact path="/posting" component={Posting} />
            <Route exact path="/protection" component={Protection} />
            <Route exact path="/commission" component={Commission} />
            <Route exact path="/searchresults" component={SearchResults} />
            <Route exact path="/paymentstatus" component={PaymentStatus} />

            <Redirect to="/404" />
          </Switch>
        </Router>
      }

}

const mapStateToProps = state => {
    return {
        loggedInUser: state.loggedInUser,
        loggedInUserId: state.loggedInUserId,
    };
  };


export default connect(mapStateToProps) (App);