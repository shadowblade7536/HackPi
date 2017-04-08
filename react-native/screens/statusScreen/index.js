import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SmoothLine } from 'react-native-pathjs-charts';

const {width, height} = Dimensions.get('window')

export default class StatusScreen extends Component {
  render() {
    return (
      <View style={styles.card}>
        <SmoothLine data={[{x: 1, y: 3},{x: 5, y: 9},{x: 21, y: 25}]} xKey={'x'} yKey={'y'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: width-40,
    height: 100,
    backgroundColor: '#334336',
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row'
  },
  statsVertical: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  statusEntry: {
    color: '#fff',
    fontSize: 14
  }
})
