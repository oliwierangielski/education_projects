import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class FotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TouchableOpacity style={{
            width: this.props.width,
            height: this.props.height,
            position: "relative",
            margin: 2.5,
        }}
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
        >
        <Image
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: 0,
                top: 0,
                borderRadius: 10,
            }}
            source={{ uri: this.props.src }}
            resizeMode='cover'
        />
        { this.props.isItemSelected ?
        <View style={styles.overlay}>
          <Icon name="plus" size={this.props.width/3} color="#ea1e63"/>
        </View>
        :
          <></>
        }
        <Text style={{color: "#f2f2f2", width: "80%", height: 20, textAlign: "right", position: "absolute", right: 0, bottom: 0}}>{this.props.id}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  overlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(37, 37, 38,0.7)',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  }
});
