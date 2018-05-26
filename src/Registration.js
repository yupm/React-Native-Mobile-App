import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './components/common';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

class Registration extends Component {
    state = { username: '', password: '', email: '', phonenumber: '', error: '', loading: null };


    onButtonPress() {       
        const { username, password, email, phonenumber } = this.state;
        const { navigation } = this.props;

        this.setState({ error: '', loading: true });
        let bodyFormData = new FormData();

        bodyFormData.append('username', username);
        bodyFormData.append('password', password);
        bodyFormData.append('email', email);
        bodyFormData.append('number', phonenumber);
        
        console.log(bodyFormData);
        
        axios({
            method: 'post',
            url: 'http://cloud3-env.pxrcc3jm2v.ap-southeast-1.elasticbeanstalk.com/users/add',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            console.log("registered");
            console.log(response);
            navigation.navigate('Validate', { userId: username, pass: password });

        })
        .catch(this.onLoginFail.bind(this));
    }


    onLoginFail() {        
        this.setState({ 
            loading: false,
            error: 'Registration Failed!'
        });
    }


    onLoginSuccess() {
        this.setState({ 
            username: '',
            password: '',
            email: '',
            phonenumber: '',
            loading: false,
            error: ''
        });
    }

    renderSignUpButton()
    {
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
            Sign up
            </Button>
        );
    }

    render() {
        return ( 
            <View>
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
                            placeholder="email"
                            label="Email"
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}                       
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

                    <CardSection>
                        <Input
                            secureTextEntry
                            placeholder="number"
                            label="Phone"
                            value={this.state.phonenumber}
                            onChangeText={phonenumber => this.setState({ phonenumber })}                       
                        />
                    </CardSection>

                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                    <CardSection>
                        {this.renderSignUpButton()}
                    </CardSection>
                </Card>
            </View>
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

export { Registration };
