import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import theme from '../../../common/theme';
import { PATHS } from '../../../types/enums/NavigationPath';
import navigationService from '../../../navigation/services'
import { getFavoriteList } from '../../../realm/realmhelper';
import { NavigationProp } from '@react-navigation/native';
import RenderVisitor from '../../../components/renderVisitor'
import { UserDetail } from '../../../types/models/Users'
import { useDispatch } from 'react-redux';
import { actions as Actions } from '../../../ducks/duck';
import strings from '../../../common/strings';

export interface Props {
    navigation: NavigationProp<any, any>;
}

const FavoritesScreen = (props: Props) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const data = getFavoriteList()
        setUserData(data)
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const data = getFavoriteList()
            setUserData(data)
        });
        return unsubscribe;
    }, []);

    const onPressVisitDetails = (UserId: string) => {
        dispatch(Actions.resetUserDetails());
        navigationService.navigate(PATHS.VISIT_DETAILS, { UserId: UserId, RouteName: PATHS.FAVORITES })
    }
    const handleOnRefreshing = () => {
        setIsLoading(true)
        const data = getFavoriteList()
        setUserData(data)
        setIsLoading(false)
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <RenderVisitor
                item={item}
                index={index}
                onPressVisitDetails={(item: UserDetail) => onPressVisitDetails(item.userId)} />
        )
    }

    return (
        <>
            {userData.length > 0 ?
                <View style={userData.length === 1 ? styles.singleItemcontainer : styles.container}>
                    <FlatList
                        data={userData}
                        renderItem={renderItem}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={isLoading}
                        onRefresh={() => handleOnRefreshing()}
                    />
                </View>
                :
                <View style={styles.container}>
                    <Text children={strings.NO_FAVORITE_LIST} style={styles.textStyle} />
                </View>
            }
        </>
    )
}
export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: theme.moderateScale(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    singleItemcontainer: {
        flex: 1,
        paddingHorizontal: theme.moderateScale(5),
    },
    textStyle: {
        fontSize: theme.moderateScale(15)
    }
})
