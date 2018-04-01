import React, {Component} from 'react'
import UserRow from './UserRow'

let data=[
    {username:"zzbslayer",status:"normal"},
    {username:"dd",status:"normal"},
    {username:"Evan Song",status:"ban"},
]

class UserManagement extends Component{
    render(){
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
                                <UserRow username={user.username} status={user.status}/>
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