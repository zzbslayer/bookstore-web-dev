import React, { Component } from 'react';
import Book from './Book'
import Icon from '../Icon'
import { ListGroup, ListGroupItem } from 'mdbreact'


let bookid = []

class BookList extends Component{
    constructor(props){
        super(props)
        this.initMsg()
        this.state={
            books:null,
            bookimages:null,
        }
    }

    initMsg = () => {
        let action = this.props.match.params.action
        let msg = this.props.match.params.msg
        console.log(action)
        console.log(msg)
        console.log(!action)
        console.log(!msg)
        if (action==="search"){
            this.fetchVagueBooks(msg)
        }
        else if (!action && !msg){
            this.fetchAllBooks()
        }
        //else (action==="category")

    }

    componentWillMount = () =>{
        
    }

    fetchAllBooks = () => {
        fetch("http://localhost:8080/api/books",{
            credentials: 'include',
            method: 'get',
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("books fetched:")
                console.log(result)
                this.fetchAllBookImages()
                this.setState({books: result})
            }
        )
    }

    fetchAllBookImages = () => {
        fetch("http://localhost:8080/api/bookimages")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("bookimages fetched:")
                console.log(result)
                this.setState({bookimages: result})
            }
        )
    }

    fetchBookImages = (bookid) => {
        fetch("http://localhost:8080/api/bookimages/bookids/"+JSON.stringify(bookid),{
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
        let action = this.props.match.params.action
        let msg = this.props.match.params.msg

        if (books!==null && bookimages!==null){
            return(
                <div className="booklist">
                    <Icon/>
                    <hr/>
                    <div>
                    <div className="row">
                       <div className= "col-2">
                        <ListGroup>
                        <ListGroupItem href="/books" active={ action==="search" || !action}>Book List</ListGroupItem>
                        <ListGroupItem href="/books/category/campus" active={ action==="category" && msg==="campus"}>Campus</ListGroupItem>
                        <ListGroupItem href="/books/category/love" active={ action==="category" && msg==="love"}>Love</ListGroupItem>
                        <ListGroupItem href="books/category/scientific" active={ action==="category" && msg==="scientific"}>Scientific</ListGroupItem>
                        </ListGroup>
                        </div>
                        <div className="col-10">
                        {    
                            books.map( (book,index) => {
                                console.log(bookimages[index].imgsrc)
                                return <Book key={book.bookid} id={book.bookid} href={'/bookid/'+book.bookid} bookname={book.bookname} imgsrc={bookimages[index].imgsrc} price={book.price}/>
                            },this
                        )
                        }
                        </div>
                    </div>
                    </div>
                </div>
            );
        }
        else
        return(
            <div className="booklist">
                <Icon/>
                <hr/>
                <div>
                <div className="row">
                   <div className= "col-2">
                    <ListGroup>
                    <ListGroupItem href="/books" active={ action==="search" || !action}>Book List</ListGroupItem>
                    <ListGroupItem href="/books/category/campus" active={ action==="category" && msg==="campus"}>Campus</ListGroupItem>
                    <ListGroupItem href="/books/category/love" active={ action==="category" && msg==="love"}>Love</ListGroupItem>
                    <ListGroupItem href="books/category/scientific" active={ action==="category" && msg==="scientific"}>Scientific</ListGroupItem>
                    </ListGroup>
                    </div>
                    <div>
                        <h3>No Books Found</h3>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
export default BookList