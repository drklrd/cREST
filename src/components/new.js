import React from 'react';
import Axios from 'axios';
import AddParams from './add-params';
import ParamsBuilder from '../utils/params-builder';
import Spinner from './spinner';
import Editor from './ace-editor';
import ApiCall from '../utils/api-call';
import _ from 'underscore';

export default class New extends React.Component{

	constructor(){
		super();
		this.state = {
			response : 'Send a request to get response',
			responseFieldDisabled : true,
			selectedMethod : 'get',
			params : [],
			requestParamsKeys : [],
			requestParamsValues : [],
			requestOnRoute : false,
			requestComplete : false
		}
	}

	newRequest(){

		if( !(this.state.requestURL && this.state.requestURL.length) ) return;

		this.setState({
			requestOnRoute : true
		})

		var paramsBuilder = new ParamsBuilder(this.state.requestParamsKeys,this.state.requestParamsValues);
		var params = paramsBuilder.build();

		var requestConfig = {
			method : this.state.selectedMethod,
			url : this.state.requestURL
		};

		requestConfig.method.toLowerCase() === "get" ? requestConfig['params'] =  params : requestConfig['data'] = params;

		var request = new ApiCall(requestConfig);


		request.fire()
		.then((response)=>{
			if(response.data.success){
				this.setState({
					response : JSON.stringify(response.data,null,"\t"),
					responseFieldDisabled: false
				})
			}else{
				this.setState({
					response : JSON.stringify(response,null,"\t"),
					responseFieldDisabled: false
				})
			}
			this.setState({
				requestOnRoute : false,
				requestComplete : true
			})

		})
		.catch((err)=>{
			this.setState({
				response : JSON.stringify(err,null,"\t"),
				responseFieldDisabled: false
			})

			this.setState({
				requestOnRoute : false,
				requestComplete : true
			})
		})

	}

	handleURLChange(e){
		this.setState({
			requestURL : e.target.value
		});
	}

	handleMethodChange(e){
		this.setState({
			selectedMethod : e.target.value
		})

	}

	handleParamsChange(type,paramid,event){

		var changeOn = _.findIndex(this.state.params,{key:(paramid.toString())});

		if(type === "key"){
			this.state.requestParamsKeys[changeOn] = event.target.value;
		}else{
			this.state.requestParamsValues[changeOn] = event.target.value;
		}


	}

	removeParam(paramid){

		var where = _.findIndex(this.state.params,{key:(paramid.toString())})
		this.state.params.splice(where,1);
		this.setState({
			params : this.state.params

		})


	}

	addParams(){
		var uniqueKey = new Date().getTime();
		this.setState({
			params : this.state.params.concat(<AddParams paramid={uniqueKey} handler={this.handleParamsChange.bind(this)} remove={this.removeParam.bind(this)} key={uniqueKey} />)
		})
	}

	addHeaders(){

	}


	render(){

		if(this.state.requestOnRoute){
			var spinner = <Spinner/>;
		}

		if(this.state.requestComplete && !this.state.requestOnRoute){
			var editor = <Editor response={this.state.response} />

		}else if(!this.state.requestOnRoute) {
			var editor = <div className='info'>Send a request to get response.</div>
		}

		return(
			<div className="container-fluid new-request">
				<div className="row">
					<form>
						<div className="col-xs-2">
								<select className="form-control"  value={this.state.selectedMethod} onChange={this.handleMethodChange.bind(this)}>
									<option>GET</option>
									<option>POST</option>
									<option>PUT</option>
									<option>DELETE</option>
								</select>
						</div>
						<div className="col-xs-7">
							<div className="input-group">
								<input className="form-control" placeholder="Request URL" onChange={this.handleURLChange.bind(this)} />
								<span className="input-group-addon pointer "  onClick={this.addParams.bind(this)} >
									<span className="glyphicon glyphicon-plus-sign"></span> &nbsp;
									 Parameters
								</span>

							</div>



						</div>
						<div className="col-xs-3">

							<div className="col-xs-4">
								<button type="button" className="btn btn-primary" onClick={this.newRequest.bind(this)}> Send
								</button>
							</div>



							<div className="col-xs-6">
								<button type="button" className="btn btn-primary" onClick={this.addHeaders.bind(this)}> Headers
								</button>
							</div>

						</div>
					</form>
				</div>

				<div>
					{this.state.params.map((param,index)=>{
						return param;
					})}
				</div>

				<br/>

				{spinner}

				<div className="row">
					<div className="col-xs-12">

						{editor}

					</div>
				</div>
			</div>
		)

	}

}