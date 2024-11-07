import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
         <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
   button: {
      backgroundColor: "#ea1e63",
      borderRadius: 10,
      padding: 10,
      textTransfrom: "uppercase",
      alignSelf: "center",
      // margin: 25,
   },
   text: {
      color: "#ffffff",
      fontWeight: "bold"
   }
});
