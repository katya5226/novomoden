import React from 'react';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import CategoryListings from './CategoryListings';
import NavBar from '../../components/NavBar';


class SellerListings extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            ads: [],
            adsPerPage: 5,
            numPages: 1,
            page: 1 
        };
    }
    
    abortController = new AbortController();
	componentDidMount() {
        function subStrAfterChars(str, char) {
            return str.substring(str.indexOf(char) + 1);
        }
        function subStrBetweenChars(str, char1, char2) {
            return str.substring(str.indexOf(char1) + 1, str.indexOf(char2));
        }
        let sellerId;
        if(window.location.href.includes('=')) {
            sellerId = subStrBetweenChars(window.location.href, '?', '=');
            let page = parseInt(subStrAfterChars(window.location.href, '='));
            this.setState({page});
        }
        else {
            sellerId = subStrAfterChars(window.location.href, '?');
        }
        fetch('/api/allphotos', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                type: 2,
                sellerId: sellerId
            })
        }).then(res => res.json())
        .then(ads => this.setState({ads: ads, numPages: Math.floor(ads.length/this.state.adsPerPage + 0.99)}))
        .catch(e => console.error("Critical failure: " + e.message));

    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    paginationButtonClick = (e) => {
        function subStrBeforeChars(str, char) {
            return str.substring(0, str.indexOf(char));
        }
        let location;
        if(window.location.href.includes('=')) {location = subStrBeforeChars(window.location.href, '=');}
        else{location = window.location.href;}
        let newpage = 1;
        switch(e.target.id) {
            case 'first':
                this.setState({page: 1});
                window.history.replaceState(null, "", location + '=1');
                break;
            case 'previous':
                this.state.page > 1 ? newpage = this.state.page-1 : newpage = 1;
                this.setState({page: newpage});
                window.history.replaceState(null, "", location + '=' + newpage);
                break;
            case 'next':
                this.state.page < this.state.numPages ? newpage = this.state.page+1 : newpage = this.state.numPages;
                this.setState({page: newpage});
                window.history.replaceState(null, "", location + '=' + newpage);
                break;
            case 'last':
                this.setState({page: this.state.numPages});
                window.history.replaceState(null, "", location + '=' + this.state.numPages);
                break;
            default:
                return null;
        }
    }

    adsDiv = () => {
        if (this.state.ads.length === 0) {
            return (
                <div style={{display: "flex", maxWidth: "90vw", minHeight: '30vh', justifyContent: 'center'}}>
                    <div><h2 style = {{color: 'white'}}>OPROSTITE, TA UPORABNIK NIMA AKTIVNIH OGLASOV!</h2></div>
                </div>
            )
        } else {
            let numAds = this.state.ads.length;
            let n = this.state.adsPerPage;
            let p = this.state.page - 1;
            let till;
            p*n + n < numAds ? till = (p+1)*n : till = numAds;
            let adsPortion = this.state.ads.slice(p*n, till);
            return (
                <div>
                    <div style={{display: "flex", maxWidth: "100vw", paddingLeft: '5vw', paddingRight: '5vw'}}>
                        <CategoryListings ads = {adsPortion}/>
                    </div>
                    <div>
                        <button id='first' className='btn_nopad' onClick={this.paginationButtonClick}>PRVA</button>
                        <button id='previous' className='btn_nopad' onClick={this.paginationButtonClick}>&#60;&#60;</button>
                        <button id='current' className='btn_nopad'>{this.state.page}/{this.state.numPages}</button>
                        <button id='next' className='btn_nopad' onClick={this.paginationButtonClick}>&#62;&#62;</button>
                        <button id='last' className='btn_nopad' onClick={this.paginationButtonClick}>ZADNJA</button>
                    </div>
                </div>
            )
        }
    }

    render() {
        return <div className="App">
                    <UpperLine/>
                    <Header/>
                    <NavBar/>
                    <BreadCrumbs pathname = {this.props.location.pathname}/>
                    {this.adsDiv()}
                    <Bottom/>
                </div>
    }

}


export default SellerListings;
