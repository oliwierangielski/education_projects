import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class RadioButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={{...styles.outerBtn, width: this.props.size, height: this.props.size, borderColor: this.props.color}}
        onPress={this.props.onPress}
      >
       {this.props.selected ?
        <View style={{...styles.innerBtn, width: this.props.size/2.2, height: this.props.size/2.2, backgroundColor: this.props.color}}></View>
        : <></>
        }

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    outerBtn: {
        borderWidth: 3,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    innerBtn: {
        borderRadius: "100%",
    }
});