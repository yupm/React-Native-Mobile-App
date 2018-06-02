import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import MemoirList from './components/MemoirList';


class Memories extends React.Component {
  state = {  username: ''};

      constructor() {
        super();
        this._bootstrapAsync();
      }

      _bootstrapAsync = async () => {
          const userToken = await AsyncStorage.getItem('@User:key');
          this.setState({ username: userToken });
      };


    render() {
      return (
        <View style={{ flex: 1 }}>
                <MemoirList user={ this.state.username } />
        </View>
      );
    }
  }


export { Memories };
