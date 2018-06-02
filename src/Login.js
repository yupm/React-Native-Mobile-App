import React from 'react';
import { View } from 'react-native';
import { Header, Button, Card, CardSection, Spinner } from './components/common';
import { LoginForm } from './components/LoginForm';
import { withNavigation } from 'react-navigation';

class Login extends React.Component {
    state = { loggedIn: false };

    renderContent(){
        switch(this.state.loggedIn)
        {
            case true:
                return(
                    <Card>
                        <CardSection>
                            <Button>
                            Log Out</Button>
                        </CardSection>
                    </Card>
                );
            case false:
                return <LoginForm navigation={this.props.navigation}/>
            
            default:
                return(
                    <View style={styles.spinnerStyle}>
                        <Spinner size="large" />
                    </View>
                );

        }
    }
        

    render (){
        return (
            <View >
                {this.renderContent()}
            </View>
        );
    }
        
}
  
const styles = {
    spinnerStyle: {
        marginTop: 30,
    }
 };

export { Login };
