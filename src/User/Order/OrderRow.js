import React , { Component }from 'react'

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
                <td/>
                <td><a href={"/books/bookid/"+this.props.bookid}><img src={this.props.imgsrc} className="small-img" alt={this.props.bookname}/></a></td>
                <td><a href={"/books/bookid/"+this.props.bookid}>{this.props.bookname}</a></td>
                <td><div className="bold">￥{this.props.price}</div></td>
                <td>{this.props.amount}</td>
                <td><div className="bold price">￥{sum}</div></td>
            </tr>
        );
    }
}
export default OrderRow