import React, { Component } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import Button from './Button';
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import FotoItem from './FotoItem';
import Upload from '../Upload'
import CircleButton from './CircleButton';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default class HomeScreen extends Component {



  async componentDidMount(){
    this.refresh = this.props.navigation.addListener('focus', async () => {
      await this.loadPhotos()
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      numColumns: 5,
      offsetWidth: 5,
      selectedPhotos: []
    };
    this.refresh = null
  }

  async loadPhotos(){
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('brak uprawnień do czytania image-ów z galerii')
    }

    let obj = await MediaLibrary.getAssetsAsync({
      first: 100,           // ilość pobranych assetów
      mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
    })

    // alert(JSON.stringify(obj.assets, null, 4))
    let itemsInRow = this.state.numColumns
    let offset = (itemsInRow+1)*this.state.offsetWidth
    this.setState({
      data: obj.assets,
      offset: offset,
      fotoItemWidth: (Dimensions.get("window").width - offset)/itemsInRow,
      fotoItemHeight: (Dimensions.get("window").width - offset)/itemsInRow,
    })
  }

  selectImage(id, uri, filename){
    let photos = this.state.selectedPhotos
    let index = photos.map(e => e.id).indexOf(id)
    // console.log(photos.map(e => e.id).indexOf(id))
    if(index == -1){
      this.setState({selectedPhotos: [...photos, {id: id, uri: uri, filename: filename}]})
    } else {
      let photosCopy = photos
      photosCopy.splice(index,1)
      this.setState({selectedPhotos: photosCopy})
    }
    // console.log(this.state.selectedPhotos)

    // console.log(this.state.selectedPhotos)
  }


  async deleteImages(){
    if(this.state.selectedPhotos.length > 0){
      await MediaLibrary.deleteAssetsAsync(this.state.selectedPhotos);
      this.setState({selectedPhotos: []})
      this.loadPhotos()
    }
  }

  uploadImages(){
    if(Upload.upload(this.state.selectedPhotos))
      this.setState({selectedPhotos: []})
  }

  async shareImages(){
    if(await Upload.share(this.state.selectedPhotos))
      this.setState({selectedPhotos: []})
  }

  async cropImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
     });

     if (!result.cancelled) {
      console.log(result)
      Upload.upload(result.assets, false)
     }
}

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.buttonHolder}>
            <Button title={"LAYOUT"} onPress={
                ()=>{
                  // let columnsAmount = ((numColumns==5) ? 1 : 5)
                  if(this.state.numColumns == 5){
                    // now 1
                    this.setState({
                      numColumns: 1,
                      fotoItemWidth: Dimensions.get("window").width-20,
                      fotoItemHeight: (Dimensions.get("window").width-20)/2
                    })
                  } else {
                    // now 5
                    let itemsInRow = 5
                    let offset = (itemsInRow+1)*this.state.offsetWidth
                    this.setState({
                      numColumns: 5,
                      fotoItemWidth: (Dimensions.get("window").width - offset)/itemsInRow,
                      fotoItemHeight: (Dimensions.get("window").width - offset)/itemsInRow,
                    })
                  }

                }
              }/>
            <Button title="CAMERA" onPress={() => this.props.navigation.navigate("CameraScreen")}/>
            <Button title="PICKER" onPress={()=> this.cropImage()}/>
            <Button title="SETTINGS" onPress={() => this.props.navigation.navigate("SettingsScreen")}/>
            {/* <Button title={"DELETE " +  (this.state.selectedPhotos.length > 0 ?this.state.selectedPhotos.length + "🌄": "")} onPress={() => this.deleteImages()}/> */}
            {/* <Button title={"UPLOAD " +  (this.state.selectedPhotos.length > 0 ?this.state.selectedPhotos.length + "🌄": "")} onPress={() => this.uploadImages()}/> */}
        </View>
        <FlatList
          numColumns={this.state.numColumns}
          contentContainerStyle={{flexGrow: 1, alignItems: 'center', margin: 0, padding: 0}}
          key={this.state.numColumns}
          data={this.state.data}
          renderItem={({item}) => <FotoItem src={item.uri+"/"+item.filename} width={this.state.fotoItemWidth} height={this.state.fotoItemHeight} id={item.id} onPress={() => this.state.selectedPhotos.length > 0 ?  this.selectImage(item.id, item.uri+"/"+item.filename, item.filename ) : this.props.navigation.navigate("BigPhotoScreen", {item: item})} onLongPress={() => {  this.selectImage(item.id, item.uri+"/"+item.filename, item.filename )}} isItemSelected={ (this.state.selectedPhotos.map(e => e.id).indexOf(item.id)!=-1 ? true : false) }/>}
        />
        {this.state.selectedPhotos.length > 0 ?
          <View style={styles.actionMenu}>
            <CircleButton icon="sharealt" size={25} color="#57d968" onPress={() => this.shareImages()}/>
            <CircleButton icon="clouduploado" size={25} color="#239bdb" onPress={() => this.uploadImages()}/>
            <CircleButton icon="delete" size={25} color="#f54936" onPress={() => this.deleteImages()}/>
          </View>
        : <></>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    body: {
      backgroundColor: "#1a1f22",
      flex: 1,
    },
    buttonHolder: {
      padding: 20,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center"
    },
    actionMenu: {
      position: "absolute",
      flexDirection: "row",
      right: 0,
      bottom: 0,
      padding: 15,
      zIndex:3,
      gap: 10,
    }
});
