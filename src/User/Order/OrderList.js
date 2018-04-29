import React , { Component }from 'react'
import Order from './Order'
import { proxy } from './../../Global'
import { message } from 'antd'

class OrderList extends Component {
    constructor(props){
        super(props)
        this.fetchOrderlist()
        this.state={
            orderlist:null,
        }
    }

    fetchOrderlist = () => {
        fetch(proxy+"/user/order",{
            method: 'get',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
                orderlist: result
            });
        },
        (error) => {
            message.error(error)
            }
        )
    }

    render(){
        let orderlist = this.state.orderlist
        return(
            <div className="big-container border-solid top-margin">
                    {   orderlist===null?<div/>:
                        orderlist.reverse().map((order,key) => {
                            return(
                                <Order key={key} order={order}/>
                            );
                        },this)
                    }
            </div>
        );
    }
}

export default OrderList