import React, { Component } from 'react';

class Book extends Component{
    constructor(props){
        super(props)
        this.state = {
            href:this.props.href,
            price:this.props.price,
            imgsrc:this.props.imgsrc,
            bookname:this.props.bookname,
        }
    }
    render(){
        return(
            <div class="item float-left" style={{height:300,width:250}}>
                <div class="photo float-left">
                    <a href={this.state.href}><img style={{width:200,height:200}} src={this.state.imgsrc} alt={this.state.bookname}/></a>
                </div>
                <div class="description float-left">
                    <div>
                        <a class="bookname" href={this.state.detail}>{this.state.bookname}</a>
                    </div>
                    <div>
                        <span class="symbol">￥</span><span class="price">{this.state.price}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default Book