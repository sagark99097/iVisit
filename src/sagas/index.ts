import { all } from 'redux-saga/effects';
import Sagas from './saga';

export default function* root() {
    yield all([
        ...Sagas,
    ]);
}
