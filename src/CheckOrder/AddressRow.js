import React, {Component} from 'react'

class AddressRow extends Component {
    constructor(props){
        super(props)
        this.addressSelect = this.props.addressSelect
        this.state={
            address: this.props.address,
            recipient: this.props.recipient,
            phone: this.props.phone,
            select:this.props.select,
        }
    }

    handleSelect = () => {
        if (this.state.select===false){
            this.addressSelect(this.props.id)
        }
    }

    render(){
        console.log(this.state.recipient)
        console.log(this.state.select)
        return(
            <tr>
                <td><input type="checkbox" checked={this.state.select} onChange={this.handleSelect}/></td>
                <td><span>{this.state.address}</span></td>
                <td><span>{this.state.recipient}</span></td>
                <td><span>{this.state.phone}</span></td>
            </tr>
        );
    }
}
export default AddressRow