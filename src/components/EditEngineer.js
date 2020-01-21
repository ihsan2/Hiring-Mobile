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
  Picker,
  DatePicker,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {updateEngineer} from '../public/redux/actions/engineers';
import {getEngineer} from '../public/redux/actions/engineer';
import moment from 'moment';
import {withNavigation} from 'react-navigation';
import jwt_decode from 'jwt-decode';
import {API_KEY_URL} from 'react-native-dotenv';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const heightscr = Dimensions.get('window').height;

class EditEngineer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      email: '',
      password: '',
      description: '',
      skill: '',
      location: '',
      date_of_birth: '',
      expected_salary: '',
      showcase: '',
      image: '',
    };
  }

  onDescChange = value => {
    this.setState({
      description: value,
    });
  };
  setDate = value => {
    this.setState({
      date_of_birth: moment(value).format('YYYY-MM-DD'),
    });
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    const decoded = jwt_decode(token);
    this.setState({id: decoded.id});
    let url = `${API_KEY_URL}/engineers/${decoded.id}`;
    this.props.get(url).then(() => {
      this.props.engineer.engineer.map(en => {
        return this.setState({
          id: en.id,
          name: en.name,
          email: en.email,
          password: en.password,
          description: en.description,
          skill: en.skill,
          location: en.location,
          date_of_birth: en.date_of_birth ? en.date_of_birth.split('T')[0] : '',
          expected_salary: en.expected_salary ? en.expected_salary : 0,
          showcase: en.showcase,
          image: en.image,
        });
      });
    });
  };
  save = async () => {
    const {navigation} = this.props;
    const {
      name,
      email,
      password,
      description,
      skill,
      location,
      date_of_birth,
      expected_salary,
      showcase,
      image,
    } = this.state;
    let url = `${API_KEY_URL}/engineers/${this.state.id}`;
    let data = new FormData();
    alert(date_of_birth);
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('description', description);
    data.append('skill', skill);
    data.append('location', location);
    data.append('date_of_birth', date_of_birth);
    data.append('expected_salary', expected_salary);
    data.append('showcase', showcase);
    data.append('image', image);
    if (!date_of_birth) {
      alert('Date of Birth required!');
    } else {
      await this.props
        .edit(url, data)
        .then(() => {
          alert('Success Update');
          this.props.navigation.push('EngineerRoute');
        })
        .catch(err => {
          alert(err);
        });
    }
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
            {this.props.engineers.isLoading ? (
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
          {this.props.engineer.isLoading && (
            <ActivityIndicator
              style={{
                marginTop: 18,
              }}></ActivityIndicator>
          )}
          <ScrollView
            style={{
              marginTop: 8,
              marginLeft: 8,
              marginBottom: hp('10%'),
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
              style={{
                marginTop: 18,
                marginLeft: 18,
              }}>
              <DatePicker
                defaultDate={this.state.date_of_birth}
                maximumDate={new Date()}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText="Date of Birth"
                textStyle={{color: 'green'}}
                placeHolderTextStyle={{color: '#d3d3d3'}}
                onDateChange={this.setDate}
                disabled={false}
              />
              <Input
                onChangeText={value => this.setState({date_of_birth: value})}
                value={
                  this.state.date_of_birth
                    ? moment(this.state.date_of_birth).format('MMMM Do, YYYY')
                    : ''
                }
              />
            </Item>

            <Item style={{marginTop: 18, marginLeft: 18}}>
              <Picker
                mode="dialog"
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.description}
                onValueChange={this.onDescChange.bind(this)}>
                <Picker.Item label="Select One" value="" />
                <Picker.Item
                  label="Front-End Developer"
                  value="Front-End Developer"
                  selectedValue={
                    this.state.description === 'Front-End Developer'
                  }
                />
                <Picker.Item
                  label="Back-End Developer"
                  value="Back-End Developer"
                  selectedValue={
                    this.state.description === 'Back-End Developer'
                  }
                />
                <Picker.Item
                  label="Full-Stack Developer"
                  value="Full-Stack Developer"
                  selectedValue={
                    this.state.description === 'Full-Stack Developer'
                  }
                />
              </Picker>
            </Item>
            <Item
              floatingLabel
              style={{
                marginTop: 18,
                marginLeft: 18,
              }}>
              <Label>Skill</Label>
              <Input
                onChangeText={value => this.setState({skill: value})}
                value={this.state.skill}
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
            <Item
              floatingLabel
              style={{
                marginTop: 18,
                marginLeft: 18,
              }}>
              <Label>Expected Salary</Label>
              <Input
                keyboardType={'numeric'}
                onChangeText={value => this.setState({expected_salary: value})}
                value={this.state.expected_salary.toString()}
              />
            </Item>
            <Item
              floatingLabel
              style={{
                marginTop: 18,
                marginLeft: 18,
              }}>
              <Label>Showcase</Label>
              <Input
                onChangeText={value => this.setState({showcase: value})}
                value={this.state.showcase}
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
    engineers: state.engineers,
    engineer: state.engineer,
  };
};
const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getEngineer(url)),
  edit: (url, data) => dispatch(updateEngineer(url, data)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(EditEngineer),
);
