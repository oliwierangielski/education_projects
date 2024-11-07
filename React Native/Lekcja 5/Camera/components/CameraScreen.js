import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from "expo-camera";
import CircleButton from './CircleButton';
import * as MediaLibrary from "expo-media-library";
import { BackHandler } from "react-native"
import CameraMenu from './CameraMenu';
import RadioGroup from './RadioGroup';
export default class CameraScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null, // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back, // typ kamery
            settingsList: {},
            cameraSettings: {}
        };
        this.radioGroup = {}
    }

    async componentDidMount() {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });
        // BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

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

    changeCameraType() {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    async takePhoto() {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
            alert(JSON.stringify(asset, null, 4))
        }
    }

    change = (data) => {
        let currentSettings = this.state.cameraSettings
        currentSettings[data.groupName] = this.state.settingsList[data.groupName][data.option]
        let pictreSize = {
            "16:9": ["1280x720", "1920x1080", "2560x1440", "3840x2160"],
            "4:3": ["640x480", "800x600", "1024x768", "1280x960", "1600x1200"]
        }
        if(data.groupName == "ratio"){
            currentSettings["PictureSize"] = pictreSize[currentSettings[data.groupName]][0] // zmiana rozmiaru obrazka na defaultowy
            let settingsList = this.state.settingsList
            this.radioGroup["PictureSize"].changeSelected(0)
            settingsList["PictureSize"] = pictreSize[currentSettings[data.groupName]]
            this.setState({settingsList: settingsList})
        }
        this.setState({ cameraSettings: currentSettings })
        // console.log(currentSettings)
    }

    setMenuData() {




        let settingsList = {}
        Object.keys(Camera.Constants).forEach((key, index) => {
            settingsList[key] = Object.keys(Camera.Constants[key])
        })
        settingsList["ratio"] = ["16:9", "4:3"],
        settingsList["PictureSize"] = ["1280x720", "1920x1080", "2560x1440", "3840x2160"]
        this.setState({ settingsList: settingsList })

        let defaultSettings = {}
        Object.keys(settingsList).forEach((key, index) => {
            defaultSettings[key] = settingsList[key][0]
        })
        this.setState({cameraSettings: defaultSettings})
        console.log(defaultSettings)
    }

    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <CameraMenu
                    ref={instance => this.child = instance}
                    styles={styles.CameraMenu}
                    title="SETTINGS"
                    menuContent={

                        Object.keys(this.state.settingsList).map((key, i) => {
                            return (<RadioGroup
                                key={i}
                                color="#ea1e63"
                                direction="column"
                                change={this.change}
                                data={this.state.settingsList[key]}
                                groupName={key}
                                ref={(ref) => this.radioGroup[key] = ref}/>)
                        })


                        // <RadioGroup
                        // color="#ea1e63"
                        // direction="column"
                        // change={this.change}
                        // data={[1,2,3,4]}
                        // groupName="RADIOGROUP TITLE"/>
                    }
                >
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        onCameraReady={async () => await this.setMenuData()}
                        style={{ flex: 1 }}
                        type={this.state.type}
                        ratio={this.state.cameraSettings["ratio"] }
                        whiteBalance={this.state.cameraSettings["WhiteBalance"]}
                        pictureSize={this.state.cameraSettings["PictureSize"]}
                        flashMode={this.state.cameraSettings["FlashMode"]}
                        autoFocus={this.state.cameraSettings["AutoFocus"]}
                        videoStabilizationMode={this.state.cameraSettings["VideoStabilization"]}
                        >

                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <View style={{ flex: "0 0 100%", flexDirection: "row", justifyContent: "space-between", padding: 10, marginBottom: 20 }}>
                                <CircleButton size={60} icon="retweet" color="#ea1e63" onPress={() => this.changeCameraType()} />
                                <CircleButton size={90} icon="plus" color="#eb608f" onPress={async () => await this.takePhoto()} />
                                <CircleButton size={60} icon="setting" color="#ea1e63" onPress={() => this.child.toggle()} />
                            </View>
                        </View>
                    </Camera>
                </CameraMenu>
            );
        }
    }
}

const styles = StyleSheet.create({
    cameraMenu: {
        position: "absolute",
        // left: 20,
        padding: 0,
        zIndex: 100,
        flexGrow: 1,
        flex: 1,
        backgroundColor: "red"
    }
});
