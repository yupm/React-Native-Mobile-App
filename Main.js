import React from 'react';
import { Button, Text, View, YellowBox } from 'react-native';
import { NewsFeed } from './src/NewsFeed';
import { Login } from './src/Login';
import { Dash } from './src/Dash';
import { Friends } from './src/Friends';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
//import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json


class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
    render() {
      return (
        <Login navigation={this.props.navigation} />
      );
    }
}

class SignUpScreen extends React.Component {
  render() {
    return (
      <SignUpScreen navigation={this.props.navigation} />
    );
  }
}

class ValidationScreen extends React.Component {
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

    uploadImage(){
        const data = new FormData();
        data.append('name', 'testName'); // you can append anyone.
        data.append('photo', {
          uri: 'http://cloud3-env.pxrcc3jm2v.ap-southeast-1.elasticbeanstalk.com/image/add',
          type: 'image/jpeg', // or photo.type
          name: 'testPhotoName'
        });
        fetch(url, {
          method: 'post',
          body: data
        }).then(res => {
          console.log(res)
        });
        
    }


    render() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onPress={() => this.uploadImage()}
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
  Register: { screen: SignUpScreen },
  Validate: { screen: ValidationScreen },
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
