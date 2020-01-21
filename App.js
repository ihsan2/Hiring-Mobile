import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import store from './src/public/redux/store';
// screens
import EngineerRoute from './src/components/EngineerRoute';
import CompanyRoute from './src/components/CompanyRoute';
import Engineer from './src/components/Engineer';
import Company from './src/components/Company';
import Engineers from './src/components/Engineers';
import Companies from './src/components/Companies';
import Start from './src/screens/Start';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import EditEngineer from './src/components/EditEngineer';
import EditCompany from './src/components/EditCompany';
import Chat from './src/components/Chat';
import Message from './src/components/Message';
import ChatCompany from './src/components/ChatCompany';
import MessageCompany from './src/components/MessageCompany';

const AppNavigator = createStackNavigator(
  {
    Start: {screen: Start},
    Login: {screen: Login},
    Register: {screen: Register},
    EngineerRoute: {
      screen: EngineerRoute,
    },
    CompanyRoute: {
      screen: CompanyRoute,
    },
    Engineer,
    Company,
    EditEngineer,
    EditCompany,
    Engineers,
    Companies,
    Chat,
    Message,
    ChatCompany,
    MessageCompany,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

// wrap all component with redux Provider and the store
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
