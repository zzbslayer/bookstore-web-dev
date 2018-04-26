import React from 'react';
import BookRow from './BookRow'
import BookForm from './BookForm'
import SearchBar from './SearchBar'
import SortInfo from './SortInfo'
import ExportData from './ExportData'
import Icon from '../../Icon';
import { proxy } from '../../Global'
import { message } from 'antd'

let result = []

class BookTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            books:[],
            sortInfo:{sort:"bookname",order:"ascend"},
        }
        this.initMsg()
    }

    initMsg =() => {
        fetch(proxy+"/books/all",{
            credentials: 'include',
            method:'get'
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
                books: result,
            });
        },
        (error) => {
            message.error("Netword Error")
            }
        )
    }

    sortBooks = (sortInfo) => {
        this.setState({sortInfo:sortInfo})
        if (sortInfo.sort && sortInfo.order){
            result = this.quickSort(this.state.books, sortInfo.sort, sortInfo.order);
            this.setState({books:result})
        }
    }

    quickSortAscend = (arr, attr) =>{
        if(arr.length<=1){return arr;}
        let pivotIndex = Math.floor(arr.length / 2);
        let pivot = arr.splice(pivotIndex,1)[0];
        let left = [];
        let right = [];

        for(var i=0;i<arr.length;i++){
            if(arr[i][attr]<pivot[attr]){
                left.push(arr[i]);
            }
            else{
                right.push(arr[i]);
            }
        }
        return this.quickSortAscend(left, attr).concat([pivot],this.quickSortAscend(right, attr));
    }

    quickSort = (arr, attr, order) => {
        if (order === 'ascend')
            return this.quickSortAscend(arr,attr);
        else if (order === 'descend')
            return this.quickSortAscend(arr, attr).reverse();
        message.error("Wrong order : "+order);
        return null;
    }

    
    addBook = (book) => {
        let data = this.state.books

        let msg = "bookname="+ encodeURIComponent(book.bookname) +
                "&author="+encodeURIComponent(book.author) +
                "&lang="+encodeURIComponent(book.lang)+
                "&price="+encodeURIComponent(book.price)+
                "&year="+encodeURIComponent(book.year)+
                "&count="+encodeURIComponent(book.count)+
                "&imgsrc="+encodeURIComponent(book.imgsrc)

        fetch(proxy+"/admin/books/save", {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: msg
        })
        .then(res => res.json())
        .then(
        (result) => {
            data.push(result);
            message.success("Add Success")
            this.setState({books:data});
        },
        (error) => {
            message.error("Add Book Error:\n"+error)
            }
        )
    }

    deleteBook = (bookid) => {
        fetch(proxy+"/admin/books/delete", {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: "bookid="+encodeURIComponent(bookid)
        })
        let data = this.state.books
        for (let i in data){
            if (data[i].bookid===bookid){
                data.splice(i,1);
                break;
            }
        }
        message.success("Delete Success")
        this.setState({books:data});
    }

    searchBooks = (searchInfo) => {
        fetch(proxy+"/books/search", {
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
            this.setState({books: result})
        },
        (error) => {
            message.error("Search error:"+error)
            }
        )
    }

    render = () => {
        let books = this.state.books;
        return (
            <div className="big-container">
            <Icon/>
            <div className="FunctionalityBar">
            <SearchBar searchBooks={this.searchBooks}/>  
            <BookForm ref="BookForm" addBook={this.addBook}/>
            <table>
            <tbody>
                <tr>
                    <td>
                        <SortInfo sortBooks={this.sortBooks}/>
                    </td> 
                    <td>
                        <ExportData data={books}/>
                    </td> 
                </tr>
            </tbody>
            </table>
            </div>
            <hr/>
            <table className="table table-striped table-sm">
            <thead>
                <tr>
                    <th>Bookname
                    </th>  
                    <th/>
                    <th>Author
                    </th>
                    <th>Language
                    </th>
                    <th>Price
                    </th>
                    <th>Year
                    </th> 
                    <th>Inventory
                    </th> 
                </tr>
            </thead>
            <tbody>
                {
                    books===null?<tr/>:
                    books.map( (book) => {
                        return <BookRow key={book.bookid} book={book} deleteBook={this.deleteBook}/>
                    })
                }
            </tbody>
            </table>
            </div>
        )
    }
}
export default BookTable