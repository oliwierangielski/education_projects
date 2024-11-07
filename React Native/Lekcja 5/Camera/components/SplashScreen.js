import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (


      <SafeAreaView style={styles.body}>
        <StatusBar></StatusBar>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeScreen")}><Text style={styles.logo}>{"Camera\nApp"}</Text></TouchableOpacity>
        <Text style={styles.description}>show gallery pictures take picture from camera save photo to device delete photos from device share photo</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    body: {
      backgroundColor: "#ea1e63",
      flexGrow: 1,
    },
    logo: {
      color: "#fff",
      fontSize: 65,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 150,
    },
    description: {
      color: "#fff",
      fontSize: 25,
      textAlign: "center",
      marginTop: 50,
      padding: 20,
    }
});
