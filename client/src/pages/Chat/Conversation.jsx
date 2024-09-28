import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import NewMsg from './NewMsg';
import NavBar from '../../components/NavBar';
import AdSpace from '../../components/AdSpace';
import Bottom from '../../components/Bottom';
import BreadCrumbs from '../../components/BreadCrumbs';
import '../../App.css';


class Conversation extends Component {
	constructor(props) {
		super(props);
        this.state = {
            userId: '0',
            time: null,
            interlocutor: '',
            messages: [],
            newMsg: ''
        }
    }

    abortController = new AbortController();

    componentDidMount() {
        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => this.setState({userId: res.userId}))
        .catch(e => console.error("Critical failure: " + e.message));

        this.msgFetch();
        this.interval = setInterval(() => {this.msgFetch();}, 30000);
    }

    componentWillUnmount() {
        this.abortController.abort();
        clearInterval(this.interval);
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

    sendMsg = (newMsg) => {
        this.setState({newMsg})
        const receiverId = this.interlocutorId();
        fetch('/api/newmessage', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                receiverId: receiverId,
                msg: newMsg
            })
        }).then(res => res.json())
        .then(res => res.success && this.setState(state => {const messages = [...state.messages, ({time: 'now', sender: this.props.loggedInUser, msg: state.newMsg})];
                                        return {...state, messages, newMsg: ''}}))
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
        const N = this.state.messages.length;
        const n = 5;

        if (this.state.userId === '0') {
            return <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                <br/><br/><br/>
                <h2>PROSIMO PRIJAVITE SE V SISTEM!</h2>
                <br/><br/><br/>
            </div>
        }
        else return <div style = {{backgroundColor: 'rgb(255, 255, 255, 0.8)'}}>
            <p>{this.state.time}</p>
            <br/>
            <p style = {{fontSize: '30px'}}>POGOVOR S/Z: <b>{this.state.interlocutor}</b></p>
            {N > n && <NavLink exact to = {this.props.location.pathname + '/all?' + this.interlocutorId()} className = 'btn'>POKAŽI STAREJŠA SPOROČILA</NavLink>}
            <br/>
            <ul style = {{display: 'inline-block', maxWidth: '60vw', paddingLeft: '0px'}}>
            {N > n && (
            messages.slice(N-n, N)
            .map((msg, index) =>
                <li key={index} style={{listStyleType: 'none', lineHeight: '35px'}}>
                    {msg.time.substring(8,10)}-{msg.time.substring(5,7)}-{msg.time.substring(0,4)} {msg.time.substring(11,16)}: <b>{msg.sender}</b>: {msg.msg}</li>))}
            {N <= n && this.state.messages.map((msg, index) =>
                <li key={index} style={{listStyleType: 'none', lineHeight: '35px'}}>
                    {msg.time.substring(8,10)}-{msg.time.substring(6,7)}-{msg.time.substring(0,4)} {msg.time.substring(11,16)}: <b>{msg.sender}</b>: {msg.msg}</li>)}
            </ul>
            <br/>
            <br/>
            <div>
                <NewMsg callBackParent = {this.sendMsg}/>
            </div>
        </div>
    }

    render() {
        return (
            <div className = 'App'>
                <UpperLine/>
                <Header/>
                <NavBar/>
                <BreadCrumbs pathname = {this.props.location.pathname}/>
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

export default connect(mapStateToProps) (Conversation)