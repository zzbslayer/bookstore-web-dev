import React, { Component } from 'react';
import Icon from '../Icon';
import { Input, Button } from 'mdbreact';
import {Link} from 'react-router-dom';

class BookDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            price:196.00,
            imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",
            bookname:"Wiedźmin",
            count:1,
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        let price = "￥" + this.state.price
        let count = this.state.count
        let nextSize = 80
        return(
            <div>
            <Icon/>
            <div class="big-container border-dashed">
            <table style={{height:440}} >
                <tbody>
                    <tr>
                        <td style={{width:410}}>
                            <div class="photo float-left">
                                <a href={this.state.href}><img style={{width:400,height:400}} src={this.state.imgsrc} alt={this.state.bookname}/></a>
                            </div>
                        </td>
                        <td style={{width:450}}>
                            <table style={{height:424,width:450}}>
                                <tbody>
                                <tr class="float-left">
                                    <td>
                                    <div class = "description">
                                        <a class="bookname-detail" href={this.state.detail}>{this.state.bookname}</a>
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
                                Books related
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                        <div class="photo">
                                            <a href="/books/0"><img style={{width:nextSize,height:nextSize}} src={this.state.imgsrc} alt={this.state.bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span class="price-small">{price}</span>
                                        </div>
                                        </td>
                                        <td>
                                        <div class="photo">
                                            <a href="/books/0"><img style={{width:nextSize,height:nextSize}} src={this.state.imgsrc} alt={this.state.bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span class="price-small">{price}</span>
                                        </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <div class="photo">
                                            <a href="/books/0"><img style={{width:nextSize,height:nextSize}} src={this.state.imgsrc} alt={this.state.bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span class="price-small">{price}</span>
                                        </div>
                                        </td>
                                        <td>
                                        <div class="photo">
                                            <a href="/books/0"><img style={{width:nextSize,height:nextSize}} src={this.state.imgsrc} alt={this.state.bookname}/></a>
                                        </div>
                                        <div align="center">
                                            <span class="price-small">{price}</span>
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