import React, {Component} from 'react'
import {Button} from 'mdbreact'
import { proxy } from '../../Global'
import { message } from 'antd'

class UserRow extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: this.props.username,
            status: this.props.status
        }
    }

    handleBan = () => {
        fetch(proxy + "/admin/users/ban",{
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: "username="+encodeURIComponent(this.state.username)
        })
        .then(res => res.json())
        .then(
        (result) => {
            if (result.status === "BAN")
                message.success("Ban Success")
            else
                message.error(result.message)
        },
        (error) => {
            message.error(error)
            }
        )
        this.setState({status: "BAN"})
    }

    handleRestore = () => {

        fetch(proxy + "/admin/users/restore",{
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: "username="+encodeURIComponent(this.state.username)
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (result.status === "NORMAL")
                    message.success("Restore Success")
                else
                    message.error(result.message)
            },
            (error) => {
                message.error(error)
                }
            )
        this.setState({status: "NORMAL"})
    }

    handleDelete = () => {
        fetch(proxy + "/admin/users/delete",{
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: "username="+encodeURIComponent(this.state.username)
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (result.status === null)
                    message.success("Delete Success")
                else
                    message.error(result.message)
            },
            (error) => {
                message.error(error)
                }
            )
        this.props.deleteUser(this.state.username)
    }

    render = () => {
        let username = this.state.username
        let status = this.state.status
        let rolename = this.props.rolename
        if (rolename === 'ADMIN')
            return(null)
        if (status==="NORMAL"){
            return(
                <tr>
                <td><div style={{width:150}}>{username}</div></td>
                <td><div style={{width:200}}>{status}</div></td>
                <td><Button color="warning" onClick={this.handleBan}>&nbsp;&nbsp;Ban&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-warning" aria-hidden="true"></i>&nbsp;&nbsp;</Button></td>
                <td><Button color="danger" onClick={this.handleDelete}>Delete&nbsp;<i className="fa fa-trash" aria-hidden="true"></i></Button></td>
                </tr>
            )
        }
        else{
            return(
                <tr>
                <td><div style={{width:150}}>{username}</div></td>
                <td><div style={{width:200}}>{status}</div></td>
                <td><Button color="success" onClick={this.handleRestore}>Restore&nbsp;<i className="fa fa-undo" aria-hidden="true"></i></Button></td>
                <td><Button color="danger" onClick={this.handleDelete}>Delete&nbsp;<i className="fa fa-trash" aria-hidden="true"></i></Button></td>
                </tr>
            )
        }

    }
}
export default UserRow