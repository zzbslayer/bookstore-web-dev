import React, { Component} from 'react'
import AddressRow from './AddressRow'
import AddressForm from './AddressForm'
import { proxy } from '../../Global'
import { message } from 'antd'



class Address extends Component{
    constructor(props){
        super(props)
        this.fetchAddress()

        this.state={
            addresses: null,
        }
    }

    fetchAddress = () => {
        fetch(proxy+"/user/address",{
            method: 'get',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
                addresses: result,
            });
        },
        (error) => {
            message.error(error)
            }
        )
    }

    addAddress = (addr) => {
        /* send post in the AddressRow */
        let data = this.state.addresses
        data.push(addr)
        this.setState({addresses: data})
    }

    deleteAddress = (addressid) => {
        /* send post in the AddressRow */
        let data = this.state.addresses
        for (let i in data){
            if (data[i].addressid===addressid){
                data.splice(i,1);
                break;
            }
        }
        this.setState({addresses:data});
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    render = () => {
        let addresses = this.state.addresses
        return (
        <div className="col-8 big-font">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <td>Address</td>
                    <td>Recipient</td>
                    <td>Phone</td>
                    <td>Action</td>
                    <td/>
                    </tr>
                </thead>
                <tbody>
                {
                    addresses===null?(<tr><td>No address</td><td/><td/><td/></tr>):(
                        addresses.map((address) => {
                            return <AddressRow key={address.addressid} deleteAddress={this.deleteAddress} addressid={address.addressid} address={address.shippingaddress} recipient={address.recipient} phone={address.phone}/>
                        })
                    )
                }
                </tbody>
            </table>
            <AddressForm addAddress={this.addAddress}/>
        </div>
        )
    }
}
export default Address