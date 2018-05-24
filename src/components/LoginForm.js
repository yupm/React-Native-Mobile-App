import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { withNavigation } from 'react-navigation';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };


    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
        // firebase.auth().signInWithEmailAndPassword(email, password)
        //     .then(this.onLoginSuccess.bind(this))
        //     .catch(() => {
        //         firebase.auth().createUserWithEmailAndPassword(email, password)
        //             .then(this.onLoginSuccess.bind(this))
        //             .catch(this.onLoginFail.bind(this));
        //     });
    }

    onLoginFail() {
        this.setState({ 
            loading: false,
            error: 'Authentication Failed'
        });
    }


    onLoginSuccess() {
        this.setState({ 
            email: '',
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
            <Button  onPress={() => { this.props.navigation.navigate('Home')}}>
            Login
            </Button>
        );
    }

    renderSignUpButton()
    {
        if (this.state.loading){
            return <Spinner size="small" />;
        }
        return (
            <Button  onPress={() => { this.props.navigation.navigate('Home')}}>
            Sign up
            </Button>
        );
    }

    render() {
        return ( 
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@gmail.com"
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
