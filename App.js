import React, { Component } from 'react';

import {StackNavigator} from 'react-navigation';

import Home from './Pages/Home.js'
import GroupChatForm from './Pages/GroupChatForm.js'
import Authenticate from './Pages/Authenticate.js'

const Navigation = StackNavigator({
  Home: {
    screen: Home
    },
    GroupChatForm: {
    screen: GroupChatForm
  },
  Authenticate: {
    screen: Authenticate
  },
});

export default Navigation;