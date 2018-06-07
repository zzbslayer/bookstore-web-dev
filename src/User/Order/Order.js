import React , { Component }from 'react'
import OrderRow from './OrderRow'

class Order extends Component {
    constructor(props){
        super(props)
        this.state={
            order:this.props.order,
        }
        console.log(this.state.order)
    }
    render(){
        let order = this.state.order
        return(
            <div>
            <h5><span className="float-left">{"Orderid: " + order.id}</span><span className="float-right">{"Date: "+order.date}</span></h5>
            <table className="table table-striped table-sm" style={{width:1070}}>
                <tbody>
                    <tr>
                        <td style={{width:130}}>Address Info:</td>
                        <td style={{width:110}}>{order.recipient}</td>
                        <td style={{width:530}}>{order.address}</td>
                        <td style={{width:150}}>{order.phone}</td>
                        <td style={{width:40}}/>
                        <td style={{width:110}}/>
                    </tr>
                    {
                        order.books.map((book,key) => {
                            //console.log(book)
                            //console.log(book.count)
                            return(
                                <OrderRow key={key} bookid={book.bookid} imgsrc={book.imgsrc} bookname={book.bookname} price={book.price} count={book.count}/>
                            );
                        },this)
                    }
                </tbody>
            </table>
            </div>
        );
    }
}

export default Order