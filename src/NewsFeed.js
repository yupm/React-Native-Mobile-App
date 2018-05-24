import React from 'react';
import { View } from 'react-native';
//import Header from './components/header';

import AlbumList from './components/AlbumList';

class NewsFeed extends React.Component {
    render() {
      return (
        <View style={{ flex: 1 }}>
                <AlbumList />
        </View>
      );
    }
  }
  

export { NewsFeed };
