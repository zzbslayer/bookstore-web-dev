import React, {Component} from 'react'
import UserRow from './UserRow'
import { proxy } from '../../Global'

class UserManagement extends Component{
    constructor(props){
        super(props)
        this.initMsg()
        this.state={
            error:null,
            isLoaded: false,
            userstatus: []
        }
    }

    initMsg = () => {
        fetch(proxy + "/admin/userstatus",{
            credentials: 'include',
            method:'get'
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
                isLoaded: true,
                userstatus: result
            });
            console.log(result)
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            console.log(error)
            }
        )
    }

    render(){
        let data = this.state.userstatus
        return(
            <div className="big-container">
            <table className="table table-striped table-sm inside-big-container">
                <thead>
                    <tr>
                    <td>Username</td>
                    <td>Status</td>
                    <td>Action</td>
                    <td/>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user) => {
                            return(
                                <UserRow  username={user.username} status={user.userStatus}/>
                            );
                        },this)
                    }
                </tbody>
            </table>
            </div>
        );
    }
}
export default UserManagement