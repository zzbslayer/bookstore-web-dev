import React from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';

class Book extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            edit:false,
            valid:false,
            id:this.props.num,

            bookname:this.props.book.bookname,
            author:this.props.book.author,
            language:this.props.book.language,
            price:this.props.book.price,
            year:this.props.book.year,

            old_bookname:this.props.book.bookname,
            old_author:this.props.book.author,
            old_language:this.props.book.language,
            old_price:this.props.book.price,
            old_year:this.props.book.year
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.id !== this.props.id)||(nextState.edit !== this.state.edit));
      }

    fmoney(s, n=2){
        if(s==='')
           return;
        n = n > 0 && n <= 20 ? n : 2;   
        s = parseFloat((s + "").replace(/[^\d.-]/g, "")).toFixed(n) + "";   
        let l = s.split(".")[0].split("").reverse(),   
        r = s.split(".")[1];   
        let t = "";   
        for(let i = 0; i < l.length; i ++ ) {   
            t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");   
        }   
        return t.split("").reverse().join("") + "." + r;   
    } 

    handleDelete = () => {
        this.props.deleteBook(this.props.id);
    }

    handleEdit = () => {
        this.setState({old_bookname:this.state.bookname, old_author:this.state.author, old_language:this.state.author, old_price:this.state.price, old_year:this.state.year})
        this.setState({edit:true});
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value, valid:this.state.bookname&&this.state.author&&this.state.language&&this.state.price&&this.state.year})
    }

    handleCancle = () =>{
        this.setState({bookname:this.state.old_bookname, author:this.state.old_author, language:this.state.old_language, price:this.state.old_price, year:this.state.old_year})
        this.setState({edit:false});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({edit:false});
    }

    render(){
        let bookname = this.state.bookname;
        let author = this.state.author;
        let language = this.state.language;
        let price = this.fmoney(this.state.price);
        let year = this.state.year;
        let edit = this.state.edit;
        if (!edit){
            return(
                <tr>
                    <td className = 'bookname'>{bookname}</td>
                    <td className = 'author'>{author}</td>
                    <td className = 'language'>{language}</td>
                    <td className = 'price'>￥{price}</td>
                    <td className = 'year'>{year}</td>
                    <td className = 'action'>
                        <Button bsStyle="primary" onClick = {this.handleEdit}>Edit</Button>
                    </td>
                    <td className = 'action'>
                        <Button bsStyle="danger" onClick = {this.handleDelete}>Delete</Button>
                    </td>
                </tr>
            )
        }
        else{
            return(
                <tr>
                    <Form>
                    <td>
                    <FormGroup controlId="formInlineBookname">
                    {' '}
                    <FormControl type="text" defaultValue={bookname} placeholder="Bookname" name="bookname" onChange={this.handleChange}/>
                    </FormGroup>
                    </td> 
                    <td>
                    <FormGroup controlId="formInlineAuthor">
                    {' '}
                    <FormControl type="text" defaultValue={author} placeholder="Author" name="author" onChange={this.handleChange}/>
                    </FormGroup>
                    </td> 
                    <td>
                    <FormGroup controlId="formInlineLanguage">
                    {' '}
                    <FormControl type="text" defaultValue={language} placeholder="Language" name="language" onChange={this.handleChange}/>
                    </FormGroup>
                    </td> 
                    <td>
                    <FormGroup controlId="formInlinePrice">
                    {' '}
                    <FormControl type="number" defaultValue={price} placeholder="Price" name="price" onChange={this.handleChange}/>
                    </FormGroup>
                    </td> 
                    <td>
                    <FormGroup controlId="formInlineYear">
                    {' '}
                    <FormControl type="number" defaultValue={year} placeholder="Year" name="year" onChange={this.handleChange}/>
                    </FormGroup>
                    </td> 
                    <td className = 'action'>
                        <Button bsStyle="primary" onClick = {this.handleSubmit}>Submit</Button>
                    </td>
                    <td className = 'action'>
                        <Button bsStyle="primary" onClick = {this.handleCancel}>Cancel</Button>
                    </td>
                    </Form>
                </tr>
            )
        }
    }
}
export default Book