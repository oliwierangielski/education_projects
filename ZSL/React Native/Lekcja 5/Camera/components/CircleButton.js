import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
export default class CircleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Icon name={this.props.icon} size={this.props.size} color={this.props.color ?? "#ca76f5"}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "rgba(88, 85, 89,0.7)",
        alignSelf: "center",
        padding: 15,
        borderRadius: "100%",
    }
});
