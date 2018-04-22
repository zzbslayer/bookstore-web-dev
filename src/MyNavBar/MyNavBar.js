import React, {Component} from 'react'
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact'

let categories = ["Action","Comedy","Fantasy","Harem","Kuuki Kei"]

class MyNavBar extends Component{
    constructor(props){
        super(props)
        this.handleLogout = this.props.handleLogout
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false,

            dropdownOpen2: false,
            dropdownOpen3: false,
        }
    }

    logout = () => {
        this.handleLogout()
    }

    toggle3 = () => {
        this.setState({
            dropdownOpen3: !this.state.dropdownOpen3
        });
    }
    
    toggle2 = () => {
        this.setState({
            dropdownOpen2: !this.state.dropdownOpen2
        });
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
        let login = this.props.login
        let username = this.props.username
        let role = this.props.role
        if (login === 'null' || typeof login === 'undefined'){
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
                                {
                                    categories.map((cate,index)=>{
                                        return <DropdownItem key={index} href={"/books/category/"+cate}>{cate}</DropdownItem>
                                    })
                                }
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
        else if (role.includes('ROLE_ADMIN')){
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
                                {
                                    categories.map((cate,index)=>{
                                        return <DropdownItem key={index} href={"/books/category/"+cate}>{cate}</DropdownItem>
                                    })
                                }
                            </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                        <NavItem style={{width:110}}>
                            <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                            <DropdownToggle nav caret>Backstage</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="/booktable">Booktable</DropdownItem>
                                <DropdownItem href="/usermanagement">UserManagement</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        <NavItem style={{width:120}}>
                            <Dropdown isOpen={this.state.dropdownOpen3} toggle={this.toggle3}>
                            <DropdownToggle nav caret>{username}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="/profile"><i className="fa fa-user-circle" aria-hidden="true"></i>&nbsp;Profile</DropdownItem>
                                <DropdownItem href="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;My Cart</DropdownItem>
                                <DropdownItem href="/order"><i className="fa fa-sticky-note-o" aria-hidden="true"></i>&nbsp;My Order</DropdownItem>
                                <DropdownItem href="#" onClick={this.logout}><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Log Out</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
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
                                {
                                    categories.map((cate,index)=>{
                                        return <DropdownItem key={index} href={"/books/category/"+cate}>{cate}</DropdownItem>
                                    })
                                }
                            </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                        <NavItem style={{width:120}}>
                            <Dropdown isOpen={this.state.dropdownOpen3} toggle={this.toggle3}>
                            <DropdownToggle nav caret>{username}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="/profile"><i className="fa fa-user-circle" aria-hidden="true"></i>&nbsp;Profile</DropdownItem>
                                <DropdownItem href="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;My Cart</DropdownItem>
                                <DropdownItem href="/order"><i className="fa fa-sticky-note-o" aria-hidden="true"></i>&nbsp;My Order</DropdownItem>
                                <DropdownItem href="#" onClick={this.logout}><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Log Out</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
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