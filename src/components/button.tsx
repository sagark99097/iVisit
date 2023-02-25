import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import theme from '../common/theme';
import { buttonProps } from '../types/componentType';

const ButtonUI: React.FC<buttonProps> = ({
    buttonName,
    onPress,
    extraStyle,
    textExtraStyle,
}) => {
    return (
        <View>
            <TouchableOpacity onPress={() => onPress()}>
                <View style={[styles.container, extraStyle && extraStyle]}>
                    <Text style={[styles.buttonText, textExtraStyle && textExtraStyle]}>
                        {buttonName}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonUI;
const styles = StyleSheet.create({
    container: {
        width: '60%',
        backgroundColor: theme.colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.moderateScale(10),
        borderRadius: theme.moderateScale(5),
        alignSelf: 'center',
        marginTop: theme.moderateScale(50)
    },
    buttonText: {
        color: theme.colors.white,
        fontSize: theme.moderateScale(15),
    },
});
