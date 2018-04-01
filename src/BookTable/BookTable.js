import React from 'react';
import BookRow from './BookRow'
import BookForm from './BookForm'
import SearchBar from './SearchBar'
import SortInfo from './SortInfo'
import ExportData from './ExportData'
import Icon from '../Icon';

let data = [
    {id:0, bookname:"Wiedźmin", author:"Andrzej Sapkowski", language:"Polish", price:196.00, year:1993},
    {id:1, bookname:"Inu to Hasami wa Tsukaiyō", author:"Shunsuke Sarai Tetsuhiro Nabeshima", language:"Japanese", price:21.30, year:2011},
    {id:2, bookname:"Watashi ga Motenai no wa Dō Kangaete mo Omaera ga Warui", author:"Nico Tanigawa", language:"Japanese", price:34.30, year:2013},
    {id:3, bookname:"Ore no Kanojo to Osananajimi ga Shyuraba Sugiru", author:"Yūji Yūji", language:"Japanese", price:55.60, year:2011},
    {id:4, bookname:"The Devil is a Part-Timer!", author:"Satoshi Wagahara", language:"Japanese", price:71.00, year:2011},
    {id:5, bookname:"Overlord", author:"Satoshi Ōshio", language:"Japanese", price:74.00, year:2012},
    {id:6, bookname:"A Certain Magical Index", author:"Kazuma Kamachi", language:"Japanese", price:30.00, year:2004},
    {id:7, bookname:"A Certain Scientific Railgun", author:"Kazuma Kamachi", language:"Japanese", price:30.00, year:2007}
]

let result = []

class BookTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            books:data,
            sortInfo:{sort:"bookname",order:"ascend"},
            num:8
        }
    }

    sortBooks = (sortInfo) => {
        this.setState({sortInfo:sortInfo})
        if (sortInfo.sort && sortInfo.order){
            result = this.quickSort(this.state.books, sortInfo.sort, sortInfo.order);
            this.setState({books:result})
        }
    }

    searchBook = (condition) => {
        result = []
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
        let books = this.state.books;
        let num = this.state.num;
        console.log("render:"+books)
        return (
            <div className="big-container">
            <Icon/>
            <div className="Functionality Bar">
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
                        <ExportData data={data}/>
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
                        return <BookRow key={book.id} id={book.id} book={book} deleteBook={this.deleteBook}/>
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