import React from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class BookForm extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            bookname:'',
            author:'',
            language:'',
            price:0,
            year:''
        }
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value, valid:this.state.bookname&&this.state.author&&this.state.language&&this.state.price&&this.state.year})
    }

    handleSubmit(e){
        e.preventDefault();
        let book = {
            id: this.props.num,
            bookname: this.state.bookname,
            author: this.state.author,
            language: this.state.language,
            price: this.state.price,
            year: this.state.year,
            edit:false
        }
        this.props.addBook(book)
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
                    <FormControl type="number" placeholder="Amount" name="price" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="formInlineYear">
                    <ControlLabel>Year</ControlLabel>
                    {' '}
                    <FormControl type="number" placeholder="Year" name="year" onChange={this.handleChange}/>
                </FormGroup>
                <Button type="submit" onClick={this.handleSubmit}>Add</Button>
            </Form>
        )
    }
}
export default BookForm