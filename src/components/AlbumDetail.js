import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const AlbumDetail = ({ record }) => {
    const { thumbnailImageURL, dateCreated, isDeleted, like, imageURL, likeCount, id, key, username } = record;
    const { thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle } = styles;

    

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
                <Button  >
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
