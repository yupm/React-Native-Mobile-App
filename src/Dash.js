import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, AsyncStorage, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { Button, Card, CardSection, Input, Spinner } from './components/common';
import { withNavigation } from 'react-navigation';
import { VictoryArea, VictoryLabel, VictoryAxis, VictoryBar, VictoryZoomContainer, VictoryBrushContainer, VictoryChart, VictoryGroup, VictoryLine, VictoryPie, VictoryScatter, VictoryStack, VictoryErrorBar, VictoryVoronoiTooltip, VictoryTooltip } from 'victory-native'; // 0.17.4


class Dash extends Component {
    state = { isAdmin: true, num_users: '', signups: [], ratio_male: '', ratio_female: '', age_cat: [], top_tags: [], num_followers: '', num_avg_likes: '',
              recommend_followers: [], one_mth_image: '', last_login: '' };

    constructor() {
        super();
        this._bootstrapAsync();
      }

      _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('@User:key');
        this.setState({ username: userToken });

        const userType = await AsyncStorage.getItem('@User:key');

        console.log("the  state data is ");
        console.log(this.state.username);
     };

    componentWillMount() {
        switch(this.state.isAdmin)
        {
            case true:
              //Call all admin apis here
              axios({
                  method: 'post',
                  url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/dashboard-module/dashboard/getTotalNumberOfUsers',
                  config: { headers: {'Content-Type': 'text/plain' }}
              })
              .then((response) => {
                  //handle success
                  console.log("getTotalNumberOfUsers");
                  console.log(response);

                  this.setState({ num_users: response.data.results.totalNumberOfUsers });
              })
              .catch((error) => {
                console.error(error);
              });


              axios({
                  method: 'post',
                  url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/dashboard-module/dashboard/numberOfNewSignUps',
                  config: { headers: {'Content-Type': 'text/plain' }}
              })
              .then((response) => {
                  //handle success
                  console.log("numberOfNewSignUps");
                  console.log(response);

                  var signUpData = [];
                  for ( property in response.data.results.numberOfNewSignUps ) {
                    signUpData.push( {x: property, y: response.data.results.numberOfNewSignUps[property]});
                  }

                  console.log(signUpData);

                  this.setState({ signups: signUpData });
              })
              .catch((error) => {
                console.error(error);
              });


              axios({
                  method: 'post',
                  url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/dashboard-module/dashboard/getDistributionByGender',
                  config: { headers: {'Content-Type': 'text/plain' }}
              })
              .then((response) => {
                  //handle success
                  console.log("getDistributionByGender");
                  console.log(response);
                  this.setState({ ratio_male: response.data.results.getDistributionByGender.Male });
                  this.setState({ ratio_female: response.data.results.getDistributionByGender.Female });
              })
              .catch((error) => {
                console.error(error);
              });


              axios({
                method: 'post',
                url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/dashboard-module/dashboard/getDistributionByAge',
                config: { headers: {'Content-Type': 'text/plain' }}
              })
              .then((response) => {
                  //handle success
                  console.log("getDistributionByAge");
                  console.log(response);

                  var ageData = [
                        { x: "18-21", y: response.data.results.getDistributionByAge["18-21"]},
                        { x:"22-28", y: response.data.results.getDistributionByAge["22-28"]},
                        { x: "29-38", y: response.data.results.getDistributionByAge["29-38"]},
                        { x: "39-55", y: response.data.results.getDistributionByAge["39-55"]},
                        { x: "56-76", y: response.data.results.getDistributionByAge[ "56-76"]},
                        { x: "77-99", y: response.data.results.getDistributionByAge["77-99"]},
                  ];
                  console.log("age data is");

                  console.log(ageData);

                  this.setState({ age_cat: ageData });

              })
              .catch((error) => {
                console.error(error);
              });

              break;
            case false:
            default:
              // Call all user apis here
              //num followers
                let bodyFormData = new FormData();
                bodyFormData.append('username', this.state.username);
                axios({
                    method: 'post',
                    url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/dashboard-module/dashboard/getNumberOfFriends',
                    data: bodyFormData,
                    config: { headers: {'Content-Type': 'text/plain' }}
                })
                .then((response) => {
                    //handle success
                    //console.log(response);
                    this.setState({ num_followers: response.data.results.getNumberofFriends });

                })
                .catch((error) => {
                  console.error(error);
                });


              //ave likes photos
              axios({
                method: 'post',
                url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/dashboard-module/dashboard/avgLikesPerPhoto',
                data: bodyFormData,
                config: { headers: {'Content-Type': 'text/plain' }}
              })
              .then((response) => {
                  //handle success
                  //console.log(response);
                  this.setState({ num_avg_likes: response.data.results["avgLikes"] });
              })
              .catch((error) => {
                console.error(error);
              });


              //list of ppl to follow
              axios({
                method: 'post',
                url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/dashboard-module/dashboard/recommendFriends',
                data: bodyFormData,
                config: { headers: {'Content-Type': 'text/plain' }}
              })
              .then((response) => {
                  //handle success
                  ///console.log(response);
                  this.setState({ recommend_followers: response.data.results.recommendedFriendsOutput });

              })
              .catch((error) => {
                console.error(error);
              });


              //one month ago
              axios({
                method: 'post',
                url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/dashboard-module/dashboard/getMonthAgoMemory',
                data: bodyFormData,
                config: { headers: {'Content-Type': 'text/plain' }}
              })
              .then((response) => {
                  //handle success
                  //console.log(response);
                  this.setState({ one_mth_image: response.data.results.getOneMonthAgoMemory });

              })
              .catch((error) => {
                console.error(error);
              });

              let bodyFormData2 = new FormData();
              bodyFormData2.append('username', this.state.username);
              console.log(this.state.username);
              //last login
              axios({
                method: 'post',
                url: 'https://kwvx92a9o2.execute-api.us-east-2.amazonaws.com/dev/dashboard-module/dashboard/lastlogin',
                data: bodyFormData2,
                config: { headers: {'Content-Type': 'text/plain' }}
              })
              .then((response) => {
                  //handle success
                  console.log(response);
                  this.setState({ last_login: response.data.results.lastLogin });

              })
              .catch((error) => {
                console.error(error);
              });


              break;
        }
    }


  renderDashboardType(){
    switch(this.state.isAdmin)
    {
        case true:
            return(
                <Card>
                <CardSection>
                    <View style={styles.headerContentStyle}>
                        <Text style={styles.headerTextStyle}>Dashboard</Text>
                    </View>
                </CardSection>
                <CardSection>
                    <View style={styles.headerContentStyle}>
                        <Text style={styles.header1TextStyle}>Total Number of Registered Users:</Text>
                        <Text style={styles.header2TextStyle}>{this.state.num_users}</Text>
                    </View>
                </CardSection>
                <Text style={styles.header1TextStyle}>Signups:</Text>
                <CardSection>
                  <VictoryChart height={400} width={400}
                      domainPadding={{ x: 50, y: [0, 20] }}
                  >
                    <VictoryBar
                      style={styles.pieStyle}
                      data={this.state.signups}
                    />
                  </VictoryChart>
                </CardSection>

                  <Text style={styles.header1TextStyle}>Gender Ratio:</Text>
                  <CardSection>
                      <VictoryPie
                      colorScale={["blue", "pink" ]}
                      width={400} height={400}
                      data={[
                        { x: 'Male', y: this.state.ratio_male }, { x: 'Female', y: this.state.ratio_female }
                      ]}
                      style={{ labels: { fontSize: 20, fill: 'white' } }}
                      />
                </CardSection>

                <Text style={styles.header1TextStyle}>Age:</Text>
                <CardSection>
                  <VictoryChart height={400} width={400}
                  domainPadding={{ x: 50, y: [0, 20] }}
                  >
                  <VictoryBar
                    style={styles.pieStyle}
                    data={this.state.age_cat}
                  />
                  </VictoryChart>
                </CardSection>

                <Text style={styles.header1TextStyle}>Top 10 Tags uploaded by users:</Text>
                <CardSection>
                <Text>Applee</Text>

                </CardSection>

                <CardSection>
                  <Button onPress={this.onLogOut.bind(this)}>
                      Log Out
                  </Button>
                </CardSection>
                </Card>
            );



        case false:
           const { one_mth_image } = this.state;
        ////////////////////////////////////////////////////////////////////////USER//////////////////////////////////////////////////
            return(
              <Card style={styles.iosTopStyle}>
                <CardSection>
                  <View style={styles.containerStyle}>
                      <View style={styles.inputStyle}>
                        <Text  style={styles.header1TextStyle}>{this.state.num_followers}</Text>
                        <Text  style={styles.labelStyle}>Followers</Text>
                      </View>
                      <View style={styles.inputStyle}>
                      <Text  style={styles.header1TextStyle}>{this.state.num_avg_likes}</Text>
                      <Text  style={styles.labelStyle}>Ave. Likes/Photo </Text>
                      </View>
                  </View>

                </CardSection>

                <CardSection>
                  <View>
                      <Text style={styles.header2TextStyle}> List of recommended people to follow: </Text>
                  </View>
                </CardSection>

                <CardSection>
                  <Text style={styles.header1TextStyle}>One month ago: </Text>
                  <Image ></Image>
                </CardSection>

                <CardSection>
                  <Text style={styles.header1TextStyle}>Last login: </Text>
                  <Text  style={styles.labelStyle}>{this.state.last_login}</Text>
                </CardSection>

                <CardSection>
                  <Button onPress={this.onLogOut.bind(this)}>
                      Log Out
                  </Button>
                </CardSection>
              </Card>
            );
        default:
        return(
          <Text>Why no status??</Text>
        );
    }
}



    onLogOut()
    {
      console.log("Log out");
      console.log(this.props);
      const { navigation } = this.props;

      AsyncStorage.setItem('@User:key', '');
      AsyncStorage.setItem('@Token:key', '');

      navigation.navigate('SignIn');
    }




    render() {
        return (
        <ScrollView>
          {this.renderDashboardType()}
        </ScrollView>
        );
      }
}

const styles = {
  headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around',
  },
  headerTextStyle: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',

  },
  header1TextStyle: {
    fontSize: 20,
    color: 'black',
  },
  header2TextStyle: {
    fontSize: 18,
    color: 'black',

  },
  thumbnailStyle: {
      height: 50,
      width: 50
  },
  thumbnailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10
  },
  imageStyle: {
      height: 300,
      flex: 1,
      width: null
  },
  pieStyle: {
    data: { fill: 'tomato' }
  },
  inputStyle: {
      paddingRight: 5,
      paddingLeft: 5,
      flex: 2
  },
  labelStyle: {
      fontSize: 18,
      paddingLeft: 0,
      flex: 1
  },
  containerStyle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 30,
  },
  iosTopStyle:
  {
    paddingTop: 100
  }
};

  export { Dash };
