import React from 'react'
import Home from './Home/Home'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './Login/Login'
import Register from './Login/Register'
import BookList from './BookList/BookList'
import MyNavBar from './MyNavBar/MyNavBar'
import CheckOrder from './CheckOrder/CheckOrder'

import Usermanagement from './Admin/UserManagement/UserManagement'
import BookTable from './Admin/BookTable/BookTable'

import Cart from './User/Cart/Cart'
import Order from './User/Order/Order'
import Profile from './User/Profile/Profile'
import Cookies from 'universal-cookie'
import {proxy} from './Global'

const cookies = new Cookies();

class BookStore extends React.Component{
    constructor(props){
        super(props)
        this.fetchAvatar()
        if (cookies.get('JSESSIONID')==='null'){
            cookies.remove("login")
            cookies.remove("username")
            cookies.remove("role")
        }

        this.state = {
            login: cookies.get('login'),
            role: cookies.get('role'),
            username: cookies.get('username'),
        }
        
    }

    

    handleLogin = (username, role, avatar) => {
        cookies.set("login",true,{path : '/'})
        cookies.set("role",role,{path : '/'})
        cookies.set("username",username,{path : '/'})
        this.setState({username: username,
                        role:role,
                        avatar:avatar,
                        login:true,
        })
        //window.location.href = "/";
    }

    handleLogout = () => {
        fetch(proxy + "/logout",{
            method: 'get',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
                login: 'null',
                username: 'null',
                role: 'null'
            });
            cookies.remove("JSESSIONID")
            cookies.remove("login")
            cookies.remove("username")
            cookies.remove("role")
            window.location.href = "/";
        },
        (error) => {
            console.log("Logout error:")
            }
        )
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

    fetchAvatar = () => {
        fetch(proxy+"/user/profile",{
            method: 'get',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({avatar:result.avatar})
        },
        (error) => {
            console.log("Avatar error:")
            }
        )
    }

    render(){
        let login = this.state.login
        let role = this.state.role
        let username = this.state.username
        let avatar = this.state.avatar
        return (
            <div className="BookStore">
            <Router>
            <div>
            <MyNavBar login={login} role={role} username={username} avatar={avatar} handleLogout={this.handleLogout}/>
            <Route exact path="/books" component={BookList}/>

            <Route exact path="/books/:action/:msg" component={BookList}/>


            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" render={ (props) => <Login handleLogin={this.handleLogin} {...props}/> }/>

            <Route exact path="/order" component={Order}/>
        <Route exact path="/user/:action" render={(props) => <Profile username={username} {...props}/>}/>

            <Route exact path="/booktable" component={BookTable}/>
            <Route exact path="/usermanagement" component={Usermanagement}/>

            <Route exact path="/buy" component={CheckOrder}/>
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/" component={Home}/>
            </div>
            </Router>
            </div>
        )
    }
}
export default BookStore