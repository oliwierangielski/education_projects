import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RadioButton from './RadioButton';

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: 0
    };
    // this.radioButton = []
  }


  changeSelected(value) {
    this.setState({selected: value})
  }

  render() {
    return (
      <View>
       <Text style={styles.title}>{this.props.groupName}</Text>
       <View style={{flexDirection: this.props.direction}}>
       {
            this.props.data.map((e, i) => {
                return <View key={i} style={styles.radioRow}>
                            <RadioButton size={40}
                            color={this.props.color}
                            selected={this.state.selected==i}
                            onPress={() => {
                                if(this.state.selected!=i){
                                  this.props.change({groupName: this.props.groupName, option: i})
                                }
                                this.setState({selected: i});
                              }}/>
                            <Text style={styles.radioLabel}>{e}</Text>
                        </View>
            })
       }
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    title: {
        color: "#fffb00",
        fontWeight: "bold",
        paddingLeft: 20,
        padding: 20,
        fontSize: 21
    },
    radioRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    radioLabel: {
        color: "#fff",
        fontSize: 22,
        padding: 10
    }
});
