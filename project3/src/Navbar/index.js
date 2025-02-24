import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from "./Navbar";


const Navbar = () => {
    return (
        <>
           <Nav>
            <Bars />
            <NavMenu>
                <NavLink to="/Home" activeStyle>
                    Home
                </NavLink>
                <NavLink to="/About" activeStyle>
                    About
                </NavLink>
                <NavLink to="/ourservices" activeStyle>
                    Our Services
                </NavLink>
                <NavLink to="/careers" activeStyle>
                    Careers
                </NavLink>
                <NavLink to="/Contact" activeStyle>
                    Contact
                </NavLink>
                <NavLink to ="/Login" activeStyle>
                    Login
                </NavLink>
                <NavLink to ="/InfoPrompt" activeStyle>
                    InfoPrompt
                </NavLink>
            </NavMenu>
           </Nav>
        </>
    );
};
export default Navbar;
