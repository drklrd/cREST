import  React from 'react';

export  default class AddParams extends React.Component{
    render(){
        return(

            <div className="row params">

                <div className="col-xs-6">
                    <div className="input-group">
                        <span className="input-group-addon pointer "  >Key</span>
                        <input className="form-control" placeholder="Type key"/>
                    </div>

                </div>

                <div className="col-xs-6">
                    <div className="input-group">
                        <span className="input-group-addon pointer "  >Value</span>
                        <input className="form-control" placeholder="Type value"/>
                    </div>

                </div>


            </div>

        )
    }
}