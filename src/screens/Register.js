import React, {PureComponent} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Item, Text, Input, Button, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {
  getEngineers,
  registerEngineer,
} from '../public/redux/actions/engineers';
import {getCompanies, registerCompany} from '../public/redux/actions/companies';
const emailRegex = require('regex-email');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {API_KEY_URL} from 'react-native-dotenv';

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      role: undefined,
      name: '',
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

  register = async () => {
    const {navigation} = this.props;
    let urlEn = `${API_KEY_URL}/engineers`;
    let urlCom = `${API_KEY_URL}/companies`;
    const {name, email, password, role} = this.state;
    const emailCheckUser = this.state.emailUser.findIndex(
      en => en.email === this.state.email,
    );
    const emailCheckCom = this.state.emailCom.findIndex(
      en => en.email === this.state.email,
    );
    let data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);

    if (!this.state.name) {
      alert('Name required!');
    } else if (!this.state.email || !emailRegex.test(this.state.email)) {
      alert('Email required or Invalid email!');
    } else if (this.state.password.length < 4) {
      alert('Password minimun 4 character!');
    } else if (!this.state.role) {
      alert('Role required!');
    } else if (this.state.role === 'engineer') {
      if (emailCheckUser !== -1) {
        alert('Email was registered. Please use another email!');
      } else {
        await this.props
          .registerEngineer(urlEn, data)
          .then(() => {
            alert('Success Create Account. Login Now');
            navigation.push('Login');
          })
          .catch(err => {
            alert(err);
          });
      }
    } else if (this.state.role === 'company') {
      if (emailCheckCom !== -1) {
        alert('Email was registered. Please use another email!');
      } else {
        await this.props
          .registerCompany(urlCom, data)
          .then(() => {
            alert('Success Create Account. Login Now');
            navigation.push('Login');
          })
          .catch(err => {
            alert(err);
          });
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
      <View>
        <ImageBackground
          source={require('../public/assets/signup.png')}
          style={style.image}></ImageBackground>
        <View
          style={{
            backgroundColor: 'rgba(245,245,245, 1)',
            height: hp('78%'),
            borderTopLeftRadius: wp('15%'),
            borderTopRightRadius: wp('15%'),
            marginTop: hp('-9.5%'),
          }}>
          <Text
            style={{
              marginTop: hp('3.5%'),
              marginLeft: wp('12%'),
              fontSize: hp('5%'),
            }}>
            Create Account
          </Text>
          <Item style={{marginTop: hp('0.5%'), marginLeft: wp('12%')}}>
            <Icon active name="user" />
            <Input
              placeholder="Name"
              onChangeText={value => this.setState({name: value})}
            />
          </Item>

          <Item style={{marginTop: hp('0.5%'), marginLeft: wp('12%')}}>
            <Icon active name="envelope" />

            <Input
              keyboardType="email-address"
              placeholder="Email"
              onChangeText={value => this.setState({email: value})}
            />
          </Item>

          <Item style={{marginTop: hp('0.5%'), marginLeft: wp('12%')}}>
            <Icon active name="lock" />
            <Input
              placeholder="Password"
              secureTextEntry={true}
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
            onPress={this.register.bind(this)}
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
            {this.props.engineer.isLoading || this.props.company.isLoading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <Text
                style={{
                  color: '#5bc0de',
                  fontSize: wp('6.5%'),
                }}>
                Create Account
              </Text>
            )}
          </Button>
          <Button
            onPress={() => navigation.push('Login')}
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
              Sign In
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
  };
};
const mapDispatchToProps = dispatch => ({
  getEn: url => dispatch(getEngineers(url)),
  getCom: url => dispatch(getCompanies(url)),
  registerEngineer: (url, data) => dispatch(registerEngineer(url, data)),
  registerCompany: (url, data) => dispatch(registerCompany(url, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
