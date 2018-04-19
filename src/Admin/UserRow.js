import React, {Component} from 'react'
import {Button} from 'mdbreact'

class UserRow extends Component{
    render(){
        if (this.props.status=="normal"){
            return(
                <tr>
                <td><div style={{width:150}}>{this.props.username}</div></td>
                <td><div style={{width:200}}>{this.props.status}</div></td>
                <td><Button color="warning">&nbsp;&nbsp;Ban&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-warning" aria-hidden="true"></i>&nbsp;&nbsp;</Button></td>
                <td><Button color="danger">Delete&nbsp;<i className="fa fa-trash" aria-hidden="true"></i></Button></td>
                </tr>
            )
        }
        else{
            return(
                <tr>
                <td><div style={{width:150}}>{this.props.username}</div></td>
                <td><div style={{width:200}}>{this.props.status}</div></td>
                <td><Button color="success">Restore&nbsp;<i className="fa fa-undo" aria-hidden="true"></i></Button></td>
                <td><Button color="danger">Delete&nbsp;<i className="fa fa-trash" aria-hidden="true"></i></Button></td>
                </tr>
            )
        }

    }
}
export default UserRow