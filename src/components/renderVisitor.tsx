import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, } from 'react-native';
import theme from '../common/theme';
import { renderVisitorProps } from '../types/componentType'

const RenderVisitor: React.FC<renderVisitorProps> = ({
    item,
    index,
    onPressVisitDetails,
}) => {
    return (
        <View style={styles.renderItemContainer} key={index}>
            <TouchableOpacity onPress={() => onPressVisitDetails(item)}>
                <View style={styles.innerContainer}>
                    <Image style={styles.visitorImage} source={{ uri: item.picture }}></Image>
                    <Text children={item.title + item.firstName + item.lastName} style={styles.visitorName} />
                    <Text children={item.email} style={styles.visitorEmail} />
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default RenderVisitor;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: theme.moderateScale(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    renderItemContainer: {
        height: theme.moderateScale(250),
        width: '50%',
        padding: theme.moderateScale(5),
    },
    innerContainer: {
        height: theme.moderateScale(240),
        width: '100%',
        backgroundColor: 'white',
        padding: theme.moderateScale(10),
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.3,
        shadowColor: theme.colors.black,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 5
    },
    visitorImage: {
        height: theme.moderateScale(170), width: '100%'
    },
    visitorName: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: theme.moderateScale(10),
        fontSize: theme.moderateScale(13)
    },
    visitorEmail: {
        textAlign: 'center',
        color: theme.colors.grey5,
        fontSize: theme.moderateScale(10)
    }
})