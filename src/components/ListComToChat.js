import React from 'react';
import {View, Text} from 'react-native';
import {List, ListItem, Left, Body, Thumbnail, Icon, Right} from 'native-base';
import {withNavigation} from 'react-navigation';
import {API_KEY_IMAGE} from 'react-native-dotenv';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ListComToChat = props => {
  const {itemcom, navigation} = props;
  return (
    <View>
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail
              circular
              source={{uri: `${API_KEY_IMAGE}/company/${itemcom.image}`}}
            />
          </Left>
          <Body
            style={{
              flexDirection: 'row',
            }}>
            <View>
              <Text> {itemcom.name} </Text>
              <Text note numberOfLines={1}>
                {itemcom.email}
              </Text>
            </View>
          </Body>
          {/* <View>
              <Icon name="home"></Icon>
            </View> */}
          <Right style={{right: wp('100%')}}>
            <TouchableOpacity
              onPress={() => {
                // here we navigate and pass props the components got it
                navigation.navigate('Chat', {
                  com: itemcom,
                });
              }}>
              <Icon name="paper-plane" size={30}></Icon>
            </TouchableOpacity>
          </Right>
        </ListItem>
      </List>
    </View>
  );
};

export default withNavigation(ListComToChat);
