import React from 'react';
import { Button, Input } from 'mdbreact';
import { message } from 'antd'
import { proxy } from '../../Global'

class BookRow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            edit:false,
            bookid: this.props.book.bookid,

            imgsrc:this.props.book.imgsrc,
            bookname:this.props.book.bookname,
            author:this.props.book.author,
            lang:this.props.book.lang,
            price:this.props.book.price,
            year:this.props.book.year,
            count:this.props.book.count,

            old_imgsrc:this.props.book.imgsrc,
            old_bookname:this.props.book.bookname,
            old_author:this.props.book.author,
            old_lang:this.props.book.lang,
            old_price:this.props.book.price,
            old_year:this.props.book.year,
            old_count:this.props.book.count
        }
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
        this.props.deleteBook(this.props.book.bookid);
    }

    handleEdit = () => {
        this.setState({old_bookname:this.state.bookname, old_author:this.state.author, old_lang:this.state.author, old_price:this.state.price, old_year:this.state.year, old_count:this.state.count, old_imgsrc:this.state.imgsrc})
        this.setState({edit:true});
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleCancel = () =>{
        this.setState({bookname:this.state.old_bookname, author:this.state.old_author, lang:this.state.old_lang, price:this.state.old_price, year:this.state.old_year, imgsrc:this.state.old_imgsrc, count: this.state.old_count})
        this.setState({edit:false});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if (this.state.bookname!=="" && this.state.author!=="" && this.state.lang!=="" && this.state.price!=="" && this.state.year!=="" && this.state.count!=="" && this.state.imgsrc!==""){
            let msg = "bookname="+ encodeURIComponent(this.state.bookname) +
                "&author="+encodeURIComponent(this.state.author) +
                "&lang="+encodeURIComponent(this.state.lang)+
                "&price="+encodeURIComponent(this.state.price)+
                "&year="+encodeURIComponent(this.state.year)+
                "&count="+encodeURIComponent(this.state.count)+
                "&imgsrc="+encodeURIComponent(this.state.imgsrc)+
                "&bookid="+encodeURI(this.state.bookid)

            fetch(proxy+"/admin/books/update", {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                  },
                body: msg
            })
            .then(res => res.json())
            .then(
            (result) => {
                message.success("Edit Success")
                this.setState({edit:false});
            },
            (error) => {
                message.error("Edit Book Error:\n"+error)
                }
            )
        }
            
        else{
            message.error("Info Cannot Be Empty")
        }
    }

    render(){
        let imgsrc = this.state.imgsrc
        let bookname = this.state.bookname;
        let author = this.state.author;
        let lang = this.state.lang;
        let price = String(this.fmoney(this.state.price));
        let year = String(this.state.year);
        let edit = this.state.edit;
        let count = String(this.state.count)
        if (!edit){
            return(
                <tr>
                    <td><img src={imgsrc} alt={bookname} className="small-img"/></td>
                    <td className = 'bookname-row align-middle'>{bookname}</td>
                    <td className = 'author-row align-middle'>{author}</td>
                    <td className = 'lang-row align-middle' style={{width:100}}>{lang}</td>
                    <td className = 'price-row align-middle'style={{width:70}}>￥{price}</td>
                    <td className = 'year-row align-middle' style={{width:70}}>{year}</td>
                    <td className = 'inventory-row align-middle' style={{width:80}}>{count}</td>
                    <td className = 'action-row'>
                        <div style={{width:135}}>
                        <Button color="primary" onClick = {this.handleEdit}>Edit&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></Button>
                        </div>
                    </td>
                    <td className = 'action-row'>
                        <div style={{width:150}}>
                        <Button color="danger" onClick = {this.handleDelete}>Delete&nbsp;<i className="fa fa-trash" aria-hidden="true"></i></Button>
                        </div>
                    </td>
                </tr>
            )
        }
        else{
            return(
                <tr>
                    <td>
                    <Input type="text" defaultValue={imgsrc} placeholder="Imgsrc" onChange={this.handleChange} name="imgsrc"/>
                    </td>
                    <td>
                    <Input type="text" defaultValue={bookname} placeholder="Bookname" onChange={this.handleChange} name="bookname"/>
                    </td> 
                    <td>
                    <Input type="text" defaultValue={author} placeholder="Author" name="author" onChange={this.handleChange}/>
                    </td> 
                    <td>
                    <div style={{width:80}}>
                    <Input type="text" defaultValue={lang} placeholder="Language" name="lang" onChange={this.handleChange}/>
                    </div>
                    </td> 
                    <td>
                    <div style={{width:80}}>
                    <Input type="number" defaultValue={price} placeholder="Price" name="price" onChange={this.handleChange}/>
                    </div>
                    </td> 
                    <td>
                    <div style={{width:50}}>
                    <Input type="number" defaultValue={year} placeholder="Year" name="year" onChange={this.handleChange}/>
                    </div>
                    </td> 
                    <td>
                    <div style={{width:50}}>
                    <Input type="number" defaultValue={count} placeholder="Inventory" name="count" onChange={this.handleChange}/>
                    </div>
                    </td> 
                    <td className = 'action'>
                        <div style={{width:150}}>
                        <Button color="primary" onClick = {this.handleSubmit}>Submit&nbsp;<i className="fa fa-check" aria-hidden="true"></i></Button>
                        </div>
                    </td>
                    <td className = 'action'>
                        <div style={{width:150}}>
                        <Button color="primary" onClick = {this.handleCancel}>Cancel&nbsp;<i className="fa fa-remove" aria-hidden="true"></i></Button>
                        </div>
                    </td>
                </tr>
            )
        }
    }
}
export default BookRow