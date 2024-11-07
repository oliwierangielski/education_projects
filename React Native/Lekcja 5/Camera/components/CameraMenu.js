import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView} from 'react-native';
import { Animated } from "react-native";
import { Dimensions } from "react-native";
import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';

export default class CameraMenu extends Component {
    constructor(props) {
        super(props);
        this.height = Dimensions.get("screen").height
        this.state = {
            pos: new Animated.Value(this.height),  //startowa pozycja y wysuwanego View
        };
        this.isHidden = true
        // console.log(this.isHidden)
        // console.log(this.state.pos)
    }

    toggle() {
        // console.log(this.height)
        if (this.isHidden) toPos = 0; else toPos = this.height

        //animacja

        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();

        this.isHidden = !this.isHidden;
    }


    render() {
        let data = {"WHITE BALANCE": ["auto", "cloudy", "fluorescent", "incandescen", "shadow", "sunny"]}
        return (
            <View style={{ flex: 1 }}>
                {this.props.children}
                <Animated.View
                    style={[
                        styles.animatedView,
                        {
                            transform: [
                                { translateY: this.state.pos }
                            ]
                        }]} >
                    <ScrollView>
                        <Text style={styles.title}>{this.props.title}</Text>
                        {this.props.menuContent}
                    </ScrollView>

                </Animated.View>



            </View>
        );
    }
}


const styles = StyleSheet.create({
    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(42, 42, 43, 0.7)",
        width: "65%",
        height: "100%",
        padding: 20,
        paddingTop: 40
    },
    title: {
        fontSize: 35,
        color: "#fff",
        fontWeight: "bold"
    }
});
