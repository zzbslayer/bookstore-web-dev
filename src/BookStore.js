import React from 'react';
import BookTable from './BookTable'
import MyNavBar from './NavBar.js'

class BookStore extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            permission:"admin",
        }
    }
    render(){
        return (
            <div className="BookStore">
            <MyNavBar/>
            <div style={{height:50}}/>
            <h1 className="BookStore" align="center">BookStore</h1>
            <hr/>
            <BookTable/>
            </div>
        )
    }
}
export default BookStore