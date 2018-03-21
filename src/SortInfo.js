import React from 'react';
import { Button } from 'mdbreact';
import Select from 'react-select';

class SortInfo extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            sort:{value:'bookname', label:'Bookname'},
            order:{value:'descend', label:'Descend'},
        }
    }
    handleSortChange = (newValue) => {
        this.setState({sort:newValue})
    }

    handleOrderChange = (newValue) => {
        this.setState({order:newValue})
    }

    handleSubmit(e){
        let sortInfo = {sort:this.state.sort.value, order:this.state.order.value}
        this.props.sortBooks(sortInfo)
    }

    render(){
        const sort = this.state.sort
        const order = this.state.order
        return (
            <div className="SortInfo">
            <table>
            <tbody>
                <tr>
                    <td className="align-bottom">
                        <div style={{width:130}}>
                        <Select 
                            name="sort" 
                            onBlurResetsInput={false}
				            onSelectResetsInput={false}
                            autoFocus
                            simpleValue
                            value={sort} 
                            onChange={this.handleSortChange}
                            options={[
                                { value: 'bookname', label: 'Bookname' },
                                { value: 'author', label: 'Author' },
                                { value: 'language', label: 'Language' },
                                { value: 'price', label: 'Price' },
                                { value: 'year', label: 'Year' },
                            ]}
                        />
                        </div>
                    </td>
                    <td className="align-bottom">
                        <div style={{width:130}}>
                        <Select 
                            name="order" 
                            onBlurResetsInput={false}
				            onSelectResetsInput={false}
                            autoFocus
                            simpleValue
                            value={order} 
                            onChange={this.handleOrderChange}
                            options={[
                                { value: 'descend', label: 'Descend' },
                                { value: 'ascend', label: 'Ascend' },
                            ]}
                        />
                        </div>
                    </td>
                    <td className="align-bottom">
                        <Button color='primary' onClick={this.handleSubmit}>Sort</Button>
                    </td>
                </tr>
            </tbody>
            </table>
            </div>
        )
    }
}
export default SortInfo