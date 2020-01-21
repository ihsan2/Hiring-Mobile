import React, {PureComponent} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Item, Text, Input, Button, Picker, Toast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {getEngineers} from '../public/redux/actions/engineers';
import {getCompanies} from '../public/redux/actions/companies';
import {loginEngineer, loginCompany} from '../public/redux/actions/login';
import AsyncStorage from '@react-native-community/async-storage';
const emailRegex = require('regex-email');
import {API_KEY_URL} from 'react-native-dotenv';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      role: undefined,
      email: '',
      password: '',
      emailUser: [],
      emailCom: [],
    };
  }

  onValueChange(value) {
    this.setState({
      role: value,
    });
  }

  showToast = (textToast, typeToast) => {
    Toast.show({
      text: textToast,
      buttonText: 'Okay',
      type: typeToast,
    });
  };

  login = async () => {
    const {email, password, emailUser, emailCom, role} = this.state;
    const emailCheckUser = emailUser.findIndex(en => en.email === email);
    const emailCheckCom = emailCom.findIndex(en => en.email === email);
    const data = {email, password};

    if (!email || !emailRegex.test(email)) {
      this.showToast('Email Required or Invalid Email!', 'danger');
    } else if (password.length < 4) {
      this.showToast('Password Minimum 4 Character!', 'danger');
    } else if (!role) {
      this.showToast('Role Required!', 'danger');
    } else {
      if (role === 'engineer') {
        if (emailCheckUser === -1) {
          this.showToast('Email Not Registered!', 'danger');
        } else {
          this.props
            .loginEn(data)
            .then(async res => {
              await AsyncStorage.setItem('token', this.props.login.accessToken);
              this.showToast('Login Successful!', 'success');
              this.props.navigation.push('EngineerRoute');
              // console.log(this.props.login.accessToken);
            })
            .catch(() => {
              this.showToast(
                'Failed! Make sure the email and password are correct.',
                'danger',
              );
            });
        }
      } else if (role === 'company') {
        if (emailCheckCom === -1) {
          this.showToast('Email Not Registered!', 'danger');
        } else {
          this.props
            .loginCom(data)
            .then(res => {
              AsyncStorage.setItem('token', this.props.login.accessToken);
              this.showToast('Login Successful!', 'success');
              this.props.navigation.push('CompanyRoute');
            })
            .catch(() => {
              this.showToast(
                'Failed! Make sure the email and password are correct.',
                'danger',
              );
            });
        }
      }
    }
  };

  componentDidMount = () => {
    this.props.getEn(`${API_KEY_URL}/engineers`).then(() => {
      this.props.engineer.pageDetail.map(page => {
        return this.props
          .getEn(`${API_KEY_URL}/engineers?limit=${page.totalRow}`)
          .then(() => {
            this.setState({
              emailUser: this.props.engineer.engineers,
            });
          });
      });
    });
    this.props.getCom(`${API_KEY_URL}/companies`).then(() => {
      this.setState({
        emailCom: this.props.company.companies,
      });
    });
  };

  render() {
    const {navigation} = this.props;
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ImageBackground
          source={require('../public/assets/signin.png')}
          style={style.image}
        />
        <View
          style={{
            backgroundColor: 'rgba(245,245,245, 1)',
            height: hp('78%'),
            borderTopLeftRadius: wp('15%'),
            borderTopRightRadius: wp('15%'),
            marginTop: hp('-3.5%'),
          }}>
          <Text
            style={{
              marginTop: hp('3.5%'),
              marginLeft: wp('12%'),
              fontSize: hp('6%'),
            }}>
            Welcome
          </Text>
          <Item style={{marginTop: hp('0.5%'), marginLeft: wp('12%')}}>
            <Icon active name="envelope" />
            <Input
              keyboardType={'email-address'}
              placeholder="Email"
              onChangeText={value => this.setState({email: value})}
            />
          </Item>
          <Item style={{marginTop: hp('0.5%'), marginLeft: wp('12%')}}>
            <Icon active name="lock" />
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={value => this.setState({password: value})}
            />
          </Item>
          <Item style={{marginTop: hp('0.5%'), marginLeft: wp('12%')}}>
            <Picker
              mode="dialog"
              placeholder="Select your SIM"
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff"
              selectedValue={this.state.role}
              onValueChange={this.onValueChange.bind(this)}>
              <Picker.Item label="Select role" value="" />
              <Picker.Item label="Engineer" value="engineer" />
              <Picker.Item label="Company" value="company" />
            </Picker>
          </Item>
          <Button
            onPress={this.login.bind(this)}
            style={{
              marginTop: hp('2%'),
              marginLeft: wp('12%'),
              borderColor: '#5bc0de',
              borderWidth: hp('0.3%'),
              borderRadius: wp('2%'),
              justifyContent: 'center',
              height: hp('7%'),
            }}
            light>
            {this.props.login.isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text
                style={{
                  color: '#5bc0de',
                  fontSize: wp('6.5%'),
                }}>
                Sign In
              </Text>
            )}
          </Button>
          <Button
            onPress={() => navigation.push('Register')}
            style={{
              marginTop: hp('2%'),
              marginLeft: wp('12%'),
              borderColor: '#fff',
              borderWidth: hp('0.3%'),
              borderRadius: wp('2%'),
              justifyContent: 'center',
              height: hp('7%'),
            }}
            info>
            <Text
              style={{
                fontSize: wp('6.5%'),
              }}>
              Create Account
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  image: {
    height: hp('32%'),
    resizeMode: 'cover',
  },
});

const mapStateToProps = state => {
  return {
    engineer: state.engineers,
    company: state.companies,
    login: state.login,
  };
};
const mapDispatchToProps = dispatch => ({
  getEn: url => dispatch(getEngineers(url)),
  getCom: url => dispatch(getCompanies(url)),
  loginEn: data => dispatch(loginEngineer(data)),
  loginCom: data => dispatch(loginCompany(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
