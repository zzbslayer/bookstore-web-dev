import React, { Component } from 'react';
import Book from './Book'
import Icon from '../Icon'

let data = [
    {id:0, bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00},
    {id:1, bookname:"Inu to Hasami wa Tsukaiyō", href:"/books/1", imgsrc:"https://images-cn.ssl-images-amazon.com/images/I/51caLYMFqhL._SX337_BO1,204,203,200_.jpg",price:21.30},
    {id:3, bookname:"Ore no Kanojo to Osananajimi ga Shyuraba Sugiru", href:"/books/3", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51I6rw416jL._AC_US320_FMwebp_QL65_.jpg",price:55.60},
    {id:4, bookname:"The Devil is a Part-Timer!", href:"/books/4", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51n+hrNYTYL._AC_US436_QL65_.jpg",price:71.00},
    {id:5, bookname:"Overlord", href:"/books/5", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51VUcYynY+L._AC_SR320,436_QL65_.jpg",price:74.00},
    {id:6, bookname:"A Certain Magical Index", href:"/books/6", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51MPxZvR5hL._AC_US436_QL65_.jpg",price:30.00},
    {id:7, bookname:"A Certain Scientific Railgun", href:"/books/7", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/512eq6LtkWL._AC_US436_FMwebp_QL65_.jpg",price:30.00},
]

class BookList extends Component{
    render(){
        let books = data
        return(
            <div class="booklist">
            <Icon/>
            <hr/>
                {
                    books.map( (book) => {
                        return <Book key={book.id} id={book.id} href={book.href} bookname={book.bookname} imgsrc={book.imgsrc} price={book.price}/>
                    },this
                )
                }
            </div>
        );
    }
}
export default BookList