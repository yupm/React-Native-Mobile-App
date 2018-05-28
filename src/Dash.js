import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, AsyncStorage, ScrollView } from 'react-native';
import axios from 'axios';
import { Button, Card, CardSection, Input, Spinner } from './components/common';
import { withNavigation } from 'react-navigation';
import { VictoryArea, VictoryAxis, VictoryZoomContainer, VictoryBrushContainer, VictoryChart, VictoryGroup, VictoryLine, VictoryPie, VictoryScatter, VictoryStack, VictoryErrorBar, VictoryVoronoiTooltip, VictoryTooltip } from 'victory-native'; // 0.17.4


class Dash extends Component {
    constructor() {
        super();
        this.state = {
          zoomDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] }
        };
      }

    handleZoom(domain) {
    this.setState({ zoomDomain: domain });
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
          <Card>
            <CardSection>
                <View >
                </View>
                <View style={styles.headerContentStyle}>
                    <Text>Dashboash</Text>
                    <Text>Dashboash</Text>
                </View>
            </CardSection>
            <CardSection>
            <VictoryChart>
            <VictoryStack>
              <VictoryArea
                data={[
                  {x: 'a', y: 2}, {x: 'b', y: 3}, {x: 'c', y: 5}, {x: 'd', y: 4}, {x: 'e', y: 7}
                ]}
              />
              <VictoryArea
                data={[
                  {x: 'a', y: 1}, {x: 'b', y: 4}, {x: 'c', y: 5}, {x: 'd', y: 7}, {x: 'e', y: 5}
                ]}
              />
              <VictoryArea
                data={[
                  {x: 'a', y: 3}, {x: 'b', y: 2}, {x: 'c', y: 6}, {x: 'd', y: 2}, {x: 'e', y: 6}
                ]}
              />
              <VictoryArea
                data={[
                  {x: 'a', y: 2}, {x: 'b', y: 3}, {x: 'c', y: 3}, {x: 'd', y: 4}, {x: 'e', y: 10}
                ]}
              />
            </VictoryStack>
          </VictoryChart> 
          </CardSection>
          <View>
          <VictoryChart width={600} height={470} scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={[
                { a: new Date(1982, 1, 1), b: 125 },
                { a: new Date(1987, 1, 1), b: 257 },
                { a: new Date(1993, 1, 1), b: 345 },
                { a: new Date(1997, 1, 1), b: 515 },
                { a: new Date(2001, 1, 1), b: 132 },
                { a: new Date(2005, 1, 1), b: 305 },
                { a: new Date(2011, 1, 1), b: 270 },
                { a: new Date(2015, 1, 1), b: 470 }
              ]}
              x="a"
              y="b"
            />

          </VictoryChart>
          <VictoryChart
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={600} height={100} scale={{ x: "time" }}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={this.state.zoomDomain}
                onBrushDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={[
                { key: new Date(1982, 1, 1), b: 125 },
                { key: new Date(1987, 1, 1), b: 257 },
                { key: new Date(1993, 1, 1), b: 345 },
                { key: new Date(1997, 1, 1), b: 515 },
                { key: new Date(2001, 1, 1), b: 132 },
                { key: new Date(2005, 1, 1), b: 305 },
                { key: new Date(2011, 1, 1), b: 270 },
                { key: new Date(2015, 1, 1), b: 470 }
              ]}
              x="key"
              y="b"
            />
          </VictoryChart>
          </View>

            <CardSection>
                <Button onPress={this.onLogOut.bind(this)}>
                    Log Out
                </Button>
            </CardSection>
        </Card>
        </ScrollView>
        );
      }
}
  
const styles = {
  headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18,
    color: 'black'
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
  }
};
  
  export { Dash };
