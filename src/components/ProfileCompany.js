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
import {getCompany} from '../public/redux/actions/company';
import {deleteCompany, updateCompany} from '../public/redux/actions/companies';
import {withNavigation} from 'react-navigation';
import jwt_decode from 'jwt-decode';
import ImagePicker from 'react-native-image-picker';
import {API_KEY_URL, API_KEY_IMAGE} from 'react-native-dotenv';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const heightscr = Dimensions.get('window').height;

class ProfileCompany extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      selectedImg: 0,
      uri: '',
      filesize: 0,
      filename: '',
      token: '',
      id: '',
      name: '',
      email: '',
      location: '',
      description: '',
      password: '',
      image: null,
      imageTmp: null,
    };
  }

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
    navigation.navigate('EditCompany', this.state.id);
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
            let url = `${API_KEY_URL}/companies/${this.state.id}`;
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
    let url = `${API_KEY_URL}/companies/${decoded.id}`;
    this.props.get(url).then(() => {
      this.props.company.company.map(en => {
        return this.setState({
          id: en.id,
          name: en.name,
          email: en.email,
          location: en.location,
          image: en.image,
          description: en.description,
          password: en.password,
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
        console.log(response);
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
    this.setState({load: true});
    if (
      this.state.filename
        .substring(this.state.filename.lastIndexOf('.') + 1)
        .toLowerCase() !== 'jpg'
    ) {
      alert('Only .jpg file allowed!');
    } else if (this.state.filesize > 7 * 1024 * 1024) {
      alert('FIle too large. Minimun image is 7 MB');
    } else {
      let url = `${API_KEY_URL}/companies/${this.state.id}`;
      let data = new FormData();
      data.append('name', this.state.name);
      data.append('email', this.state.email);
      data.append('password', this.state.password);
      data.append('description', this.state.description);
      data.append('location', this.state.location);
      data.append('image', {
        uri: this.state.uri,
        type: 'image/jpeg',
        name: this.state.filename,
      });
      await this.props
        .editPhoto(url, data)
        .then(() => {
          alert('Success Update');
          this.props.navigation.push('CompanyRoute');
        })
        .catch(err => {
          this.setState({load: false});
          alert(err);
        });
    }
  };

  onCancel = () => {
    const imageTmp = this.state.imageTmp;
    this.setState({selectedImg: 0, image: imageTmp});
  };

  render = () => {
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
            <Title style={{fontSize: 28, color: 'black', fontWeight: '800'}}>
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
          {this.props.company.isLoading && (
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
                borderRadius: 100,
                borderWidth: 3,
                borderColor: '#41C009',
              }}
              source={
                this.state.selectedImg
                  ? this.state.image
                  : {
                      uri: this.state.image
                        ? `${API_KEY_IMAGE}/company/${this.state.image}`
                        : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjo4pFIXJ9DRDYG46Y0zz6xqF9qKU1NovD6mqK-zuFeK-3rbzZ&s`,
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
            {this.state.load && this.props.companies.isLoading ? (
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
                      marginTop: 32,
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
                      marginTop: 32,
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
          {this.props.companies.isLoading && !this.state.load ? (
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
  };
}

const mapStateToProps = state => {
  return {
    companies: state.companies,
    company: state.company,
  };
};
const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getCompany(url)),
  delete: url => dispatch(deleteCompany(url)),
  editPhoto: (url, data) => dispatch(updateCompany(url, data)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ProfileCompany),
);
