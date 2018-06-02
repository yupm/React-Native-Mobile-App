import React from 'react';
import { TextInput, View } from 'react-native';

const InputField = ({ value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, containerStyle } = styles;
    return (
        <View style={containerStyle}>
            <TextInput 
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                underlineColorAndroid={'transparent'} 
                autoCorrect={false}
            />
        </View>
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

