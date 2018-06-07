import React, {Component} from 'react'
import AddressRow from './AddressRow'
import { Button } from 'mdbreact'
import { proxy } from '../Global'
import Cookies from 'universal-cookie'
import { message } from 'antd'

const cookies = new Cookies();

class CheckOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            addresses:null,
            books:this.props.match.params.books,
            selectaddress:null,
        }
        this.initMsg()
        console.log(this.state.books)
    }

    initMsg = () => {
        let login = cookies.get("login")
        if (login==='null' || login===null || typeof(login)==='undefined'){
            window.location.href = '/login'
            return;
        }
        fetch(proxy+"/user/address/",{
            method: 'get',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
            (result)=>{
                for (let i in result.addresses){
                    if (i===0)
                        result.addresses[i].select = true
                    else
                        result.addresses[i].select = false
                }
                this.setState({addresses: result.addresses})
            }
        ),
        (error) => {
            message.error(error)
        }
    }

    addressSelect = (id) =>{
        let addresses = this.state.addresses
        let selectaddr = null;
        for (let i in addresses){
            if (addresses[i].addressid!==id){
                addresses[i].select = false
            }
            else{
                addresses[i].select = true
                selectaddr = addresses[i]
            }
        }
        this.setState({addresses:addresses, selectaddress:selectaddr})
    }

    addOrder = () => {
        let address = this.state.selectaddress
        if (address === null ){
            message.error("You must choose an address")
            return;
        }
        let books = this.state.books
        let booksinfo = books.split('&')
        console.log(books)
        console.log(booksinfo)
        let msg = ""
        for (let i in booksinfo){
            msg += "book="+encodeURIComponent(booksinfo[i])+"&"
        }
        msg += "shippingaddress=" + encodeURIComponent(address.shippingaddress)+"&"
        msg += "recipient=" + encodeURIComponent(address.recipient)+"&"
        msg += "phone=" +encodeURIComponent(address.phone) 
        console.log(msg)
        fetch(proxy+"/user/order/add",{
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: msg,
        }) 
        .then(res => res.json())
        .then(
            (result)=>{
                if (result.error)
                    message.error(result.error + ":" +result.message)
                else{
                    message.success("Buy Success!")
                    window.location.href = "/order"
                }
            }
        ),
        (error) => {
            message.error(error)
        }
    }

    render(){
        let data = this.state.addresses
        return(
            <div className="big-container">
            <h4><span className="float-left">Confirm Order Infomation</span><a className="float-right" href='/user/address'>Add New Address</a></h4>
            
            <div>
            <table className="table table-striped table-sm inside-big-container">
                <thead>
                    <tr>
                    <td><span>Select</span></td>
                    <td><span>Address</span></td>
                    <td><span>Recipient</span></td>
                    <td><span>Phone</span></td>
                    </tr>
                </thead>
                <tbody>
                {
                    data===null?(<tr/>):
                    data.map((address) => {
                        return(
                            <AddressRow key={address.addressid} id={address.addressid} address={address.shippingaddress} recipient={address.recipient} phone={address.phone} select={address.select} addressSelect={this.addressSelect}/>
                        )
                    } ,this)
                }
                </tbody>
            </table>
            <Button color="deep-orange" onClick={this.addOrder}>Confirm</Button>
            </div>
            </div>
        );
    }
}
export default CheckOrder