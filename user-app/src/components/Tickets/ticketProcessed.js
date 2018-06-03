import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Picker} from 'react-native';
import styles from '../Login/Design';
import {
	StackNavigator,
  } from 'react-navigation';
import {URL} from '../Login/const';

var pickerPlaceholder = "Outcome";

export default class TicketProcessing extends Component {


    static navigationOptions = {
        title: 'Ticket Processing',
        headerStyle: {
          backgroundColor: '#8eacbb'
        },
        headerTitleStyle: {
          color: '#FFF'
        }
      }

    constructor() {
		super();

		this.state = {
            ticketOutcome: "",
            observations: ""
		}
    }

  //  onSubmitPressed() {
       //on submit pressed return back to ticket overview
 //   }
    
    render() {
        return (
            <View style={styles.container}>
					<Picker
						style = {{width: 200, borderColor: 'gray', borderWidth: 1,}}
                        selectedValue = {this.state.ticketOutcome}
                        onValueChange = {(text) => this.setState({ticketOutcome: text})}
						
					>
						<Picker.Item label = "Positive" value = "Positive" />
						<Picker.Item label = "Negative" value = "Negative" />
					</Picker>
					<TextInput
                        placeholder = "Observations"
                        placeholderTextColor="#FFF" 
                        underlineColorAndroid="transparent"
						style = {styles.input}
						onChangeText = {(text) => this.setState({observations: text})}
						value = {this.state.observations}
					/>
                    <TouchableOpacity
                      //  onPress={this.onSubmitPressed.bind(this)}
                        style={styles.buttonContainer}>
                     <Text 
                        style={styles.buttonText}>Submit</Text>
                     </TouchableOpacity>
            </View>
        );

    }
}