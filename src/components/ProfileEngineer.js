import React, {PureComponent} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Header, Body, Title, Footer, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {getEngineer} from '../public/redux/actions/engineer';
import {
  deleteEngineer,
  updateEngineer,
} from '../public/redux/actions/engineers';
import {withNavigation} from 'react-navigation';
import jwt_decode from 'jwt-decode';
import ImagePicker from 'react-native-image-picker';
import {API_KEY_URL, API_KEY_IMAGE} from 'react-native-dotenv';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

const heightscr = Dimensions.get('window').height;

class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      showAlert: false,
      selectedImg: 0,
      uri: '',
      filename: '',
      filesize: '',
      token: '',
      id: '',
      name: '',
      email: '',
      location: '',
      image: null,
      imageTmp: null,
      description: '',
      password: '',
      skill: '',
      date_of_birth: '',
      expected_salary: '',
      showcase: '',
    };
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  tes = () => {
    Alert.alert(
      'Logout',
      'Are you sure wwant to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  logout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            this.props.navigation.navigate('Start');
            alert('Logout Success!');
          },
        },
      ],
      {cancelable: false},
    );
  };
  edit = () => {
    const {navigation} = this.props;
    navigation.navigate('EditEngineer', this.state.id);
  };
  delete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            let url = `${API_KEY_URL}/engineers/${this.state.id}`;
            this.props
              .delete(url)
              .then(async () => {
                await AsyncStorage.removeItem('token');
                this.props.navigation.push('Login');
                alert('Success Delete Account');
              })
              .catch(err => {
                alert(err);
              });
          },
        },
      ],
      {cancelable: false},
    );
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
          location: en.location,
          image: en.image,
          password: en.password,
          description: en.description,
          skill: en.skill,
          location: en.location,
          date_of_birth: en.date_of_birth.split('T')[0],
          expected_salary: en.expected_salary,
          showcase: en.showcase,
          imageTmp: en.image,
        });
      });
    });
  };

  selectImage = () => {
    const options = {};
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri, isStatic: true};

        this.setState({
          selectedImg: 1,
          image: source,
          uri: response.uri,
          filename: response.fileName,
          filesize: response.fileSize,
        });
      }
    });
  };

  onSave = async () => {
    if (
      this.state.filename
        .substring(this.state.filename.lastIndexOf('.') + 1)
        .toLowerCase() !== 'jpg'
    ) {
      alert('Only .jpg file allowed!');
    } else if (this.state.filesize > 7 * 1024 * 1024) {
      alert('FIle too large. Minimun image is 7 MB');
    } else {
      this.setState({load: true});
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
      } = this.state;
      let url = `${API_KEY_URL}/engineers/${this.state.id}`;
      let data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      data.append('description', description);
      data.append('skill', skill);
      data.append('location', location);
      data.append('date_of_birth', date_of_birth);
      data.append('expected_salary', expected_salary);
      data.append('showcase', showcase);
      data.append('image', {
        uri: this.state.uri,
        type: 'image/jpeg',
        name: this.state.filename,
      });
      await this.props
        .editPhoto(url, data)
        .then(() => {
          alert('Success Update');
          this.props.navigation.push('EngineerRoute');
        })
        .catch(err => {
          this.setState({load: false});
          Alert.alert(
            'Failed',
            'Date of Birth must be updated in Menu Edit',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Go To Edit',
                onPress: async () => {
                  this.props.navigation.navigate('EditEngineer', this.state.id);
                },
              },
            ],
            {cancelable: false},
          );
        });
    }
  };

  onCancel = () => {
    const imageTmp = this.state.imageTmp;
    this.setState({selectedImg: 0, image: imageTmp});
  };

  render() {
    return (
      <View
        style={{
          height: heightscr - 54,
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
        }}>
        <Header
          style={{
            backgroundColor: 'rgba(250, 255, 255, 0.9)',
          }}>
          <Body style={{alignItems: 'center'}}>
            <Title
              style={{fontSize: wp('8%'), color: 'black', fontWeight: '800'}}>
              Account
            </Title>
          </Body>
        </Header>
        <View
          style={{
            marginTop: hp('1%'),
            height: hp('15%'),
            backgroundColor: 'rgba(250,250,250,1)',
          }}>
          {this.props.engineer.isLoading && (
            <ActivityIndicator
              style={{
                marginTop: hp('5%'),
              }}></ActivityIndicator>
          )}
          <Body
            style={{
              alignSelf: 'flex-start',
            }}>
            <Text
              style={{
                marginLeft: 24,
                marginTop: 8,
                fontSize: 20,
                fontWeight: '900',
              }}>
              {this.state.name}
            </Text>
          </Body>
          <Body
            style={{
              alignSelf: 'flex-start',
            }}>
            <Text
              style={{
                marginLeft: 24,
                marginTop: 0,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#CACAC2',
              }}>
              {this.state.email}
            </Text>
          </Body>
          <Body
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
            }}>
            <Icon
              name="map-marker-alt"
              style={{
                marginLeft: 24,
                marginTop: -24,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#CACAC2',
              }}></Icon>
            <Text
              style={{
                marginLeft: 8,
                marginTop: -24,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#CACAC2',
              }}>
              {this.state.location}
            </Text>
          </Body>
        </View>
        <Body
          style={{
            position: 'absolute',
            marginTop: 72,
            alignSelf: 'flex-end',
            right: 20,
          }}>
          <Button
            onPress={this.edit.bind(this)}
            transparent
            success
            style={{
              height: 32,
              width: 60,
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: '400', fontSize: 18}}>
              Edit
            </Text>
          </Button>
        </Body>

        <Body
          style={{
            marginTop: hp('5%'),
          }}>
          <TouchableOpacity onPress={this.selectImage.bind(this)}>
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: wp('50%'),
                borderWidth: 3,
                borderColor: '#5cb85c',
              }}
              source={
                this.state.selectedImg
                  ? this.state.image
                  : {
                      uri: this.state.image
                        ? `${API_KEY_IMAGE}/engineer/${this.state.image}`
                        : `https://www.faitron.com/wp-content/uploads/2018/08/dummy.jpg`,
                    }
              }></Image>
          </TouchableOpacity>
        </Body>
        {this.state.selectedImg === 1 && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: hp('15%'),
            }}>
            {this.state.load && this.props.engineers.isLoading ? (
              <View
                style={{
                  top: hp('-15%'),
                }}>
                <ActivityIndicator></ActivityIndicator>
              </View>
            ) : (
              <>
                <View
                  style={{
                    top: hp('-15%'),
                    flexDirection: 'row',
                  }}>
                  <Button
                    onPress={this.onSave.bind(this)}
                    success
                    small
                    style={{
                      width: 72,
                      justifyContent: 'center',
                      marginRight: 32,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                      }}>
                      Save
                    </Text>
                  </Button>
                  <Button
                    onPress={this.onCancel.bind(this)}
                    danger
                    small
                    style={{
                      width: 72,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                      }}>
                      Cancel
                    </Text>
                  </Button>
                </View>
              </>
            )}
          </View>
        )}

        <Body
          style={{
            bottom: hp('7.5%'),
            position: 'absolute',
          }}>
          {this.props.engineers.isLoading && !this.state.load ? (
            <ActivityIndicator
              style={{
                justifyContent: 'center',
                bottom: hp('3.5%'),
              }}></ActivityIndicator>
          ) : (
            <Button
              onPress={this.delete.bind(this)}
              danger
              style={{
                height: hp('7%'),
                width: wp('100%'),
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 24, color: 'white', fontWeight: '400'}}>
                Delete Account
              </Text>
            </Button>
          )}
        </Body>

        <Footer
          style={{
            height: hp('7%'),
            width: wp('100%'),
            bottom: hp('0%'),
          }}>
          <Body>
            <Button
              style={{
                height: hp('7%'),
                width: wp('100%'),
                justifyContent: 'center',
              }}
              onPress={this.logout.bind(this)}
              danger>
              <Text style={{fontSize: 24, color: 'white', fontWeight: '400'}}>
                Logout
              </Text>
            </Button>
          </Body>
        </Footer>
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
  delete: url => dispatch(deleteEngineer(url)),
  editPhoto: (url, data) => dispatch(updateEngineer(url, data)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Profile),
);
