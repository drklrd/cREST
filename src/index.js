import React from 'react';
import ReactDOM from 'react-dom';
import Navtabs from './components/tabs.js';

class App extends React.Component{

	render(){
		return(
			<div>
		        <Navtabs />
			</div>

		)
	}

}


ReactDOM.render(<App/>,document.getElementById("app"));

