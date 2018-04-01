import React, {Component} from 'react'

class AddressRow extends Component {
    constructor(props){
        super(props)
        this.addressSelect = this.props.addressSelect
    }

    handleSelect = () => {
        if (this.props.select===false){
            this.addressSelect(this.props.id)
        }
    }

    render(){
        return(
            <tr>
                <td><input type="checkbox" checked={this.props.select} onChange={this.handleSelect}/></td>
                <td><span>{this.props.address}</span></td>
                <td><span>{this.props.recipient}</span></td>
                <td><span>{this.props.phone}</span></td>
            </tr>
        );
    }
}
export default AddressRow