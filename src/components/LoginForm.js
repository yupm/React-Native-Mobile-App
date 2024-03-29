import React, { Component } from 'react';
import { Text, View , AsyncStorage } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

class LoginForm extends Component {
    state = { username: '', password: '', error: '', loading: null };

    onButtonPress() {
        const { username, password } = this.state;
        const { navigation } = this.props;

        this.setState({ error: '', loading: true });
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
        .then((response) => {
            //handle success

            try {
                  AsyncStorage.setItem('@User:key', username);
                  AsyncStorage.setItem('@Token:key', response.data.results.token);
                  AsyncStorage.setItem('@IsAdmin:key', response.data.results['custom:admin']);

            } catch (error) {
              // Error saving data
              console.log("Error saving key");
              console.log(error);
            }

            try {
              AsyncStorage.getItem('@User:key').then((value) =>{
                if (value !== null){
                  // We have data!!
                }
              });
            } catch (error) {
              // Error retrieving data
            }

            navigation.navigate('Home', { jwtToken: response.data.results.token, userId: username });

        })
        .catch(this.onLoginFail.bind(this));
    }


    onLoginFail() {
        console.log("fail");
        console.log(this.response);
        this.setState({
            loading: false,
            error: 'Authentication Failed'
        });
    }


    onLoginSuccess() {
        this.setState({
            username: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    renderLoginButton()
    {
        if (this.state.loading){
            return <Spinner size="small" />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
            Login
            </Button>
        );
    }

    renderSignUpButton()
    {
        return (
            <Button  onPress={() => { this.props.navigation.navigate('Register')}}>
            Sign up
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user"
                        label="UserId"
                        value={this.state.username}
                        onChangeText={username => this.setState({ username })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />

                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderLoginButton()}
                </CardSection>
                <CardSection>
                    {this.renderSignUpButton()}
                </CardSection>
            </Card>
        )
    };
}

const styles = {
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'red'
    }

}

export { LoginForm };
