import React, {Component} from 'react'
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact'

class MyNavBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            account: this.props.account,
            login: this.props.login,
            permission: this.props.permission,
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false,
        }
    }
    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    
    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    render(){
        if (this.state.login===false){
            return(
                <div>
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand href="/">
                        <strong>BookStore</strong>
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav className="ml-auto">
                        <NavItem active>
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/books">Books List</NavLink>
                        </NavItem>
                        <NavItem>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle nav caret>Category</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="/books/campous">Campous</DropdownItem>
                                <DropdownItem href="/books/love">Love</DropdownItem>
                                <DropdownItem href="/books/history">History</DropdownItem>
                                <DropdownItem href="/books/horor">Horor</DropdownItem>
                                <DropdownItem href="/books/scientific">Scientific</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                        <NavItem style={{width:95}}>
                            <NavLink className="nav-link" to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i>Log in</NavLink>
                        </NavItem>
                        <NavItem style={{width:95}}>
                            <NavLink className="nav-link" to="/register"><i className="fa fa-user-plus" aria-hidden="true"></i>Sign up</NavLink>
                        </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
                </div>
            );
        }
        else if (this.state.permission==="admin"){
            return(
                <div>
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand href="/">
                        <strong>BookStore</strong>
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav className="ml-auto">
                        <NavItem active>
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/books">Books List</NavLink>
                        </NavItem>
                        <NavItem>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle nav caret>Category</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="/books/campous">Campous</DropdownItem>
                                <DropdownItem href="/books/love">Love</DropdownItem>
                                <DropdownItem href="/books/history">History</DropdownItem>
                                <DropdownItem href="/books/horor">Horor</DropdownItem>
                                <DropdownItem href="/books/scientific">Scientific</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                        <NavItem>
                            <NavLink className="nav-link" to="/admin">Backstage</NavLink>
                        </NavItem>
                        <NavItem style={{width:95}}>
                            <NavLink className="nav-link" to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i>My Cart</NavLink>
                        </NavItem>
                        <NavItem style={{width:120}}>
                            <NavLink className="nav-link" to="/profile"><i className="fa fa-user-circle" aria-hidden="true"></i>{this.state.account}</NavLink>
                        </NavItem>
                        <NavItem style={{width:95}}>
                            <NavLink className="nav-link" to="/setting"><i className="fa fa-gear" aria-hidden="true"></i>Setting</NavLink>
                        </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
                </div>
            );
        }
        else {
            return(
                <div>
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand href="/">
                        <strong>BookStore</strong>
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav className="ml-auto">
                        <NavItem active>
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/books">Books List</NavLink>
                        </NavItem>
                        <NavItem>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle nav caret>Category</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="/books/campous">Campous</DropdownItem>
                                <DropdownItem href="/books/love">Love</DropdownItem>
                                <DropdownItem href="/books/history">History</DropdownItem>
                                <DropdownItem href="/books/horor">Horor</DropdownItem>
                                <DropdownItem href="/books/scientific">Scientific</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                        <NavItem style={{width:95}}>
                            <NavLink className="nav-link" to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i>My Cart</NavLink>
                        </NavItem>
                        <NavItem style={{width:120}}>
                            <NavLink className="nav-link" to="/profile"><i className="fa fa-user-circle" aria-hidden="true"></i>{this.state.account}</NavLink>
                        </NavItem>
                        <NavItem style={{width:95}}>
                            <NavLink className="nav-link" to="/setting"><i className="fa fa-gear" aria-hidden="true"></i>Setting</NavLink>
                        </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
                </div>
            );
        }
    }
}
export default MyNavBar