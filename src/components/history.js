import React from 'react';

export default class History extends React.Component{

    constructor(){
        super();
        this.state = {
            history : []
        }
    }

    componentDidMount(){
        this.getHistory();
    }

    getHistory(){
        chrome.storage.local.get('requests', (result) => {

            if (!(result && result.requests && result.requests.length)) {
                var arr = [];
            }else{
                var arr = result.requests;
            }
            this.setState({
                history : arr
            });

        });
    }

    copyRequest(history){
        delete history.statusCode;
        var dummy = document.createElement("input");
        // Add it to the document
        document.body.appendChild(dummy);
        // Set its ID
        dummy.setAttribute("id", "dummy_id");
        // Output the array into it
        document.getElementById("dummy_id").value=JSON.stringify(history);
        // Select it
        dummy.select();
        // Copy its contents
        document.execCommand("copy");
        // Remove it as its not needed anymore
        document.body.removeChild(dummy);

        this.setState({
            isCopied : true
        });

        setTimeout(function(){
            this.setState({
                isCopied : false
            });
        }.bind(this),2000)
    }

    render(){

        if(this.state.history && this.state.history.length){

            var iteratedRows = this.state.history.map((history,index)=>{
                return (
                    <tr key={index} >
                        <td>
                            {history.url}

                        </td>
                        <td> {history.method.toUpperCase()} </td>
                        <td> {history && history.params &&  Object.keys(history.params).length ? 'Yes' : 'No'} </td>
                        <td> {history && history.headers && Object.keys(history.headers).length ? 'Yes' : 'No'} </td>
                        <td>
                            {history.statusCode}
                        </td>

                        <td>
                            <button  type="button" className="btn btn-success" >
                                <span className="glyphicon glyphicon-send"></span>
                            </button>
                        </td>

                        <td>
                            <button  type="button" className="btn btn-success"  onClick={this.copyRequest.bind(this,history)}>
                                <span className="glyphicon glyphicon-file"></span>
                            </button>

                        </td>
                    </tr>
                )
            })
        }else{
            var iteratedRows =  [];
        }

        if(this.state.isCopied) {
            var copiedtag = <span className="request-copied">
                                The Request has been successfully copied to your clipboard.
                            </span>
        }

        return(
            <div className="container-fluid new-request">
                <div className="row">
                    <div className="col-xs-12 col-xs-12">
                        {copiedtag}
                        <table className="table">

                            <thead>
                                <tr>
                                    <th> Url  </th>
                                    <th> Method  </th>
                                    <th> Parameters  </th>
                                    <th> Headers </th>
                                    <th> Status Code  </th>
                                    <th> Resend  </th>
                                    <th> Copy Request  </th>
                                </tr>
                            </thead>

                            <tbody>
                                {iteratedRows}
                            </tbody>



                        </table>

                    </div>
                </div>
            </div>
        )

    }

}