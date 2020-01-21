import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Dimensions,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {getCompanies} from '../public/redux/actions/companies';
import ListCompanies from './ListCompanies';
import _ from 'lodash';
import HeaderCompany from './HeaderCompany';
const heightScreen = Dimensions.get('window').height;
import {API_KEY_URL} from 'react-native-dotenv';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      search: '',
      resultErr: '',
      sort: '',
      order: '',
      limit: 5,
      ascVal: 'A - Z',
      descVal: 'Z - A',
    };
    this.onSearch = _.debounce(this.onSearch, 1500);
  }

  onSearch = async searchKey => {
    this.setState({search: searchKey});

    try {
      let url = `${API_KEY_URL}/companies?search=${searchKey}`;
      await this.props.get(url);
      this.setState({resultErr: ''});
    } catch (err) {
      this.setState({
        resultErr: `No Results of the keyword "${searchKey}", Please try another keyword`,
      });
    }
  };

  componentDidMount = async () => {
    let url = `${API_KEY_URL}/companies`;
    await this.props.get(url);
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressed,
    );
  }

  onBackButtonPressed() {
    return true;
  }

  render = () => {
    return (
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          height: heightScreen,
        }}>
        <HeaderCompany
          changeText={text => {
            this.onSearch(text);
          }}></HeaderCompany>
        <SafeAreaView style={style.seriesContainer}>
          {this.props.companies.isLoading ? (
            <ActivityIndicator color="#deaa9b" size="large"></ActivityIndicator>
          ) : this.props.companies.isRejected ? (
            <Text style={style.text}>{this.state.resultErr}</Text>
          ) : (
            <FlatList
              style={style.list}
              data={this.props.companies.companies}
              renderItem={({item}) => <ListCompanies item={item} />}
              keyExtractor={item => item.id}
            />
          )}
        </SafeAreaView>
      </View>
    );
  };
}

const style = StyleSheet.create({
  seriesContainer: {},
  text: {
    fontSize: 20,
  },
  list: {marginBottom: 346},
});
const mapStateToProps = state => {
  return {
    companies: state.companies,
  };
};
const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getCompanies(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
