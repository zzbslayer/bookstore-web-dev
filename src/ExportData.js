import React from 'react';
import { Button } from 'mdbreact';

class ExportData extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:this.props.data,
        }
    }

    exportJSON = () => {
        const blob = new Blob([JSON.stringify(this.state.data)], {type: "application/json"})
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = "bookdata.json"
        link.click()
        URL.revokeObjectURL(link.href)
    }

    exportCSV = () => {
        const Json2csvParser = require('json2csv').Parser;
        const fields = ['bookname', 'author', 'language', 'price', 'year'];
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(this.state.data);

        const blob = new Blob([csv], {type: "text/plain"})
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = "bookdata.csv"
        link.click()
        URL.revokeObjectURL(link.href)
    }

    render(){
        return (
            <div className="ExportData">
            <h2>ExportData</h2>
            <table>
            <tbody>
                <tr>
                    <td>
                    <Button className="align-bottom" color="primary" onClick={this.exportJSON}>Export JSON</Button>
                    </td>
                    <td>
                    <Button color="primary" onClick={this.exportCSV}>Export CSV</Button>
                    </td>
                </tr>
            </tbody>
            </table>
            </div>
        )
    }
}
export default ExportData
