import  React from 'react';

export  default class AddParams extends React.Component{
    render(){
        return(

            <div className="row params">

                <div className="col-xs-6">
                    <div className="col-xs-1">
                        <button type="button" className="btn btn-danger" onClick={this.props.remove.bind(this,this.props.paramid,this.props.addedtype)} >
                            <span className="glyphicon glyphicon-remove whitish"></span>
                        </button>
                    </div>
                    <div className="col-xs-11">
                        <div className="input-group">
                            <span className="input-group-addon pointer "  >Key</span>
                            <input className="form-control" placeholder={"Type " + this.props.addedtype + " key"} onChange={this.props.handler.bind(this,'key',this.props.paramid,this.props.addedtype)} />
                        </div>
                    </div>



                </div>

                <div className="col-xs-6">
                    <div className="col-xs-11">
                        <div className="input-group">
                            <span className="input-group-addon pointer "  >Value</span>
                            <input className="form-control" placeholder={"Type " + this.props.addedtype + " value"} onChange={this.props.handler.bind(this,'value',this.props.paramid,this.props.addedtype)} />
                        </div>
                    </div>


                </div>


            </div>

        )
    }
}