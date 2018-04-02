import React , { Component }from 'react'
import OrderRow from './OrderRow'

let data = [
    {id:0, address:"Shanghai Minghang District Shanghai Jiao Tong University Dormitory X13",recipient:"Jiansi Wang",phone:"18011111111",bookname:"Wiedźmin", href:"/books/0", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/51fIWZgE3-L._SY484_BO1,204,203,200_.jpg",price:196.00, amount:1},
    {id:1, address:"Shanghai Minghang District Shanghai Jiao Tong University Dormitory X13",recipient:"Jiansi Wang",phone:"18011111111",bookname:"A Certain Scientific Railgun", href:"/books/7", imgsrc:"https://images-na.ssl-images-amazon.com/images/I/512eq6LtkWL._AC_US436_FMwebp_QL65_.jpg",price:30.00, amount:3},
]

class Order extends Component {
    render(){
        return(
            <div className="big-container">
            <table className="table table-striped table-sm inside-big-container">
                <thead>
                    <tr>
                    <td>Bookname</td>
                    <td/>
                    <td>Address</td>
                    <td>Recipient</td>
                    <td>Phone</td>
                    <td>Price</td>
                    <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((order) => {
                            return(
                                <OrderRow key={order.id} id={order.id} imgsrc={order.imgsrc} bookname={order.bookname} address={order.address} recipient={order.recipient} phone={order.phone} price={order.price} amount={order.amount}/>
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