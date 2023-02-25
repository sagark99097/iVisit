import React from 'react';
import { TextInput, StyleSheet, } from 'react-native';
import theme from '../common/theme';
import { textInputProps } from '../types/componentType';

const TextInputUI: React.FC<textInputProps> = ({
    value,
    onChangeText,
    placeholder,
    textInputStyle,
    keyboardType,
    editable = true,
    autoCapitalize = 'sentences',
}) => {
    return (
        <TextInput
            style={[styles.container, textInputStyle && textInputStyle]}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.grey4}
            keyboardType={keyboardType || 'default'}
            editable={editable}
            autoCapitalize={autoCapitalize}
        />
    );
};
export default TextInputUI;

const styles = StyleSheet.create({
    textinputContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.amber,
        borderColor: theme.colors.grey3,
        borderWidth: 1,
        height: theme.moderateScale(40),
        paddingHorizontal: theme.moderateScale(7),
    },
    container: {
        height: theme.moderateScale(40),
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.black,
        width: '80%',
        alignSelf: 'center',
        marginTop: theme.moderateScale(10)
    },
});
