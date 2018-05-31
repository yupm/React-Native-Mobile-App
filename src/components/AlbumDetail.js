import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { axios } from 'axios';

const AlbumDetail = ({ record, owner, addLike }) => {
    const { thumbnailImageURL, dateCreated, isDeleted, like, imageURL, likeCount, id, key, username } = record;
    const { thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle,
        likeStyle } = styles;


    return (
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Text style={likeStyle}>{likeCount}</Text>
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
                <Button onPress={()=> {addLike(key)}} >
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
    },
    likeStyle:
    {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'red'
    }
};

export default AlbumDetail;
