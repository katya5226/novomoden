import React from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../redux/actions'
import UpperLine from '../components/UpperLine';
import NavBar from '../components/NavBar';
import MainPagePhoto from '../components/MainPagePhoto';
import AdSpace from '../components/AdSpace';
import Header from '../components/Header';
import Bottom from '../components/Bottom';
import BreadCrumbs from '../components/BreadCrumbs';
import '../App.css';



class HomePage extends React.Component {

  render() {

    return (
        <div className="App">
            <UpperLine/>
            <Header/>
            <NavBar/>
            <BreadCrumbs pathname = {this.props.location.pathname}/>
            <MainPagePhoto loggedInUser={this.props.loggedInUser}/>
            <AdSpace/>
            <Bottom/>
        </div>
    );

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

export default connect(mapStateToProps, mapDispatchToProps) (HomePage);

