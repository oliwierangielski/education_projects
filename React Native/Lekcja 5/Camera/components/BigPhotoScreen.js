import React, { Component } from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import { BackHandler } from "react-native"
import Button from './Button';
import CircleButton from './CircleButton';
import Upload from './../Upload'

export default class BigPhotoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resizeMode: "cover"
        };
    }

    // componentDidMount() {
    //     BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    // }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    // }

    // handleBackPress() {
    //     //tutaj wywołanie funkcji odświeżającej gallery, przekazanej w props-ach
    //     //...
    //     //powrót do ekranu poprzedniego
    //     this.props.route.params.refresh()
    //     this.props.navigation.goBack()
    //     return true;
    // }

    async deletePhoto(id) {
        await MediaLibrary.deleteAssetsAsync([id]);
        this.props.navigation.goBack()
    }



    async uploadPhoto(uri, filename){
        Upload.upload([{uri: uri, filename: filename}])

    }

    async sharePhoto(uri){
        Upload.share([{uri: uri}])

    }


    changeResizeMode(){
        this.setState({resizeMode: ((this.state.resizeMode == "cover") ? "contain" : "cover")})
    }

    render() {
        const item = this.props.route.params.item
        const uri = item.uri+"/"+item.filename
        return (
            <View>
                <Image
                    resizeMode={this.state.resizeMode}
                    style={styles.image}
                    source={{ uri: uri}}
                />
                 <View style={styles.buttonMenu}>
                    <Button title="SHARE" onPress={()=>this.sharePhoto(uri)}/>
                    <Button title="UPLOAD" onPress={()=>this.uploadPhoto(uri, item.filename)}/>
                    <Button title="DELETE" onPress={()=> this.deletePhoto(item.id)}/>
                    <CircleButton icon={((this.state.resizeMode == "cover") ? "shrink" : "arrowsalt")} size={30} color="#ea1e63" onPress={() => this.changeResizeMode()}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
    buttonMenu: {
        position: "absolute",
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        bottom: 0,
        zIndex: 1,
        padding: 30,
        backgroundColor: "rgba(61, 61, 64, 0.7)"
    }
});
