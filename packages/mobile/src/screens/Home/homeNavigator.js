import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../../components/Header';

import HomeScreen from './HomeScreen/Home';

const HomeNavigator = createStackNavigator();

const Home = () => (
  <HomeNavigator.Navigator initialRouteName="targetDetail">
    <HomeNavigator.Screen name="home" component={Home} />
    <HomeNavigator.Screen
      name="targetDetail"
      component={HomeScreen}
      options={{
        header: (props) => <Header {...props} title="meta" />,
      }}
    />
    <HomeNavigator.Screen name="goalDetail" component={Home} />
  </HomeNavigator.Navigator>
);

export default Home;
