import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { Api } from '../services/service';
import { actions as Actions, Types } from '../ducks/duck';
import strings from '../common/strings';
import Toast from 'react-native-simple-toast';
import navigationService from '../navigation/services';
import { PATHS } from '../types/enums/NavigationPath';
import { setItem, storageKeys } from '../config/asyncStorage';

function* login(action: any) {
    try {
        const response = yield call(Api.login, action.email, action.password,);
        yield put(Actions.loginSuccess(response));
        setItem(storageKeys.SESSION, response.token);
        navigationService.reset(PATHS.VISITS);
    } catch (e) {
        Toast.show(strings.EMAIL_EMPTY);
        yield put(Actions.loginFailure(strings.ERROR));
    }
}
function* getUsers(action: any) {
    try {
        const response = yield call(Api.getUsers, action.limit);
        yield put(Actions.getUsersSuccess(response));
    } catch (e) {
        Toast.show(strings.EMAIL_EMPTY);
        yield put(Actions.getUsersFailure(strings.ERROR));
    }
}
function* getUserDetails(action: any) {
    try {
        const response = yield call(Api.getUserDetails, action.userId);
        yield put(Actions.getUserDetailSuccess(response));
    } catch (e) {
        Toast.show(strings.EMAIL_EMPTY);
        yield put(Actions.getUserDetailFailure(strings.ERROR));
    }
}

export function* watchLogin() {
    yield takeLatest(Types.LOGIN_REQUEST, login);
}

export function* watchGetUsers() {
    yield takeLatest(Types.GET_USERS_REQUEST, getUsers);
    yield takeLatest(Types.GET_USER_DETAILS_REQUEST, getUserDetails);
}

export default [fork(watchLogin), fork(watchGetUsers)];
