import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../../common/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PATHS } from '../../../types/enums/NavigationPath';
import navigationService from '../../../navigation/services';
import { removeItem, storageKeys } from '../../../config/asyncStorage';
import strings from '../../../common/strings';

const SettingsScreen = () => {

    const onPressLogout = () => {
        removeItem(storageKeys.SESSION,
            (success: Function) => {
                navigationService.reset(PATHS.LOGIN);
            },
            (failure: Function) => {
            },
        );
    }

    return (
        <View >
            <TouchableOpacity onPress={() => onPressLogout()}>
                <View style={styles.logoutContainer}>
                    <Text children={strings.LOGOUT} style={styles.textStyle} />
                    <Icon
                        name={'keyboard-arrow-right'}
                        size={32}
                        color={theme.colors.black}
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.seperator} />
            <View style={styles.versionContainer}>
                <Text children={strings.VERSION} style={styles.textStyle} />
            </View>
            <View style={styles.seperator} />
        </View>
    )
}
export default SettingsScreen;

const styles = StyleSheet.create({
    logoutContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.moderateScale(10),
    },
    versionContainer: {
        margin: theme.moderateScale(10),
    },
    seperator: {
        width: '100%',
        height: 1,
        backgroundColor: theme.colors.black
    },
    textStyle: {
        fontSize: theme.moderateScale(15),
    }
})