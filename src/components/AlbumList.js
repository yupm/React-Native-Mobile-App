import React, { Component } from 'react';
import { ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
    state = { username: '', albums: [], refreshing: false };

    componentWillMount() {

      const { username } = this.state;

      this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
      const { user } = this.props;
      let bodyFormData = new FormData();

      console.log(user);

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
          console.log(response);

          this.setState({ albums: response.data.results.URL});

          for (var i=0; i < response.data.results.URL.length; i++)
          {
              var identifier = response.data.results.URL[i].key.split('.');
              var url = 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/get-single-image-stats/' + identifier[0];
              axios.get(url)
              .then((response) =>{
                var labels = JSON.stringify(response.data);

                 var splitter = response.config.url.split('/');
                 var imagekey = splitter[5];
                // console.log(imagekey);

                 for (var i = 0; i < this.state.albums.length; i++)
                 {
                   if (this.state.albums[i].key.includes(imagekey)){
                      // console.log(this.state.albums[i]);
                       this.state.albums[i].tags = labels;
                       this.forceUpdate();
                   }
                 }

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
