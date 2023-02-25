import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import theme from '../../../common/theme';
import MapView, {
    Marker,
    PROVIDER_GOOGLE,
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { AppStates } from '../../../types/models/AppState'
import { actions as Actions } from '../../../ducks/duck';
import { addToFavoriteList, findAlreadyFavorite, updateFavoriteList, getFavoriteList } from '../../../realm/realmhelper';
import Loader from '../../../components/loader';
import Toast from 'react-native-simple-toast';
import strings from '../../../common/strings';
import { PATHS } from '../../../types/enums/NavigationPath';
import navigationService from '../../../navigation/services'
import moment from 'moment';

export interface Props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
const marker = {
    latitude: 37.78825,
    longitude: -122.4324,
}

const VisitDetailsScreen = (props: Props) => {
    const { navigation } = props;

    const redux = useSelector((state: AppStates) => state);
    const dispatch = useDispatch();
    const userDetails = redux?.store?.userDetails;
    const showLoader = redux?.store?.isLoading;
    const [isFavorite, setisFavorite] = useState(false)

    const { UserId, RouteName }: any = props.route.params;

    useEffect(() => {
        dispatch(Actions.getUserDetails(UserId));
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const isAlreadyStored = findAlreadyFavorite(UserId);
            if (isAlreadyStored === undefined) {
                setisFavorite(false)
            } else {
                setisFavorite(isAlreadyStored.isFavorite === 1 ? true : false)
            }
        });
        return unsubscribe;
    }, [])

    const onPressFavoriteList = () => {
        const isAlreadyStored = findAlreadyFavorite(UserId);
        if (isAlreadyStored === undefined) {
            const data = {
                id: { type: 'int', default: 0 },
                email: userDetails?.email,
                firstName: userDetails?.firstName,
                userId: userDetails?.id,
                lastName: userDetails?.lastName,
                picture: userDetails?.picture,
                title: userDetails?.title,
                isFavorite: 1,
            };
            setisFavorite(true)
            addToFavoriteList(data);
            Toast.show(strings.ADDED_TO_FAVORITE);
        } else {
            updateFavoriteList(isAlreadyStored.id - 1, isAlreadyStored.isFavorite === 1 ? 0 : 1);
            if (RouteName === PATHS.FAVORITES) {
                navigationService.goBack()
            }
            setisFavorite(isAlreadyStored.isFavorite === 0 ? false : true)
            Toast.show(isAlreadyStored.isFavorite === 0 ? strings.REMOVED_FROM_FAVORITE : strings.ADDED_TO_FAVORITE);
        }
    }

    return (
        <View style={styles.container}>
            <Loader showLoader={showLoader} />
            {userDetails &&
                <>
                    <View style={styles.favoriteContainer}>
                        <TouchableOpacity onPress={() => onPressFavoriteList()}>
                            <Icon
                                name={'heart'}
                                size={32}
                                color={isFavorite ? theme.colors.red : theme.colors.grey5}
                            />
                        </TouchableOpacity>
                    </View>
                    <Image style={styles.visitorImage} source={{ uri: userDetails.picture }}></Image>
                    <View style={styles.detailsDiv}>
                        <Text children={userDetails.id} style={styles.idTextStyle} />
                        <Text children={userDetails.title + ' ' + userDetails.firstName + ' ' + userDetails.lastName} style={styles.visitorName} />
                        <View style={styles.rowContainer}>
                            <Text children={strings.GENDER} style={styles.boldText} />
                            <Text children={userDetails.gender} />
                        </View>
                        <View style={styles.rowContainer}>
                            <Text children={strings.DATE_OF_BIRTH} style={styles.boldText} />
                            <Text children={moment(userDetails.dateOfBirth).format('MMM DD YYYY')} />
                        </View>
                        <View style={styles.rowContainer}>
                            <Text children={strings.REGISTER_DATE} style={styles.boldText} />
                            <Text children={moment(userDetails.registerDate).format('MMM DD YYYY')} />
                        </View>


                        <View style={{ ...styles.rowContainer, marginTop: theme.moderateScale(10) }}>
                            <Text children={strings.EMAIL} style={styles.boldText} />
                            <Text children={': ' + userDetails.email} />
                        </View>
                        <View style={styles.rowContainer}>
                            <Text children={strings.PHONE} style={styles.boldText} />
                            <Text children={userDetails.phone} />
                        </View>

                        <View style={styles.addressContainer}>
                            <Text children={strings.ADDRESS} style={styles.boldText} />
                            <Text children={userDetails.location.country + ', ' + userDetails.location.state + ', ' + userDetails.location.state + ', ' + userDetails.location.street + ', ' + userDetails.location.city} />
                        </View>
                        <MapView
                            style={styles.map}
                            region={region}
                            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : ''}
                        >
                            <Marker
                                coordinate={marker}
                            />
                        </MapView>
                    </View>
                </>
            }
        </View>
    )
}
export default VisitDetailsScreen;

const styles = StyleSheet.create({
    container: {
        padding: theme.moderateScale(5)
    },
    favoriteContainer: {
        position: 'absolute',
        right: theme.moderateScale(10),
        top: theme.moderateScale(10),
    },
    visitorImage: {
        height: theme.moderateScale(150),
        width: '50%',
        alignSelf: 'center',
    },
    visitorName: {
        fontFamily: 'bold',
        marginBottom: theme.moderateScale(10)
    },
    idTextStyle: {
        color: theme.colors.grey5,
        fontFamily: 'bold',
    },
    rowContainer: {
        flexDirection: 'row',
    },
    boldText: {
        fontWeight: 'bold',
    },
    addressContainer: {
        marginTop: theme.moderateScale(10)
    },
    map: {
        height: 300,
        width: '100%'
    },
    detailsDiv: {
        marginTop: theme.moderateScale(5)
    }
})