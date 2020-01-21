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
import {Button} from 'native-base';
import {connect} from 'react-redux';
import {getEngineers} from '../public/redux/actions/engineers';
import {getPagination} from '../public/redux/actions/pagination';
import ListEngineers from './ListEngineers';
import _ from 'lodash';
import Header from './Header';
const heightScreen = Dimensions.get('window').height;
import {API_KEY_URL} from 'react-native-dotenv';

class Engineers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      token: '',
      search: '',
      resultErr: '',
      sort: '',
      order: '',
      limit: 5,
      ascVal: 'A - Z',
      descVal: 'Z - A',
      res: true,
    };
    this.onSearch = _.debounce(this.onSearch, 1500);
  }

  onSearch = async searchKey => {
    this.setState({search: searchKey});

    try {
      let url = `${API_KEY_URL}/engineers?searchValue=${searchKey}&sort=${this.state.sort}&order=${this.state.order}`;
      await this.props.get(url);
      this.setState({resultErr: ''});
    } catch (err) {
      this.setState({
        resultErr: `No Results of the keyword "${searchKey}", Please try another keyword`,
      });
    }
  };

  onSort = async value => {
    this.setState({
      sort: value,
    });

    if (value === 'name' || value === 'skill') {
      this.setState({ascVal: 'A - Z', descVal: 'Z - A'});
    } else if (value === 'date_updated') {
      this.setState({ascVal: 'Oldest', descVal: 'Newest'});
    } else if (value === 'expected_salary') {
      this.setState({ascVal: 'Lowest', descVal: 'Highest'});
    } else {
      this.setState({ascVal: 'A - Z', descVal: 'Z - A'});
    }
    let url = `${API_KEY_URL}/engineers?searchValue=${this.state.search}&sort=${value}&order=${this.state.order}&limit=${this.state.limit}`;
    await this.props.get(url);
  };

  onOrder = async value => {
    this.setState({
      order: value,
    });
    let url = `${API_KEY_URL}/engineers?searchValue=${this.state.search}&order=${value}&sort=${this.state.sort}&limit=${this.state.limit}`;
    await this.props.get(url);
  };

  onLimit = async value => {
    this.setState({
      limit: value,
    });
    let url = `${API_KEY_URL}/engineers?searchValue=${this.state.search}&order=${this.state.order}&sort=${this.state.sort}&limit=${value}`;
    await this.props.get(url);
  };

  componentDidMount = async () => {
    let url = `${API_KEY_URL}/engineers?limit=${this.state.limit}&page=${this.state.page}`;
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

  loadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      this.more,
    );
  };

  more = async () => {
    // this.setState({res: false});
    // console.warn(this.state.page);
    // let url = `${API_KEY_URL}/engineers?limit=${this.state.limit}&page=${this.state.page}`;
    // await this.props.getMore(url);
  };

  render = () => {
    return (
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          height: heightScreen,
        }}>
        <Header
          asc={this.state.ascVal}
          desc={this.state.descVal}
          sortVal={this.state.sort}
          orderVal={this.state.order}
          limitVal={this.state.limit}
          sort={this.onSort.bind(this)}
          order={this.onOrder.bind(this)}
          limit={this.onLimit.bind(this)}
          changeText={text => {
            this.onSearch(text);
          }}></Header>
        <SafeAreaView style={style.seriesContainer}>
          {this.props.engineers.isLoading ? (
            <ActivityIndicator color="#deaa9b" size="large"></ActivityIndicator>
          ) : this.props.engineers.isRejected ? (
            <Text style={style.text}>{this.state.resultErr}</Text>
          ) : (
            <FlatList
              style={style.list}
              data={this.props.engineers.engineers}
              renderItem={({item}) => <ListEngineers item={item} />}
              keyExtractor={item => item.id}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.05}
            />
          )}
        </SafeAreaView>
        {/* {this.props.pagination.isLoading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              bottom: 54,
              alignSelf: 'center',
            }}></ActivityIndicator>
        )} */}
      </View>
    );
  };
}

const style = StyleSheet.create({
  seriesContainer: {},
  text: {
    fontSize: 20,
  },
  list: {marginBottom: 370},
});
const mapStateToProps = state => {
  return {
    engineers: state.engineers,
    pagination: state.pagination,
  };
};
const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getEngineers(url)),
  getMore: url => dispatch(getPagination(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Engineers);
