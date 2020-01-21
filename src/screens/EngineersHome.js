import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Engineers from '../components/Engineers';

const EngineersHome = () => {
  return (
    <>
      <StatusBar
        backgroundColor="rgba(21, 67, 96, 1)"
        barStyle="light-content"
      />
      <SafeAreaView>
        <Engineers />
      </SafeAreaView>
    </>
  );
};

export default EngineersHome;
