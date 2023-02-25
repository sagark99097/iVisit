import React from 'react';
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import theme from '../common/theme';
import { LoaderProps } from '../types/componentType';

const LoaderUI: React.FC<LoaderProps> = ({ showLoader }) => {
    return (
        <Modal
            animationType={'none'}
            animated={false}
            transparent={true}
            visible={showLoader}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color={theme.colors.black} />
            </View>
        </Modal>
    );
};
export default LoaderUI;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.blackTransparent,
    },
});
