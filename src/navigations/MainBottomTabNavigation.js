import React, {Component} from 'react';
import {BackHandler, Alert, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from './TabBar';
import Orders from '../screens/orders';
import MyListing from '../screens/myListings';
import Notification from '../screens/alerts';
import Profile from '../screens/profile';

const BottomTab = createBottomTabNavigator();

export default class MainBottomTabNavigation extends Component {
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

 componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    if (!this.props.navigation.isFocused()) {
      this.props.navigation.goBack();
    } else {
      Alert.alert('Exit App', 'Exit the application?',
        [{text: 'Cancel',style: 'cancel'}, {text: 'OK', onPress: () => BackHandler.exitApp()}],
        {cancelable: false},
      );
    }
    return true;
  };


  onTabSelect = (tab, index) => this.setState({showAddMenu: (index === 2)})
  
  render() {
    return (
      <>
        <BottomTab.Navigator lazy={true} initialRouteName={'ORDERS'} shifting={true} barStyle={styles.bar} tabBar={props => <TabBar {...props} onSelect={this.onTabSelect}/>}>
          <BottomTab.Screen name="ORDERS" component={Orders} />
          <BottomTab.Screen name="MY LISTINGS" component={MyListing} />
          <BottomTab.Screen name="ALERTS" component={Notification} />
          <BottomTab.Screen name="PROFILE" component={Profile}/>
        </BottomTab.Navigator>
      </>
    );
  }
}

const styles = StyleSheet.create({
  bar:{
    backgroundColor: '#ED635E'
  },
  tab: {
    padding: 15
  },
  tabbar: {
    height: 70,
    alignItems: 'center',
  },
  label: {
    fontSize: 11
  },
})