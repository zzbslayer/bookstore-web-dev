import React, { Component } from 'react';
import Book from './Book'
import Icon from '../Icon'

let data = [
    {id:0, bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00},
    {id:1, bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00},
    {id:2, bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00},
    {id:3, bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00},
    {id:4, bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00},
    {id:5, bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00},
    {id:6, bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00},
    {id:7, bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00}
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