import React from 'react'
import BookTable from './Admin/BookTable/BookTable'
import Home from './Home/Home'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './User/Login'
import Register from './User/Register'
import BookList from './BookList/BookList'
import BookDetail from './BookList/BookDetail'
import MyNavBar from './MyNavBar/MyNavBar'
import Cart from './Cart/Cart'
import CheckOrder from './CheckOrder/CheckOrder'
import Usermanagement from './Admin/UserManagement/UserManagement'
import Order from './Order/Order'
import Profile from './Profile/Profile'
import Cookies from 'universal-cookie'

const proxy = "http://localhost:8080"

const cookies = new Cookies();

class BookStore extends React.Component{
    constructor(props){
        super(props)
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

    handleLogin = (username,role) => {
        cookies.set("login",true,{path : '/'})
        cookies.set("role",role,{path : '/'})
        cookies.set("username",username,{path : '/'})
        this.setState({username: username,
                        role:role,
                        login:true,
        })
        window.location.href = "/";
    }

    handleLogout = () => {
        fetch("http://localhost:8080/logout",{
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
    render(){
        let login = this.state.login
        let role = this.state.role
        let username = this.state.username
        return (
            <div className="BookStore">
            <Router>
            <div>
            <MyNavBar login={login} role={role} username={username} handleLogout={this.handleLogout}/>
            <Route exact path="/bookid/:id" component={BookDetail}/>
            <Route exact path="/books" component={BookList}/>

            <Route exact path="/books/:action/:msg" component={BookList}/>


            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" render={ (props) => <Login handleLogin={this.handleLogin} {...props}/> }/>

            <Route exact path="/order" component={Order}/>
            <Route exact path="/profile" component={Profile}/>

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