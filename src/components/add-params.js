import  React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';


const headerKeyValues = ['Authorization','Content-Type','Content-Length','Accept'];
const headerValueValues = ['application/json','application/xml','text/plain']

export  default class AddParams extends React.Component{



    _handleChange(directvalue){
        this.props.handler('key',this.props.paramid,this.props.addedtype,directvalue);
    }

    render(){
        if(this.props.addedtype === "params"){
            var inputElementKey = <input className="form-control" placeholder={"Type " + this.props.addedtype + " key"} onChange={this.props.handler.bind(this,'key',this.props.paramid,this.props.addedtype)} />
            var inputElementValue = <input className="form-control" placeholder={"Type " + this.props.addedtype + " value"} onChange={this.props.handler.bind(this,'value',this.props.paramid,this.props.addedtype)} />
        }else{
            var inputElementKey = <Typeahead  options={headerKeyValues}   placeholder={"Type " + this.props.addedtype + " key"} onChange={this._handleChange.bind(this)}  />
            var inputElementValue = <Typeahead  options={headerValueValues}   placeholder= {"Type " + this.props.addedtype + " value"} onChange={this._handleChange.bind(this)}  />
        }

        return(

            <div className="row params">

                <div className="col-xs-6">
                    <div className="col-xs-1">
                        <button type="button" className="btn btn-danger" onClick={this.props.remove.bind(this,this.props.paramid,this.props.addedtype)} >
                            <span className="glyphicon glyphicon-remove whitish"></span>
                        </button>
                    </div>
                    <div className="col-xs-11">
                        <div >
                            {inputElementKey}
                        </div>
                    </div>



                </div>

                <div className="col-xs-6">
                    <div className="col-xs-11">
                        <div >
                            {inputElementValue}
                        </div>
                    </div>


                </div>


            </div>

        )
    }
}