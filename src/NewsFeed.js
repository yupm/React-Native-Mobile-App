import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';

//import Header from './components/header';

import AlbumList from './components/AlbumList';

class NewsFeed extends React.Component {
    render() {
      const { navigation } = this.props;
      const jwtToken = navigation.getParam('jwtToken', 'NO_TOKEN');
      const userId = navigation.getParam('userId', 'NO_ID');

      console.log("I am in newsfeed");
      console.log(userId);
      return (
        <View style={{ flex: 1 }}>
                <AlbumList input={ userId } />
        </View>
      );
    }
  }


export { NewsFeed };
