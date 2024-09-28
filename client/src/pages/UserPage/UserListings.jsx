import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import UserSideBar from './UserSideBar';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import AdSpace from '../../components/AdSpace';
import Popup from 'reactjs-popup';
import * as Constants from '../../constants';
import '../../App.css';


class UserListings extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            userId: '0',
            urls: [],
            listings: [],
            tryingToDelete: -1,
            adsPerPage: 5,
            numPages: 1,
            page: 1
        };

        this.displayPhotos = this.displayPhotos.bind(this);

    }

    abortController = new AbortController();
	componentDidMount() {
        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => {this.setState({userId: res.userId}); this.displayPhotos(res.userId)})
        .catch(e => console.error("Critical failure: " + e.message));
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    displayPhotos(uid) {
        fetch('/api/photos', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({userId: uid})
        }).then(res => res.json())
            .then(listings => { if (!listings.length) { this.setState({listings: []}) }
                    else{ this.setState({listings: listings, numPages: Math.floor(listings.length/this.state.adsPerPage + 0.99)}) };
            })
            .catch(e => console.error("Critical failure: " + e.message));

    }

    handleDeleteRequest = (id) => {
        this.setState({tryingToDelete: id});
    }

    handleDelete = (id) => {

        fetch('/api/deleteListing', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({adId: id})
        }).then(res => res.json())
        .then(res => res.success && this.setState({tryingToDelete: -1}))
        .then(() => this.displayPhotos(this.props.loggedInUserId))
        .catch(e => console.error("Critical failure: " + e.message));
        
    }

    cancelDelete = () => {
        this.setState({tryingToDelete: -1});
    }

    paginationButtonClick = (e) => {
        let newpage = 1;
        switch(e.target.id) {
            case 'first':
                this.setState({page: 1});
                break;
            case 'previous':
                this.state.page > 1 ? newpage = this.state.page-1 : newpage = 1;
                this.setState({page: newpage});
                break;
            case 'next':
                this.state.page < this.state.numPages ? newpage = this.state.page+1 : newpage = this.state.numPages;
                this.setState({page: newpage});
                break;
            case 'last':
                this.setState({page: this.state.numPages});
                break;
            default:
                return null;
        }
    }

    renderListings = () => {

        const imgStyle = {
            height: "290px",
            verticalAlign: "middle",
            marginRight: "20px",
            border: '2px solid rgb(255, 255, 255, 0.5)'
        }

        const textStyle = {
            color: 'black',
            textDecoration: 'underline',
            fontWeight: '500'
        }

        let numAds = this.state.listings.length;
        let n = this.state.adsPerPage;
        let p = this.state.page - 1;
        let till;
        p*n + n < numAds ? till = (p+1)*n : till = numAds;
        let adsPortion = this.state.listings.slice(p*n, till);

        return  <div>
                    <div style={{width: "100%", verticalAlign: 'top', textAlign: 'right'}}>
                        <NavLink exact to="/upload" className = 'btn'><b>+ OBJAVI NOV OGLAS</b></NavLink>
                    </div>
                    <div className="listingWrapper">
                        {adsPortion.map((listing) => 
                            {
                                let category = Constants.category[listing.category].value;
                                let subcategory = ''
                                switch(category) {
                                    case 'women':
                                        subcategory = Constants.women[listing.subcategory].value;
                                        break;
                                    case 'men':
                                        subcategory = Constants.men[listing.subcategory].value;
                                        break;
                                    case 'kids':
                                        subcategory = Constants.kids[listing.subcategory].value;
                                        break;
                                    default:
                                        subcategory = ''
                                }
                                return (
                                <li key={listing.ad_id} style={{ listStyleType: "none" }}>
                                    <img src={'/api' + listing.photo1_url.substring(1)} alt={listing.photo1_url} style={imgStyle}/><span style={{verticalAlign: "middle", display: "inline-block", height: "100%"}}></span>
                                    <div style = {{width: '60%', height: '80%', float: 'right', padding: '20px'}}>
                                        <p>Številka oglasa: <NavLink to={'listings/' + category + '/' + subcategory + '/item?' + listing.ad_id} style = {textStyle}>{listing.ad_id}</NavLink></p>
                                        <p><NavLink to={"/edit?" + listing.ad_id} style = {textStyle}>  UREJANJE</NavLink></p>
                                        <button style = {{backgroundColor: 'rgb(255,255,255,0)', border: 'none', cursor: 'pointer'}} onClick = {() => this.handleDeleteRequest(listing.ad_id)}>X IZBRIŠI</button>
                                    </div>
                                </li>)
                            }
                        )}
                        <div>
                            <button id='first' className='btn_nopad' onClick={this.paginationButtonClick}>PRVA</button>
                            <button id='previous' className='btn_nopad' onClick={this.paginationButtonClick}>&#60;&#60;</button>
                            <button id='current' className='btn_nopad'>{this.state.page}/{this.state.numPages}</button>
                            <button id='next' className='btn_nopad' onClick={this.paginationButtonClick}>&#62;&#62;</button>
                            <button id='last' className='btn_nopad' onClick={this.paginationButtonClick}>ZADNJA</button>
                        </div>
                    </div>
                </div>
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
        else if(!this.state.listings.length) {
            return (
                <div className="userContainer">
                    <div style = {{textAlign: 'center'}}>
                        <h2 style = {{color: 'white'}}>NIMATE ŠE OBJAVLJENIH OGLASOV.</h2>
                    </div>
                    <div style={{width: "100%", verticalAlign: 'top', textAlign: 'right'}}>
                        <NavLink exact to="/upload" className = 'btn'><b>+ OBJAVI NOV OGLAS</b></NavLink>
                    </div>
                </div>
            );
        } else if(this.state.listings.length && this.state.tryingToDelete !== -1) {
            return (
                <div className="userContainer">
                <Popup open = {true}
                position = 'center center'
                onClose={this.closeModal}>
                    <div style = {{display: 'inline-flex', justifyContent: 'space-around'}}>
                        <p style= {{margin: 'auto 10px'}}>Ste prepričani, da želite izbrisati oglas?</p>
                        <button className = 'btnb' onClick ={() => this.handleDelete(this.state.tryingToDelete)}>DA</button>
                        <button className = 'btnb' onClick = {this.cancelDelete}>NE</button>
                    </div>
                </Popup>
                {this.renderListings()}
                </div>  
            )

        }else {
            return (
                <div className="userContainer">
                    {this.renderListings()}
                </div>
            );

        }
    }

    render() {
        return(
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


export default connect(mapStateToProps) (UserListings);

