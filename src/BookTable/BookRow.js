import React from 'react';
import { Button, Input } from 'mdbreact';

class BookRow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            edit:false,
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
        this.setState({[e.target.name]:e.target.value})
    }

    handleCancel = () =>{
        this.setState({bookname:this.state.old_bookname, author:this.state.old_author, language:this.state.old_language, price:this.state.old_price, year:this.state.old_year})
        this.setState({edit:false});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if (this.state.bookname!=="" && this.state.author!=="" && this.state.language!=="" && this.state.price!=="" && this.state.year!=="" )
            this.setState({edit:false});
        else{
            const link = document.createElement("a")
            //link.onClick = this.handleError()
            link.click()
        }
    }

    render(){
        let bookname = this.state.bookname;
        let author = this.state.author;
        let language = this.state.language;
        let price = String(this.fmoney(this.state.price));
        let year = String(this.state.year);
        let edit = this.state.edit;
        if (!edit){
            return(
                <tr>
                    <td className = 'bookname-row align-middle'>{bookname}</td>
                    <td className = 'author-row align-middle'>{author}</td>
                    <td className = 'language-row align-middle'>{language}</td>
                    <td className = 'price-row align-middle'>￥{price}</td>
                    <td className = 'year-row align-middle'>{year}</td>
                    <td className = 'action-row'>
                        <Button color="primary" onClick = {this.handleEdit}>Edit&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></Button>
                    </td>
                    <td className = 'action-row'>
                        <Button color="danger" onClick = {this.handleDelete}>Delete&nbsp;<i className="fa fa-trash" aria-hidden="true"></i></Button>
                    </td>
                </tr>
            )
        }
        else{
            return(
                <tr>
                    <td>
                    <Input type="text" defaultValue={bookname} placeholder="Bookname" onChange={this.handleChange} name="bookname"/>
                    </td> 
                    <td>
                    <Input type="text" defaultValue={author} placeholder="Author" name="author" onChange={this.handleChange}/>
                    </td> 
                    <td>
                    <Input type="text" defaultValue={language} placeholder="Language" name="language" onChange={this.handleChange}/>
                    </td> 
                    <td>
                    <Input type="number" defaultValue={price} placeholder="Price" name="price" onChange={this.handleChange}/>
                    </td> 
                    <td>
                    <Input type="number" defaultValue={year} placeholder="Year" name="year" onChange={this.handleChange}/>
                    </td> 
                    <td className = 'action'>
                        <Button color="primary" onClick = {this.handleSubmit}>Submit&nbsp;<i className="fa fa-check" aria-hidden="true"></i></Button>
                    </td>
                    <td className = 'action'>
                        <Button color="primary" onClick = {this.handleCancel}>Cancel&nbsp;<i className="fa fa-remove" aria-hidden="true"></i></Button>
                    </td>
                </tr>
            )
        }
    }
}
export default BookRow