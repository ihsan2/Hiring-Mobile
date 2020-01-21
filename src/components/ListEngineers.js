import React from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {List, ListItem, Left, Body, Thumbnail, Icon, Button} from 'native-base';
import {withNavigation} from 'react-navigation';
const widthScreen = Dimensions.get('window').width;
import {API_KEY_IMAGE} from 'react-native-dotenv';

const ListEngineers = props => {
  const {item, navigation} = props;
  return (
    <View style={style.view}>
      <List>
        <View style={style.parentView}>
          <View style={style.childView1}>
            <ListItem>
              <Left>
                <Thumbnail
                  square
                  style={style.thumb}
                  source={{
                    uri: !item.image
                      ? `https://www.faitron.com/wp-content/uploads/2018/08/dummy.jpg`
                      : `${API_KEY_IMAGE}/engineer/${item.image}`,
                  }}
                />
              </Left>
              <Body style={style.body}>
                <Text style={style.name}>{item.name}</Text>
                <Text numberOfLines={1}>{item.description}</Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontWeight: 'bold',
                  }}>
                  Skill: {item.skill}
                </Text>
              </Body>
              <View style={style.childView2}>
                <Icon
                  type="FontAwesome"
                  name="envelope"
                  style={style.iconEmail}
                />
                <Text style={style.textEmail}>{item.email}</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: 40,
                  top: 90,
                }}>
                <Icon
                  type="FontAwesome"
                  name="dollar"
                  style={style.iconDollar}
                />
                <Text style={style.textDollar}>{item.expected_salary}</Text>
                <View>
                  <Button
                    onPress={() => {
                      // here we navigate and pass props the components got it
                      navigation.navigate('Engineer', {
                        engineer: item,
                      });
                    }}
                    small
                    transparent
                    info
                    style={style.detail}>
                    <Text style={style.textDetail}>Detail</Text>
                  </Button>
                </View>
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
    bottom: 90,
    marginRight: 50,
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

export default withNavigation(ListEngineers);
