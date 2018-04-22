import React, {Component} from 'react'
import {Button} from 'mdbreact'

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.searchBooks = this.props.searchBooks
        this.state={
            bookname:null,
            author:null,
            lang:null,

            up_price:null,
            down_price:null,

            up_year:null,
            down_year:null,
            
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let searchInfo = "bookname="+encodeURIComponent(this.state.bookname)+
            "&author="+ encodeURIComponent(this.state.author)+
            "&lang="+ encodeURIComponent(this.state.lang)+
            "&down_price="+ encodeURIComponent(this.state.down_price === null ? 0 : this.state.down_price)+
            "&up_price="+ encodeURIComponent(this.state.up_price === null ? 99999 : this.state.up_price)+
            "&down_year="+ encodeURIComponent(this.state.down_year === null ? 0 : this.state.down_year)+
            "&up_year="+ encodeURIComponent(this.state.up_year === null ? 9999 : this.state.up_year)
        console.log(searchInfo)
        this.searchBooks(searchInfo);
    }

    render = () => {
        return(
            <div className="SearchBar-container">
            <table>
            <tbody>
                <tr>
                <td><div className="BarTitle">Bookname: </div></td>
                <td>
                    <input class="form-control form-control-sm" type="text" placeholder="Bookname" onChange={this.handleChange} name="bookname"/>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td><div className="BarTitle">Author: </div></td>
                <td>
                    <input class="form-control form-control-sm" type="text" placeholder="Author" onChange={this.handleChange} name="author"/>
                </td>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td><div className="BarTitle">Language: </div></td>
                <td>
                <input class="form-control form-control-sm" type="text" placeholder="Language" onChange={this.handleChange} name="lang"/>
                </td>
                </tr> 
            </tbody>
            </table>
            <table>
            <tbody>
            <tr>
                <td><div className="BarTitle">Price: </div></td>
                <td>
                    <input class="form-control form-control-sm" type="text" placeholder="from" onChange={this.handleChange} name="down_price"/>
                </td>
                <td>~</td>
                <td>
                    <input class="form-control form-control-sm" type="text" placeholder="to" onChange={this.handleChange} name="up_price"/>
                </td>
                <td/>
                <td>&nbsp;&nbsp;&nbsp;</td>
                <td><div className="BarTitle"> Year: </div></td>
                <td>
                <input class="form-control form-control-sm" type="text" placeholder="from" onChange={this.handleChange} name="down_year"/>
                </td>
                <td>~</td>
                <td>
                <input class="form-control form-control-sm" type="text" placeholder="to" onChange={this.handleChange} name="up_year"/>
                </td>
                <td>
                    <Button color="primary" type="submit" onClick={this.handleSubmit}>Search</Button>
                </td>
                </tr>
            </tbody>
            </table>
            <hr/>
            </div>
        )
    }
}
export default SearchBar