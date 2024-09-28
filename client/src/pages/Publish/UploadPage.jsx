import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveAtt } from '../../redux/actions';
import {doUpload} from '../../functions/index';
import ClipLoader from 'react-spinners/ClipLoader';
import queryString from 'query-string';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import ImgUpload from './ImgUpload';
import SelectForms from './SelectForms';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import '../../App.css';


class UploadPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            userId: '0',
            adId: '',
            photos: [],
            warning: '',
            uploadStatus: false,
            selection: {
                category: '',
                subcategory: '',
                clothsize: '',
                material: '',
                condition: '',
                brand: '',
                descrtext: '',
                weight: null,
                price: null
            },
            loading: false
        };
        this.handleUpload = this.handleUpload.bind(this);
    }

    abortController = new AbortController();
    axiosSignal = axios.CancelToken.source();

    componentDidMount() {
        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => this.setState({userId: res.userId}))
        .catch(e => console.error("Critical failure: " + e.message));
    }

    componentWillUnmount() {
        this.abortController.abort();
        this.axiosSignal.cancel('Api is being canceled');
    }

    checkIfAll = () => {
        let check = true;
        const selection = this.state.selection;
        Object.keys(selection).forEach(key => {
            if(key !== 'brand' && key !== 'descrtext') {
                if((selection[key] === 0 && selection.category !== 3)|| selection[key] === null || selection[key] === '') {
                    check = false;
                    this.setState({warning: 'Izpolni vsa polja'});
                }
            }
        });
        if (this.state.photos.length < 3) {
            check = false;
            this.setState({warning: 'Izberi tri fotografije'});
        }
        return check;
    }

    onImageSaved = (photo, index) => {
        if (this.state.photos.length <= index) {
            this.setState(state => {
                const photos = state.photos.concat(photo);
                return {photos};
            });
        } else {
            this.setState(state => {
                const photos = state.photos.map((item, j) => {
                    if (j === index) {
                        return photo;
                    } else {
                        return item;
                    }
                });
                return {photos};
            });
        }
    }

    onSelectionSaved = (selection) => {
        this.setState({selection});
    }

    handleUpload() {
        this.props.saveAtt(true);    
        if (!this.checkIfAll()) {
            this.setState({warning: "IZPOLNI VSA POLJA!"});
        }else {
            this.setState({loading: true});
            doUpload('first', this.state.selection, this.props.loggedInUserId, this.props.loggedInUser, this.axiosSignal, 0, this.state.photos)
            .then(res => this.setState({uploadStatus: true, loading: false}))
            .catch(e => console.error("Critical failure: " + e.message));
        }
    }

    render() {
        const adId = queryString.stringify(queryString.parse(this.props.location.search));
        if(this.state.userId === '0') {
            return (
                <div className = 'App'>
                    <UpperLine/>
                    <Header/>
                    <NavBar/>
                    <BreadCrumbs pathname = {this.props.location.pathname}/>
                    <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                        <br/><br/><br/>
                        <h2>PROSIMO PRIJAVITE SE V SISTEM!</h2>
                        <br/><br/><br/>
                    </div>
                    <Bottom/>
                </div>
            )
        }
        else if(this.state.uploadStatus) {
            return <div className="App">
                        <br/><br/>
                        <h1 style={{backgroundColor: 'rgb(255, 255, 255, 0.5)'}}>HVALA ZA ODDANI OGLAS!</h1>
                        <NavLink exact to = '/user_listings'><button className = 'btn'>NAZAJ NA MOJO STRAN</button></NavLink>
                    </div>
        } else {
            return (
            <div className="App">
                <UpperLine/>
                <Header/>
                <BreadCrumbs pathname = {this.props.location.pathname}/>
                <div style={{display: "flex", width: "90vw"}}>
                    <div className="sidenav"></div>
                    <div style={{width: "100%", backgroundColor: 'rgb(255, 255, 255, 0.5)'}}>
                        <h1>OBJAVI OGLAS</h1>
                        <br/>
                        <SelectForms callBackParent={this.onSelectionSaved} saveAtt ={this.state.saveAttempt} adId={adId}/>
                        <br/>
                        <p style = {{fontWeight: 'bold'}}>Naloži tri fotografije (prva fotografija je naslovna)</p>
                        <ImgUpload callBackParent={this.onImageSaved} index='0'/>
                        <ImgUpload callBackParent={this.onImageSaved} index='1'/>
                        <ImgUpload callBackParent={this.onImageSaved} index='2'/>
                        {!this.state.loading && <button className = 'btnb' onClick={this.handleUpload}>SHRANI OGLAS</button>}
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.loading}
                        />
                        <p style={{color: "red"}}>{this.state.warning}</p>
                    </div>
                </div>
                <Bottom/>
            </div>
            )}
    }
}

const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser,
      loggedInUserId: state.loggedInUserId,
      saveAttempt: state.saveAttempt
    };
};

const mapDispatchToProps = {
    saveAtt: saveAtt
}

export default connect(mapStateToProps, mapDispatchToProps) (UploadPage);
