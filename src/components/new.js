import React from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import AddParams from './add-params';
import ParamsBuilder from '../utils/params-builder';

export default class New extends React.Component{

	constructor(){
		super();
		this.state = {
			response : 'Send a Request to get a response',
			responseFieldDisabled : true,
			selectedMethod : 'get',
			params : [],
			requestParamsKeys : [],
			requestParamsValues : []
		}
	}

	newRequest(){

		var paramsBuilder = new ParamsBuilder(this.state.requestParamsKeys,this.state.requestParamsValues);
		var params = paramsBuilder.build();

		var requestConfig = {
			method : this.state.selectedMethod,
			url : this.state.requestURL
		};

		requestConfig.method.toLowerCase() === "get" ? requestConfig['params'] =  params : requestConfig['data'] = params;

		axios(requestConfig)
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
		})
		.catch((err)=>{
			this.setState({
				response : JSON.stringify(err,null,"\t"),
				responseFieldDisabled: false
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

	addParams(){
		this.setState({
			params : this.state.params.concat(<AddParams paramid={this.state.params.length} handler={this.handleParamsChange.bind(this)} key={this.state.params.length} />)
		})
	}


	render(){
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
								<span className="input-group-addon pointer "  onClick={this.addParams.bind(this)} >Parameters</span>

							</div>

						</div>
						<div className="col-xs-3">
							<button type="button" className="btn btn-primary" onClick={this.newRequest.bind(this)}> Send </button>
						</div>
					</form>
				</div>

				<div>
					{this.state.params.map((param,index)=>{
						return param;
					})}
				</div>

				<br/>
				<div className="row">
					<div className="col-xs-10 response-area">
						<AceEditor
							mode="javascript"
							theme="github"
							name="Response Area"
							value={this.state.response}
							height = "590px"
							width = "890px"
							fontSize = "20px"
							editorProps={{$blockScrolling: true}}
						/>

					</div>
				</div>
			</div>
		)

	}

}