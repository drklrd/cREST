import React from 'react';
import axios from 'axios';

export default class New extends React.Component{

	constructor(){
		super();
		this.state = {
			response : '',
			responseFieldDisabled : true,
			selectedMethod : 'get'
		}
	}

	newRequest(){
		axios({
			method : this.state.selectedMethod,
			url : this.state.requestURL
		})
		.then((response)=>{
			if(response.data.success){
				this.setState({
					response : JSON.stringify(response.data,null,"\t"),
					responseFieldDisabled: false
				})
			}
		})
		.catch((err)=>{
			console.log(err);
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


	render(){
		return(
			<div className="container-fluid new-request">
				<div className="row">
					<form>
						<div className="col-xs-2">
								<select className="form-control" onChange={this.handleMethodChange.bind(this)}>
									<option selected>GET</option>
									<option>POST</option>
									<option>PUT</option>
									<option>DELETE</option>
								</select>
						</div>
						<div className="col-xs-6">
							<input className="form-control" placeholder="Request URL" onChange={this.handleURLChange.bind(this)} />
						</div>
						<div className="col-xs-4">
							<button type="button" className="btn btn-primary" onClick={this.newRequest.bind(this)}  > Send </button>
						</div>
					</form>

				</div>
				<br/>
				<div className="row">
					<div className="col-xs-10 response-area">
						<textarea rows="30"  className="form-control " disabled={this.state.responseFieldDisabled} value={this.state.response} placeholder="Send a new request to get a response " />
					</div>
				</div>
			</div>
		)

	}

}