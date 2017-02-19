import React from 'react';
import Axios from 'axios';
import AddParams from './add-params';
import ParamsBuilder from '../utils/params-builder';
import Spinner from './spinner';
import Editor from './ace-editor';
import ApiCall from '../utils/api-call';
import _ from 'underscore';
import ReactDatalist from 'react-datalist';

var options = ['apple','orange','pear','pineapple','melon']

export default class New extends React.Component{

	constructor(){
		super();
		this.state = {
			response : 'Send a request to get response',
			responseFieldDisabled : true,
			selectedMethod : 'get',
			params : [],
			headers : [],
			requestParamsKeys : [],
			requestParamsValues : [],
			requestHeaderKeys : [],
			requestHeaderValues : [],
			requestOnRoute : false,
			requestComplete : false,
			groupOpenHeader : true,
			groupOpenParameter : true,
			previousUrls : [],
			requestUrl : ''
		}
	}

	saveLinks(requestConfig) {



		chrome.storage.local.get('requests', (result) => {

			if (!(result && result.requests && result.requests.length)) {
				var arr = [];
			}else{
				var arr = result.requests;
			}

			chrome.storage.local.set({
				'requests': arr.concat(requestConfig)
			})

		})
	}

	componentWillMount(){
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
				previousUrls : arr.map(function(request){
					return request.url;
				})
			});

		});
	}

	newRequest(){

		this.setState({
			groupOpenHeader : !this.state.groupOpenHeader,
			groupOpenParameter : !this.state.groupOpenParameter
		})

		if( !(this.state.requestURL && this.state.requestURL.length) ) return;

		this.setState({
			requestOnRoute : true
		})

		var params = new ParamsBuilder(this.state.requestParamsKeys,this.state.requestParamsValues).build();

		var headers = new ParamsBuilder(this.state.requestHeaderKeys,this.state.requestHeaderValues).build();

		var requestConfig = {
			method : this.state.selectedMethod,
			url : this.state.requestURL
		};

		requestConfig.method.toLowerCase() === "get" ? requestConfig['params'] =  params : requestConfig['data'] = params;
		requestConfig['headers'] = headers;

		var request = new ApiCall(requestConfig);


		request.fire()
		.then((response)=>{

			this.setState({
				response : JSON.stringify(response.data,null,"\t"),
				responseFieldDisabled: false,
				requestOnRoute : false,
				requestComplete : true
			})

			requestConfig.statusCode = response.status;

			this.saveLinks(requestConfig);

		})
		.catch((err)=>{

			requestConfig.statusCode = 'Failed';
			this.saveLinks(requestConfig);
			this.setState({
				response : JSON.stringify(err,null,"\t"),
				responseFieldDisabled: false,
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

	handleURLSelected(url){
		this.setState({
			requestURL : url
		});
	}

	handleMethodChange(e){
		this.setState({
			selectedMethod : e.target.value
		})

	}

	handleParamsChange(type,paramid,addedtype,value){

		var changeOn = _.findIndex(this.state[addedtype],{key:(paramid.toString())});

		if(type === "key"){
			var toChange = addedtype === "params" ? this.state.requestParamsKeys : this.state.requestHeaderKeys;
		}else{
			var toChange = addedtype === "params" ? this.state.requestParamsValues : this.state.requestHeaderValues;
		}

		toChange[changeOn] =  (value && value.target && value.target.value)  ? value.target.value : value;

	}



	removeParam(paramid,addedtype){

		var where = _.findIndex(this.state[addedtype],{key:(paramid.toString())})
		this.state[addedtype].splice(where,1);
		var stateChange = {};
		stateChange[addedtype] = this.state[addedtype]
		this.setState(stateChange);




	}

	addParams(type){
		var uniqueKey = new Date().getTime();
		var stateChange = {};
		stateChange[type] = this.state[type].concat(<AddParams paramid={uniqueKey}  addedtype={type} handler={this.handleParamsChange.bind(this)} remove={this.removeParam.bind(this)} key={uniqueKey} />);

		this.setState(stateChange);


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

		var classTagParameter = "panel-collapse collapse " + (this.state.groupOpenParameter ? ' in' : '');

		if(this.state.params.length){
			var paramsGroup = 	<div className="panel-group" id="accordionparams">
									<div className="panel panel-default">
										<div className="panel-heading">
											<h4 className="panel-title">
												<a className="accordion-toggle" data-toggle="collapse" data-parent="#accordionparams" href="#collapseparams">Parameters</a>
											</h4>
										</div>
										<div id="collapseparams" className={classTagParameter}>
											<br/>
											{this.state.params.map((param,index)=>{
												return param;
											})}
											<br/>
										</div>
									</div>
								</div>




		}

		var classTagHeader = "panel-collapse collapse " + (this.state.groupOpenHeader ? ' in' : '');

		if(this.state.headers.length){
			var headersGroup = 	<div className="panel-group" id="accordionheaders">
									<div className="panel panel-default">
										<div className="panel-heading">
											<h4 className="panel-title">
												<a className="accordion-toggle" data-toggle="collapse" data-parent="#accordionheaders" href="#collapseheaders">Headers</a>
											</h4>
										</div>
										<div id="collapseheaders" className={classTagHeader}>
											<br/>
											<div>
												{this.state.headers.map((param,index)=>{
													return param;
												})}
											</div>

											<br/>
										</div>
									</div>
								</div>



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
						<div className="col-xs-6">
							<ReactDatalist placeholder="Request URL * (Required)" className="form-control" list="request" options={this.state.previousUrls} forcePoly={true} autoPosition={false} onInputChange={this.handleURLChange.bind(this)}  onOptionSelected={this.handleURLSelected.bind(this)} />




						</div>
						<div className="col-xs-4">

							<div className="col-xs-2">
								<button disabled={!(this.state.requestURL && this.state.requestURL.length)} type="button" className="btn btn-success" onClick={this.newRequest.bind(this)}>
									<span className="glyphicon glyphicon-send"></span> &nbsp;
								</button>
							</div>



							<div className="col-xs-10">
								<div className="col-xs-6">
									<button type="button" className="btn btn-primary" onClick={this.addParams.bind(this,'headers')}>
										<span className="glyphicon glyphicon-plus-sign"></span> &nbsp;
										Headers
									</button>
								</div>


								<div className="col-xs-6">
									<button type="button" className="btn btn-warning" onClick={this.addParams.bind(this,'params')}>
										<span className="glyphicon glyphicon-plus-sign"></span> &nbsp;
										Parameters
									</button>
								
								</div>
								

								

							</div>

						</div>
					</form>
				</div>
				<br/>

				<div>
					{paramsGroup}
				</div>

				<div>
					{headersGroup}
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