import React from 'react';
import { NavLink } from 'react-router-dom';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import * as Constants from '../../constants';


class SearchResults extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            searchFor: '',
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
        let searchFor = '';
        console.log(searchFor);
        if(window.location.href.includes('=')) {
            searchFor = subStrBetweenChars(window.location.href, '?', '=');
            let page = parseInt(subStrAfterChars(window.location.href, '='));
            this.setState({page});
        }
        else {
            searchFor = subStrAfterChars(window.location.href, '?');
        }
        this.setState({searchFor}, () => this.search());
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    search = () => {
        let searchFor = this.state.searchFor;
        if (searchFor === '') searchFor = 'nothingtosearchfor';
        fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                signal: this.abortController.signal,
                searchFor: searchFor
            })
        }).then(res => res.json())
        .then(ads => this.setState({ads: ads, numPages: Math.floor(ads.length/this.state.adsPerPage + 0.99)}))
        .catch(e => console.error("Critical failure: " + e.message));
    }

    onSearchChange = (searchFor) => {
        this.setState({searchFor}, () => this.search());
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
                //window.history.replaceState(null, "", location + '?1');
                window.history.replaceState(null, "", location + '=1');
                break;
            case 'previous':
                this.state.page > 1 ? newpage = this.state.page-1 : newpage = 1;
                this.setState({page: newpage});
                //window.history.replaceState(null, "", location + '?' + newpage);
                window.history.replaceState(null, "", location + '=' + newpage);
                break;
            case 'next':
                this.state.page < this.state.numPages ? newpage = this.state.page+1 : newpage = this.state.numPages;
                this.setState({page: newpage});
                //window.history.replaceState(null, "", location + '?' + newpage);
                window.history.replaceState(null, "", location + '=' + newpage);
                break;
            case 'last':
                this.setState({page: this.state.numPages});
                //window.history.replaceState(null, "", location + '?' + this.state.numPages);
                window.history.replaceState(null, "", location + '=' + this.state.numPages);
                break;
            default:
                return null;
        }
    }

    toRender = (ads) => {

        const imgStyle = {
            width: "100%",
            border: '2px solid white'
        }
    
        const wrapper = {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "100px 100px",
            maxWidth: "100%",
            margin: "50px 50px"
        }

        let searchFor = this.state.searchFor;
        if (ads.length === 0) {
            return <div style={{display: "flex", maxWidth: "90vw", minHeight: '30vh', justifyContent: 'center'}}>
                        <div><h2 style = {{color: 'white'}}>OPROSTITE, NIČESAR NISMO NAŠLI!</h2></div>
                    </div>
        }
        else {
            return <div>
                        <p className = 'white-back'>Rezultati iskanja za: <b>{searchFor}</b></p>
                        <div style={{maxWidth: '100%', justifyContent: 'center', minHeight:'80vh'}}>
                            <div style={wrapper}>
                                {ads.map((ad) => {
                                    let category = Constants.categoryNames[ad.category]
                                    let subcategory;
                                    switch(category) {
                                        case 'women':
                                            subcategory = Constants.women[ad.subcategory].value;
                                            break;
                                        case 'men':
                                            subcategory = Constants.men[ad.subcategory].value;
                                            break;
                                        case 'kids':
                                            subcategory = Constants.kids[ad.subcategory].value;
                                            break;
                                        default:
                                            subcategory = 0;
                                    }
                                    return (
                                        <li key={ad.ad_id} style={{ listStyleType: "none" }}><NavLink exact to =
                                        {'/listings/' + category + '/' + subcategory + '/item?' + ad.ad_id}>
                                            <img src={'/api/' + ad.photo1_url} alt = {ad.ad_id + 'somephoto'} style={imgStyle}/>
                                        </NavLink></li>)
                
                                    }
                                )}
                            </div>
                        </div>
                    </div>
        }

    }

    render() {
        const path = '/searchresults';

        let numAds = this.state.ads.length;
        let n = this.state.adsPerPage;
        let p = this.state.page - 1;
        let till;
        p*n + n < numAds ? till = (p+1)*n : till = numAds;
        let adsPortion = this.state.ads.slice(p*n, till);

        return (
                    <div className="App">
                        <UpperLine/>
                         <Header/>
                         <NavBar callBackParent = {this.onSearchChange}/>
                         <BreadCrumbs pathname = {path}/>
                            {this.toRender(adsPortion)}
                        <div>
                            <button id='first' className='btn_nopad' onClick={this.paginationButtonClick}>PRVA</button>
                            <button id='previous' className='btn_nopad' onClick={this.paginationButtonClick}>&#60;&#60;</button>
                            <button id='current' className='btn_nopad'>{this.state.page}/{this.state.numPages}</button>
                            <button id='next' className='btn_nopad' onClick={this.paginationButtonClick}>&#62;&#62;</button>
                            <button id='last' className='btn_nopad' onClick={this.paginationButtonClick}>ZADNJA</button>
                        </div>
                        <AdSpace/>
                         <Bottom/>
                     </div>
        )
    }

}
  
export default SearchResults;