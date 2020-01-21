import React, {PureComponent} from 'react';
import {View, Image, Scr} from 'react-native';
import {Button, Text} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Start extends PureComponent {
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    const decoded = jwt_decode(token);

    if (token && decoded.role === 'engineer') {
      this.props.navigation.push('EngineerRoute');
    } else if (token && decoded.role === 'company') {
      this.props.navigation.push('CompanyRoute');
    }
  };

  render() {
    console.disableYellowBox = true;
    return (
      <>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../public/assets/app-logo.png')}
            style={{
              width: wp('70%'),
              height: hp('50%%'),
              resizeMode: 'contain',
              marginTop: hp('-20'),
            }}></Image>
          <Image
            source={require('../public/assets/start1.jpg')}
            style={{
              width: wp('70%'),
              height: hp('50%'),
              resizeMode: 'contain',
              marginTop: hp('-20'),
            }}></Image>

          <Button
            onPress={() => this.props.navigation.navigate('Login')}
            rounded
            info
            style={{
              width: wp('65%'),
              justifyContent: 'center',
              height: hp('8'),
              top: hp('5%'),
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: wp('7%'),
              }}>
              GET STARTED!
            </Text>
          </Button>
        </View>
      </>
    );
  }
}

export default Start;
