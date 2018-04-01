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

    cutBookname = (bookname) => {
        if (bookname.length>35){
            let cutname = bookname.substring(0,35) + '...'
            return cutname
        }
        return bookname
    }

    render(){
        return(
            <div class="item float-left" style={{height:300,width:250}}>
                <div class="photo float-left">
                    <a href={this.state.href}><img style={{width:200,height:200}} src={this.state.imgsrc} alt={this.state.bookname}/></a>
                </div>
                <div class="description float-left">
                    <div>
                        <a class="bookname" href={this.state.detail}>{this.cutBookname(this.state.bookname)}</a>
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