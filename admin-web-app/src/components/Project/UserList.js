import React, { Component } from 'react';
import {ActivityIndicator,Button,View,Text} from 'react-native';
import ReactTable from 'react-table';
import {getAuth} from '../shared/auth';
import {URL} from '../shared/const';
import { setState } from '../shared/GlobalState';
import UpdateUserButton from './UpdateUserButton';
import DeleteUserButton from './DeleteUserButton';
import 'react-table/react-table.css';
import '../../index.css';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom'

var pickerPlaceholder = "Category";

export default class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
		const cookies = new Cookies();

		console.log(cookies.get('myCat')); // Pacman
	}

	componentDidMount() {
		var url = URL;
		if (this.props.project !== '' && typeof this.props.project !== "undefined") {
			url += '/projects/' + this.props.project + '/users';
		} else {
			url += '/users';
		}
		return fetch(url, {method:'GET', headers: getAuth()})
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				isLoading: false,
				dataSource: responseJson
			}, function() {});
		}).catch((error) => {
			console.error(error);
		});
	}

	showAddUser () {
		setState({
			isAuth: true,
			show: 'addUser',
			id: ''
		});
	}

	showCreateTicket () {
		setState({
			isAuth: true,
			show: 'createTicket',
			param: this.props.project,
			name: this.props.name,
			tName: '',
			tSummary: '',
			tDescription: '',
			tCategory: pickerPlaceholder,
			tRequiredObservations: '',
			tId: '0'
		});
	}

	showTicketList () {
		setState({
			isAuth: true,
			show: 'showTickets',
			param: this.props.project,
			name: this.props.name,
			tName: '',
			tSummary: '',
			tDescription: '',
			tCategory: pickerPlaceholder,
			tRequiredObservations: '',
			tId: '0'
		});
	}

	showProjectList () {
		setState({
			isAuth: true,
			show: ''
		});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{flex: 1,padding: 20}}>
					<ActivityIndicator/>
				</View>
			)
		}

		if (this.props.project !== '' && typeof this.props.project !== "undefined") {
			return (// TODO: add home icon instead of text here
				<View>
					<View>
						<Text
							onPress = { this.showProjectList.bind(this) }
							style={{color: '#5daedb'}}
						>
							HOME
						</Text> 
					</View>
					<View style={{flex:1}}>
						<Button
							title = {" "}
							color = "#0c3868"
						/>
					</View>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex:1}}>
							<Button
								onPress = { this.showTicketList.bind(this) }
								title = {"Tickets of " + this.props.name}
								color = "#0e4a80"
							/>
						</View>
						<View style={{flex:1}}>
							<Button
								onPress = { function doNothing() {} }
								disabled = {true}
								title = {"Users of " + this.props.name}
							/>
						</View>
					</View>
					<ReactTable data={this.state.dataSource} defaultPageSize={10} showPagination={false} columns={ [
						{
							Header: 'Given Name',
							accessor: 'firstName'
						}, {
							Header: 'Surname',
							accessor: 'lastName'
						}, {
							Header: 'Login Name',
							accessor: 'loginName',
							show: false
						}, {
							Header: 'Password',
							accessor: 'password',
							show: false
						}, {
							Header: 'Phone Number',
							accessor: 'phone' // String-based value accessors!
						}, {
							Header: '',
							accessor: '',
							Cell: props => <DeleteUserButton proj={props} keyFromParent={this.props.project} nameFromParent={this.props.name}/>
						}
					] }/>
					<View>
						<Link to = "/" style={{textDecoration: 'none'}} >
						<Button
							onPress = { this.showProjectList.bind(this) }
							title = "Back to Projects"
							color = "#0e4a80"
						/>
						</Link>
					</View>
				</View>
			);
		}
		return(// TODO: add home icon instead of text here
			<View>
				<View>
					<Text
						onPress = { this.showProjectList.bind(this) }
						style={{color: '#5daedb'}}
					>
						HOME
					</Text> 
				</View>
				<View>
					<Button
						onPress = { this.showAddUser.bind(this) }
						title = "Add User"
						color = "#0c3868"
					/>
				</View>
				<View style={{flexDirection: 'row'}}>
					<View style={{flex:1}}>
						<Button
							onPress = { this.showProjectList.bind(this) }
							title = "Projects"
							color = "#0e4a80"
						/>
					</View>
					<View style={{flex:1}}>
						<Button
							onPress = { function doNothing() {} }
							disabled = {true}
							title = {"Users"}
						/>
					</View>
				</View>
				<ReactTable data={this.state.dataSource} defaultPageSize={10} showPagination={false} columns={ [
					{
						Header: 'Given Name',
						accessor: 'firstName'
					}, {
						Header: 'Surname',
						accessor: 'lastName'
					}, {
						Header: 'Login Name',
						accessor: 'loginName',
						show: false
					}, {
						Header: 'Password',
						accessor: 'password',
						show: false
					}, {
						Header: 'Phone Number',
						accessor: 'phone' // String-based value accessors!
					}, {
						Header: '',
						accessor: '',
						Cell: props => <UpdateUserButton proj={props}/>
					}, {
						Header: '',
						accessor: '',
						Cell: props => <DeleteUserButton proj={props} keyFromParent={this.props.project} nameFromParent={this.props.name}/>
					}
				] }/>
			</View>
		);
	}
}
