import React from 'react';
import Engineers from '../screens/EngineersHome';
import ProfileCompany from '../screens/ProfileCom';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MessageCompany from './MessageCompany';

export default createMaterialBottomTabNavigator(
  {
    Engineers: {
      screen: Engineers,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({focused}) => (
          <Icon name="home" size={20} color={!focused ? '#000' : '#fff'} />
        ),
      },
    },
    MessageCompany: {
      screen: MessageCompany,
      navigationOptions: {
        tabBarLabel: 'Message',
        tabBarIcon: ({focused}) => (
          <Icon
            name="comment-alt"
            size={20}
            color={!focused ? '#000' : '#fff'}
          />
        ),
      },
    },
    ProfileCompany: {
      screen: ProfileCompany,
      navigationOptions: {
        tabBarLabel: 'Account',
        tabBarIcon: ({focused}) => (
          <Icon name="user" size={20} color={!focused ? '#000' : '#fff'} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Engineers',
    activeColor: '#fff',
    inactiveColor: '#000',
    barStyle: {backgroundColor: 'rgba(200, 200, 200, 0.75)'},
  },
);
