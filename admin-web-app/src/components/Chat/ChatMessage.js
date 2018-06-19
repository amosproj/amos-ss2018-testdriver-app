import React, { Component } from 'react';
import { Text } from 'react-native';
import ChatImage from './ChatImage';
import ChatVideo from './ChatVideo';

export default class ChatMessage extends Component {
	render() {
		if(this.props.type === 'img'){
			<ChatImage>
				{this.props.children}
			</ChatImage>
		} else if(this.props.type === 'vid'){
			<ChatVideo>
				{this.props.children}
			</ChatVideo>
		} else if(this.props.type === 'aud'){
			//Audio
		} else {
			return (
				<Text>
					{this.props.children}
				</Text>
			);
		}
	}
}
