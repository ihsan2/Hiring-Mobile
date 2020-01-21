import React, {PureComponent} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Header,
  Body,
  Title,
  Button,
  Left,
  Right,
  Item,
  Input,
  Label,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {updateCompany} from '../public/redux/actions/companies';
import {getCompany} from '../public/redux/actions/company';
import {withNavigation} from 'react-navigation';
import jwt_decode from 'jwt-decode';
import {API_KEY_URL} from 'react-native-dotenv';

const heightscr = Dimensions.get('window').height;

class EditCompany extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      email: '',
      password: '',
      description: '',
      location: '',
      image: '',
    };
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    const decoded = jwt_decode(token);
    this.setState({id: decoded.id});
    let url = `${API_KEY_URL}/companies/${decoded.id}`;
    this.props.get(url).then(() => {
      this.props.company.company.map(en => {
        return this.setState({
          id: en.id,
          name: en.name,
          email: en.email,
          password: en.password,
          description: en.description,
          location: en.location,
          image: en.image,
        });
      });
    });
  };
  save = async () => {
    const {navigation} = this.props;
    const {name, email, password, description, location, image} = this.state;
    let url = `${API_KEY_URL}/companies/${this.state.id}`;
    let data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('description', description);
    data.append('location', location);
    data.append('image', image);

    await this.props
      .edit(url, data)
      .then(() => {
        alert('Success Update');
        this.props.navigation.push('CompanyRoute');
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    return (
      <View
        style={{
          height: heightscr,
          backgroundColor: 'rgba(200, 200, 200, 0.5)',
        }}>
        <Header
          style={{
            backgroundColor: 'rgba(250, 255, 255, 0.9)',
          }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-left" size={20}></Icon>
            </Button>
          </Left>
          <Body>
            <Title
              style={{
                color: 'black',
                fontWeight: 'bold',
              }}>
              Edit Profile
            </Title>
          </Body>
          <Right>
            {this.props.companies.isLoading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <Button
                onPress={this.save.bind(this)}
                success
                style={{
                  height: 32,
                  width: 56,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                  }}>
                  {' '}
                  Save{' '}
                </Text>
              </Button>
            )}
          </Right>
        </Header>

        <View
          style={{
            backgroundColor: '#fff',
            height: heightscr,
            marginTop: 8,
          }}>
          {this.props.company.isLoading && (
            <ActivityIndicator
              style={{
                marginTop: 18,
              }}></ActivityIndicator>
          )}
          <ScrollView
            style={{
              marginTop: 8,
              marginLeft: 8,
            }}>
            <Item
              floatingLabel
              style={{
                marginTop: 18,
                marginLeft: 18,
              }}>
              <Label>Name</Label>
              <Input
                onChangeText={value => this.setState({name: value})}
                value={this.state.name}
              />
            </Item>
            <Item
              floatingLabel
              style={{
                marginTop: 18,
                marginLeft: 18,
              }}>
              <Label>Email</Label>
              <Input
                keyboardType={'email-address'}
                onChangeText={value => this.setState({email: value})}
                value={this.state.email}
              />
            </Item>
            <Item
              floatingLabel
              style={{
                marginTop: 18,
                marginLeft: 18,
              }}>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={value => this.setState({password: value})}
                value={this.state.password}
              />
            </Item>

            <Item
              floatingLabel
              style={{
                marginTop: 18,
                marginLeft: 18,
              }}>
              <Label>Description</Label>
              <Input
                onChangeText={value => this.setState({description: value})}
                value={this.state.description}
              />
            </Item>
            <Item
              floatingLabel
              style={{
                marginTop: 18,
                marginLeft: 18,
              }}>
              <Label>Location</Label>
              <Input
                onChangeText={value => this.setState({location: value})}
                value={this.state.location}
              />
            </Item>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    companies: state.companies,
    company: state.company,
  };
};
const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getCompany(url)),
  edit: (url, data) => dispatch(updateCompany(url, data)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(EditCompany),
);
