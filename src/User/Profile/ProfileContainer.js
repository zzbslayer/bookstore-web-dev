import React, { Component} from 'react'
import { ListGroup, ListGroupItem } from 'mdbreact'
import Cookies from 'universal-cookie'
import Profile from './Profile'
import Address from './Address'

const cookies = new Cookies();

class ProfileContainer extends Component{
    constructor(props){
        super(props)  
        this.initMsg()
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
    }

    

    render = () => {
        let action = this.props.match.params.action
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
                                action==="profile"?(
                                    <Profile updateAvatar={this.props.updateAvatar}/>
                                ):(
                                action==="address"?(
                                    <Address/>
                                ):(window.location.href="/user/profile"))
                            }
            </div>
            </div>
        );
    }
}
export default ProfileContainer