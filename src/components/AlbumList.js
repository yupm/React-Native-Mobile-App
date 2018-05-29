import React, { Component } from 'react';
import { ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
    state = { username: '', albums: [], refreshing: false };

    componentWillMount() {

      const { username } = this.state;

      this._bootstrapAsync();

      // axios.get('http://rallycoding.herokuapp.com/api/music_albums')
      //    .then(response => this.setState({ albums: response.data }));
    }

    _bootstrapAsync = async () => {
      const { input } = this.props;
      console.log("the input is");
      console.log(input);

      let bodyFormData = new FormData();

      bodyFormData.append('username', input);
      axios({
          method: 'post',
          url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/sub/image/friend/list',
          data: bodyFormData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then((response) => {
          //handle success
          console.log("Uploaded");
          console.log(response.data.results.URL);
          this.setState({ albums: response.data.results.URL});
      })
      .catch((error) => {
        console.error(error);
      });

   };

   componentDidMount()
   {

   }


   getSocialFeed()
   {

   }


    renderAlbums() {
        return this.state.albums.map(album =>
        <AlbumDetail key={album.dateCreated} record={album} />
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
