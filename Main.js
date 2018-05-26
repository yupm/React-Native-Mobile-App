import React from 'react';
import { Button, Text, View, YellowBox } from 'react-native';
import { NewsFeed } from './src/NewsFeed';
import { Login } from './src/Login';
import { Dash } from './src/Dash';
import { Registration } from './src/Registration';
import { Friends } from './src/Friends';
import { Validation } from './src/Validation';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'; // Version can be specified in package.json

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
//import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


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


class PhotoScreen extends React.Component {
    render() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onPress={() =>    ImagePicker.launchImageLibrary(options, (response) => {
                                console.log('Response = ', response);
                                if (response.didCancel) {
                                  console.log('User cancelled image picker');
                                }
                                else if (response.error) {
                                  console.log('ImagePicker Error: ', response.error);
                                }
                                else if (response.customButton) {
                                  console.log('User tapped custom button: ', response.customButton);
                                }
                                else {
                                  let source = { uri: response.uri };

                                  // You can also display the image using data:
                                  // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                                  this.setState({
                                    avatarSource: source
                                  });
                                }
                              })
                      }
            title="Upload!"
            />
         </View>
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
  Search: { screen: SearchScreen },
  Upload: { screen: PhotoScreen },
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
