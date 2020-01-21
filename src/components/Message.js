import React, {PureComponent} from 'react';
import {Text, View, Dimensions, FlatList, StyleSheet} from 'react-native';
import {Header, Body, Title, Button, Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {API_KEY_URL} from 'react-native-dotenv';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Searchbar, ActivityIndicator} from 'react-native-paper';
import ListComToChat from './ListComToChat';
import _ from 'lodash';
import {getCompanyChat} from '../public/redux/actions/companychat';

const heightscr = Dimensions.get('window').height;

class Message extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      search: '',
      resultErr: '',
      isSearch: false,
    };
    this.onSearchCom = _.debounce(this.onSearchCom, 800);
  }

  componentDidMount = async () => {
    this.setState({isSearch: false});
    // let url = `${API_KEY_URL}/companies`;
    // await this.props.get(url);
  };

  send = async () => {
    let url = `${API_KEY_URL}/tes`;
    const {name} = this.state;
    await this.props
      .create(url, {name})
      .then(() => {
        this.apiCall();
      })
      .catch(err => {
        alert(err);
      });
  };

  onSearchCom = async searchKey => {
    if (!searchKey) {
      this.setState({isSearch: false});
    } else {
      this.setState({search: searchKey, isSearch: true});

      try {
        let url = `${API_KEY_URL}/companies?search=${searchKey}`;
        await this.props.get(url);
        this.setState({resultErr: ''});
      } catch (err) {
        this.setState({
          resultErr: `No Results of the keyword "${searchKey}", Please try another keyword`,
        });
      }
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
                marginLeft: wp('-15%'),
              }}>
              Message
            </Title>
          </Body>
        </Header>

        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
            flexDirection: 'row',
            marginTop: hp('1%'),
          }}>
          <View
            style={{
              alignItems: 'center',
              marginTop: hp('0.5%'),
              flex: 1,
            }}>
            <View>
              <Searchbar
                style={{
                  width: wp('95%'),
                  backgroundColor: '#E5E7E5',
                  borderRadius: wp('10%'),
                }}
                onChangeText={text => {
                  this.onSearchCom(text);
                }}
                placeholder="Search Who want to message ..."></Searchbar>
            </View>
            <View style={style.saparatorContainer}>
              <View style={style.separatorOffset} />
              <View style={style.separator} />
            </View>
            {this.props.companychat.isLoading && (
              <ActivityIndicator
                style={{
                  top: hp('30%'),
                }}></ActivityIndicator>
            )}
            {this.state.isSearch && (
              <FlatList
                style={{
                  alignSelf: 'flex-start',
                  width: hp('100%'),
                  marginBottom: hp('7%'),
                }}
                data={this.props.companychat.companychat}
                renderItem={({item}) => <ListComToChat itemcom={item} />}
                keyExtractor={item => item.id}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  saparatorContainer: {
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    flex: wp('100%'),
    flexDirection: 'row',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: hp('0.1%'),
  },
});

const mapStateToProps = state => {
  return {
    companychat: state.companychat,
  };
};
const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getCompanyChat(url)),
});

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Message),
);
