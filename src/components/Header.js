import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Picker} from 'native-base';
import {Searchbar} from 'react-native-paper';

const widthScreen = Dimensions.get('window').width;

const Header = props => {
  const {
    changeText,
    sort,
    order,
    sortVal,
    orderVal,
    asc,
    desc,
    limit,
    limitVal,
  } = props;

  return (
    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.15)', height: 320}}>
      <ImageBackground
        source={require('../public/assets/header.jpeg')}
        style={style.image}>
        <View style={style.background}>
          <Text style={style.title}>Hiring Channel App</Text>
          <Text style={style.desc}>
            Connect and Help Companies Find the Talent
          </Text>
          <Text style={style.desc}>They are Looking For</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View style={style.search}>
            <Searchbar
              onChangeText={text => {
                changeText(text);
              }}
              placeholder="Search Engineer's Name ..."></Searchbar>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          marginTop: 32,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          width: 140,
          height: 40,
          marginLeft: 12,
          borderRadius: 20,
          justifyContent: 'center',
        }}>
        <Picker
          mode="dialog"
          selectedValue={sortVal}
          onValueChange={sort}
          style={{
            height: 50,
            width: 140,
            color: '#EAE5E4',
          }}>
          <Picker.Item label="Sort by" value="" />
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Skill" value="skill" />
          <Picker.Item label="Date Updated" value="date_updated" />
          <Picker.Item label="Expected Salary" value="expected_salary" />
        </Picker>
      </View>
      <View
        style={{
          marginTop: 32,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          width: 100,
          height: 40,
          marginLeft: 160,
          borderRadius: 20,
          top: -72,
          justifyContent: 'center',
          position: 'relative',
        }}>
        <Picker
          mode="dialog"
          selectedValue={orderVal}
          onValueChange={order}
          style={{
            height: 50,
            width: 100,
            color: '#EAE5E4',
          }}>
          <Picker.Item label={asc} value="asc" />
          <Picker.Item label={desc} value="desc" />
        </Picker>
      </View>
      <View
        style={{
          marginTop: 32,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          width: 102,
          height: 40,
          marginLeft: 270,
          borderRadius: 20,
          top: -144,
          justifyContent: 'center',
          position: 'relative',
        }}>
        <Picker
          mode="dialog"
          selectedValue={limitVal}
          onValueChange={limit}
          style={{
            height: 50,
            width: 102,
            color: '#EAE5E4',
          }}>
          <Picker.Item label="Limit" value="" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="15" value="15" />
          <Picker.Item label="20" value="20" />
        </Picker>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    height: 240,
    resizeMode: 'cover',
  },
  background: {
    height: 240,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontFamily: 'serif',
    fontSize: 32,
    marginTop: 8,
    marginLeft: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  desc: {
    fontFamily: 'serif',
    fontSize: 16,
    marginTop: 4,
    marginLeft: 20,
    color: '#fff',
    fontWeight: '100',
  },
  search: {
    marginTop: -24,
    width: widthScreen - 50,
  },
});

export default Header;
