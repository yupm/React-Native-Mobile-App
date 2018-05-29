import React, { Component } from 'react';
import { ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
    state = { username: '', albums: [], refreshing: false };

    componentWillMount() {
      const { username } = this.state;

        this._bootstrapAsync();
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        let bodyFormData = new FormData();
        console.log("Adding username");

        console.log(username);
        bodyFormData.append('username', username);
        axios({
            method: 'post',
            url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/sub/image/friend/list',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then((response) => {
            //handle success
            console.log("Uploaded");
            console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });


      // axios.get('http://rallycoding.herokuapp.com/api/music_albums')
      //    .then(response => this.setState({ albums: response.data }));
    }

    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('@User:key');
      this.setState({ username: userToken });
   };

   componentDidMount()
   {

   }


   getSocialFeed()
   {

   }


    renderAlbums() {
        return this.state.albums.map(album =>
        <AlbumDetail key={album.title} record={album} />
        );
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.setState({refreshing: false});
      }

    render() {
        return (
            <ScrollView
                refreshControl= {
                <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                />
                }
            >
                {this.renderAlbums()}
            </ScrollView>
        );
    }
}

export default AlbumList;
