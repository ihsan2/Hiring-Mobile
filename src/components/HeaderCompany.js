import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Searchbar} from 'react-native-paper';

const widthScreen = Dimensions.get('window').width;

const HeaderCompany = props => {
  const {changeText} = props;

  return (
    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.15)', height: 292}}>
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
              placeholder="Search Company's Name ..."></Searchbar>
          </View>
        </View>
      </ImageBackground>
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

export default HeaderCompany;
