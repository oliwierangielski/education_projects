import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Dialog from "react-native-dialog";
import Save from '../Save';



export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisibility: false,
            ip: "",
            port: ""
        };
    }

    async componentDidMount(){
        let config = await Save.getConfig()
        this.setState({ip: config.ip, port: config.port})
    }

    async saveConfig(){
        await Save.swapNewConfig({ip: this.state.ip, port: this.state.port})
    }


    render() {
        return (
            <View style={styles.body}>
                <View>
                    <Text style={styles.text}>Obecnie zapisany adres IP to: </Text>
                    <Text style={styles.text}>{this.state.ip}</Text>
                    <Text style={styles.text}>Obecnie zapisany port to: </Text>
                    <Text style={styles.text}>{this.state.port}</Text>
                </View>
                <Button title='PODAJ NOWE DANE' onPress={() => this.setState({dialogVisibility: true})} />
                <Dialog.Container visible={this.state.dialogVisibility}>
                    <Dialog.Title>ZAPIS IP, PORT serwera do uploadu</Dialog.Title>
                    <Dialog.Description>
                        Zapisać?
                    </Dialog.Description>
                    <Dialog.Input label="IP" value={this.state.ip} onChangeText={(text) => this.setState({ip: text})}/>
                    <Dialog.Input label="PORT" value={this.state.port} onChangeText={(text) => this.setState({port: text})}/>
                    <Dialog.Button label="CANCEL" onPress={() => this.setState({dialogVisibility: false})}/>
                    <Dialog.Button label="SAVE" onPress={() => {this.setState({dialogVisibility: false});this.saveConfig()}}/>
                </Dialog.Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#1a1f22",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    text: {
        color: "#fff",
        fontSize: 20
    }
});
