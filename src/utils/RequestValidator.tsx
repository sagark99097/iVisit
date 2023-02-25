import * as Validator from './Validator';
import strings from '../common/strings';
import Toast from 'react-native-simple-toast';

export async function loginValidator(
    email: string,
    password: string,
) {
    return await new Promise(function (resolve, reject) {
        if (Validator.isEmpty(email)) {
            Toast.show(strings.EMAIL_EMPTY);
            return;
        } else if (!Validator.isValidEmail(email)) {
            Toast.show(strings.EMAIL_NOT_VALID);
            return;
        } else if (Validator.isEmpty(password)) {
            Toast.show(strings.PASSWORD_EMPTY);
            return;
        }
        resolve({ email: email.trim(), password: password.trim() });
    });
}