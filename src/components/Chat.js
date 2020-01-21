import React, {PureComponent} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  Body,
  Title,
  Button,
  Left,
  Right,
  Item,
  Input,
  Thumbnail,
  List,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {
  getMessage,
  addMessage,
  deleteMessage,
} from '../public/redux/actions/message';
import {withNavigation} from 'react-navigation';
import {API_KEY_URL, API_KEY_IMAGE} from 'react-native-dotenv';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import jwt_decode from 'jwt-decode';
const heightscr = Dimensions.get('window').height;

class Chat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      id_en: '',
      id_message: '',
    };
  }

  componentDidMount = async () => {
    const com = this.props.navigation.getParam('com', {});
    const token = await AsyncStorage.getItem('token');
    const decoded = jwt_decode(token);
    this.setState({id_en: decoded.id});
    let url = `${API_KEY_URL}/message?id_company=${com.id}&id_engineer=${decoded.id}`;
    await this.props.get(url);
  };

  apiCall = async () => {
    const com = this.props.navigation.getParam('com', {});
    const token = await AsyncStorage.getItem('token');
    const decoded = jwt_decode(token);
    this.setState({id_en: decoded.id, message: ''});
    let url = `${API_KEY_URL}/message?id_company=${com.id}&id_engineer=${decoded.id}`;
    await this.props.get(url);
  };

  send = async () => {
    const com = this.props.navigation.getParam('com', {});
    const id_com = com.id;
    let url = `${API_KEY_URL}/message/toCompany`;
    const {message, id_en} = this.state;
    const data = {
      id_engineer: id_en,
      id_company: id_com,
      message,
    };
    await this.props
      .add(url, data)
      .then(() => {
        this.apiCall();
        this.setState({message: ''});
      })
      .catch(err => {
        alert(err);
      });
  };

  longPress = async id_message => {
    Alert.alert(
      `Delete Message`,
      'Are you sure want to delete message?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            let url = `${API_KEY_URL}/message/toCompany/${id_message}`;
            await this.props.delete(url);
            this.apiCall();
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const com = this.props.navigation.getParam('com', {});
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
          <Body
            style={{
              flexDirection: 'row',
            }}>
            <Thumbnail
              style={{
                height: hp('5%'),
                width: wp('10%'),
              }}
              circular
              source={
                com.image
                  ? {
                      uri: `${API_KEY_IMAGE}/company/${com.image}`,
                    }
                  : {
                      uri: `https://www.faitron.com/wp-content/uploads/2018/08/dummy.jpg`,
                    }
              }
            />
            <Title
              style={{
                color: 'black',
                fontWeight: 'bold',
                alignSelf: 'center',
                left: wp('3%'),
              }}>
              {com.name}
            </Title>
          </Body>
          <Right>
            {this.props.message.isLoading ? (
              <ActivityIndicator
                style={{
                  right: wp('6%'),
                }}></ActivityIndicator>
            ) : (
              <Button
                onPress={this.apiCall}
                success
                style={{
                  height: 32,
                  width: 70,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                  }}>
                  {' '}
                  Refresh{' '}
                </Text>
              </Button>
            )}
          </Right>
        </Header>
        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
            flexDirection: 'column',
            marginTop: hp('0.5%'),
          }}>
          <View
            style={{
              height: hp('84.5%'),
              bottom: hp('1%'),
            }}>
            <FlatList
              inverted
              data={this.props.message.message}
              renderItem={({item}) => (
                <ListMessage message={item} press={this.longPress} />
              )}
              keyExtractor={item => item.id}
            />
          </View>

          <View>
            <Item
              style={{
                backgroundColor: '#E5E7E5',
                borderRadius: wp('10%'),
              }}>
              <Input
                value={this.state.message}
                style={{
                  width: wp('70%'),
                  left: wp('5%'),
                }}
                placeholder="Type Message ..."
                onChangeText={value => this.setState({message: value})}
              />
              {this.state.message.length >= 1 && (
                <TouchableOpacity onPress={this.send.bind(this)}>
                  <Text
                    style={{
                      right: wp('5%'),
                      fontSize: wp('7%'),
                      color: '#85C1E9',
                      fontWeight: 'bold',
                    }}>
                    Send
                  </Text>
                </TouchableOpacity>
              )}
            </Item>
          </View>
        </View>
      </View>
    );
  }
}

const ListMessage = props => {
  const {message, press} = props;
  return (
    <List>
      {message.role === 'company' ? (
        <View
          style={{
            height: hp('6%'),
            backgroundColor: '#F0F0F0',
            width: wp('80%'),
            justifyContent: 'center',
            marginTop: hp('0.5%'),
            borderRadius: wp('10%'),
            alignSelf: 'flex-start',
          }}>
          <Text
            style={{
              marginLeft: wp('3.5%'),
            }}>
            {' '}
            {message.message}{' '}
          </Text>
        </View>
      ) : (
        <TouchableOpacity onLongPress={() => press(message.id_message)}>
          <View
            style={{
              height: hp('6%'),
              backgroundColor: 'rgba(44,180,89,0.3)',
              width: wp('80%'),
              justifyContent: 'center',
              marginTop: hp('0.5%'),
              borderRadius: wp('10%'),
              alignSelf: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                marginRight: wp('3.5%'),
              }}>
              {' '}
              {message.message}{' '}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </List>
  );
};

const mapStateToProps = state => {
  return {
    message: state.message,
  };
};
const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getMessage(url)),
  add: (url, data) => dispatch(addMessage(url, data)),
  delete: url => dispatch(deleteMessage(url)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Chat),
);
