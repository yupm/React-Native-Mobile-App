import React from 'react';
import { Button, Text, View, YellowBox } from 'react-native';
import { NewsFeed } from './src/NewsFeed';
import { Login } from './src/Login';
import { Dash } from './src/Dash';
import { Registration } from './src/Registration';
import { Friends } from './src/Friends';
import { Validation } from './src/Validation';
import { Photo } from './src/Photo';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'; // Version can be specified in package.json

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
//import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json


class LoginScreen extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: 'center' },
    title: 'Login',
  };
    render() {
      return (
        <Login navigation={this.props.navigation} />
      );
    }
}

class SignUpScreen extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: 'center' },
    title: 'Sign up!',
  };
  render() {
    return (
      <Registration navigation={this.props.navigation} />
    );
  }
}

class ValidationScreen extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: 'center' },
    title: 'Confirmation Code',
  };
  render() {
    return (
      <Validation navigation={this.props.navigation} />
    );
  }
}

class AuthSpinnerScreen extends React.Component {
  render() {
    return (
      <AuthSpinner navigation={this.props.navigation} />
    );
  }
}

class NewsFeedScreen extends React.Component {
    render() {
      return (
        <NewsFeed navigation={this.props.navigation} />
      );
    }
}

class SearchScreen extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: 'center' },
    title: 'Search',
  };
    render() {
      return (
        <Friends navigation={this.props.navigation}/>
      );
    }
}


class PhotoScreen extends React.Component {
    render() {
        return (
          <Photo navigation={this.props.navigation} />
        );
      }
}

class DashScreen extends React.Component {
    render() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Details!</Text>
          </View>
        );
      }
}

const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen },
  Validate: { screen: ValidationScreen },
  Register: { screen: SignUpScreen },
  Access: { screen: AuthSpinnerScreen },
});


const MainNavigator = createBottomTabNavigator({
  Home: { screen: NewsFeedScreen },
  Upload: { screen: PhotoScreen },
  Search: { screen: SearchScreen },
  Dashboard: { screen: DashScreen },
});


const SwitchNavigator = createSwitchNavigator({
  SignIn: AuthStack,
  Main: MainNavigator,
});


export default class Main extends React.Component {
  render() {
    return <SwitchNavigator />;
  }
}
