import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native'
import { PATHS } from '../../../types/enums/NavigationPath';
import theme from '../../../common/theme';
import { getItem, storageKeys } from '../../../config/asyncStorage';
import navigationService from '../../../navigation/services'

const SplashScreen = () => {

    useEffect(() => {
        getItem(
            storageKeys.SESSION,
            (success: Function) => {
                setTimeout(() => {
                    navigationService.navigate(PATHS.VISITS)
                }, 3000);
            },
            (failure: Function) => {
                setTimeout(() => {
                    navigationService.navigate(PATHS.LOGIN)
                }, 3000);
            },
        );
    });

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/splash.png')}
                imageStyle={[styles.img, { borderRadius: 0 }]}
                style={styles.img}>
            </ImageBackground>
        </View>
    )
}
export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0dede',
        flex: 1,
    },
    img: {
        width: theme.deviceWidth,
        height: 620,
        alignItems: 'center',
        resizeMode: 'contain',
        backgroundColor: '#e2e2e4',
        justifyContent: 'center',
    },
})
