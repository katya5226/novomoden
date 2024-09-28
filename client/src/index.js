import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App.jsx';
import CookieConsent from "react-cookie-consent";


ReactDOM.render(
    <Provider store={store}>
            <App />
            <CookieConsent
                location="bottom"
                buttonText="STRINJAM SE"
                cookieName="basiccookies"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
                overlay>
                Spletna stran uporablja osnovne piškotke za nemoteno delovanje.
                Več o piškotkih si lahko preberete <a href = '/privacy' target='_blank' style = {{color: 'white'}}>tukaj</a>.
            </CookieConsent>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
