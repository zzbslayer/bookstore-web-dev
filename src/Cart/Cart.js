import React, {Component} from 'react'
import Sticky from 'react-stickky';
import CartRow from './CartRow'
import { Table, Button } from 'mdbreact'
import { Link } from 'react-router-dom'

let data = [
    {id:0, bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00, amount:1, select:false},
    {id:1, bookname:"Inu to Hasami wa Tsukaiyō", href:"/books/1", imgsrc:"https://images-cn.ssl-images-amazon.com/images/I/51caLYMFqhL._SX337_BO1,204,203,200_.jpg",price:21.30, amount:2, select:false},
    {id:3, bookname:"Ore no Kanojo to Osananajimi ga Shyuraba Sugiru", href:"/books/3", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51I6rw416jL._AC_US320_FMwebp_QL65_.jpg",price:55.60, amount:2, select:false},
    {id:4, bookname:"The Devil is a Part-Timer!", href:"/books/4", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51n+hrNYTYL._AC_US436_QL65_.jpg",price:71.00, amount:1, select:false},
    {id:5, bookname:"Overlord", href:"/books/5", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51VUcYynY+L._AC_SR320,436_QL65_.jpg",price:74.00, amount:1, select:false},
    {id:6, bookname:"A Certain Magical Index", href:"/books/6", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51MPxZvR5hL._AC_US436_QL65_.jpg",price:30.00, amount:2, select:false},
    {id:7, bookname:"A Certain Scientific Railgun", href:"/books/7", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/512eq6LtkWL._AC_US436_FMwebp_QL65_.jpg",price:30.00, amount:3, select:false},
]

class Cart extends Component {
    constructor(props){
        super(props)
        this.state = {
            books:data,
        }
    }

    fmoney = (s, n=2) => {
        if(s==='')
           return;
        n = n > 0 && n <= 20 ? n : 2;   
        s = parseFloat((s + "").replace(/[^\d.-]/g, "")).toFixed(n) + "";   
        let l = s.split(".")[0].split("").reverse(),   
        r = s.split(".")[1];   
        let t = "";   
        for(let i = 0; i < l.length; i ++ ) {   
            t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");   
        }   
        return t.split("").reverse().join("") + "." + r;   
    } 

    changeSelect = (id) =>{
        for (let i in data){
            if (data[i].id===id){
                data[i].select = !data[i].select;
                break;
            }
        }
        this.setState({books:data})
    }

    changeAmount = (id,amount) =>{
        for (let i in data){
            if (data[i].id===id){
                data[i].amount = amount;
                break;
            }
        }
        this.setState({books:data})
    }

    deleteOneBook = (id) => {
        for (let i in data){
            if (data[i].id===id){
                data.splice(i,1);
                break;
            }
        }
        this.setState({books:data});
    }

    deleteBook = (id) => {
        this.deleteOneBook(id);
        this.setState({books:data});
    }

    getSum = () => {
        let sum = 0
        for (let i in data){
            let book = data[i]
            if (book.select)
                sum += book.price * 100 * book.amount 
        }
        sum = sum/100
        return this.fmoney(sum)
    }

    getSelectNum = () =>{
        let num = 0;
        for (let i in data){
            if (data[i].select){
                num ++
            }
        }
        return num
    }

    deleteSelect = () =>{
        let temp=[]
        for (let i in data){
            if (data[i].select){
                temp.push(data[i].id)
            }
        }
        for (let j in temp){
            console.log(temp[j])
            this.deleteOneBook(temp[j])
        }
        this.setState({books:data})
    }

    render(){
        let books = this.state.books
        let num = this.getSelectNum()
        let sum = "￥" + this.getSum()
        return(
            <div className="big-container">
                <Sticky className="stickyStyle" stickyWidth="1100px">
                            <div className="floatingbar">
                            <div className="float-left center bold">
                                <Button size="sm" color="danger" onClick = {this.deleteSelect}>Delete&nbsp;<i className="fa fa-trash" aria-hidden="true"></i></Button>
                            &nbsp;&nbsp;
                                <Button size="sm" color="cyan" onClick = {this.handleShare}>Share&nbsp;<i class="fa fa-share-alt" aria-hidden="true"></i></Button>
                            </div>

                            <div className="float-right center bold">
                            <span className="price">{num}&nbsp;</span><span>book(s) selected</span>
                            &nbsp;&nbsp;
                            <span>Sum:</span><span className="price">{sum}</span>
                            &nbsp;&nbsp;
                            <Link to="/buy"><Button color="amber">Buy it now</Button></Link>
                            </div>
                            </div>
                </Sticky>
                <Table>
                    <thead>
                        <tr>
                            <td>
                                Select
                            </td>
                            <td>
                                Books Info
                            </td>
                            <td/>
                            <td>
                                Unit Price
                            </td>
                            <td>
                                Amount
                            </td>
                            <td/>
                            <td>
                                Total Price
                            </td>
                            <td>
                                Actions
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           books.map( (book) => {
                            return <CartRow key={book.id} id={book.id} bookname={book.bookname} href={book.href} imgsrc={book.imgsrc} price={book.price} amount={book.amount} select={book.select} deleteBook={this.deleteBook} changeAmount={this.changeAmount} changeSelect={this.changeSelect}/>
                        },this)
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Cart