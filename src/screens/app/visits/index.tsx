import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import theme from '../../../common/theme';
import { PATHS } from '../../../types/enums/NavigationPath';
import navigationService from '../../../navigation/services'
import { useSelector, useDispatch } from 'react-redux';
import { AppStates } from '../../../types/models/AppState'
import { actions as Actions } from '../../../ducks/duck';
import RenderVisitor from '../../../components/renderVisitor'
import { UserDetail } from '../../../types/models/Users'
import Loader from '../../../components/loader';

const VisitsScreen = () => {
    const redux = useSelector((state: AppStates) => state);
    const users = redux?.store?.allUser?.data;
    const requestedLimit = redux?.store?.allUser?.limit;
    const showLoader = redux.store?.isLoading;
    const [limit, setLimit] = useState(10)

    const dispatch = useDispatch();

    useEffect(() => {
        handleRemoteRequest(limit)
    }, [])

    const handleRemoteRequest = async (page: number) => {
        dispatch(Actions.getUsers(page));
    }
    const onPressVisitDetails = (UserId: string) => {
        dispatch(Actions.resetUserDetails());
        navigationService.navigate(PATHS.VISIT_DETAILS, { UserId: UserId, RouteName: PATHS.VISITS })
    }
    const handleOnRefreshing = () => {
        setLimit(10)
        setTimeout(() => {
            handleRemoteRequest(10)
        }, 500);
    }

    const handleOnReachEnd = () => {
        if (requestedLimit < limit) return
        setLimit(limit + 10)
        setTimeout(() => {
            handleRemoteRequest(limit + 10)
        }, 500);
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <RenderVisitor
                item={item}
                index={index}
                onPressVisitDetails={(item: UserDetail) => onPressVisitDetails(item.id)} />
        )
    }
    return (
        <View style={styles.container}>
            <Loader showLoader={showLoader} />
            <FlatList
                data={users}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                refreshing={showLoader}
                onRefresh={() => handleOnRefreshing()}
                onEndReached={handleOnReachEnd.bind(
                    this,
                )}
                onEndReachedThreshold={0.5}
            />
        </View>
    )
}
export default VisitsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: theme.moderateScale(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
})