import React from 'react';
import { TextInput, View } from 'react-native';

const InputField = ({ value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, containerStyle } = styles;
    return (
            <TextInput 
            />
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'

    }
};


export { InputField };

