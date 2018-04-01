import React from 'react';
import { Button } from 'mdbreact';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SortInfo extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            sort:'bookname',
            order:'ascend',
        }
    }
    handleSortChange = (newValue) => {
        this.setState({sort:newValue})
        console.log(this.state.sort)
    }

    handleOrderChange = (newValue) => {
        this.setState({order:newValue})
        console.log(this.state.order)
    }

    handleSubmit(e){
        let sortInfo = {sort:this.state.sort, order:this.state.order}
        this.props.sortBooks(sortInfo)
    }

    render(){
        const sort = this.state.sort
        const order = this.state.order
        return (
            <div className="SortInfo">
            <h2>Sort Books</h2>
            <table>
            <tbody>
                <tr>
                    <td>
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
                    <td>
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
                    <td>
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