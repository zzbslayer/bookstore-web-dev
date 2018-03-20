import React from 'react';
import BookTable from './BookTable'


class BookStore extends React.Component{
    render(){
        return (
            <div className="BookStore">
            <hr/>
            <h1 className="BookStore" align="center">BookStore</h1>
            <hr/>
            <BookTable/>
            </div>
        )
    }
}
export default BookStore