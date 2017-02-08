import React from 'react';

export default class New extends React.Component{

	render(){

		return(

			<div className="container-fluid">

				<div className="row">

					<div className="col-xs-8">

						<input className="form-control" placeholder="Request URL" />

					</div>

					<div className="col-xs-4">
						
						<button className="btn btn-primary" > Send </button>

					</div>

				</div>

				<div className="row">

					<div className="col-xs-10">

						<textarea className="form-control response-area" placeholder="Response" />

					</div>


				</div>

				

				



			</div>

		)

	}

}