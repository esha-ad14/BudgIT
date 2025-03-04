import React, {useState, useEffect} from 'react';
import {FaBars} from 'react-icons/fa'
import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink} from './NavbarElements'
import {animateScroll as scroll} from 'react-scroll';
import { IconContext } from 'react-icons/lib';

const Navbar = ({toggle}) => {
    const  [scrollNav, setScrollNav] = useState (false)
    const changeNav = () => {
        if(window.scrollY >= 80){
            setScrollNav(true)
        }
        else {
            setScrollNav(false)
        }
    }

    useEffect(() =>{
        window.addEventListener('scroll', changeNav)
    }, [])

    const toggleHome = () => {scroll.scrollToTop();};
    return (
     <>
     <IconContext.Provider value={{ color: '#fff'}}>
      <Nav scrollNav = {scrollNav}>
        <NavbarContainer>
            <NavLogo to='/' onClick={toggleHome}>BudgIt</NavLogo>
            <MobileIcon onClick={toggle}>
                <FaBars />
            </MobileIcon>
            <NavMenu>
                <NavItem>
                    <NavLinks to='about'
                    smooth={true} duration={500} spy={true} exact='true' offset={-80}
                    >About</NavLinks>
                </NavItem>
                <NavItem>
                    <NavLinks to='services'
                    smooth={true} duration={500} spy={true} exact='true' offset={-80}
                    >Services</NavLinks>
                </NavItem>
                <NavItem>
                    <NavLinks to='careers'
                    smooth={true} duration={500} spy={true} exact='true' offset={-80}
                    >Careers</NavLinks>
                </NavItem>
                <NavItem>
                    <NavLinks to='signup'
                    smooth={true} duration={500} spy={true} exact='true' offset={-80}
                    >Sign Up</NavLinks>
                </NavItem>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to='/signin'> Sign In </NavBtnLink>
            </NavBtn>
        </NavbarContainer>
      </Nav>
      </IconContext.Provider>
     </>
    );
};

export default Navbar;
