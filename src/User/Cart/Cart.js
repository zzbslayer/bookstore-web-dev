import React, {Component} from 'react'
import Sticky from 'react-stickky';
import CartRow from './CartRow'
import { Table, Button } from 'mdbreact'
import { Link } from 'react-router-dom'
import { proxy } from '../../Global'
import Cookies from 'universal-cookie'
import { message } from 'antd'

const cookies = new Cookies();

let result = []

class Cart extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:null,
        }
        this.initMsg()
    }

    initMsg = () => {
        let login = cookies.get("login")
        if (login==='null' || login===null || typeof(login)==='undefined'){
            window.location.href = '/login'
            return;
        }
        fetch(proxy+"/user/cart",{
            method: 'get',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
                data: result
            });
        },
        (error) => {
            message.error(error)
            }
        )
    }

    fmoney = (s, n=2) => {
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

    changeSelect = (cartid) =>{
        let data = this.state.data
        for (let i in data){
            if (data[i].cartid===cartid){
                data[i].select = !data[i].select;
                break;
            }
        }
        this.setState({data: data})
    }

    changeAmount = (cartid,amount) =>{
        let data = this.state.data
        for (let i in data){
            if (data[i].cartid===cartid){
                data[i].amount = amount;
                break;
            }
        }
        this.setState({data: data})
    }

    deleteOneBook = (cartid) => {
        let msg = "cartid="+encodeURIComponent(cartid)
        fetch(proxy+"/user/cart/delete",{
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
            body: msg
        })
        for (let i in result){
            if (result[i].cartid===cartid){
                result.splice(i,1);
                break;
            }
        }
    }

    deleteBook = (cartid) => {
        result = this.state.data
        this.deleteOneBook(cartid);
        this.setState({data:result});
    }

    getSum = (data) => {
        let sum = 0
        for (let i in data){
            let book = data[i]
            if (book.select)
                sum += book.price * 100 * book.count
        }
        sum = sum/100
        return this.fmoney(sum)
    }

    getSelectNum = (data) =>{
        let num = 0;
        for (let i in data){
            if (data[i].select){
                num ++
            }
        }
        return num
    }

    getSelectBook = (data) => {
        let re = ""
        for (let i in data){
            if (data[i].select){
                re+=data[i].bookid+";"+data[i].count+"&"
            }
        }
        return re.slice(0,-1)
    }

    deleteSelect = () =>{
        let cartid=[]
        let data = this.state.data
        for (let i in data){
            if (data[i].select){
                cartid.push(data[i].cartid)
            }
        }
        result = this.state.data
        for (let j in cartid){
            this.deleteOneBook(cartid[j])
        }
        this.setState({data: result})
    }

    render(){
        let data = this.state.data
        let num = this.getSelectNum(data)
        let sum = "￥" + this.getSum(data)
        let selectbook = this.getSelectBook(data)
        return(
            <div className="big-container">
                <Sticky className="stickyStyle" stickyWidth="1100px">
                            <div className="floatingbar">
                            <div className="float-left center bold">
                                <Button size="sm" color="danger" onClick = {this.deleteSelect}>Delete&nbsp;<i className="fa fa-trash" aria-hidden="true"></i></Button>
                            &nbsp;&nbsp;
                                <Button size="sm" color="cyan" onClick = {this.handleShare}>Share&nbsp;<i className="fa fa-share-alt" aria-hidden="true"></i></Button>
                            </div>

                            <div className="float-right center bold">
                            <span className="price">{num}&nbsp;</span><span>book(s) selected</span>
                            &nbsp;&nbsp;
                            <span>Sum:</span><span className="price">{sum}</span>
                            &nbsp;&nbsp;
                            <Link to={"/buy/"+ selectbook}><Button color="amber">Buy it now</Button></Link>
                            </div>
                            </div>
                </Sticky>
                <Table>
                    <thead>
                        <tr>
                            <td>
                                Select
                            </td>
                            <td>
                                Books Info
                            </td>
                            <td/>
                            <td>
                                Unit Price
                            </td>
                            <td>
                                Amount
                            </td>
                            <td/>
                            <td>
                                Total Price
                            </td>
                            <td>
                                Actions
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (data===null||typeof(data)==='undefined')?(<tr/>):(
                           data.map( (book) => {
                            return <CartRow key={book.cartid} cartid={book.cartid} bookid={book.bookid} bookname={book.bookname} href={"/books/"+book.bookid} imgsrc={book.imgsrc} price={book.price} amount={book.count} select={book.select} deleteBook={this.deleteBook} changeAmount={this.changeAmount} changeSelect={this.changeSelect}/>
                        },this))
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Cart