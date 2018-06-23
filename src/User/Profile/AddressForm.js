import React from 'react';
import { Button, Input } from 'mdbreact';
import { proxy } from '../../Global'
import { message } from 'antd'

class AddressForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address:null,
            recipient:null,
            phone:null,
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = "shippingaddress="+encodeURIComponent(this.state.address)+
                "&recipient="+encodeURIComponent(this.state.recipient)+
                "&phone="+encodeURIComponent(this.state.phone)
        fetch(proxy+"/user/address/add",{
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: data
        })
        .then(res => res.json())
        .then(
        (result) => {
            if (result.error)
                message.error("Add Error:"+result.error)
            else{
                message.success("Add Success")
                this.props.updateAddress(result.addresses)
            }
        },
        (error) => {
            message.error("Add Error:"+error)
        })
    }

    render = () => {
        let address = this.state.address;
        let recipient = this.state.recipient;
        let phone = this.state.phone;
        return (
            <div className="BookForm">
            <table>
            <tbody>
                <tr>
                    <td>
                    <div style={{width:330}}>
                    <Input type="text" defaultValue={address} label="Address" placeholder="Address" onChange={this.handleChange} name="address"/>
                    </div>
                    </td>
                    <td>&nbsp;</td>
                    <td>
                    <div style={{width:120}}>
                    <Input type="text" defaultValue={recipient} label="Recipient" placeholder="Recipient" name="recipient" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>&nbsp;</td>
                    <td>
                    <div style={{width:120}}>
                    <Input type="number" defaultValue={phone} label="Phone" placeholder="Phone" name="phone" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>&nbsp;</td>
                    <td>
                    <div style={{width:110}}>
                    <Button color="primary" type="submit" size="sm" onClick={this.handleSubmit}>Add&nbsp;<i className="fa fa-plus" aria-hidden="true"></i></Button>
                    </div>
                    </td>
                </tr>
            </tbody>
            </table>
            </div>
        )
    }
}
export default AddressForm