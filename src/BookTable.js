import React from 'react';
import { Table } from 'react-bootstrap';
import Book from './Book'
import BookForm from './BookForm'
import SearchBar from './SearchBar'

class BookTable extends React.Component{
    constructor(props){
        super(props);
        this.deleteBook = this.deleteBook.bind(this);
        this.addBook = this.addBook.bind(this);
        this.state={
            books:[
                {id:0, bookname:"Watashi ga Motenai no wa Dō Kangaete mo Omaera ga Warui", author:"Nico Tanigawa", language:"Japanese", price:"65.00", year:"2013"},
                {id:1, bookname:"Inu to Hasami wa Tsukaiyō", author:"Shunsuke Sarai Tetsuhiro Nabeshima", language:"Japanese", price:"50.00", year:"2011"},
                {id:2, bookname:"Wiedźmin", author:"Andrzej Sapkowski", language:"Polish", price:"211.00", year:"1993"}
            ],
            num:3
        }
    }

    addBook(book){
        let books = this.state.books;
        let num = this.state.num + 1;
        books.push(book);
        this.setState({books:books, num:num});
    }
    deleteBook(id){
        let books = this.state.books;
        for (let i in books){
            if (books[i].id===id)
                books.splice(i,1);
        }
        this.setState({books:books});
    }

    render(){
        let books = this.state.books;
        let num = this.state.num
        return (
            <div className="BookTable">
            <BookForm ref="BookForm" num ={num} addBook={this.addBook}/>
            <hr/>
            <Table striped condensed hover id="bookTable">
            <thead>
                <tr>
                    <th>Bookname</th>  
                    <th>Author</th>
                    <th>Language</th>
                    <th>Price</th>
                    <th>Year</th>  
                </tr>
            </thead>
            <tbody>
                {
                    books.map( (book) => {
                        return <Book key={book.id} id={book.id} book={book} deleteBook={this.deleteBook}/>
                    },this
                )
                }
            </tbody>
            </Table>
            </div>
        )
    }
}
export default BookTable