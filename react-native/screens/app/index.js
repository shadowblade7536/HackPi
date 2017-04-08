import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TabBarIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import StatusScreen from '../statusScreen';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      currentTab: 'status'
    }
  }
  componentDidMount() {
    var socket = this.props.socket;
    socket.emit('get status', (data)=>{
      if(data && typeof data === 'object') {
        this.setState({
          status: data
        })
      }
    })
  }
  render() {
    return (
      <View style={[styles.container, (this.props.socket.connected==false ? null : {display: 'none'})]}>
        <TabBarIOS
          barTintColor={"#334336"}
          tintColor={"#161D17"}>
          <Icon.TabBarItemIOS
            iconName={'ios-time-outline'}
            selectedIconName={'ios-time'}
            title={"Status"}
            selected={this.state.currentTab === 'status'}
            onPress={()=>{ this.setState({ currentTab: 'status' }) }}>

            <View style={styles.tab}>
              <StatusScreen status={this.state.status} />
            </View>

          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName={'ios-cloud-upload-outline'}
            selectedIconName={'ios-cloud-upload'}
            title={"Functions"}
            selected={this.state.currentTab === 'func'}
            onPress={()=>{ this.setState({ currentTab: 'func' }) }}>
            <Text style={styles.text}>Tab Two</Text>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            iconName={'ios-settings-outline'}
            selectedIconName={'ios-settings'}
            title={"Settings"}
            selected={this.state.currentTab === 'settings'}
            onPress={()=>{ this.setState({ currentTab: 'settings' }) }}>
            <Text style={styles.text}>Tab Three</Text>
          </Icon.TabBarItemIOS>
        </TabBarIOS>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D211D'
  },
  text: {
    color: '#4D6C47',
    fontSize: 20
  },
  tab: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center'
  }
})
