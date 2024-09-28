import React from 'react';
import { NavLink as Link} from 'react-router-dom';
import '../App.css';

const Bottom = () => {
    return(
        <div className="ContactDiv-container">
        <ul>
            <li>
                <ul>
                    <li style={{textDecoration: "underline"}}>KUPI/PRODAJ</li>
                    <li><Link exact to="/buying" className="Link">Nakupovanje</Link></li>
                    <li><Link exact to="/selling" className="Link">Prodaja</Link></li>
                    <li><Link exact to="/posting" className="Link">Pošiljanje</Link></li>
                    {/* <li><Link exact to="/protection" className="Link">Zaščita</Link></li> */}
                    <li><Link exact to="/commission" className="Link">Provizija</Link></li>
                </ul>
            </li>
            <li>
                <ul>
                    <li style={{textDecoration: "underline"}}>O NOVOMODEN.SI</li>
                    <li><Link exact to="/idcard" className="Link">Vizitka</Link></li>
                    <li><Link exact to="/advertising" className="Link">Oglaševanje</Link></li>
                    <li><Link exact to="/privacy" className="Link">Politika zasebnosti</Link></li>
                    <li><Link exact to="/cookies" className="Link">Piškotki</Link></li>
                </ul>
            </li>
            <li>
                <ul>
                    <li style={{textDecoration: "underline"}}>PODPORA</li>
                    <li><Link exact to="/contentsupport" className="Link">Vsebinska podpora</Link></li>
                    <li><Link exact to="/technicalsupport" className="Link">Tehnična podpora</Link></li>
                </ul>
            </li>
        </ul>
    </div>
    )
}
 export default Bottom;