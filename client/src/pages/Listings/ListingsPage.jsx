import React from 'react';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import CategoryListings from './CategoryListings';
import NavBar from '../../components/NavBar';
import {findIndexByValue} from '../../functions/index';
import * as Constants from '../../constants';


class ListingsPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            prevProps: null,
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
        if(window.location.href.includes('?')) {
            let page = parseInt(subStrAfterChars(window.location.href, '?'));
            this.setState({page});
        }
        let category;
        let subcategory;

        switch(this.props.category) {
            case 'women':
                category = 1;
                this.props.subcategory !== '0' ? subcategory = findIndexByValue(Constants.women, this.props.subcategory) : subcategory = 0;
                break;
            case 'men':
                category = 2;
                this.props.subcategory !== '0' ? subcategory = findIndexByValue(Constants.men, this.props.subcategory) : subcategory = 0;
                break;
            case 'kids':
                category = 3;
                this.props.subcategory !== '0' ? subcategory = findIndexByValue(Constants.kids, this.props.subcategory) : subcategory = 0;
                break;
            default:
                category = 0;
                subcategory = 0;
        }       
        fetch('/api/allphotos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            signal: this.abortController.signal,
            body: JSON.stringify({
                type: 1,
                category: category,
                subcategory: subcategory
            })
        }).then(res => res.json())
        .then(ads => {this.setState({ads, numPages: Math.floor(ads.length/this.state.adsPerPage + 0.99)})})
        .catch(e => console.error("Critical failure: " + e.message));

    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    paginationButtonClick = (e) => {
        function subStrBeforeChars(str, char) {
            return str.substring(0, str.indexOf(char));
        }
        const location = subStrBeforeChars(window.location.href, '?');
        let newpage = 1;
        switch(e.target.id) {
            case 'first':
                this.setState({page: 1});
                window.history.replaceState(null, "", location + '?1');
                break;
            case 'previous':
                this.state.page > 1 ? newpage = this.state.page-1 : newpage = 1;
                this.setState({page: newpage});
                window.history.replaceState(null, "", location + '?' + newpage);
                break;
            case 'next':
                this.state.page < this.state.numPages ? newpage = this.state.page+1 : newpage = this.state.numPages;
                this.setState({page: newpage});
                window.history.replaceState(null, "", location + '?' + newpage);
                break;
            case 'last':
                this.setState({page: this.state.numPages});
                window.history.replaceState(null, "", location + '?' + this.state.numPages);
                break;
            default:
                return null;
        }
    }

    sortSelect = (e) => {

        const sortBy = e.target.value;
        let sortedAds = this.state.ads;

        function compareDate( a, b ) {
            if ( a.ad_id > b.ad_id){
              return -1;
            }
            if ( a.ad_id < b.ad_id ){
              return 1;
            }
            return 0;
          }
        function comparePrice( a, b ) {
            if ( a.price < b.price){
              return -1;
            }
            if ( a.price > b.price ){
              return 1;
            }
            return 0;
          }

        switch(sortBy) {
            case "date":
                sortedAds.sort(compareDate);
                break;
            case "price":
                sortedAds.sort(comparePrice);
                break;
            default:
                break;
        }
        this.setState({ads: sortedAds});
    }

    adsDiv = () => {

        if (this.state.ads.length === 0) {
            return (
                <div style={{display: "flex", maxWidth: "90vw", minHeight: '30vh', justifyContent: 'center'}}>
                    <div><h2 style = {{color: 'white'}}>OPROSTITE, V TEJ KATEGORIJI NI OGLASOV!</h2></div>
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
                    <div style={{textAlign:"right", marginRight:"150px"}}>
                        <select name="sort" id="sort" onChange={this.sortSelect}>
                            <option value="date">Sortiraj</option>
                            <option value="date">Najnovejše</option>
                            <option value="price">Najcenejše</option>
                        </select>
                    </div>
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

        let path = '';
        this.props.subcategory === '0' ? path = '/listings/' + this.props.category  + '/all' : path = '/listings/' + this.props.category + '/' + this.props.subcategory;

        return <div className="App">
                    <UpperLine/>
                    <Header/>
                    <NavBar/>
                    <BreadCrumbs pathname = {path}/>
                    {this.adsDiv()}
                    <Bottom/>
                </div>

    }

}

export default ListingsPage;
