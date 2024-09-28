import React from 'react';
import { connect } from 'react-redux';
import UpperLine from '../../components/UpperLine';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import '../../App.css';



class TechnicalSupport extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            msg: '',
            success: false
		};
    }

    abortController = new AbortController();
    componentWillUnmount() {
        this.abortController.abort();
    }

    updateMsg = (event) => {
        const {value} = event.target;
        this.setState({msg: value});
    }

    onClickSend = () => {
        console.log(this.props.loggedInUserId);
        fetch('/api/techsupportroutes', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                typect: 'technical',
                userId: this.props.loggedInUserId,
                msg: this.state.msg
            })
        }).then(res => res.json())
        .then(res => res.success && this.setState({success: true}))
        .catch(e => console.error("Critical failure: " + e.message));
    }

    render() {
        console.log(this.props.location.pathname);

        let userId = this.props.loggedInUserId;
        let success = this.state.success;

        if(userId === 0 && !success) {
            return (
            <div className="App">
                <UpperLine/>
                <Header/>
                <NavBar/>
                <BreadCrumbs pathname = {this.props.location.pathname}/>
                <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                        <br/><br/><br/>
                        <h2>PROSIMO, DA SE PRED ODDAJO VPRAŠANJA PRIJAVITE.</h2>
                        <br/><br/><br/>
                    </div>
                <AdSpace/>
            <Bottom/>
        </div>)
        }
        else if(success) {
            return (
                <div className="App">
                    <UpperLine/>
                    <Header/>
                    <NavBar/>
                    <BreadCrumbs pathname = {this.props.location.pathname}/>
                    <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                            <br/><br/><br/>
                            <h2>HVALA ZA ODDANO VPRAŠANJE. ODGOVORILI VAM BOMO PO E-POŠTI V NAJKRAJŠEM MOŽNEM ČASU.</h2>
                            <br/><br/><br/>
                    </div>
                    <AdSpace/>
                <Bottom/>
            </div>)
        }
        else
        return (
            <div className="App">
                <UpperLine/>
                <Header/>
                <NavBar/>
                <BreadCrumbs pathname = {this.props.location.pathname}/>
                <div>
                    <br/>
                    <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                        <br/>
                        <h2>KAKO VAM LAHKO POMAGAMO?</h2>
                        <br/>
                    </div>
                    <br/><br/>
                    <textarea
                        style={{width: '60vw', minHeight: '10px'}}
                        onChange={this.updateMsg}
                        value={this.state.msg}
                        placeholder="Novo sporočilo"
                        maxLength="990">
                    </textarea>
                    <br/>
                    <button className = 'btn' style = {{border: '2px solid #ccc'}} onClick = {this.onClickSend}>SEND</button>
                </div>
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
  
export default connect(mapStateToProps) (TechnicalSupport);