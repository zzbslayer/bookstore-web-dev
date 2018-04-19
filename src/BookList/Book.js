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
            <div className="item float-left" style={{height:300,width:250}}>
                <div className="bookimg-padding float-left">
                    <a href={this.state.href}><img style={{width:200,height:200}} src={this.state.imgsrc} alt={this.state.bookname}/></a>
                </div>
                <div className="description float-left">
                    <div>
                        <a className="bookname" href={this.state.detail}>{this.cutBookname(this.state.bookname)}</a>
                    </div>
                    <div>
                        <span className="symbol">￥</span><span className="price">{this.state.price}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default Book