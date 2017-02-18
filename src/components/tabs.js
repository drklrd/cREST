import React from 'react';
import New from './new';
import History from './history';

export default class Navtabs extends React.Component {

	render(){

		return(

			<div>
				
				<ul className="nav nav-tabs">
				  <li className="active"><a data-toggle="tab" href="#new">New</a></li>
				  <li><a data-toggle="tab" href="#history">History</a></li>
				</ul>

				<div className="tab-content">
				  <div id="new" className="tab-pane fade in active">
				    	<New/>
				  </div>


				  <div id="history" className="tab-pane fade">
				    	<History />
				  </div>
				</div>

			</div>
		)

	}

}