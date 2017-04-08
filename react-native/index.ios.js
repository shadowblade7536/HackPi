import React, { Component, Children } from 'react';
import {
  AppRegistry,
  View,
  StatusBar
} from 'react-native';

import io from 'socket.io-client';

import App from './screens/app';
import SocketLoader from './screens/socketLoader';

const SERVER_CONFIG = {
  HOST: '10.196.80.171:8080'
}

const socket = io.connect(SERVER_CONFIG.HOST, { secure: true, jsonp: false, reconnectionDelay: 5000 })

export default class oo extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />
        <SocketLoader socket={socket} config={SERVER_CONFIG} />
        <App socket={socket} />
      </View>
    )
  }
}

AppRegistry.registerComponent('oo', () => oo);
