import React from 'react';
import { NavLink } from 'react-router-dom';

class SideNavBar extends React.Component {

    render() {

        return(
            <nav className="sidenav">
                <ul id="categoryNav">
                    <li><NavLink  exact to="/" className="first" activeStyle={{background: "#525050"}}>DOMOV</NavLink></li>
                    <li><NavLink to="/listings?zensko" activeStyle={{background: "#525050"}}>ŽENSKA OBLAČILA</NavLink>
                        <ul>
                            <li><NavLink to="/listings?zensko-obleke">Obleke</NavLink></li>
                            <li><NavLink to="/listings?zensko-oblekezaposebnepriloznosti">Obleke za posebne priložnosti</NavLink></li>
                            <li><NavLink to="/listings?kompleti">Kompleti</NavLink></li>
                        </ul>
                    </li>
                    <li><NavLink to="/listings?mosko" activeStyle={{background: "#525050"}}>MOŠKA OBLAČILA</NavLink>
                        <ul>
                        <li><NavLink to="/listings?mosko-obleke">Obleke</NavLink></li>
                            <li><NavLink to="/listings?mosko-oblekezaposebnepriloznosti">Obleke za posebne priložnosti</NavLink></li>
                            <li><NavLink to="/listings?mosko-kompleti">Kompleti</NavLink></li>
                        </ul>
                    </li>
                    <li><NavLink to="/listings?otrosko" activeStyle={{background: "#525050"}}>OTROŠKA OBLAČILA</NavLink>
                        <ul>
                            <li><NavLink to="/listings?otrosko-0-9">0 do 9 mesecev</NavLink></li>
                            <li><NavLink to="/listings?otrosko-1-2">1 do 2 leti</NavLink></li>
                            <li><NavLink to="/listings?otrosko-deklice3-6">Deklice 3 do 6 let</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        )

    }

}


export default SideNavBar;