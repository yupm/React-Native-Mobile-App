import React, { Component } from 'react';
import { ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import axios from 'axios';
import MemoirDetails from './MemoirDetails';

class MemoirList extends Component {
    state = { username: '', albums: [], refreshing: false, success: false };
    componentWillMount() {
      const { username } = this.state;

      this._bootstrapAsync();
    }



    _bootstrapAsync()
    {
        const { username } = this.state;
        const { user } = this.props;

        let bodyFormData = new FormData();
            bodyFormData.append('username', user);
            axios({
                method: 'post',
                url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/sub/image/user/list',
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response) => {
                //handle success

                if(response.data.results.URL.length > 10)
                {
                this.setState({ success: true});
                }
                this.setState({ albums: response.data.results.URL});

            })
            .catch((error) => {
            console.error(error);
            });

    }


    renderAlbums() {
        const { user } = this.props;

        return this.state.albums.map(album =>
        <MemoirDetails key={album.dateCreated} record={album} />
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

export default MemoirList;
