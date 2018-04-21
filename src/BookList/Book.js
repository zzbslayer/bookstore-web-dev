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
        let price = this.state.price
        let href = this.state.href
        let imgsrc = this.state.imgsrc
        let bookname = this.state.bookname
        return(
            <div className="item float-left border-solid" style={{height:300,width:200,margin:5}}>
                <div className="bookimg-padding float-left">
                    <a href={href}><img style={{width:180,height:180}} src={imgsrc} alt={bookname}/></a>
                </div>
                <div className="description float-left">
                    <div>
                        <a className="bookname" href={href}>{this.cutBookname(bookname)}</a>
                    </div>
                    <div>
                        <span className="symbol">￥</span><span className="price">{price}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default Book