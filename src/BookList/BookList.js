import React, { Component } from 'react';
import Book from './Book'
import Icon from '../Icon'
import { ListGroup, ListGroupItem } from 'mdbreact'
import SearchBar from './SearchBar'


let bookid = []
let categories = ["Action","Comedy","Fantasy","Harem","Kuuki Kei"]

class BookList extends Component{
    constructor(props){
        super(props)
        this.initMsg()
        this.state={
            books:null,
        }
    }

    initMsg = () => {
        let action = this.props.match.params.action
        let msg = this.props.match.params.msg
        if (action==="search"){
            this.fetchVagueBooks(msg)
        }
        else if (!action && !msg){
            this.fetchAllBooks()
        }
        else if (action==="category"){
            this.fetchBooksByCategory(msg)
        }

    }

    fetchBooksByCategory = (msg) => {
        fetch("http://localhost:8080/api/categories/category/"+msg,{
            method: 'get',
            credentials: 'include',
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({books: result})
        },
        (error) => {
            console.log("Search error:")
            }
        )
    }

    searchBooks = (searchInfo) => {
        fetch("http://localhost:8080/api/books/search", {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: searchInfo
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.props.match.params.action = "search"
            this.setState({books: result})
        },
        (error) => {
            console.log("Search error:")
            }
        )
    }

    fetchAllBooks = () => {
        fetch("http://localhost:8080/api/books",{
            credentials: 'include',
            method: 'get',
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({books: result})
            },
            (error) => {
                console.log("fetchAllBooks() error:")
            }
        )
    }

    fetchVagueBooks = (msg) => {
        fetch("http://localhost:8080/api/books/vague/" + msg,{
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
                this.setState({books: result})
            }
        )
    }

    render(){
        let books = this.state.books
        let action = this.props.match.params.action
        let msg = this.props.match.params.msg

        if (books!==null && books.length!==0){
            return(
                <div className="booklist">
                    <Icon/>
                    <hr/>
                    <div>
                    <SearchBar searchBooks={this.searchBooks}/>
                    <div className="row">
                       <div className= "col-2">
                        <ListGroup>
                        <ListGroupItem href="/books" active={ action==="search" || !action}>Book List</ListGroupItem>
                        {
                            categories.map((cate,index)=>{
                                return <ListGroupItem key={index} href={"/books/category/"+cate} active={action==="category"&&msg===cate}>{cate}</ListGroupItem>
                            })
                        }
                        </ListGroup>
                        </div>
                        <div className="col-10">
                        {    
                            books.map( (book,index) => {
                                return <Book key={book.bookid} id={book.bookid} href={'/bookid/'+book.bookid} bookname={book.bookname} imgsrc={book.imgsrc} price={book.price}/>
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
                <SearchBar searchBooks={this.searchBooks}/>
                <div className="row">
                   <div className= "col-2">
                   <ListGroup>
                        <ListGroupItem href="/books" active={ action==="search" || !action}>Book List</ListGroupItem>
                        {
                            categories.map((cate,index)=>{
                                return <ListGroupItem key={index} href={"/books/category/"+cate} active={action==="category"&&msg===cate}>{cate}</ListGroupItem>
                            })
                        }
                        </ListGroup>
                    </div>
                    <div className= "col-8">
                        <h3>No Books Found</h3>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
export default BookList