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
      const { user } = this.props;
      let bodyFormData = new FormData();

      bodyFormData.append('username', user);
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

          for (var i=0; i < response.data.results.URL.length; i++)
          {
              var identifier = response.data.results.URL[i].key.split('.');
              var url = 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/get-single-image-stats/' + identifier[0];
              console.log(url);
              axios.get(url)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
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

   testLike = (likeKey) => {
    const { username } = this.state;
    const { user } = this.props;

    let bodyFormData = new FormData();

    bodyFormData.append('key', likeKey);
    bodyFormData.append('username', user);
    bodyFormData.append('like', true);

    console.log(user);

    axios({
        method: 'post',
        url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/sub/likes/insert',
        data: bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then((response) => {
        //handle success
        console.log(response);
      for (var i=0; i < this.state.albums.length; i++)
      {
        if (this.state.albums[i].key == this.likeKey)
        {

        }
      }

        console.log("Liked");
        console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }


    renderAlbums() {
        const { user } = this.props;

        return this.state.albums.map(album =>
        <AlbumDetail key={album.dateCreated} record={album} owner={user} addLike={this.testLike} />
        );
    }

    _onRefresh() {
        this.setState({refreshing: true});
        console.log("hey");
        this._bootstrapAsync();
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
