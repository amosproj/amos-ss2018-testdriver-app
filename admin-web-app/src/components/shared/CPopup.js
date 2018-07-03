import React, {Component} from 'react';
import {View, Text} from 'react-native';
import '../../index.css';
import Popup from "reactjs-popup";


export default class CPopup extends Component {
	render () {
		return(
			<Popup
				trigger={<img src={this.props.toggle} alt="Show Media" style={{width: 100, height: 100}}/>}
				modal
				closeOnDocumentClick
			>
				{this.props.children}
			</Popup>
		)
	}
}