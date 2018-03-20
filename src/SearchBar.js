import React from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            bookname:'',
            author:'',
            language:'',
            price:'',
            startYear:'',
            endYear:'',
            valid:false
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value, valid:this.state.bookname&&this.state.author&&this.state.language&&this.state.price&&this.state.year})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let book = {
            key: this.props.num,
            bookname: this.state.bookname,
            author: this.state.author,
            language: this.state.language,
            price: this.state.price,
            startYear: this.state.startYear,
            endYear: this.state.endYear
        }
        this.props.searchBook(book)
    }
    render(){
        return (
            <Form inline>
                <FormGroup controlId="formInlineBookname">
                    <ControlLabel>Bookname</ControlLabel>
                    {' '}
                    <FormControl type="text" placeholder="Bookname" name="bookname" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="formInlineAuthor">
                    <ControlLabel>Author</ControlLabel>
                    {' '}
                    <FormControl type="text" placeholder="Author" name="author" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="formInlineLanguage">
                    <ControlLabel>Language</ControlLabel>
                    {' '}
                    <FormControl type="text" placeholder="Language" name="language" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="formInlinePrice">
                    <ControlLabel>Price</ControlLabel>
                    {' '}
                    <FormControl type="number" placeholder="Amount" name="amount" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="formInlineYear">
                    <ControlLabel>Start Year</ControlLabel>
                    {' '}
                    <FormControl type="number" placeholder="Start year" name="startYear" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="formInlineYear">
                    <ControlLabel>End Year</ControlLabel>
                    {' '}
                    <FormControl type="number" placeholder="End year" name="endYear" onChange={this.handleChange}/>
                </FormGroup>
                <Button type="submit" onClick={this.handleSubmit}>Search</Button>
            </Form>
        )
    }
}
export default SearchBar