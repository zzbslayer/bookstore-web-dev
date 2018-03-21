import React from 'react';
import { Button, Input } from 'mdbreact';

class Book extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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
        console.log("id:"+this.props.id)
    }

    handleEdit = () => {
        this.setState({old_bookname:this.state.bookname, old_author:this.state.author, old_language:this.state.author, old_price:this.state.price, old_year:this.state.year})
        this.setState({edit:true});
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value, valid:this.state.bookname&&this.state.author&&this.state.language&&this.state.price&&this.state.year})
    }

    handleCancel = () =>{
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
        let price = String(this.fmoney(this.state.price));
        let year = String(this.state.year);
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
                        <Button color="primary" onClick = {this.handleEdit}>Edit&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></Button>
                    </td>
                    <td className = 'action'>
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
                        <Button color="primary" onClick = {this.handleSubmit}>Submit&nbsp;<i class="fa fa-check" aria-hidden="true"></i></Button>
                    </td>
                    <td className = 'action'>
                        <Button color="primary" onClick = {this.handleCancel}>Cancel&nbsp;<i class="fa fa-remove" aria-hidden="true"></i></Button>
                    </td>
                </tr>
            )
        }
    }
}
export default Book