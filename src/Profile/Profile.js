import React, { Component} from 'react'
import { ListGroup, ListGroupItem } from 'mdbreact'
import { Input, Button } from 'mdbreact'

class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            username:"zzbslayer",
            nickname:"fluttershy",
            email:"zzbslayer@sjtu.edu.cn",
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        return(
            <div className="big-container border-solid top-margin">
            <div className="row">
                <div className="col-2">
                <ListGroup>
                <ListGroupItem href="#" active>User Profile</ListGroupItem>
                <ListGroupItem href="#">Something else</ListGroupItem>
                <ListGroupItem href="#">Morbi leo risus</ListGroupItem>
                <ListGroupItem href="#">Porta ac consectetur ac</ListGroupItem>
                <ListGroupItem href="#">Vestibulum at eros</ListGroupItem>
                </ListGroup>
                </div>

                <div className="col-8 big-font">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Username:</td>
                                <td>{this.state.username}</td>
                            </tr>
                            <tr>
                                <td>Nickname:</td>
                                <td><Input type="text" defaultValue={this.state.nickname} placeholder="Nickname" onClick={this.handleChange} name="nickname"/></td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td><Input type="text" defaultValue={this.state.email} placeholder="email" onClick={this.handleChange} name="email"/></td>
                            </tr>
                            <tr>
                                <td>Photo:</td>
                                <td>
                                    <div>
                                    <img className="photo border-solid" style={{padding:5}} src="https://s1.piq.land/2013/04/10/3Ta2bg6CVbEgzFrnUVejzVyz_400x400.png" alt="userphoto"/>
                                    </div>
                                    <div className="to-the-bottom">
                                    <Button color="primary" size="sm">Upload</Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Button color="primary" className="to-the-bottom">Submit</Button>
                </div>
            </div>
            </div>
        );
    }
}
export default Profile