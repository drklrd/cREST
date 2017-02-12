import React from 'react';
import Axios from 'axios';
import AddParams from './add-params';
import ParamsBuilder from '../utils/params-builder';
import Spinner from './spinner';
import Editor from './ace-editor';
import ApiCall from '../utils/api-call';

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


		request.fire(requestConfig)
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

		if(type === "key"){
			this.state.requestParamsKeys[paramid] = event.target.value;
		}else{
			this.state.requestParamsValues[paramid] = event.target.value;
		}


	}

	removeParam(paramid){

		this.state.params.splice(paramid,1);

		this.setState({
			params : this.state.params

		})


	}

	addParams(){
		this.setState({
			params : this.state.params.concat(<AddParams paramid={this.state.params.length} handler={this.handleParamsChange.bind(this)} remove={this.removeParam.bind(this)} key={this.state.params.length} />)
		})
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
							<button type="button" className="btn btn-primary" onClick={this.newRequest.bind(this)}> Send
							</button>

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