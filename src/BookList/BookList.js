import React, { Component } from 'react';
import Book from './Book'
import Icon from '../Icon'

let bookid = []

class BookList extends Component{
    constructor(props){
        super(props)
        this.state={
            error:null,
            books:null,
            bookimages:null,
        }
    }

    componentWillMount = () =>{
        let msg = this.props.match.params.msg
        if (msg!=null){
            this.fetchVagueBooks(msg)
        }
    }

    fetchBookImages = (bookid) => {
        fetch("http://localhost:8080/api/bookimages/bookid/"+JSON.stringify(bookid),{
            credentials: 'include',
            method: 'get',
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("bookimages fetched:")
                console.log(result)
                this.setState({bookimages: result})
            }
        )
    }

    fetchVagueBooks = (msg) => {
        fetch("http://localhost:8080/api/books/" + msg,{
            credentials: 'include',
            method: 'get',
        })
        .then(res => res.json())
        .then(
            (result) => {
                bookid = []
                result.map((book)=>{
                    bookid.push(book.bookid)
                })
                this.fetchBookImages(bookid)
                this.setState({books: result})
            }
        )
    }

    render(){
        let books = this.state.books
        let bookimages = this.state.bookimages

        if (books!==null && bookimages!==null){
            return(
                <div className="booklist">
                <Icon/>
                <hr/>
                    {    
                        books.map( (book,index) => {
                            return <Book key={book.bookid} id={book.bookid} href={'books/'+book.bookid} bookname={book.bookname} imgsrc={bookimages[index].imgsrc} price={book.price}/>
                        },this
                    )
                    }
                </div>
            );
        }
        else
            return (<div className="middle">No books found</div>)
    }
}
export default BookList