import React from 'react';
import Companies from '../screens/CompaniesHome';
import Profile from '../screens/Profile';
import Message from './Message';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default createMaterialBottomTabNavigator(
  {
    Companies: {
      screen: Companies,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({focused}) => (
          <Icon name="home" size={20} color={!focused ? '#000' : '#fff'} />
        ),
      },
    },
    Message: {
      screen: Message,
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
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Account',
        tabBarIcon: ({focused}) => (
          <Icon name="user" size={20} color={!focused ? '#000' : '#fff'} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Companies',
    activeColor: '#fff',
    inactiveColor: '#000',
    barStyle: {backgroundColor: 'rgba(200, 200, 200, 0.75)'},
  },
);
