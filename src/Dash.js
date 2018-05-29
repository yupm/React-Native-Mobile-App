import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, AsyncStorage, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { Button, Card, CardSection, Input, Spinner } from './components/common';
import { withNavigation } from 'react-navigation';
import { VictoryArea, VictoryLabel, VictoryAxis, VictoryBar, VictoryZoomContainer, VictoryBrushContainer, VictoryChart, VictoryGroup, VictoryLine, VictoryPie, VictoryScatter, VictoryStack, VictoryErrorBar, VictoryVoronoiTooltip, VictoryTooltip } from 'victory-native'; // 0.17.4


class Dash extends Component {
    state = { isAdmin: false };

    constructor() {
        super();
      }

      _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('@User:key');
        this.setState({ username: userToken });
     };

    componentWillMount() {
        switch(this.state.isAdmin)
        {
            case true:
              break;
            case false:
              break;
            default:
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
                        <Text style={styles.header2TextStyle}>10000</Text>
                    </View>
                </CardSection>
                <Text style={styles.header1TextStyle}>Signups:</Text>
                <CardSection>
                <VictoryChart>
                  <VictoryStack>
                    <VictoryArea
                      data={[
                        {x: 'a', y: 2}, {x: 'b', y: 3}, {x: 'c', y: 5}, {x: 'd', y: 4}, {x: 'e', y: 7}
                      ]}
                    />
                  </VictoryStack>
                </VictoryChart>
                </CardSection>
                  <Text style={styles.header1TextStyle}>Gender Ratio:</Text>
                  <CardSection>
                      <VictoryPie
                      colorScale={["pink", "blue" ]}
                      width={400} height={400}
                      data={[
                        { x: 'Male', y: 120 }, { x: 'Female', y: 150 }
                      ]}
                      style={{ labels: { fontSize: 20, fill: 'white' } }}
                      />
                </CardSection>

                <Text style={styles.header1TextStyle}>Age:</Text>
                <CardSection>
                  <VictoryChart height={400} width={400}
                  domainPadding={{ x: 50, y: [0, 20] }}
                  scale={{ x: "time" }}
                  >
                  <VictoryBar
                    style={styles.pieStyle}
                    data={[
                      { x: new Date(1986, 1, 1), y: 2 },
                      { x: new Date(1996, 1, 1), y: 3 },
                      { x: new Date(2006, 1, 1), y: 5 },
                      { x: new Date(2016, 1, 1), y: 4 }
                    ]}
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
            return(
              <Card style={styles.iosTopStyle}>
                <CardSection>
                  <View style={styles.containerStyle}>
                      <View style={styles.inputStyle}>
                        <Text  style={styles.header1TextStyle}>100</Text>
                        <Text  style={styles.labelStyle}>Followers</Text>
                      </View>
                      <View style={styles.inputStyle}>
                      <Text  style={styles.header1TextStyle}>8</Text>
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
                  <Image></Image>
                </CardSection>

                <CardSection>
                  <Text style={styles.header1TextStyle}>Last login: </Text>
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
      color: '#000',
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 18,
      lineHeight: 23,
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
