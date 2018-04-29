import React, {Component} from 'react'
import { proxy } from '../../Global'
import { Button, Input} from 'mdbreact'
import { message } from 'antd'

class AddressRow extends Component {
    constructor(props){
        super(props)
        this.deleteAddress = this.props.deleteAddress
        this.addressSelect = this.props.addressSelect
        
        this.state={
            edit:false,
            addressid:this.props.addressid,

            address:this.props.address,
            recipient:this.props.recipient,
            phone:this.props.phone,

            old_address:this.props.address,
            old_recipient:this.props.recipient,
            old_phone:this.props.phone,
        }
    }

    handleDelete = () => {
        this.deleteAddress(this.state.addressid);
        let data = "addressid="+encodeURIComponent(this.state.addressid)
        fetch(proxy+"/user/address/delete",{
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: data
        })
        .then(
            (result) => {
                message.success("Delete Success")
            },
            (error) => {
                message.error("Delete Error:"+error)
            }
        )
        
    }

    handleEdit = () => {
        this.setState({old_address:this.state.address, old_recipient:this.state.recipient, old_phone:this.state.phone})
        this.setState({edit:true});
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleCancel = () =>{
        this.setState({address:this.state.old_address, recipient:this.state.old_recipient, phone:this.state.old_phone})
        this.setState({edit:false});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if (this.state.address!=="" && this.state.recipient!=="" && this.state.phone!==""){
            let data = "addressid="+encodeURIComponent(this.state.addressid)+
                    "&shippingaddress="+encodeURIComponent(this.state.address)+
                    "&recipient="+encodeURIComponent(this.state.recipient)+
                    "&phone="+encodeURIComponent(this.state.phone)
            fetch(proxy+"/user/address/update",{
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
                message.success("Edit Success")
                this.setState({
                    edit:false,    
                });
            },
            (error) => {
                message.error("Edit Error:"+error)
                }
            )
        }
        else{
            message.error("Info Invalid")
        }
    }


    render = () =>{
        let edit = this.state.edit
        let address = this.state.address
        let recipient = this.state.recipient
        let phone = this.state.phone
        if (!edit){
            return(
                <tr>
                    <td><div style={{width:330}}>{address}</div></td>
                    <td><div style={{width:120}}>{recipient}</div></td>
                    <td><div style={{width:120}}>{phone}</div></td>
                    <td className = 'action-row'>
                        <div style={{width:110}}>
                        <Button color="primary" size="sm" onClick = {this.handleEdit}>Edit&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></Button>
                        </div>
                    </td>
                    <td className = 'action-row'>
                        <div style={{width:130}}>
                        <Button color="danger" size="sm" onClick = {this.handleDelete}>Delete&nbsp;<i className="fa fa-trash" aria-hidden="true"></i></Button>
                        </div>
                    </td>
                </tr>
        )}
        else{
            return(
                <tr>
                    <td>
                    <div style={{width:330}}>
                    <Input type="text" defaultValue={address} placeholder="Address" onChange={this.handleChange} name="address"/>
                    </div>
                    </td> 
                    <td>
                    <div style={{width:120}}>
                    <Input type="text" defaultValue={recipient} placeholder="Recipient" name="recipient" onChange={this.handleChange}/>
                    </div>
                    </td> 
                    <td>
                    <div style={{width:120}}>
                    <Input type="number" defaultValue={phone} placeholder="Phone" name="phone" onChange={this.handleChange}/>
                    </div>
                    </td> 
                    
                    <td className = 'action'>
                        <div style={{width:150}}>
                        <Button color="primary" size="sm" onClick = {this.handleSubmit}>Submit&nbsp;<i className="fa fa-check" aria-hidden="true"></i></Button>
                        </div>
                    </td>
                    <td className = 'action'>
                        <div style={{width:150}}>
                        <Button color="primary" size="sm" onClick = {this.handleCancel}>Cancel&nbsp;<i className="fa fa-remove" aria-hidden="true"></i></Button>
                        </div>
                    </td>
                </tr>
            )
        }
    }
}
export default AddressRow