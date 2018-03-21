import React from 'react';
import Book from './Book'
import BookForm from './BookForm'
import SearchBar from './SearchBar'
import SortInfo from './SortInfo'

let data = [
    {id:0, bookname:"Watashi ga Motenai no wa Dō Kangaete mo Omaera ga Warui", author:"Nico Tanigawa", language:"Japanese", price:34.30, year:2013},
    {id:1, bookname:"Inu to Hasami wa Tsukaiyō", author:"Shunsuke Sarai Tetsuhiro Nabeshima", language:"Japanese", price:21.30, year:2011},
    {id:2, bookname:"Wiedźmin", author:"Andrzej Sapkowski", language:"Polish", price:196.00, year:1993},
    {id:3, bookname:"Ore no Kanojo to Osananajimi ga Shyuraba Sugiru", author:"Yūji Yūji", language:"Japanese", price:55.60, year:2011},
    {id:4, bookname:"The Devil is a Part-Timer!", author:"Satoshi Wagahara", language:"Japanese", price:71.00, year:2011},
    {id:5, bookname:"Overlord", author:"Satoshi Ōshio", language:"Janpanese", price:74.00, year:2012},
    {id:6, bookname:"A Certain Magical Index", author:"Kazuma Kamachi", language:"Janpanese", price:30.00, year:2004},
    {id:7, bookname:"A Certain Scientific Railgun", author:"Kazuma Kamachi", language:"Janpanese", price:30.00, year:2007}
]

class BookTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            books:data,
            searchCondition:{},
            sortInfo:{sort:"bookname",order:"ascend"},
            num:8
        }
    }

    sortBooks = (sortInfo) => {
        console.log(sortInfo)
        this.setState({sortInfo:sortInfo})
    }

    searchBook = (condition) => {
        this.setState({searchCondition: condition})
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

    addBook = (book) => {
        data.push(book);
        this.setState({books:data, num:this.state.num+1});
    }

    deleteBook = (id) => {
        for (let i in data){
            if (data[i].id===id){
                data.splice(i,1);
                break;
            }
        }
        this.setState({books:data});
    }

    render(){
        let books = data;
        let num = this.state.num;
        let sortInfo = this.state.sortInfo;
        if (sortInfo.sort && sortInfo.order){
            books = this.quickSort(books, sortInfo.sort, sortInfo.order);
            data = books;
        }

        return (
            <div className="BookTable">
            <div className="Functionality Bar">
            <table>
            <thead>
                <tr>
                    <td>
                        <h2>Add a Book</h2>
                    </td>
                    <td>
                        <h2>Sort Books</h2>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <BookForm ref="BookForm" num ={num} addBook={this.addBook}/>
                    </td>
                    <td>
                        <SortInfo sortBooks={this.sortBooks}/>
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
                        return <Book key={book.id} id={book.id} book={book} deleteBook={this.deleteBook}/>
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