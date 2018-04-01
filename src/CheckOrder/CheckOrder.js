import React, {Component} from 'react'
import AddressRow from './AddressRow'

let addresses = [
    {id:0, address:"Shanghai Minghang District Shanghai Jiao Tong University Dormitory X13",recipient:"Jiansi Wang",phone:"18011111111",select:true},
    {id:1, address:"Shanghai Minghang District East China Normal University ",recipient:"Evan Song",phone:"18022222222",select:false}
]

class CheckOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            addresses:addresses,
        }
    }

    addressSelect = (id) =>{
        for (let i in addresses){
            if (addresses[i].id!==id && addresses[i].select===true){
                addresses[i].select = false
            }
            else if (addresses[i].id===id){
                addresses[i].select = true
            }
        }
        console.log(addresses)
        console.log(this.state.addresses)
        this.setState({addresses:addresses})
    }

    render(){
        let data = this.state.addresses
        return(
            <div className="big-container">
            <div><span className="float-left">Confirm Order Infomation</span><span className="float-right">Add New Address</span></div>
            
            <div>
            <table className="table table-striped table-sm inside-big-container">
                <thead>
                    <tr>
                    <td><span>Select</span></td>
                    <td><span>Address</span></td>
                    <td><span>Recipient</span></td>
                    <td><span>Phone</span></td>
                    </tr>
                </thead>
                <tbody>
                {
                   data.map((address) => {
                       console.log(address.recipient)
                       console.log(address.select)
                        return(
                            <AddressRow key={address.id} id={address.id} address={address.address} recipient={address.recipient} phone={address.phone} select={address.select} addressSelect={this.addressSelect}/>
                        )
                    } ,this)
                }
                </tbody>
            </table>
            </div>
            </div>
        );
    }
}
export default CheckOrder