import React from 'react';
import BookRow from './BookRow'
import BookForm from './BookForm'
import SearchBar from './SearchBar'
import SortInfo from './SortInfo'
import ExportData from './ExportData'
import Icon from '../../Icon';

let result = []

class BookTable extends React.Component{
    constructor(props){
        super(props)
        
        this.initMsg()
        this.state={
            books:[],
            sortInfo:{sort:"bookname",order:"ascend"},
            num:8
        }
    }

    initMsg =() => {
        fetch("http://localhost:8080/api/books",{
            credentials: 'include',
            method:'get'
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
                books: result
            });
            console.log(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            this.setState({
                error
            });
            }
        )
    }

    sortBooks = (sortInfo) => {
        this.setState({sortInfo:sortInfo})
        if (sortInfo.sort && sortInfo.order){
            result = this.quickSort(this.state.books, sortInfo.sort, sortInfo.order);
            console.log(result)
            this.setState({books:result})
        }
    }

    searchBook = (condition) => {
        result = []
        let data = this.state.books
        for (let i in data){
            let book = data[i]
            if (book.bookname.toLowerCase().includes(condition.bookname.toLowerCase()) && book.author.toLowerCase().includes(condition.author.toLowerCase()) && book.language.toLowerCase().includes(condition.language.toLowerCase()))
                result.push(book)
        }
        this.setState({books:result})
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
        console.log("Wrong order : "+order);
        return null;
    }

    /*
    addBook = (book) => {
        data.push(book);
        this.setState({books:data, num:this.state.num+1});
    }*/

    deleteBook = (id) => {
        let data = this.state.books
        for (let i in data){
            if (data[i].id===id){
                data.splice(i,1);
                break;
            }
        }
        this.setState({books:data});
    }

    render = () => {
        let books = this.state.books;
        let num = this.state.num;
        console.log("render:")
        console.log(books)
        return (
            <div className="big-container">
            <Icon/>
            <div className="FunctionalityBar">
            <table>
            <tbody>
                <tr>
                    <td>
                        <BookForm ref="BookForm" num ={num} addBook={this.addBook}/>
                    </td>
                    <td>
                        <SortInfo sortBooks={this.sortBooks}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <SearchBar searchBook={this.searchBook}/>  
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
                    <th>Author
                    </th>
                    <th>Language
                    </th>
                    <th>Price
                    </th>
                    <th>Year
                    </th>  
                </tr>
            </thead>
            <tbody>
                {
                    books.map( (book) => {
                        return <BookRow key={book.bookid} id={book.bookid} book={book} deleteBook={this.deleteBook}/>
                    },this
                )
                }
            </tbody>
            </table>
            </div>
        )
    }
}
export default BookTable