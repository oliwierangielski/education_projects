import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';

export default class ImageTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{width: this.props.width, height: this.props.height, borderRadius: 20}}>
        <ImageBackground>
         <Text style={styles.title}>{this.props.title}{this.props.title}</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   text: {
      color: "#ffffff"
   }
});
