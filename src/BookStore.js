import React from 'react'
import BookTable from './BookTable/BookTable'
import Home from './Home/Home'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './User/Login'
import Register from './User/Register'
import BookList from './BookList/BookList'
import BookDetail from './BookList/BookDetail'
import MyNavBar from './MyNavBar/MyNavBar'
import Cart from './Cart/Cart'
import CheckOrder from './CheckOrder/CheckOrder'
import Usermanagement from './Admin/UserManagement'

class BookStore extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            login:true,
            permission:"admin",
            account:"zzbslayer",
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
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
        return (
            <div className="BookStore">
            <Router>
                <div>
                <MyNavBar login={this.state.login} permission={this.state.permission} account={this.state.account}/>
            <Route exact path="/books" component={BookList}/>
            <Route path="/books/:id" component={BookDetail}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/booktable" component={BookTable}/>
            <Route path="/usermanagement" component={Usermanagement}/>
            <Route path="/buy" component={CheckOrder}/>
            <Route exact path="/" component={Home}/>
            <Route path="/cart" component={Cart}/>
            </div>
            </Router>
            </div>
        )
    }
}
export default BookStore