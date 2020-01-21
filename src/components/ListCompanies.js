import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  List,
  ListItem,
  Left,
  Body,
  Thumbnail,
  Icon,
  Button,
  TouchableOpacity,
} from 'native-base';
import {withNavigation} from 'react-navigation';
const widthScreen = Dimensions.get('window').width;
import {API_KEY_IMAGE} from 'react-native-dotenv';

const ListCompanies = props => {
  const {item, navigation} = props;
  return (
    <View style={style.view}>
      <List>
        <View style={style.parentView}>
          <View style={style.childView1}>
            <ListItem
              onPress={() => {
                navigation.navigate('Company', {
                  company: item,
                });
              }}>
              <Left>
                <Thumbnail
                  square
                  style={style.thumb}
                  source={{
                    uri: !item.image
                      ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjo4pFIXJ9DRDYG46Y0zz6xqF9qKU1NovD6mqK-zuFeK-3rbzZ&s`
                      : `${API_KEY_IMAGE}/company/${item.image}`,
                  }}
                />
              </Left>
              <Body style={style.body}>
                <Text style={style.name}>{item.name}</Text>
                <Text numberOfLines={2}>{item.description}</Text>
              </Body>
              <View style={style.childView2}>
                <Icon
                  type="FontAwesome"
                  name="envelope"
                  style={style.iconEmail}
                />
                <Text style={style.textEmail}>{item.email}</Text>
              </View>
            </ListItem>
          </View>
        </View>
      </List>
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginTop: 0,
  },
  parentView: {
    alignItems: 'center',
  },
  childView1: {
    backgroundColor: '#fff',
    width: widthScreen - 20,
    height: 130,
    borderRadius: 5,
    marginTop: 40,
  },
  childView2: {
    position: 'absolute',
    marginRight: 20,
    top: 90,
  },
  detail: {
    position: 'absolute',
    bottom: 0,
    right: -90,
    width: 50,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  thumb: {
    borderRadius: 4,
    height: 90,
    width: 90,
    marginTop: -40,
  },
  body: {
    marginLeft: -120,
    marginTop: -8,
  },
  iconEmail: {
    fontSize: 25,
    color: '#ff4343',
  },
  iconDollar: {
    fontSize: 25,
    color: '#85bb65',
  },
  textEmail: {
    position: 'relative',
    left: 32,
    bottom: 21,
  },
  textDollar: {
    position: 'relative',
    left: 24,
    bottom: 21,
  },
  textDetail: {
    fontStyle: 'italic',
  },
});

export default withNavigation(ListCompanies);
