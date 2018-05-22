import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/Login/login';
import ProjectList from './components/Project/ProjectList';
import ProjectAdd from './components/Project/ProjectAdd';
import TicketCreate from './components/Project/TicketCreate';
import TicketList from './components/Project/TicketList';
import UserList from './components/Project/UserList';
import UserAdd from './components/Project/UserAdd';
import registerServiceWorker from './registerServiceWorker';
import {registerFunc, getState} from './components/shared/GlobalState';
import {isAuth} from './components/shared/auth';

class Page extends Component{
	handleGlobalState (){
		this.setState ({
			isAuth: getState().isAuth,
			show: getState().show,
			param: getState().param,
			name: getState().name
		});
	}

	constructor (props) {
		super (props);
		this.state = {
			isAuth: false
		};
		registerFunc (this.handleGlobalState.bind(this));
		this.checkAuth();
	}
	async checkAuth () {
		if (await isAuth())
			this.setState({
				isAuth: true
			});
	}

	render() {
		if(!this.state.isAuth){
			return(<Login />);
		}
		switch (this.state.show){
			case 'addProject':
				return (<ProjectAdd project={this.state.param} name={this.state.name}/>);
			case 'listUsers':
				return (<UserList project={this.state.param} name={this.state.name}/>);
			case 'addUser':
				return (<UserAdd project={this.state.param}/>);
			case 'createTicket':
				return (<TicketCreate project={this.state.param} name={this.state.name}/>);
			case 'showTickets':
				return (<TicketList project={this.state.param} name={this.state.name}/>);
			default:
				return (<ProjectList/>);
		}
	}
}

ReactDOM.render(<Page />, document.getElementById('root'));
registerServiceWorker();
