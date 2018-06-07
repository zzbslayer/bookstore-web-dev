import React, { Component} from 'react'
import { Input, Button } from 'mdbreact'
import { proxy } from '../../Global'
import { Upload, Icon, message } from 'antd'

class Profile extends Component{
    constructor(props){
        super(props)
        this.fetchProfile()
        this.state={
            user:null,

            avatar:null,
            email:null,
            phone:null,
        }
    }

    fetchProfile = () => {
        fetch(proxy+"/user/profile/",{
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
            this.props.updateAvatar(this.state.avatar)
        },
        (error) => {
            message.error(error)
            }
        )
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    render = () => {
        const avatar = this.state.avatar
        let user = this.state.user
        return(
            <div className="col-8 big-font">
            {
                (user === null) ? <div/> :(
            <div>
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
            )
        }
        </div>
        );
    }
}
export default Profile