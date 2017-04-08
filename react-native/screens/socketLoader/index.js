import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class SocketLoader extends Component {
  constructor() {
    super()
    this.state = {
      status: 'CONNECTING',
      red: false
    }
  }

  componentDidMount() {
    var socket = this.props.socket;
    socket.on('connect_error', (data)=>{
      this.setState({ status: data.toString().toUpperCase(), red: true })
    })
    socket.on('reconnect_attempt', ()=>{
      this.setState({ status: 'RETRYING', red: false })
    })
  }
  render() {
    let status = this.state.red ? styles.red : styles.green;
    return (
      <View style={[styles.container, (this.props.socket.connected==false ? {display: 'none'} : null)]}>
        <Text style={styles.text}>oo</Text>
        <Text style={styles.info}>{this.props.config.HOST}</Text>
        <Text style={[styles.status, status]}>{this.state.status}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D211D',
  },
  text: {
    fontSize: 200,
    textAlign: 'center',
    color: '#4D6C47',
    fontWeight: "100"
  },
  info: {
    fontSize: 20,
    color: '#4D6C47',
    fontWeight: "100"
  },
  status: {
    fontSize: 30,
    color: '#4D6C47',
    fontWeight: "100"
  },
  red: {
    color: '#AB5042'
  },
  image: {
    height: 100,
    width: 100,
    margin: 20
  }
});
