import React from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';

export default class New extends React.Component{

	constructor(){
		super();
		this.state = {
			response : 'Send a Request to get a response',
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
						<div className="col-xs-6">
							<input className="form-control" placeholder="Request URL" onChange={this.handleURLChange.bind(this)} />
						</div>
						<div className="col-xs-4">
							<button type="button" className="btn btn-primary" onClick={this.newRequest.bind(this)}> Send </button>
						</div>
					</form>

				</div>
				<br/>
				<div className="row">
					<div className="col-xs-10 response-area">
						<AceEditor
							mode="javascript"
							theme="terminal"
							name="Respose Area"
							value={this.state.response}
							height = "590px"
							width = "890px"
							fontSize = "20px"
						/>

					</div>
				</div>
			</div>
		)

	}

}