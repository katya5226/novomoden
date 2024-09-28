import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class SumForSeller extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            fetching: true,
            available: true
        };

    }

    abortController = new AbortController();

    handleClickProceed = () => {
        fetch('/api/sessionorder', {
            signal: this.abortController.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                type: 1,
                ids: this.props.ids
            })
        }).then(res => res.json())
        .then((res) => {if(res.available === '0') {this.setState({fetching: false, available: false}, () => console.log(this.state))}
                        else {this.setState({fetching: false}, () => console.log(this.state))}})
        .catch(e => console.error("Critical failure: " + e.message));
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        const weight = this.props.sum.weight;
        const price = this.props.sum.price;
        let postage = weight < 100 ? 2 : 3;
    
        if(!this.state.fetching && this.state.available) {
            return <Redirect to = '/shoppingcart/placeorder'></Redirect>
        }
        else if(!this.state.available) {
            return (
            <div style = {{backgroundColor: 'rgb(255,255,255,0.8)', padding: '10px', margin: '0 auto', borderBottom: '10px solid black', borderTop: '2px dotted black'}}>
                <h3>OPROSTITE, EDEN ALI VEČ IZDELKOV NI VEČ NA VOLJO</h3>
            </div>
            )
        }
        else return (
            <div style = {{backgroundColor: 'rgb(255,255,255,0.8)', padding: '10px', margin: '0 auto', borderBottom: '10px solid black', borderTop: '2px dotted black'}}>
                <h3>Cena: {price} €</h3>
                <h4>Poštnina: {postage} €</h4>
                <h3>Skupaj: {price + postage} €</h3>
                <button className = 'btnb' onClick = {this.handleClickProceed}>NADALJUJ NA PLAČILO</button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loggedInUser: state.loggedInUser,
        loggedInUserId: state.loggedInUserId,
        order: state.order //TEGA V BISTVU NE RABIM
    };
  };
  
export default connect(mapStateToProps) (SumForSeller);