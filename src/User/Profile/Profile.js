import React, { Component} from 'react'
import { ListGroup, ListGroupItem } from 'mdbreact'
import { Input, Button } from 'mdbreact'
import { proxy } from '../../Global'
import Cookies from 'universal-cookie'
import AddressRow from './AddressRow';
import AddressForm from './AddressForm'
import { Upload, Icon, message } from 'antd'

const cookies = new Cookies();

class Profile extends Component{
    constructor(props){
        super(props)
        
        this.initMsg()
        this.state={
            user:null,
            addresses:null,

            avatar:null,
            email:null,
            phone:null,
        }
    }

    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend =  () => {
            this.setState({avatar: reader.result});
        }    
        return false;
    }

    initMsg = () => {
        let login = cookies.get("login")
        if (login==='null' || login===null || typeof(login)==='undefined'){
            window.location.href = '/login'
            return;
        }
        if (this.props.match.params.action !=="profile" && this.props.match.params.action!=="address"){
            window.location.href="/user/profile"
            return
        }
        this.fetchProfile()
        this.fetchAddress()
    }

    fetchProfile = () => {
        fetch(proxy+"/user/profile",{
            method: 'get',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
                user: result,
                email: result.email,
                phone: result.phone,
                avatar: result.avatar
            });
        },
        (error) => {
            message.error(error)
            }
        )
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

    handleUpdate = (e) => {
        e.preventDefault();
        let data="email="+encodeURIComponent(this.state.email)+
                "&phone="+encodeURIComponent(this.state.phone)+
                "&avatar="+encodeURIComponent(this.state.avatar)
        fetch(proxy+"/user/profile/update",{
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
            message.success("Update Success")
            this.setState({
                user: result
            });
        },
        (error) => {
            message.error(error)
            }
        )
    }

    addAddress = (addr) => {
        let data = this.state.addresses
        data.push(addr)
        this.setState({addresses: data})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    deleteAddress = (addressid) => {
        let data = this.state.addresses
        for (let i in data){
            if (data[i].addressid===addressid){
                data.splice(i,1);
                break;
            }
        }
        this.setState({addresses:data});
    }

    render = () => {
        const avatar = this.state.avatar;
        let user = this.state.user
        let action = this.props.match.params.action
        let addresses = this.state.addresses
        return(
            <div className="big-container border-solid top-margin">
            <div className="row">
                <div className="col-2">
                <ListGroup>
                <ListGroupItem href="/user/profile" active={action==='profile'}>User Profile</ListGroupItem>
                <ListGroupItem href="/user/address" active={action==='address'}>Addresses</ListGroupItem>
                </ListGroup>
                </div>
                            {
                                user===null?(<h3>No message available</h3>):(
                                    action==="profile"?(
                                        <div className="col-8 big-font">
                                        <table className="table">
                                        <tbody>
                                        <tr>
                                            <td>Username:</td>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td><Input type="text" defaultValue={user.email} placeholder="email" onChange={this.handleChange} name="email"/></td>
                                        </tr>
                                        <tr>
                                            <td>Phone:</td>
                                            <td><Input type="number" defaultValue={user.phone} placeholder="phone" onChange={this.handleChange} name="phone"/></td>
                                        </tr>
                                        <tr>
                                            <td>Photo:</td>
                                            <td>
                                            <Upload
                                                className="avatar-uploader"
                                                name="avatar"
                                                showUploadList={false}
                                                beforeUpload={this.beforeUpload}
                                            >
                                            {
                                              (avatar && avatar!=='null') ?
                                                <img src={avatar} alt={user.username+".jpg"} className="avatar" /> :
                                                <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                            </Upload>
                                            </td>
                                        </tr>
                                        </tbody>
                                        </table>
                                        <Button color="primary" type="submit" onClick={this.handleUpdate}>Submit</Button>
                                        </div>
                                    ):(
                                        action==="address"?(
                                            <div className="col-8 big-font">
                                            <table className="table table-striped table-sm">
                                                <thead>
                                                    <tr>
                                                        <td><span>Address</span></td>
                                                        <td><span>Recipient</span></td>
                                                        <td><span>Phone</span></td>
                                                        <td>Action</td>
                                                        <td/>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        addresses===null?(<tr><td>No address</td></tr>):(
                                                        addresses.map((address) => {
                                                            return <AddressRow key={address.addressid} deleteAddress={this.deleteAddress} addressid={address.addressid} address={address.shippingaddress} recipient={address.recipient} phone={address.phone}/>
                                                        })
                                                    )
                                                    }
                                                </tbody>
                                            </table>
                                            <AddressForm addAddress={this.addAddress}/>
                                            </div>
                                        ):(window.location.href="/user/profile")
                                    )
                                    
                                )
                            }
            </div>
            </div>
        );
    }
}
export default Profile