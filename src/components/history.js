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

    render(){

        if(this.state.history && this.state.history.length){

            var iteratedRows = this.state.history.map((history,index)=>{
                return (
                    <tr key={index} >
                        <td> {history.url} </td>
                        <td> {history.method} </td>
                    </tr>
                )
            })
        }else{
            var iteratedRows =  [];
        }


        return(
            <div className="container-fluid new-request">
                <div className="row">
                    <div className="col-xs-12">

                        <table className="table">

                            <thead>
                                <tr>
                                    <th> Url  </th>
                                    <th> Method  </th>
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