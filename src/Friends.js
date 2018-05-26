import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert } from 'react-native';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
    }
    this.arrayholder = [] ;
  }

  componentDidMount() {
    return fetch('http://cloud3-env.pxrcc3jm2v.ap-southeast-1.elasticbeanstalk.com/users/list')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.results.users),
        }, function() {
          // In this block you can do something with new state.
          this.arrayholder = responseJson.results.users;
          console.log("Add json");
          console.log(responseJson.results.users)
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  GetListViewItem (username) {
   Alert.alert(username);
  }

   SearchFilterFunction(text){
     console.log("IN search function");
     console.log(text);
     const newData = this.arrayholder.filter(function(item){
         const itemData = item.username.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
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
      <TextInput
       style={styles.TextInputStyleClass}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
        />
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator= {this.ListViewItemSeparator}
          renderRow={(rowData) => <Text style={styles.rowViewContainer}
          onPress={this.GetListViewItem.bind(this, rowData.username)} >{rowData.username}</Text>}
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
