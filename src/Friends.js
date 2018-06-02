import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';


class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      userToken: '',
    }
    this.arrayholder = [] ;
  }


  componentWillMount()
  {
    this._bootstrapAsync();
    //this.setState({ username: userId });
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('@User:key');
    this.setState({ username: userToken });
 };

  componentDidMount() {
    const emptyString = '[]';
    const fakeJson = JSON.parse(emptyString);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      isLoading: false,
      dataSource: ds.cloneWithRows(fakeJson),
    }, function() {
      // In this block you can do something with new state.
      this.arrayholder = fakeJson;
    });

    this._bootstrapAsync();
  }

  FollowUser(followThis) {
    const { username } = this.state;
    var url = 'http://userapineo4j-test.ap-southeast-1.elasticbeanstalk.com/users/follow/' + username + '|' + followThis ;

    axios.post(url)
    .then((responseJson) => {
      console.log(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  UnFollowUser(unfollowThis) {
    const { username } = this.state;
     var url = 'http://userapineo4j-test.ap-southeast-1.elasticbeanstalk.com/users/unfollow/' + username + '|' + unfollowThis ;

    console.log('Unfollow user');

    axios.post(url)
    .then((responseJson) => {
      console.log("Success")
      console.log(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  GetListViewItem (username, sub, following) {
    if(!following)
    {
      Alert.alert('Follow!',
      username,
        [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.FollowUser(username)},
      ],
      { cancelable: false }
      );
    }
    else {
      Alert.alert('Unfollow!',
      username,
        [
        {text: 'Cancel', onPress: () =>  console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.UnFollowUser(username)},
      ],
      { cancelable: false }
    );
    }
}

SearchFilterFunction(text){
  const { username } = this.state;
  console.log(text);
  console.log(username);
  let bodyFormData = new FormData();
  bodyFormData.append('search', text);
  bodyFormData.append('username', username);
  axios({
      method: 'post',
      url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/sub/users/search',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
  })
  .then((responseJson) => {
    console.log("in here");
    console.log(responseJson.data.results.users)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      isLoading: false,
      dataSource: ds.cloneWithRows(responseJson.data.results.users),
    }, function() {
      // In this block you can do something with new state.
      this.arrayholder = responseJson.data.results.users;
    });
  })
  .catch((error) => {
    console.error(error);
  });
}


  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <SearchBar
          autoCapitalize = 'none'
          lightTheme
          round
          placeholder='Type Here...'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
          onEndEditing={() => this.SearchFilterFunction(this.state.text)}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator= {this.ListViewItemSeparator}
          renderRow={(rowData) =>
            <View>
            <Text style={styles.rowViewContainer}
                  onPress={this.GetListViewItem.bind(this, rowData.username,rowData.sub, rowData.is_following )}
                  >{rowData.username}</Text>
            </View>}
          enableEmptySections={true}
          style={{marginTop: 10}}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
 MainContainer :{
  justifyContent: 'center',
  flex:1,
  margin: 7,
  },
 rowViewContainer: {
   fontSize: 17,
   padding: 10
  },
  TextInputStyleClass:{
   marginTop: 20,
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
   }
});


export { Friends };
