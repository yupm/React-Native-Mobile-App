import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { axios } from 'axios';

const MemoirDetails = ({ record,  addLike }) => {
    const { thumbnailImageURL, dateCreated, isDeleted, imageURL, likeCount, id, key, username } = record;
    const { thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle,
        likeStyle } = styles;


    return (
        <Card>
            <CardSection>
                <Image
                style={imageStyle}
                source={{ uri: imageURL }} />
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

export default MemoirDetails;
