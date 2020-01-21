import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Container, Header, Left, Button, Body, Title} from 'native-base';
import {API_KEY_IMAGE} from 'react-native-dotenv';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';

const Engineer = props => {
  const {navigation} = props;
  const company = navigation.getParam('company', {});

  return (
    <Container>
      <Header style={{backgroundColor: 'white'}}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-left" size={25} />
          </Button>
        </Left>
        <Body
          style={{
            marginLeft: 72,
          }}>
          <Title
            style={{
              color: 'gray',
              fontWeight: 'bold',
              fontSize: 24,
            }}>
            Profile
          </Title>
        </Body>
      </Header>

      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.15)', height: 240}}>
        <ImageBackground
          source={require('../public/assets/header.jpeg')}
          style={style.image}>
          <View style={style.background}>
            <Image
              style={style.userImage}
              source={{
                uri: company.image
                  ? `${API_KEY_IMAGE}/company/${company.image}`
                  : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjo4pFIXJ9DRDYG46Y0zz6xqF9qKU1NovD6mqK-zuFeK-3rbzZ&s`,
              }}
            />
            <Text style={style.userName}>{company.name}</Text>
            <Icon name="map-marked-alt" style={style.iconLoc}>
              <Text style={style.userLoc}> {company.location}</Text>
            </Icon>
          </View>
        </ImageBackground>
        <View>
          <View style={style.viewInfo}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon name="envelope" style={style.iconEmail}></Icon>
              <Text style={style.email}>{company.email}</Text>
            </View>
          </View>
          <View style={style.saparatorContainer}>
            <View style={style.separatorOffset} />
            <View style={style.separator} />
          </View>

          <Text style={style.desc}>Description:</Text>
          <ScrollView
            style={{
              marginBottom: hp('20%'),
            }}>
            <Text style={style.descval}>{company.description}</Text>
          </ScrollView>
        </View>
      </View>
    </Container>
  );
};

const style = StyleSheet.create({
  image: {
    height: 320,
    resizeMode: 'cover',
  },
  background: {
    height: 320,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    borderColor: '#6EBD79',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    width: 170,
  },
  userName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  userLoc: {
    color: '#A5A5A5',
    fontSize: 15,
  },
  iconLoc: {
    color: '#FFF',
    marginTop: 8,
    fontSize: 24,
  },
  iconEmail: {
    color: '#d44638',
    marginTop: 8,
    fontSize: 24,
    marginBottom: 16,
  },
  email: {
    color: 'gray',
    fontSize: 20,
    fontWeight: '200',
    marginLeft: 20,
    marginTop: 8,
  },
  viewInfo: {
    marginLeft: 20,
    marginTop: 8,
  },
  saparatorContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    flex: 12,
    flexDirection: 'row',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 2,
  },
  viewDesc: {
    marginTop: 8,
  },
  desc: {
    color: 'gray',
    fontSize: 20,
    fontWeight: '200',
    marginLeft: 24,
    marginTop: 24,
    fontStyle: 'italic',
  },
  descval: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 8,
  },
  viewSkill: {
    marginTop: 12,
  },
  skill: {
    color: 'gray',
    fontSize: 20,
    fontWeight: '200',
    marginLeft: 20,
    marginTop: 8,
    fontStyle: 'italic',
  },
  skillval: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 12,
    marginTop: 8,
  },
});

const handlerBack = () => {
  this.goBack(); // works best when the goBack is async
  return true;
};

export default Engineer;
