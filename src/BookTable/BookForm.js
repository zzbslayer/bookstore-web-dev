import React from 'react';
import { Button, Input } from 'mdbreact';

class BookForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookname:'',
            author:'',
            language:'',
            price:'',
            year:''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
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
        let bookname = this.state.bookname;
        let author = this.state.author;
        let language = this.state.language;
        let price = String(this.state.price);
        let year = String(this.state.year);
        return (
            <div className="BookForm">
            <h2>Add Books</h2>
            <table>
            <tbody>
                <tr>
                    <td>
                    <div style={{width:200}}>
                    <Input type="text" defaultValue={bookname} label="Bookname" placeholder="Bookname" onChange={this.handleChange} name="bookname"/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:130}}>
                    <Input type="text" defaultValue={author} label="Author" placeholder="Author" name="author" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:130}}>
                    <Input type="text" defaultValue={language} label="Language" placeholder="Language" name="language" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:100}}>
                    <Input type="number" defaultValue={price} label="Price" placeholder="Price" name="price" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:100}}>
                    <Input type="number" defaultValue={year} label="Year" placeholder="Year" name="year" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <Button color="primary" type="submit" onClick={this.handleSubmit}>Add</Button>
                    </td>
                </tr>
            </tbody>
            </table>
            </div>
        )
    }
}
export default BookForm