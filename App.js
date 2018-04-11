import React, { Component } from 'react';

import {StackNavigator} from 'react-navigation';

import Home from './Pages/Home.js'
import Group1 from './Pages/Group1.js'
import Authenticate from './Pages/Authenticate.js'

const Navigation = StackNavigator({
  Home: {
    screen: Home
    },
    Group1: {
    screen: Group1
  },
  Authenticate: {
    screen: Authenticate
  }
   
});

export default Navigation;