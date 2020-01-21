import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Companies from '../components/Companies';

const CompaniesHome = () => {
  return (
    <>
      <StatusBar
        backgroundColor="rgba(21, 67, 96, 1)"
        barStyle="light-content"
      />
      <SafeAreaView>
        <Companies />
      </SafeAreaView>
    </>
  );
};

export default CompaniesHome;
