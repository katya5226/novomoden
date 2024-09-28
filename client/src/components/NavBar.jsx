import React from 'react';
import { NavLink} from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import '../App.css';
import * as Constants from '../constants';


class NavBar extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            searchFor: ''
		};
    }

    womanPaths = () => {
        return Constants.women.slice(1).map((category) => <li key = {category.value}><NavLink to={'/listings/women/' + category.value}>{category.label}</NavLink></li>);   
    }
    manPaths = () => {
        return Constants.men.slice(1).map((category) => <li key = {category.value}><NavLink to={'/listings/men/' + category.value}>{category.label}</NavLink></li>);   
    }
    kidPaths = () => {
        return Constants.kids.slice(1).map((category) => <li key = {category.value}><NavLink to={'/listings/kids/' + category.value}>{category.label}</NavLink></li>);   
    }

    onSearchChange = (e) => {
        this.setState({searchFor: e.target.value})
    }

    onSearchClick = () => {
        const path = window.location.href;
        if(path.includes('searchresults')) {
            this.props.callBackParent(this.state.searchFor);
            window.location.href = `?${this.state.searchFor}`;
        }
        else {
            window.location.href = `/searchresults?${this.state.searchFor}`;
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
           this.onSearchClick();
        }
    }

    render() {

        const searchBtnStyle = {
            color: 'black',
            height: '100%',
            minWidth: '50px',
            backgroundColor: 'rgb(255, 255, 255, 0)',
            borderRadius: '0',
            margin: '0px',
            padding: '0px',
            verticalAlign: 'middle',
            border: 'none',
            cursor: 'pointer'
        }
        
        const searchStyle = {
            width: '200px',
            height: '100%',
            border: 'none',
            backgroundColor: 'rgb(255, 255, 255, 0)',
            borderRadius: '0',
            margin: '0px',
            display: 'inline-block'
        }

        return(
            <nav id="nav">
                <ul id="navigation">
                    <li><NavLink  exact to="/" className="first" activeStyle={{background: "#525050"}}>DOMOV</NavLink></li>
                    <li><NavLink to="/listings/women" activeStyle={{background: "#525050"}}>ŽENSKE</NavLink>
                        <ul>
                            {this.womanPaths()}
                        </ul>
                    </li>
                    <li><NavLink to="/listings/men" activeStyle={{background: "#525050"}}>MOŠKI</NavLink>
                        <ul>
                            {this.manPaths()}
                        </ul>
                    </li>
                    <li><NavLink to="/listings/kids" activeStyle={{background: "#525050"}}>OTROCI</NavLink>
                        <ul>
                            {this.kidPaths()}
                        </ul>
                    </li>
                    <li>
                        <input
                            style = {searchStyle}
                            type="text"
                            name="search"
                            value={this.state.searchFor}
                            placeholder="Išči ..."
                            onChange = {this.onSearchChange}
                            onKeyDown={this.handleKeyDown}>
                        </input>
                    </li>
                    <NavLink exact to = {'/searchresults?' + this.state.searchFor} style = {searchBtnStyle} onClick = {this.onSearchClick}>
                        <IoMdSearch size = '2em'/>
                    </NavLink>
                </ul>
            </nav>
        )

    }
}

export default NavBar
