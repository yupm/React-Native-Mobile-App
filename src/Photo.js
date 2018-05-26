import React from 'react';
import { Text, View, Button, AsyncStorage } from 'react-native';
import axios from 'axios';
import { withNavigation } from 'react-navigation';

var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Select Image',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class Photo extends React.Component {
  state = { username: '' };

  componentWillMount()
  {
    console.log("Photostart");

    const { navigation } = this.props;
    //const userId = navigation.getParam('userId', 'NO_ID');
    try {
      const value = AsyncStorage.getItem('@User:key');
      if (value !== null){
        console.log("User retrieved from storage");
        console.log(value);
        this.setState({ username: value });
      }
    } catch (error) {
      // Error retrieving data
    }
    console.log(navigation.state);

    //this.setState({ username: userId });
  }

    render() {
      const { username} = this.state;

      console.log("Rendering photo");
      console.log(username);

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

                                let bodyFormData = new FormData();

                                bodyFormData.append('username', username);
                                bodyFormData.append('file', source);

                                console.log(bodyFormData);

                                axios({
                                    method: 'post',
                                    url: 'http://cloud3-env.pxrcc3jm2v.ap-southeast-1.elasticbeanstalk.com/users/add',
                                    data: bodyFormData,
                                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                                })
                                .then(function (response) {
                                    //handle success
                                    console.log("Uploaded");
                                    console.log(response);

                                })
                                .catch(this.onLoginFail.bind(this));

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

export { Photo };
