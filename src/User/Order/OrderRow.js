import React , { Component }from 'react'
import {Button} from 'mdbreact'

class OrderRow extends Component {
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

    render(){
        let sum = this.fmoney(this.props.price * 100  * this.props.amount /100)
        return(
            <tr>
                <td><div style={{width:80}}><img src={this.props.imgsrc} className="small-img" alt={this.props.bookname}/></div></td>
                <td><div style={{width:120}}>{this.props.bookname}</div></td>
                <td><div style={{width:180}}>{this.props.address}</div></td>
                <td><div>{this.props.recipient}</div></td>
                <td><div>{this.props.phone}</div></td>
                <td><div>￥{this.props.price}*{this.props.amount}=￥{sum}</div></td>
                <td><div><Button color="primary" size="sm">Action</Button></div></td>
            </tr>
        );
    }
}
export default OrderRow