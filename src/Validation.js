import React from 'react';
import { Text, View } from 'react-native';
import { Button, Input, CardSection } from './components/common';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

class Validation extends React.Component {
  state = { username: '', authCode: '', password: '' };

  componentWillMount()
  {
    const { navigation } = this.props;
    const userId = navigation.getParam('userId', 'NO_ID');
    const pass = navigation.getParam('pass', 'NO_PW');

    console.log(userId);
    this.setState({ username: userId });
    this.setState({ password: pass });

  }

  onLoginFail() {
      console.log("fail");
      console.log(this.response);
      this.setState({
          loading: false,
          error: 'Verification Failed'
      });
  }

  onButtonPress() {
      const { username, authCode, password } = this.state;
      const { navigation } = this.props;

      let bodyFormData = new FormData();

      bodyFormData.append('username', username);
      bodyFormData.append('code', authCode);

      console.log(bodyFormData);

      axios({
          method: 'post',
          url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/sub/users/verify',
          data: bodyFormData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(function (response) {
          //handle success
          console.log("verified");
          console.log(response);

          let bodyFormData = new FormData();

          bodyFormData.append('username', username);
          bodyFormData.append('password', password);
          console.log(bodyFormData);

          axios({
              method: 'post',
              url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/sub/users/login',
              data: bodyFormData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
              //handle success
              console.log("yay");
              console.log(response.data.results.token);
              console.log(response);
              navigation.navigate('Home', { jwtToken: response.data.results.token });

          })
          .catch(this.onLoginFail.bind(this));
      })
      .catch(this.onLoginFail.bind(this));
  }


    render() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Verify code</Text>
            <CardSection>
            <Input
              value={this.state.authCode}
              onChangeText={authCode => this.setState({ authCode })}
            />
             <Button onPress={this.onButtonPress.bind(this)}>
                Enter
            </Button>
            </CardSection>

          </View>
        );
      }
}

export { Validation };
