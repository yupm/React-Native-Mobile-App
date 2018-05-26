import React from 'react';
import { Text, View } from 'react-native';
import { Button, Input, CardSection } from './components/common';
import { withNavigation } from 'react-navigation';

class Validation extends React.Component {
  state = { username: '', authCode: '' };

  onLoginFail() {
      console.log("fail");
      console.log(this.response);
      this.setState({
          loading: false,
          error: 'Verification Failed'
      });
  }


  onButtonPress() {
      const { userId, authCode } = this.state;
      const { navigation } = this.props;

      this.setState({ error: '', loading: true });
      let bodyFormData = new FormData();

      bodyFormData.append('username', username);
      bodyFormData.append('code', authCode);

      console.log(bodyFormData);

      axios({
          method: 'post',
          url: 'http://cloud3-env.pxrcc3jm2v.ap-southeast-1.elasticbeanstalk.com/users/verify',
          data: bodyFormData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(function (response) {
          //handle success
          console.log("verified");
          console.log(response);
          navigation.navigate('Login');

      })
      .catch(this.onLoginFail.bind(this));
  }


    render() {
        const { navigation } = this.props;
        const userId = navigation.getParam('userId', 'NO_ID');

        console.log(userId);
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
