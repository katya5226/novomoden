import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpperLine from '../../components/UpperLine';
import Header from '../../components/Header';
import { NavLink } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs';
import NavBar from '../../components/NavBar';
import Bottom from '../../components/Bottom';
import AdSpace from '../../components/AdSpace';
import '../../App.css';


class ChatPage extends Component {
	constructor(props) {
		super(props);
        this.state = {
            userId: '0',
            conversations: [],
            unread: [],
            perPage: 10,
            numPages: 1,
            page: 1
        }
    }

    abortController = new AbortController();
    componentDidMount() {

        fetch('/api/sessionroutes', {signal: this.abortController.signal})
        .then(res => res.json())
        .then(res => this.setState({userId: res.userId}))
        .catch(e => console.error("Critical failure: " + e.message));

        this.conversationsFetch();
        this.interval = setInterval(() => {this.conversationsFetch();}, 30000);
    }

    componentWillUnmount() {
        this.abortController.abort();
        clearInterval(this.interval);
    }

    conversationsFetch = () => {
        fetch('/api/fetchconversations', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {const conversations = res; let unread = []; for(let i = 0; i < res.length; i++) unread.push(0); const numPages = Math.floor(res.length/this.state.perPage + 0.99);
            this.setState(state => {return {...state, conversations, unread, numPages}}, () => {for(let i = 0; i < res.length; i++) {
                let iLId = 0;
                res[i].id1.toString() === this.props.loggedInUserId ? iLId = res[i].id2 : iLId = res[i].id1;
                this.fetchNumberOfUnread(i, iLId);
            }})
        })
        .catch(e => console.error("Critical failure: " + e.message));
    }

    fetchNumberOfUnread = (i, iLId) => {
        fetch('/api/fetchunread', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                iLId: iLId
            })
        })
        .then(res => res.json())
        .then(res => {this.setState(state => {
                            const unread = state.unread.map((num, j) => {if (j === i) {return res;} else return num;});
                            return ({...state, unread});
                        });                    
        })
        .catch(e => console.error("Critical failure: " + e.message));
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

    switchRender = () => {

        let numConvers = this.state.conversations.length;
        let n = this.state.perPage;
        let p = this.state.page - 1;
        let till;
        p*n + n < numConvers ? till = (p+1)*n : till = numConvers;
        let conversPortion = this.state.conversations.slice(p*n, till);

        if (this.state.userId === '0') {
            return <div style = {{backgroundColor: 'rgb(255,255,255,0.5)'}}>
                <br/><br/><br/>
                <h2>PROSIMO PRIJAVITE SE V SISTEM!</h2>
                <br/><br/><br/>
            </div>
        }
        else return (
        <>
            <div style = {{backgroundColor: 'rgb(255, 255, 255, 0.7)', textAlign: 'left', paddingLeft: '100px', paddingBottom: '50px'}}>
                <br/>
                <h2>POGOVORI:</h2>
                {conversPortion.map((conv, index) => {
                    let iLId = 0;
                    let conversant = '';
                    conv.id1 === parseInt(this.props.loggedInUserId) ? iLId = conv.id2 : iLId = conv.id1;
                    conv.conversant1 === this.props.loggedInUser ? conversant = conv.conversant2 : conversant = conv.conversant1;
                    let numunread = '';
                    if(this.state.unread[index]) numunread = '(' + this.state.unread[index] + ')';
                    return <li key = {index} style = {{listStyleType: 'none', paddingLeft: '200px', paddingTop: '10px'}}>
                                <NavLink
                                    style = {{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}
                                    exact to = {'/chatpage/conversation?' + iLId}>{conversant + numunread}
                                </NavLink>
                            </li>
                })}
            </div>
            <div style = {{textAlign: 'left', paddingLeft: '12px'}}>
                <button id='first' className='btn_nopad' onClick={this.paginationButtonClick}>PRVA</button>
                <button id='previous' className='btn_nopad' onClick={this.paginationButtonClick}>&#60;&#60;</button>
                <button id='current' className='btn_nopad'>{this.state.page}/{this.state.numPages}</button>
                <button id='next' className='btn_nopad' onClick={this.paginationButtonClick}>&#62;&#62;</button>
                <button id='last' className='btn_nopad' onClick={this.paginationButtonClick}>ZADNJA</button>
            </div>
        </>)
    }

    render() {
        return (
            <div className="App">
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

export default connect(mapStateToProps) (ChatPage)