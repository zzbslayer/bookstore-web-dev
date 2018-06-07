import React from 'react';
import { Button, Input } from 'mdbreact';

class BookForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgsrc:null,
            bookname:null,
            author:null,
            lang:null,
            price:null,
            year:null,
            count:null,
            category:null
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let book = {
            imgsrc: this.state.imgsrc,
            bookname: this.state.bookname,
            author: this.state.author,
            lang: this.state.lang,
            price: this.state.price,
            year: this.state.year,
            count: this.state.count,
            category: this.state.category,
            edit:false
        }
        this.props.addBook(book)
    }

    render = () => {
        return (
            <div className="BookForm">
            <h2>Add Books</h2>
            <table>
            <tbody>
                <tr>
                    <td>
                    <div style={{width:170}}>
                    <Input type="text" label="Imgsrc" placeholder="Bookname" onChange={this.handleChange} name="imgsrc"/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:180}}>
                    <Input type="text" label="Bookname" placeholder="Bookname" onChange={this.handleChange} name="bookname"/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:90}}>
                    <Input type="text" label="Author" placeholder="Author" name="author" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:120}}>
                    <Input type="text" label="Language" placeholder="Language" name="lang" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:100}}>
                    <Input type="text" label="Category" placeholder="Category" name="category" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:90}}>
                    <Input type="number" label="Price" placeholder="Price" name="price" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:90}}>
                    <Input type="number" label="Year" placeholder="Year" name="year" onChange={this.handleChange}/>
                    </div>
                    </td>
                    <td>
                    <div style={{width:90}}>
                    <Input type="number" label="Inventory" placeholder="Inventory" name="count" onChange={this.handleChange}/>
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