import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import AdSpace from '../../components/AdSpace';
import '../../App.css';


class AllMessages extends Component {
	constructor(props) {
		super(props);
        this.state = {
            userId: '0',
            interlocutor: '',
            messages: []
        }
    }

    abortController = new AbortController();

    componentDidMount() {
        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => this.setState({userId: res.userId}))
        .catch(e => console.error("Critical failure: " + e.message));

        this.msgFetch();
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    msgFetch = () => {
        const iLId = this.interlocutorId();
        this.interlocutor(iLId);
        fetch('/api/fetchmessages', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                conversantId: iLId
            })
        })
        .then(res => res.json())
        .then(results => {
            const messages = results.map(result => ({time: result.date_created, sender: result.sender, msg: result.msg}));
            this.setState({messages})
        })
        .catch(e => console.error("Critical failure: " + e.message));
    }

    interlocutorId() {
        function subStrAfterChars(str, char) {
            return str.substring(str.indexOf(char) + 1);
        }
        const interlocutorId = subStrAfterChars(window.location.href, '?');
        return interlocutorId;
    }

    interlocutor = (iLId) => {
        fetch('/api/firstname', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                iLId: iLId,
            })
        }).then(res => res.json())
        .then(res => this.setState({interlocutor: res[0].first_name}))
        .catch(e => console.error("Critical failure: " + e.message));
    }

    switchRender = () => {

        const messages = this.state.messages;

        if (this.state.userId === '0') {
            return <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                <br/><br/><br/>
                <h2>PROSIMO PRIJAVITE SE V SISTEM!</h2>
                <br/><br/><br/>
            </div>
        }
        else return <div style = {{backgroundColor: 'rgb(255, 255, 255, 0.8)'}}>
            <br/>
            <p style = {{fontSize: '30px'}}>ZGODOVINA POGOVOROV S/Z: <b>{this.state.interlocutor}</b></p>
            <br/>
            <ul style = {{display: 'inline-block', maxWidth: '60vw'}}>
            {messages.map((msg, index) =>
                <li key={index} style={{listStyleType: 'none', lineHeight: '35px'}}>
                    {msg.time.substring(8,10)}-{msg.time.substring(6,7)}-{msg.time.substring(0,4)} {msg.time.substring(11,16)}: <b>{msg.sender}</b>: {msg.msg}</li>)}
            </ul>
            <NavLink exact to = {'/chatpage/conversation?' + this.interlocutorId()} className = 'btn'>NAZAJ</NavLink>
        </div>

    }

    render() {
        return (
            <div className = 'App'>
                <UpperLine/>
                <Header/>
                <NavBar/>
                <BreadCrumbs pathname = {'/chatpage/conversation?'+ this.interlocutorId() + '/all?' + this.interlocutorId()}/>
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

export default connect(mapStateToProps) (AllMessages)