import React, {Component} from 'react';
import { Text, View, } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../components/SplashScreen';
import {navigationRef} from './RootNavigation';
import MainBottomTabNavigation from './MainBottomTabNavigation';
const Stack = createStackNavigator();

const LandingScreen = () => {
  return (
    <View style={{backgroundColor:'#f00', height:1080, width:720}}>
      <Text style={{color:'#000'}}>
        Splash Screen
      </Text>
    </View>
  );
};

export default class MainContainer extends Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode={'none'} initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Main">
            {screenProps =>  <MainBottomTabNavigation {...screenProps}/> }  
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
