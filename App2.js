import React from 'react';
import { Button, Text, View, YellowBox } from 'react-native';
import { NewsFeed } from './src/NewsFeed';
import { Login } from './src/Login';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
//import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json


class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('NewsFeed')}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const AuthStack = createStackNavigator({
  Login: { screen: Login },
});


const MainNavigator = createBottomTabNavigator({
  Home: { screen: NewsFeed },
  Settings: { screen: SettingsScreen },
  Details: { screen: DetailsScreen },
});


const SwitchNavigator = createSwitchNavigator({
  SignIn: AuthStack,
  Main: MainNavigator,
});

export default class App extends React.Component {
  render() {
    return <SwitchNavigator />;
  }
}
