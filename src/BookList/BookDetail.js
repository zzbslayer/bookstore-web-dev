import React, { Component } from 'react';
import Icon from '../Icon';
import { Input, Button } from 'mdbreact';
import {Link} from 'react-router-dom';

let data = [
    {id:0, bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00},
    {id:1, bookname:"Inu to Hasami wa Tsukaiyō", href:"/books/1", imgsrc:"https://images-cn.ssl-images-amazon.com/images/I/51caLYMFqhL._SX337_BO1,204,203,200_.jpg",price:21.30},
    {id:3, bookname:"Ore no Kanojo to Osananajimi ga Shyuraba Sugiru", href:"/books/3", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51I6rw416jL._AC_US320_FMwebp_QL65_.jpg",price:55.60},
    {id:4, bookname:"The Devil is a Part-Timer!", href:"/books/4", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51n+hrNYTYL._AC_US436_QL65_.jpg",price:71.00},
    {id:5, bookname:"Overlord", href:"/books/5", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51VUcYynY+L._AC_SR320,436_QL65_.jpg",price:74.00},
    {id:6, bookname:"A Certain Magical Index", href:"/books/6", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51MPxZvR5hL._AC_US436_QL65_.jpg",price:30.00},
    {id:7, bookname:"A Certain Scientific Railgun", href:"/books/7", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/512eq6LtkWL._AC_US436_FMwebp_QL65_.jpg",price:30.00},
]

let newbooks = [
    {id:1, bookname:"Inu to Hasami wa Tsukaiyō", href:"/books/1", imgsrc:"https://images-cn.ssl-images-amazon.com/images/I/51caLYMFqhL._SX337_BO1,204,203,200_.jpg",price:21.30},
    {id:3, bookname:"Ore no Kanojo to Osananajimi ga Shyuraba Sugiru", href:"/books/3", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51I6rw416jL._AC_US320_FMwebp_QL65_.jpg",price:55.60},
    {id:4, bookname:"The Devil is a Part-Timer!", href:"/books/4", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51n+hrNYTYL._AC_US436_QL65_.jpg",price:71.00},
    {id:5, bookname:"Overlord", href:"/books/5", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51VUcYynY+L._AC_SR320,436_QL65_.jpg",price:74.00}
]

class BookDetail extends Component{
    constructor(props){
        super(props)
        this.state = {

            book:this.getBook(this.props.id),
        }
    }

    getBook = (id) => {
        for (let i in data){
            /* This must be '==' instead of '===' */
            if (data[i].id==id){
                console.log("success")
                return data[i]
            }
        }
        console.log("fail")
        return null;
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        let id =this.props.match.params.id
        let book = this.getBook(id)
        let price = "￥" + book.price
        let count = book.count
        let nextSize = 80
        let imgsrc = book.imgsrc
        let href = book.href
        let bookname = book.bookname
        return(
            <div>
            <Icon/>
            <div class="big-container border-dashed">
            <table style={{height:440}} >
                <tbody>
                    <tr>
                        <td style={{width:410}}>
                            <div class="photo float-left">
                                <a href={href}><img style={{width:400,height:400}} src={imgsrc} alt={bookname}/></a>
                            </div>
                        </td>
                        <td style={{width:450}}>
                            <table style={{height:424,width:450}}>
                                <tbody>
                                <tr class="float-left">
                                    <td>
                                    <div class = "description">
                                        <span class="bookname-detail">{bookname}</span>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="price-container description">
                                        <span class="bold">Price:</span><span class="price-x-large">{price}</span>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class= "description">
                                        <span class="bold">Shipping:</span><span class="price">￥5.00</span>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class= "description">
                                        <Input type="number" defaultValue={count} label="Count" placeholder="Count" name="count" onChange={this.handleChange}/>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <table style={{width:399}}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                <div class= "description">
                                                    <Link to="/buy"><Button color="amber">Buy it now</Button></Link>
                                                </div>
                                                </td>
                                                <td>
                                                <div class= "description">
                                                    <Button color="deep-orange" onClick={this.handleClickOpen}>Add to Cart</Button>
                                                </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style={{width:200}}>
                            <div class="next">
                            <div class="smallheader description">
                                New Books
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                        <div class="photo">
                                            <a href={newbooks[0].href}><img style={{width:nextSize,height:nextSize}} src={newbooks[0].imgsrc} alt={newbooks[0].bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span class="price-small">{newbooks[0].price}</span>
                                        </div>
                                        </td>
                                        <td>
                                        <div class="photo">
                                            <a href={newbooks[1].href}><img style={{width:nextSize,height:nextSize}} src={newbooks[1].imgsrc} alt={newbooks[1].bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span class="price-small">{newbooks[1].price}</span>
                                        </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <div class="photo">
                                            <a href={newbooks[2].href}><img style={{width:nextSize,height:nextSize}} src={newbooks[2].imgsrc} alt={newbooks[2].bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span class="price-small">{newbooks[2].price}</span>
                                        </div>
                                        </td>
                                        <td>
                                        <div class="photo">
                                            <a href={newbooks[3].href}><img style={{width:nextSize,height:nextSize}} src={newbooks[3].imgsrc} alt={newbooks[3].bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span class="price-small">{newbooks[3].price}</span>
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