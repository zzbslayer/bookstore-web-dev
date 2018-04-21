import React, { Component } from 'react';
import Icon from '../Icon';
import { Input, Button } from 'mdbreact';
import {Link} from 'react-router-dom';

let newbooks = [
    {id:1, bookname:"Inu to Hasami wa Tsukaiyō", href:"/books/1", imgsrc:"https://images-cn.ssl-images-amazon.com/images/I/51caLYMFqhL._SX337_BO1,204,203,200_.jpg",price:21.30},
    {id:3, bookname:"Ore no Kanojo to Osananajimi ga Shyuraba Sugiru", href:"/books/3", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51I6rw416jL._AC_US320_FMwebp_QL65_.jpg",price:55.60},
    {id:4, bookname:"The Devil is a Part-Timer!", href:"/books/4", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51n+hrNYTYL._AC_US436_QL65_.jpg",price:71.00},
    {id:5, bookname:"Overlord", href:"/books/5", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51VUcYynY+L._AC_SR320,436_QL65_.jpg",price:74.00}
]

class BookDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            book:[],
            bookimage:[]
        }
    }

    componentWillMount = () => {
        this.initBook()
    }

    initBook = () => {
        let id = this.props.match.params.id
        console.log(id)
        this.getBook(id)
        this.getBookImage(id)
    }

    getBook = (id) => {
        fetch("http://localhost:8080/api/books/bookid/" + id,{
            credentials: 'include',
            method: 'get',
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("get book success")
                console.log(result)
                this.setState({book:result})
            }
        )
    }

    getBookImage = (id) => {
        fetch("http://localhost:8080/api/bookimages/bookid/" + id,{
            credentials: 'include',
            method: 'get',
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("get book image success")
                console.log(result)
                this.setState({bookimage:result})
            }
        )
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        let id =this.props.match.params.id
        let book = this.state.book
        let bookimage = this.state.bookimage
        let price = "￥" + book.price
        let count = book.count
        let imgsrc = bookimage.imgsrc
        let href = "/books/"+id
        let bookname = book.bookname
        return(
            <div>
            <Icon/>
            <div className="big-container border-dashed">
            <table style={{height:440}} >
                <tbody>
                    <tr>
                        <td style={{width:410}}>
                            <div className="bookimg-padding float-left">
                                <a href={href}><img style={{width:400,height:400}} src={imgsrc} alt={bookname}/></a>
                            </div>
                        </td>
                        <td style={{width:450}}>
                            <table style={{height:424,width:450}}>
                                <tbody>
                                <tr className="float-left">
                                    <td>
                                    <div className = "description">
                                        <span className ="bookname-detail">{bookname}</span>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div className="price-container description">
                                        <span className="bold">Price:</span><span className="price-x-large">{price}</span>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div className= "description">
                                        <span className="bold">Shipping:</span><span className="price">￥5.00</span>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div className= "description">
                                        <Input type="number" defaultValue={count} label="Count" placeholder="Count" name="count" onChange={this.handleChange}/>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <table style={{width:399}}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                <div className= "description">
                                                    <Link to="/buy"><Button color="amber">Buy it now</Button></Link>
                                                </div>
                                                </td>
                                                <td>
                                                <div className= "description">
                                                    <Button color="deep-orange" onClick={this.handleClickOpen}>Add to Cart</Button>
                                                </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style={{width:200}}>
                            <div className="next">
                            <div className="smallheader description">
                                New Books
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                        <div className="bookimg-padding">
                                            <a href={newbooks[0].href}><img className="small-img" src={newbooks[0].imgsrc} alt={newbooks[0].bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span className="price-small">￥{newbooks[0].price}</span>
                                        </div>
                                        </td>
                                        <td>
                                        <div className="bookimg-padding">
                                            <a href={newbooks[1].href}><img className="small-img" src={newbooks[1].imgsrc} alt={newbooks[1].bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span className="price-small">￥{newbooks[1].price}</span>
                                        </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <div className="bookimg-padding">
                                            <a href={newbooks[2].href}><img className="small-img" src={newbooks[2].imgsrc} alt={newbooks[2].bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span className="price-small">￥{newbooks[2].price}</span>
                                        </div>
                                        </td>
                                        <td>
                                        <div className="bookimg-padding">
                                            <a href={newbooks[3].href}><img className="small-img" src={newbooks[3].imgsrc} alt={newbooks[3].bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span className="price-small">￥{newbooks[3].price}</span>
                                        </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            </div>
        );
    }
}
export default BookDetail