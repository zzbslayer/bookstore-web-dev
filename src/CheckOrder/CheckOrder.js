import React, {Component} from 'react'
import AddressRow from './AddressRow'
import { Button } from 'mdbreact'
import { proxy } from '../Global'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

class CheckOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            addresses:null,
        }
        this.initMsg()

    }

    initMsg = () => {
        let login = cookies.get("login")
        if (login==='null' || login===null || typeof(login)==='undefined'){
            window.location.href = '/login'
            return;
        }
        fetch(proxy+"/user/address",{
            method: 'get',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
            (result)=>{
                console.log(result)
                for (let i in result){
                    if (i===0)
                        result[i].select = true
                    else
                        result[i].select = false
                }
                this.setState({addresses: result})
            }
        ),
        (error) => {
            this.setState({
                error
            });
        }
    }

    addressSelect = (id) =>{
        let addresses = this.state.addresses
        for (let i in addresses){
            if (addresses[i].addressid!==id){
                addresses[i].select = false
            }
            else{
                addresses[i].select = true
            }
        }
        this.setState({addresses:addresses})
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
                       console.log(address.recipient)
                       console.log(address.select)
                        return(
                            <AddressRow key={address.addressid} id={address.addressid} address={address.shippingaddress} recipient={address.recipient} phone={address.phone} select={address.select} addressSelect={this.addressSelect}/>
                        )
                    } ,this)
                }
                </tbody>
            </table>
            <Button color="deep-orange">Confirm</Button>
            </div>
            </div>
        );
    }
}
export default CheckOrder