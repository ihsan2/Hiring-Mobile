import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Container, Header, Left, Button, Body, Title} from 'native-base';
import moment from 'moment';
import {API_KEY_IMAGE} from 'react-native-dotenv';
import {ScrollView} from 'react-native-gesture-handler';

const Engineer = props => {
  const {navigation} = props;
  const engineer = navigation.getParam('engineer', {});

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
                uri: engineer.image
                  ? `${API_KEY_IMAGE}/engineer/${engineer.image}`
                  : `https://www.faitron.com/wp-content/uploads/2018/08/dummy.jpg`,
              }}
            />
            <Text style={style.userName}>{engineer.name}</Text>
            <Icon name="map-marked-alt" style={style.iconLoc}>
              <Text style={style.userLoc}> {engineer.location}</Text>
            </Icon>
          </View>
        </ImageBackground>
        <View>
          <ScrollView>
            <View style={style.viewInfo}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Icon name="calendar-alt" style={style.iconCal}></Icon>
                <Text style={style.cal}>
                  {moment(engineer.date_of_birth).format('MMMM Do, YYYY')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Icon name="envelope" style={style.iconEmail}></Icon>
                <Text style={style.email}>{engineer.email}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Icon name="github" style={style.iconGithub}></Icon>
                <Text style={style.github}>{engineer.showcase}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Icon name="dollar-sign" style={style.iconDollar}></Icon>
                <Text style={style.dollar}>{engineer.expected_salary}</Text>
              </View>
            </View>
            <View style={style.saparatorContainer}>
              <View style={style.separatorOffset} />
              <View style={style.separator} />
            </View>
            <View style={style.viewSkill}>
              <Text style={style.skill}>Skill:</Text>
              <Text style={style.skillval}>{engineer.skill}</Text>
            </View>
            <View style={style.viewDesc}>
              <Text style={style.desc}>Description:</Text>
              <Text style={style.descval}>{engineer.description}</Text>
            </View>
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
  iconDollar: {
    color: '#85bb65',
    marginTop: 8,
    fontSize: 24,
  },
  dollar: {
    color: 'gray',
    fontSize: 20,
    fontWeight: '200',
    marginLeft: 30,
    marginTop: 8,
  },
  iconCal: {
    color: '#228AE6',
    marginTop: 8,
    fontSize: 24,
    marginBottom: 16,
  },
  cal: {
    color: 'gray',
    fontSize: 20,
    fontWeight: '200',
    marginLeft: 20,
    marginTop: 8,
  },
  iconGithub: {
    color: '#211F1F',
    marginTop: 8,
    fontSize: 24,
    marginBottom: 16,
  },
  github: {
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
    marginLeft: 20,
    marginTop: 8,
    fontStyle: 'italic',
  },
  descval: {
    color: 'gray',
    fontSize: 20,
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
