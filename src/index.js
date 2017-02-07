import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component{

	render(){
		return(
			<div>
		        <div className="container">
		        <button className="btn-primary">Test</button>
		        </div>
			</div>

		)
	}

}


ReactDOM.render(<App/>,document.getElementById("app"));

