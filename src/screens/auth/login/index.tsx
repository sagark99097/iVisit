import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import Textinput from '../../../components/textinput';
import Button from '../../../components/button';
import strings from '../../../common/strings';
import theme from '../../../common/theme';
import { loginValidator } from '../../../utils/RequestValidator';
import { useSelector, useDispatch } from 'react-redux';
import { AppStates } from '../../../types/models/AppState'
import { actions as Actions } from '../../../ducks/duck';
import Loader from '../../../components/loader';

const LoginScreen = () => {
    const redux = useSelector((state: AppStates) => state);
    const dispatch = useDispatch();
    const showLoader = redux.store?.isLoading;

    const [emailAddress, setEmailaddress] = useState('eve.holt@reqres.in');
    const [password, setPassword] = useState('cityslicka');

    const onChangeText = (field: string, text: string) => {
        switch (field) {
            case 'email':
                setEmailaddress(text);
                break;
            case 'password':
                setPassword(text);
                break;
            default:
                break;
        }
    }
    const onPressGo = () => {
        loginValidator(emailAddress, password).then((response) => {
            dispatch(Actions.login(emailAddress, password));
        });
    }
    return (
        <View style={styles.container}>
            <Loader showLoader={showLoader} />
            <Textinput
                value={emailAddress}
                onChangeText={(text: string) => onChangeText('email', text)}
                placeholder={strings.EMAIL}
            />
            <Textinput
                value={password}
                onChangeText={(text: string) => onChangeText('password', text)}
                placeholder={strings.PASSWORD}
            />
            <Button
                buttonName={strings.GO}
                onPress={() => onPressGo()}
            />
        </View>
    )
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: theme.moderateScale(50)
    }
})