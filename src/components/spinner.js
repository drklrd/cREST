import  React from 'react';

export  default class Spinner extends React.Component{
    render(){
        return(

        <div className="row" >
            <br/>
            <div className="col-xs-offset-5">
                <i className="fa fa-spinner fa-spin fa-3x fa-fw margin-bottom"></i>
            </div>
        </div>



        )
    }
}