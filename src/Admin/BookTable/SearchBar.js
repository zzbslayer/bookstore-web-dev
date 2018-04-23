import React from 'react';
import { Button, Input } from 'mdbreact';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            bookname:null,
            author:null,
            language:null,
            price:null,
            startYear:null,
            endYear:null,
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let condition = {
            bookname: this.state.bookname,
            author: this.state.author,
            language: this.state.language,
        }
        console.log(condition)
        this.props.searchBook(condition)
    }
    render(){
        return (
            <div className="SearchBar">
            <h2>Search Books</h2>
            <table>
            <tbody>
                <tr>
                    <td>
                    <div style={{width:150}}>
                    <Input type="text" label="Bookname" placeholder="Bookname" name="bookname" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:100}}>
                    <Input type="text" label="Author" placeholder="Author" name="author" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:130}}>
                    <Input type="text" label="Language" placeholder="Language" name="language" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <Button color="primary" type="submit" onClick={this.handleSubmit}>Search</Button>
                    </td>
                </tr>
            </tbody>
            </table>
            </div>
        )
    }
}
export default SearchBar