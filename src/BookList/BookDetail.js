import React, { Component } from 'react';
import Icon from '../Icon';
import { Input, Button } from 'mdbreact';
import { proxy } from '../Global'
import { message } from 'antd'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

let newbooks = [
    {id:1, bookname:"Inu to Hasami wa Tsukaiyō", href:"/books/bookid/2", imgsrc:"https://images-cn.ssl-images-amazon.com/images/I/51caLYMFqhL._SX337_BO1,204,203,200_.jpg",price:21.30},
    {id:3, bookname:"Ore no Kanojo to Osananajimi ga Shyuraba Sugiru", href:"/books/bookid/4", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51I6rw416jL._AC_US320_FMwebp_QL65_.jpg",price:55.60},
    {id:4, bookname:"The Devil is a Part-Timer!", href:"/books/bookid/5", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51n+hrNYTYL._AC_US436_QL65_.jpg",price:71.00},
    {id:5, bookname:"Overlord", href:"/books/bookid/6", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51VUcYynY+L._AC_SR320,436_QL65_.jpg",price:74.00}
]

class BookDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            book:[],
            count:1,
        }
        this.initBook()
    }

    initBook = () => {
        let id = this.props.id
        console.log(id)
        this.fetchBook(id)
    }

    fetchBook = (id) => {
        fetch(proxy + "/books/bookid/" + id,{
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

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    addToCart = (e) => {
        e.preventDefault();
        let login = cookies.get("login")
        if (login==='null' || login===null || typeof(login)==='undefined'){
            window.location.href = '/login'
            return;
        }
        let bookid = this.state.book.bookid
        let count = this.state.count
        let data = "bookid="+encodeURIComponent(bookid)+
                "&count="+encodeURIComponent(count)

        fetch(proxy+"/user/cart/save",{
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
              body: data
        })
        .then(res => res.json())
        .then(
        (result) => {
            message.success("Add Success!")
        },
        (error) => {
            message.error("Add Error:"+error)
            window.location.href= "/login"
            }
        )
    }

    handleBuy = () => {
        let login = cookies.get("login")
        if (login==='null' || login===null || typeof(login)==='undefined'){
            window.location.href = '/login'
            return;
        }
        let id = this.state.book.bookid
        let count = this.state.count
        let buyinfo = (id+";"+count)
        window.location.href = "/buy/"+buyinfo
    }

    render(){
        let id =this.props.id
        let book = this.state.book
        let price = "￥" + book.price
        let count = this.state.count
        let imgsrc = book.imgsrc
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
                                                    <Button color="amber" onClick={this.handleBuy}>Buy it now</Button>
                                                </div>
                                                </td>
                                                <td>
                                                <div className= "description">
                                                    <Button color="deep-orange" onClick={this.addToCart}>Add to Cart</Button>
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