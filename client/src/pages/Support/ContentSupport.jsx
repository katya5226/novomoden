import React from 'react';
import { connect } from 'react-redux';
import UpperLine from '../../components/UpperLine';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Header from '../../components/Header';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import '../../App.css';


class ContentSupport extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            questionType: 0,
            msg: '',
            orderNumber: 0,
            success: false,
            warning:''
		};
    }

    abortController = new AbortController();

    componentDidMount() {
        function subStrAfterChars(str, char) {
            return str.substring(str.indexOf(char) + 1);
        }
        window.location.href.includes("?") &&
        this.setState({questionType: parseInt(subStrAfterChars(window.location.href, '?'))});
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    typeBtnclick = (event) => {
        event.preventDefault();
        const id = parseInt(event.target.id);
        this.setState({questionType: id, warning: ''});
    }

    updateMsg = (event) => {
        event.preventDefault();
        const {value} = event.target;
        this.setState({msg: value});
    }

    updateOrderNumber = (event) => {
        event.preventDefault();
        const {value} = event.target;
        this.setState({orderNumber: value});
    }

    onClickSend = () => {
        if(this.state.questionType === 3 && this.state.orderNumber) {
            if(this.state.orderNumber) {
                fetch('/api/reclamation', {
                    signal: this.abortController.signal,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.props.loggedInUserId,
                        msg: this.state.msg,
                        orderNumber: parseInt(this.state.orderNumber)
                    })
                }).then(res => res.json())
                .then(res => {if(res.success) this.setState({success: true}); else this.setState({warning: "Napačna številka naročila."})})
                .catch(e => console.error("Critical failure: " + e.message));
            }
            else this.setState({warning: "Napačna številka naročila."})
        }
        else {
            fetch('/api/ticketroutes', {
                signal: this.abortController.signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    typect: 'content',
                    questionType: this.state.questionType,
                    userId: this.props.loggedInUserId,
                    msg: this.state.msg
                })
            }).then(res => res.json())
            .then(res => res.success && this.setState({success: true}))
            .catch(e => console.error("Critical failure: " + e.message));
        }
    }

    reclamationDiv = () => {
        return (
            <div>
                <br/>
                <p style={{textAlign: "left", color:"white", fontWeight:"bold", fontSize:"large"}}>REKLAMACIJA</p>
                <input
                    placeholder="Številka naročila"
                    onChange={this.updateOrderNumber}>
                </input>
            </div>
        )
    }

    renderSwitch = (userId, success) => {
        if (userId === 0 && !success) {
            return <div className = 'white-back'>
                        <br/><br/><br/>
                        <h2>PROSIMO, DA SE PRED ODDAJO VPRAŠANJA PRIJAVITE.</h2>
                        <br/><br/><br/>
                    </div>
        }
        else if (success) {
            return <div className = 'white-back'>
                        <br/><br/><br/>
                        <h2>HVALA ZA ODDANO VPRAŠANJE. ODGOVORILI VAM BOMO PO E-POŠTI V NAJKRAJŠEM MOŽNEM ČASU.</h2>
                        <br/><br/><br/>
                    </div>
        }
        else return <div>
                        <div style = {{display: 'inline-block'}}>
                            <button id = {1} className = 'support_btn' onClick = {this.typeBtnclick}>VPRAŠANJE V ZVEZI S PRODAJO</button>
                            <button id = {2} className = 'support_btn' onClick = {this.typeBtnclick}>VPRAŠANJE V ZVEZI Z NAKUPOM</button>
                            <button id = {3} className = 'support_btn' onClick = {this.typeBtnclick}>REKLAMACIJA IZDELKA</button>
                        </div>
                        {this.state.questionType ?
                        <div style={{textAlign: "center", width: '60vw', minHeight: '10px', margin:"0 auto"}}>
                            <br/>
                            {this.state.questionType === 1 && <p style={{textAlign: "left", color:"white", fontWeight:"bold", fontSize:"large"}}>VPRAŠANJE V ZVEZI S PRODAJO</p>}
                            {this.state.questionType === 2 && <p style={{textAlign: "left", color:"white", fontWeight:"bold", fontSize:"large"}}>VPRAŠANJE V ZVEZI Z NAKUPOM</p>}
                            {this.state.questionType === 3 && this.reclamationDiv()}
                            <textarea
                                style={{width: '60vw', minHeight: '10px'}}
                                onChange={this.updateMsg}
                                value={this.state.msg}
                                placeholder="Vaše sporočilo"
                                maxLength="990">
                            </textarea>
                            <br/>
                            <button className = 'btn' style = {{border: '2px solid #ccc'}} onClick = {this.onClickSend}>POŠLJI</button>
                        </div> : null}
                        <p style={{color:"red"}}>{this.state.warning}</p>
                    </div>
    } 


    render() {

        let userId = this.props.loggedInUserId;
        let success = this.state.success;

            return (
            <div className="App">
                <UpperLine/>
                <Header/>
                <NavBar/>
                <BreadCrumbs pathname = {this.props.location.pathname}/>
                {this.renderSwitch(userId, success)}
                <AdSpace/>
                <Bottom/>
            </div>)

    }

}

const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser,
      loggedInUserId: state.loggedInUserId,
    };
  };

export default connect(mapStateToProps) (ContentSupport);