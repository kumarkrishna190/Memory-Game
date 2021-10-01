import React, {Component} from 'react';
import {StyleSheet, View, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    //let token = await store.get('token');
    // this.props.navigation.navigate('Main')
  }

  render() {
    return (
        <View style={styles.container}>
          <Image resizeMode={'contain'} source={require('../assets/images/UnibookSplashLogo.png')} style={{height:hp(15),width:wp(60)}}/>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height:hp(100), width:wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default SplashScreen;
