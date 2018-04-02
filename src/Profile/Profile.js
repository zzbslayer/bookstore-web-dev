import React, { Component} from 'react'

class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            username:this.props.username
        }
    }
    render(){
        return(
            <div className="big-container">
            <div className="row">
                <div className="col-2">
                <img src="" alt="userphoto"/>
                </div>
                <div className="col-8">
                    <div className="row bold">
                    zzbslayer
                    </div>
                    <div className="row">
                    djasldjglkajgkl
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
export default Profile