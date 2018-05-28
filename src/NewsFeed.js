import React from 'react';
import { View } from 'react-native';
//import Header from './components/header';

import AlbumList from './components/AlbumList';

class NewsFeed extends React.Component {
    render() {
      const { navigation } = this.props;
      const jwtToken = navigation.getParam('jwtToken', 'NO_TOKEN');

      return (
        <View style={{ flex: 1 }}>
                <AlbumList />
        </View>
      );
    }
  }
  

export { NewsFeed };
