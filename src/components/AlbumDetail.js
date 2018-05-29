import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { axios } from 'axios';

const AlbumDetail = ({ record }) => {
    const { thumbnailImageURL, dateCreated, isDeleted, like, imageURL, likeCount, id, key, username } = record;
    const { thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle } = styles;



    const onPressLike = () => {

      console.log("in like function");
      console.log(username);
      var bodyFormData = new FormData();

      bodyFormData.append('key', key);
      bodyFormData.append('username', input);
      bodyFormData.append('like', true);

      /*
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
      });*/

    };

    return (
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Image
                        style={thumbnailStyle}
                        source={{ uri: thumbnailImageURL }}
                    />
                </View>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{username}</Text>
                    <Text>{dateCreated}</Text>
                </View>
            </CardSection>
            <CardSection>
                <Image
                style={imageStyle}
                source={{ uri: imageURL }} />
            </CardSection>
            <CardSection>
                <Button onPress={onPressLike} >
                    Like
                </Button>
            </CardSection>
        </Card>
    );
};


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

export default AlbumDetail;
