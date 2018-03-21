import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class MyNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    }
    
    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    
    render() {
        return (
            <Router>
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand href="/">
                        <strong>BookStore</strong>
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav className="ml-auto">
                        <NavItem active>
                            <NavLink className="nav-link" to="#">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="#">New Books</NavLink>
                        </NavItem>
                        <NavItem>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle nav caret>Category</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="#">Love</DropdownItem>
                                <DropdownItem href="#">History</DropdownItem>
                                <DropdownItem href="#">Horor</DropdownItem>
                                <DropdownItem href="#">Scientific</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                            <form className="form-inline">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                            </form>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
            </Router>
        );
    }
}
export default MyNavbar
